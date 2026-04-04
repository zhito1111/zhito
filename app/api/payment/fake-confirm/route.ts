import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendTelegramMessage } from "@/lib/telegram"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const orderNumber = String(body.orderNumber || "").trim()

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, error: "orderNumber обязателен" },
        { status: 400 }
      )
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
    })

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Заказ не найден" },
        { status: 404 }
      )
    }

    if (order.status === "paid") {
      return NextResponse.json({
        success: true,
        redirectUrl: `/success?order=${order.orderNumber}`,
      })
    }

    const updatedOrder = await prisma.order.update({
      where: { orderNumber },
      data: {
        status: "paid",
        paidAt: new Date(),
      },
    })

    await sendTelegramMessage(`✅ <b>Заказ оплачен</b>

🧾 <b>Номер заказа:</b> ${updatedOrder.orderNumber}
💰 <b>Сумма:</b> ${updatedOrder.totalPrice} ₽
📌 <b>Статус:</b> ${updatedOrder.status}`)

    return NextResponse.json({
      success: true,
      redirectUrl: `/success?order=${updatedOrder.orderNumber}`,
    })
  } catch (error) {
    console.error("FAKE CONFIRM ERROR:", error)

    return NextResponse.json(
      { success: false, error: "Ошибка" },
      { status: 500 }
    )
  }
}