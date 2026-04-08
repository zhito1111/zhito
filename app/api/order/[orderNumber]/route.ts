import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Params = {
  params: Promise<{
    orderNumber: string
  }>
}

async function checkPaymentStatus(paymentId: string) {
  const shopId = process.env.YOOKASSA_SHOP_ID
  const secretKey = process.env.YOOKASSA_SECRET_KEY

  if (!shopId || !secretKey) {
    return null
  }

  const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64")

  try {
    const res = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("YOOKASSA CHECK ERROR:", data)
      return null
    }

    return data
  } catch (e) {
    console.error("YOOKASSA FETCH ERROR:", e)
    return null
  }
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { orderNumber } = await params

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, error: "Не указан номер заказа" },
        { status: 400 }
      )
    }

    let order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    })

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Заказ не найден" },
        { status: 404 }
      )
    }

    // 🔥 САМОЕ ВАЖНОЕ — проверка оплаты
    if (
      order.status === "pending_payment" &&
      order.paymentId
    ) {
      const payment = await checkPaymentStatus(order.paymentId)

      if (payment) {
        const status = payment.status
        const paid = payment.paid

        // ✅ ОПЛАЧЕНО
        if (status === "succeeded" && paid) {
          order = await prisma.order.update({
            where: { id: order.id },
            data: {
              status: "paid",
              paidAt: new Date(),
            },
            include: { items: true },
          })
        }

        // ❌ ОТМЕНЕНО
        if (status === "canceled") {
          order = await prisma.order.update({
            where: { id: order.id },
            data: {
              status: "canceled",
            },
            include: { items: true },
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        totalPrice: order.totalPrice,
        paidAt: order.paidAt,
        createdAt: order.createdAt,
        paymentUrl: order.paymentUrl,
        items: order.items,
      },
    })
  } catch (error) {
    console.error("GET ORDER STATUS ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Ошибка сервера",
      },
      { status: 500 }
    )
  }
}