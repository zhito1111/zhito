import crypto from "crypto"

type ReceiptItem = {
  description: string
  quantity: number
  amount: number
}

type CreatePaymentParams = {
  amount: number
  orderNumber: string
  description?: string
  siteUrl?: string
  phone: string
  items: ReceiptItem[]
}

type CreatePaymentResult = {
  paymentId: string
  paymentUrl: string
  isFake: boolean
}

function normalizeSiteUrl(rawSiteUrl?: string) {
  const fallback = "http://localhost:3000"
  const value = (rawSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || fallback).trim()

  try {
    const url = new URL(value)

    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      url.protocol = "http:"
    }

    return url.toString().replace(/\/+$/, "")
  } catch {
    return fallback
  }
}

function buildSuccessUrl(siteUrl: string, orderNumber: string) {
  return `${siteUrl}/success?order=${encodeURIComponent(orderNumber)}`
}

function normalizePhoneForReceipt(phone: string) {
  const digits = String(phone || "").replace(/\D/g, "")

  if (digits.length === 11 && digits.startsWith("8")) {
    return `+7${digits.slice(1)}`
  }

  if (digits.length === 11 && digits.startsWith("7")) {
    return `+${digits}`
  }

  if (digits.length === 10) {
    return `+7${digits}`
  }

  throw new Error("Некорректный телефон для ЮKassa")
}

function roundToTwo(value: number) {
  return Math.round(value * 100) / 100
}

export async function createPayment({
  amount,
  orderNumber,
  description,
  siteUrl,
  phone,
  items,
}: CreatePaymentParams): Promise<CreatePaymentResult> {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl)

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Некорректная сумма платежа")
  }

  if (!orderNumber || typeof orderNumber !== "string") {
    throw new Error("Некорректный номер заказа")
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Для оплаты нужен хотя бы один товар")
  }

  const normalizedPhone = normalizePhoneForReceipt(phone)

  const receiptItems = items.map((item) => {
    const description = String(item.description || "").trim()
    const quantity = Number(item.quantity)
    const itemAmount = Number(item.amount)

    if (!description) {
      throw new Error("У товара отсутствует описание для чека")
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new Error("Некорректное количество товара для чека")
    }

    if (!Number.isFinite(itemAmount) || itemAmount <= 0) {
      throw new Error("Некорректная сумма товара для чека")
    }

    return {
      description,
      quantity: quantity.toFixed(2),
      amount: {
        value: roundToTwo(itemAmount).toFixed(2),
        currency: "RUB",
      },
      vat_code: 1,
      payment_mode: "full_payment",
      payment_subject: "commodity",
    }
  })

  const receiptTotal = roundToTwo(
    receiptItems.reduce((sum, item) => sum + Number(item.amount.value), 0)
  )
  const normalizedAmount = roundToTwo(amount)

  if (receiptTotal !== normalizedAmount) {
    throw new Error(
      `Сумма чека (${receiptTotal.toFixed(2)}) не совпадает с суммой платежа (${normalizedAmount.toFixed(2)})`
    )
  }

  const shopId = process.env.YOOKASSA_SHOP_ID
  const secretKey = process.env.YOOKASSA_SECRET_KEY

  if (!shopId || !secretKey) {
    return {
      paymentId: `fake_${Date.now()}`,
      paymentUrl: `/fake-payment?order=${encodeURIComponent(orderNumber)}`,
      isFake: true,
    }
  }

  const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64")
  const idempotenceKey = crypto.randomUUID()

  const payload = {
    amount: {
      value: normalizedAmount.toFixed(2),
      currency: "RUB",
    },
    capture: true,
    confirmation: {
      type: "redirect",
      return_url: buildSuccessUrl(normalizedSiteUrl, orderNumber),
    },
    description: description || `Оплата заказа ${orderNumber}`,
    metadata: {
      orderNumber,
      source: "zhito",
      paid: "false",
    },
    receipt: {
      customer: {
        phone: normalizedPhone,
      },
      tax_system_code: 2,
      items: receiptItems,
    },
  }

  let response: Response

  try {
    response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
        "Idempotence-Key": idempotenceKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
  } catch (error) {
    console.error("YOOKASSA NETWORK ERROR:", error)
    throw new Error("Не удалось связаться с ЮKassa")
  }

  let data: any = null

  try {
    data = await response.json()
  } catch (error) {
    console.error("YOOKASSA INVALID JSON:", error)
    throw new Error("ЮKassa вернула некорректный ответ")
  }

  if (!response.ok) {
    console.error("YOOKASSA ERROR:", data)
    console.error("YOOKASSA PAYLOAD:", payload)

    const errorMessage =
      data?.description ||
      data?.error ||
      data?.type ||
      "Ошибка создания платежа в ЮKassa"

    throw new Error(errorMessage)
  }

  const paymentId = data?.id
  const paymentUrl = data?.confirmation?.confirmation_url

  if (!paymentId || !paymentUrl) {
    console.error("YOOKASSA INVALID RESPONSE SHAPE:", data)
    throw new Error("ЮKassa не вернула ссылку на оплату")
  }

  return {
    paymentId: String(paymentId),
    paymentUrl: String(paymentUrl),
    isFake: false,
  }
}