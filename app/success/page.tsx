"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
        <div className="text-3xl mb-4">✅</div>

        <h1 className="text-xl font-semibold mb-2">
          Оплата обрабатывается
        </h1>

        <p className="text-sm text-neutral-600 mb-4">
          {orderNumber
            ? `Заказ №${orderNumber} создан. После оплаты мы сразу начнём обработку.`
            : "Ваш заказ принят. После оплаты мы начнём обработку."}
        </p>

        <p className="text-xs text-neutral-500 mb-6">
          Если вы уже оплатили — статус обновится автоматически.
        </p>

        <Link
          href="/"
          className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-neutral-800 transition"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}