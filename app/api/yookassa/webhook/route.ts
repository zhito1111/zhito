import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendTelegramMessage } from "@/lib/telegram"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("YOOKASSA WEBHOOK:", body)

    const paymentId = body?.object?.id
    const status = body?.object?.status
    const paid = body?.object?.paid
    const orderNumber = body?.object?.metadata?.orderNumber

    if (!paymentId) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const order =
      (orderNumber &&
        (await prisma.order.findUnique({
          where: { orderNumber },
          include: { items: true },
        }))) ||
      (await prisma.order.findFirst({
        where: { paymentId },
        include: { items: true },
      }))

    if (!order) {
      return NextResponse.json({ success: true })
    }

    // ✅ УСПЕШНАЯ ОПЛАТА
    if (status === "succeeded" && paid) {
      if (order.status !== "paid") {
        const updated = await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "paid",
            paidAt: new Date(),
          },
          include: { items: true },
        })

        const itemsText = updated.items
          .map(
            (i, idx) =>
              `${idx + 1}. ${i.product} (${i.volume}) × ${i.amount} = ${i.totalPrice} ₽`
          )
          .join("\n")

        await sendTelegramMessage(
          `✅ ОПЛАТА ПРОШЛА

Заказ: ${updated.orderNumber}
Телефон: ${updated.phone}

${itemsText}

Итого: ${updated.totalPrice} ₽`
        )
      }
    }

    // ❌ ОТМЕНА
    if (status === "canceled") {
      if (order.status !== "paid") {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "canceled" },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("WEBHOOK ERROR:", e)

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}