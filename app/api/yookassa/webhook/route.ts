import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendTelegramMessage } from "@/lib/telegram"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("YOOKASSA WEBHOOK:", JSON.stringify(body, null, 2))

    const event = body?.event
    const payment = body?.object

    const paymentId = payment?.id
    const status = payment?.status
    const paid = payment?.paid
    const orderNumber = payment?.metadata?.orderNumber

    // ❗ ВАЖНО: webhook может приходить без нужных данных
    if (!paymentId) {
      return NextResponse.json({ success: true })
    }

    // 🔍 Ищем заказ
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
      console.warn("ORDER NOT FOUND FOR PAYMENT:", paymentId)
      return NextResponse.json({ success: true })
    }

    // 🔁 Защита от повторных webhook (ЮKassa любит спамить)
    if (order.status === "paid" && status === "succeeded") {
      return NextResponse.json({ success: true })
    }

    // ✅ УСПЕШНАЯ ОПЛАТА
    if (event === "payment.succeeded" || (status === "succeeded" && paid)) {
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
        `💰 <b>ОПЛАТА ПОДТВЕРЖДЕНА</b>

🧾 <b>Заказ:</b> ${updated.orderNumber}
📞 <b>Телефон:</b> ${updated.phone}

📦 <b>Состав:</b>
${itemsText}

💰 <b>Сумма:</b> ${updated.totalPrice} ₽

🚚 <b>Действие:</b>
Связаться с клиентом и согласовать доставку`
      )
    }

    // ❌ ОТМЕНА ПЛАТЕЖА
    if (event === "payment.canceled" || status === "canceled") {
      if (order.status !== "paid") {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "canceled" },
        })
      }
    }

    // ❗ ВСЕГДА возвращаем 200
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("WEBHOOK ERROR:", e)

    // ❗ Даже при ошибке лучше вернуть 200,
    // чтобы ЮKassa не долбила webhook 100 раз
    return NextResponse.json({ success: true })
  }
}