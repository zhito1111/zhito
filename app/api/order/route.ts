import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createPayment } from "@/lib/yookassa"
import { sendTelegramMessage } from "@/lib/telegram"

const catalog: Record<string, Record<string, number>> = {
  "Льняное масло": {
    "250 мл": 700,
    "500 мл": 1200,
    "1 л": 2200,
  },
  "Подсолнечное масло": {
    "250 мл": 500,
    "500 мл": 900,
    "1 л": 1700,
  },
  "Тыквенное масло": {
    "250 мл": 900,
    "500 мл": 1600,
    "1 л": 3000,
  },
}

type OrderItemInput = {
  product: string
  volume: string
  amount: number
}

type NormalizedOrderItem = {
  product: string
  volume: string
  amount: number
  unitPrice: number
  totalPrice: number
}

type OrderRequestBody = {
  name?: unknown
  phone?: unknown
  items?: unknown
}

function normalizePhone(phone: string): string | null {
  const digits = String(phone || "").replace(/\D/g, "")

  if (digits.length === 11 && digits.startsWith("8")) {
    return "+7" + digits.slice(1)
  }

  if (digits.length === 11 && digits.startsWith("7")) {
    return "+" + digits
  }

  if (digits.length === 10) {
    return "+7" + digits
  }

  return null
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function resolvePaymentUrl(
  req: Request,
  rawPaymentUrl: string | undefined,
  orderNumber: string
) {
  const origin = new URL(req.url).origin
  const fallbackFakePaymentUrl = `${origin}/fake-payment?order=${encodeURIComponent(orderNumber)}`

  if (!rawPaymentUrl) {
    return fallbackFakePaymentUrl
  }

  try {
    const parsedUrl = new URL(rawPaymentUrl)

    if (!parsedUrl.pathname.includes("/fake-payment")) {
      return rawPaymentUrl
    }

    return `${origin}/fake-payment${parsedUrl.search || `?order=${encodeURIComponent(orderNumber)}`}`
  } catch {
    if (rawPaymentUrl.startsWith("/fake-payment")) {
      return `${origin}${rawPaymentUrl}`
    }

    return fallbackFakePaymentUrl
  }
}

function isOrderItemInput(value: unknown): value is OrderItemInput {
  if (!value || typeof value !== "object") {
    return false
  }

  const item = value as Record<string, unknown>

  return (
    typeof item.product === "string" &&
    typeof item.volume === "string" &&
    (typeof item.amount === "number" || typeof item.amount === "string")
  )
}

export async function POST(req: Request) {
  try {
    const body: OrderRequestBody = await req.json()
    console.log("ORDER BODY:", body)

    const name = String(body.name || "").trim()
    const rawPhone = String(body.phone || "").trim()

    const rawItems: OrderItemInput[] = Array.isArray(body.items)
      ? body.items.filter(isOrderItemInput).map((item) => ({
          product: item.product,
          volume: item.volume,
          amount: Number(item.amount),
        }))
      : []

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Введите имя" },
        { status: 400 }
      )
    }

    const phone = normalizePhone(rawPhone)

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Телефон должен быть российским номером из 10 или 11 цифр",
        },
        { status: 400 }
      )
    }

    if (!rawItems.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Добавьте хотя бы один товар в заказ",
        },
        { status: 400 }
      )
    }

    const normalizedItems: NormalizedOrderItem[] = rawItems.map((item) => {
      const product = String(item.product || "").trim()
      const volume = String(item.volume || "").trim()
      const amount = Math.max(1, Number(item.amount) || 1)

      const unitPrice = catalog[product]?.[volume]

      if (!product || !volume || typeof unitPrice !== "number") {
        throw new Error("Неверный товар, объём или количество")
      }

      return {
        product,
        volume,
        amount,
        unitPrice,
        totalPrice: unitPrice * amount,
      }
    })

    const totalPrice = normalizedItems.reduce<number>(
      (sum, item) => sum + item.totalPrice,
      0
    )

    const orderNumber = Date.now().toString()
    const siteUrl = new URL(req.url).origin

    const order = await prisma.order.create({
      data: {
        orderNumber,
        name,
        phone,
        totalPrice,
        status: "new",
        items: {
          create: normalizedItems.map((item) => ({
            product: item.product,
            volume: item.volume,
            amount: item.amount,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    console.log("ORDER CREATED:", order)

    const paymentDescription = normalizedItems
      .map((item) => `${item.product}, ${item.volume}, ${item.amount} шт.`)
      .join("; ")

    const payment = await createPayment({
      amount: totalPrice,
      orderNumber: order.orderNumber,
      description: `Заказ ${order.orderNumber}: ${paymentDescription}`,
      siteUrl,
    })

    console.log("PAYMENT CREATED:", payment)

    const finalPaymentUrl = resolvePaymentUrl(
      req,
      payment.paymentUrl,
      order.orderNumber
    )

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentId: payment.paymentId,
        paymentUrl: finalPaymentUrl,
      },
      include: {
        items: true,
      },
    })

    const safeName = escapeHtml(updatedOrder.name)
    const safePhone = escapeHtml(updatedOrder.phone)
    const safePaymentUrl = escapeHtml(updatedOrder.paymentUrl || "#")

    const itemsText = updatedOrder.items
      .map((item, index) => {
        return `${index + 1}. <b>${escapeHtml(item.product)}</b>
   • Объём: ${escapeHtml(item.volume)}
   • Кол-во: ${item.amount}
   • Цена за 1 шт.: ${item.unitPrice} ₽
   • Сумма: ${item.totalPrice} ₽`
      })
      .join("\n\n")

    const message = `🔥 <b>Новый заказ</b>

🧾 <b>Номер заказа:</b> ${updatedOrder.orderNumber}
👤 <b>Имя:</b> ${safeName}
📞 <b>Телефон:</b> ${safePhone}

📦 <b>Состав заказа:</b>
${itemsText}

💰 <b>Итого:</b> ${updatedOrder.totalPrice} ₽
📌 <b>Статус:</b> ${updatedOrder.status}

💳 <b>Ссылка на оплату:</b>
<a href="${safePaymentUrl}">Открыть оплату</a>

${safePaymentUrl}`

    let telegramResult: { ok: boolean } = { ok: false }

    try {
      telegramResult = await sendTelegramMessage(message)
      console.log("TELEGRAM RESULT:", telegramResult)
    } catch (telegramError) {
      console.error("TELEGRAM ERROR:", telegramError)
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      totalPrice,
      paymentUrl: finalPaymentUrl,
      telegramSent: telegramResult.ok,
    })
  } catch (error) {
    console.error("ORDER ERROR FULL START")
    console.error(error)
    console.error("ORDER ERROR FULL END")

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Ошибка сервера",
      },
      { status: 500 }
    )
  }
}