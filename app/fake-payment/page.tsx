type FakePaymentPageProps = {
  searchParams?: Promise<{
    order?: string
  }>
}

export default async function FakePaymentPage({
  searchParams,
}: FakePaymentPageProps) {
  const params = searchParams ? await searchParams : undefined
  const orderNumber =
    typeof params?.order === "string" && params.order.trim()
      ? params.order.trim()
      : "не найден"

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12 text-neutral-900">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            ✓
          </div>

          <div className="mt-6 text-center">
            <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-1 text-sm font-medium text-green-700">
              Заказ принят в работу
            </span>

            <h1 className="mt-4 text-3xl font-bold md:text-4xl">
              Спасибо, ваш заказ оформлен
            </h1>

            <p className="mt-4 text-base leading-7 text-neutral-600">
              Мы получили заявку и уже приняли её в работу. Дальше свяжемся с
              вами для подтверждения заказа и деталей доставки.
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-neutral-100 p-5">
            <div className="flex flex-col gap-3 text-sm text-neutral-700 md:flex-row md:items-center md:justify-between">
              <span>Номер заказа</span>
              <span className="rounded-xl bg-white px-4 py-2 font-semibold text-neutral-900 shadow-sm">
                {orderNumber}
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <h2 className="text-sm font-semibold">1. Заказ получен</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Ваша заявка успешно сохранена в системе.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <h2 className="text-sm font-semibold">2. Свяжемся с вами</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Уточним детали, подтвердим заказ и согласуем доставку.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <h2 className="text-sm font-semibold">3. Запускаем в работу</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Готовим свежий отжим и передаём заказ на доставку.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-base font-semibold text-amber-900">
              Онлайн-оплата скоро появится
            </h2>
            <p className="mt-2 text-sm leading-6 text-amber-800">
              Сейчас сайт работает в формате MVP: мы принимаем заказ через сайт,
              после чего подтверждаем его вручную и связываемся с вами.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Вернуться на главную
            </a>

            <a
              href="/#order"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              Оформить ещё один заказ
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}