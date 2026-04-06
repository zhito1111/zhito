"use client"

import Link from "next/link"
import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

type OrderStatus =
  | "new"
  | "pending_payment"
  | "paid"
  | "canceled"
  | "payment_error"
  | "waiting_for_capture"
  | string

type OrderItem = {
  id: number
  product: string
  volume: string
  amount: number
  unitPrice: number
  totalPrice: number
}

type OrderResponse = {
  success: boolean
  order?: {
    orderNumber: string
    status: OrderStatus
    totalPrice: number
    paidAt: string | null
    createdAt: string
    paymentUrl: string | null
    items: OrderItem[]
  }
  error?: string
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽"
}

function getStatusMeta(status: OrderStatus) {
  switch (status) {
    case "paid":
      return {
        icon: "✅",
        title: "Заказ оплачен",
        description:
          "Оплата подтверждена. Мы уже получили информацию и начинаем обработку заказа.",
        badgeText: "Оплата подтверждена",
        badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
        cardClass: "border-emerald-200 bg-emerald-50/60",
        buttonClass:
          "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100",
      }

    case "pending_payment":
      return {
        icon: "⏳",
        title: "Ожидаем оплату",
        description:
          "Заказ создан, но оплата ещё не подтверждена. Если вы уже оплатили, статус обновится автоматически.",
        badgeText: "Ожидаем оплату",
        badgeClass: "border-amber-200 bg-amber-50 text-amber-700",
        cardClass: "border-amber-200 bg-amber-50/60",
        buttonClass:
          "bg-neutral-900 text-white hover:bg-neutral-800",
      }

    case "canceled":
      return {
        icon: "❌",
        title: "Оплата отменена",
        description:
          "Платёж был отменён. Можно вернуться на сайт и оформить заказ заново.",
        badgeText: "Оплата отменена",
        badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
        cardClass: "border-rose-200 bg-rose-50/60",
        buttonClass:
          "bg-neutral-900 text-white hover:bg-neutral-800",
      }

    case "payment_error":
      return {
        icon: "⚠️",
        title: "Ошибка оплаты",
        description:
          "При создании или обработке платежа возникла ошибка. Попробуйте оформить заказ ещё раз.",
        badgeText: "Ошибка платежа",
        badgeClass: "border-orange-200 bg-orange-50 text-orange-700",
        cardClass: "border-orange-200 bg-orange-50/60",
        buttonClass:
          "bg-neutral-900 text-white hover:bg-neutral-800",
      }

    case "waiting_for_capture":
      return {
        icon: "⏳",
        title: "Платёж обрабатывается",
        description:
          "Платёж уже создан и ожидает финального подтверждения. Обычно это занимает немного времени.",
        badgeText: "Платёж обрабатывается",
        badgeClass: "border-sky-200 bg-sky-50 text-sky-700",
        cardClass: "border-sky-200 bg-sky-50/60",
        buttonClass:
          "bg-neutral-900 text-white hover:bg-neutral-800",
      }

    case "new":
    default:
      return {
        icon: "🧾",
        title: "Заказ создан",
        description:
          "Заказ уже есть в системе. Следующий шаг — перейти к оплате, если вы этого ещё не сделали.",
        badgeText: "Заказ создан",
        badgeClass: "border-neutral-200 bg-white text-neutral-700",
        cardClass: "border-neutral-200 bg-white",
        buttonClass:
          "bg-neutral-900 text-white hover:bg-neutral-800",
      }
  }
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [data, setData] = useState<OrderResponse | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadOrder() {
      if (!orderNumber) {
        setError("Номер заказа не найден в ссылке")
        setLoading(false)
        return
      }

      try {
        setError("")

        const res = await fetch(`/api/order/${encodeURIComponent(orderNumber)}`, {
          cache: "no-store",
        })

        const result: OrderResponse = await res.json()

        if (!res.ok || !result.success || !result.order) {
          throw new Error(result.error || "Не удалось загрузить заказ")
        }

        if (isMounted) {
          setData(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Ошибка загрузки заказа")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadOrder()

    const interval = setInterval(loadOrder, 5000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [orderNumber])

  const order = data?.order
  const statusMeta = useMemo(
    () => getStatusMeta(order?.status || "new"),
    [order?.status]
  )

  if (loading && !order) {
    return (
      <main className="min-h-screen bg-neutral-50 text-neutral-900">
        <section className="border-b border-neutral-200 bg-gradient-to-b from-amber-50 via-orange-50/40 to-neutral-50 px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[32px] border border-amber-100 bg-white p-8 shadow-lg text-center">
              <div className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-1 text-sm font-medium text-amber-700 shadow-sm">
                Проверяем заказ
              </div>
              <h1 className="mt-5 text-3xl font-bold md:text-5xl">
                Загружаем статус заказа
              </h1>
              <p className="mt-4 text-base leading-7 text-neutral-600 md:text-lg">
                Система проверяет оплату и подтягивает актуальные данные по заказу.
              </p>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-neutral-50 text-neutral-900">
        <section className="border-b border-neutral-200 bg-gradient-to-b from-amber-50 via-orange-50/40 to-neutral-50 px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[32px] border border-orange-200 bg-white p-8 shadow-lg">
              <div className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-sm font-medium text-orange-700 shadow-sm">
                Ошибка загрузки
              </div>

              <h1 className="mt-5 text-3xl font-bold md:text-5xl">
                Не удалось открыть заказ
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
                {error || "Что-то пошло не так при загрузке данных заказа."}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
                >
                  Вернуться на главную
                </Link>
                <Link
                  href="/#order"
                  className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
                >
                  Оформить заказ заново
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-gradient-to-b from-amber-50 via-orange-50/40 to-neutral-50 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10">
          <div>
            <span
              className={`inline-flex rounded-full border px-4 py-1 text-sm font-medium shadow-sm ${statusMeta.badgeClass}`}
            >
              {statusMeta.badgeText}
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              {statusMeta.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
              {statusMeta.description}
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
              Номер заказа: <span className="font-semibold text-neutral-900">{order.orderNumber}</span>.
              Страница автоматически обновляет статус каждые 5 секунд, так что
              данные подтянутся сами, без ритуалов и ручного обновления.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {order.paymentUrl && order.status !== "paid" && (
                <a
                  href={order.paymentUrl}
                  className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold shadow-sm transition ${statusMeta.buttonClass}`}
                >
                  Перейти к оплате
                </a>
              )}

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
              >
                Вернуться на главную
              </Link>

              <Link
                href="/#order"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
              >
                Новый заказ
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Статус</p>
                <p className="mt-1 text-sm text-neutral-600">{order.status}</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Сумма заказа</p>
                <p className="mt-1 text-sm text-neutral-600">{formatPrice(order.totalPrice)}</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Обновление</p>
                <p className="mt-1 text-sm text-neutral-600">Каждые 5 секунд</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-amber-100 bg-white p-4 shadow-lg sm:rounded-[32px] sm:p-5">
            <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-amber-100 via-orange-50 to-lime-50 p-4 sm:rounded-[28px] sm:p-6">
              <div className="rounded-[22px] border border-white/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,255,255,0.35))] p-4 shadow-inner sm:rounded-[24px] sm:p-6">
                <div
                  className={`rounded-[20px] border p-5 shadow-sm sm:p-6 ${statusMeta.cardClass}`}
                >
                  <div className="text-5xl">{statusMeta.icon}</div>
                  <h2 className="mt-4 text-2xl font-bold leading-tight">
                    {statusMeta.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {statusMeta.description}
                  </p>

                  {order.paidAt && (
                    <div className="mt-5 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700">
                      Оплачено: {new Date(order.paidAt).toLocaleString("ru-RU")}
                    </div>
                  )}

                  {!order.paidAt && (
                    <div className="mt-5 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700">
                      Создан: {new Date(order.createdAt).toLocaleString("ru-RU")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-bold md:text-4xl">Состав заказа</h2>
            <p className="mt-3 text-neutral-600">
              Ниже всё, что вы добавили в заказ: товар, объём, количество и итог
              по каждой позиции. На всякий случай, потому что люди любят нажимать
              кнопки, а потом сомневаться в собственной памяти.
            </p>

            <div className="mt-6 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{item.product}</h3>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Объём: {item.volume}
                      </p>
                      <p className="text-sm leading-6 text-neutral-600">
                        Количество: {item.amount} шт.
                      </p>
                      <p className="text-sm leading-6 text-neutral-600">
                        Цена за 1 шт.: {formatPrice(item.unitPrice)}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900">
                      {formatPrice(item.totalPrice)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Сводка по заказу</h2>

              <div className="mt-5 space-y-3 text-sm text-neutral-700">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <span>Номер заказа</span>
                  <span className="font-semibold text-neutral-900">{order.orderNumber}</span>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <span>Статус</span>
                  <span className="font-semibold text-neutral-900">{order.status}</span>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <span>Итого</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(order.totalPrice)}</span>
                </div>
              </div>

              {order.paymentUrl && order.status !== "paid" && (
                <a
                  href={order.paymentUrl}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Перейти к оплате
                </a>
              )}
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-900 p-6 text-white shadow-sm">
              <h2 className="text-2xl font-semibold">Что дальше</h2>
              <div className="mt-5 space-y-3 text-sm text-neutral-300">
                <p>1. Если оплата ещё не завершена, перейдите к оплате по кнопке выше</p>
                <p>2. После подтверждения статус заказа обновится автоматически</p>
                <p>3. Мы получим информацию об оплате и начнём обработку заказа</p>
                <p>4. При необходимости вы всегда можете вернуться на главную страницу</p>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-200">
                Страница автоматически проверяет статус заказа каждые 5 секунд,
                чтобы вы не сидели и не обновляли её вручную как в 2007 году.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 px-4 py-10 text-white sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/5 p-8">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Заказ уже в системе
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 md:text-base">
                Мы сохраняем данные заказа сразу после оформления. Как только
                оплата будет подтверждена, статус обновится автоматически, и
                заказ пойдёт дальше в обработку.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              {order.paymentUrl && order.status !== "paid" && (
                <a
                  href={order.paymentUrl}
                  className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-amber-400"
                >
                  Завершить оплату
                </a>
              )}
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                На главную
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Загрузка...</div>}>
      <SuccessContent />
    </Suspense>
  )
}