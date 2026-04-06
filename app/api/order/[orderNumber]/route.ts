import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Params = {
  params: Promise<{
    orderNumber: string
  }>
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

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
      },
    })

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Заказ не найден" },
        { status: 404 }
      )
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