import OrderForm from "@/components/OrderForm"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-12">
        <section className="relative z-10">
          <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">
            Свежевыжатое масло холодного отжима
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600">
            Натуральные масла собственного производства. Без добавок, без
            хранения, только свежий отжим под заказ.
          </p>
        </section>

        <section className="relative z-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Льняное масло</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Богато Омега-3, укрепляет иммунитет
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>250 мл</span>
                <span>990 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>500 мл</span>
                <span>1790 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>1 л</span>
                <span>3290 ₽</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Тыквенное масло</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Поддержка печени и ЖКТ
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>250 мл</span>
                <span>1290 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>500 мл</span>
                <span>2190 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>1 л</span>
                <span>3990 ₽</span>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Как это работает</h2>
            <div className="space-y-2 text-sm text-neutral-700">
              <p>1. Вы выбираете масло и объём</p>
              <p>2. Оставляете заказ</p>
              <p>3. Мы отжимаем масло</p>
              <p>4. Доставляем в течение 24 часов</p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Доставка и оплата</h2>
            <div className="space-y-2 text-sm text-neutral-700">
              <p>Доставка по Москве и МО</p>
              <p>Оплата при получении</p>
              <p>Скоро подключим СБП</p>
            </div>
          </div>
        </section>

        <div className="relative z-20">
          <OrderForm />
        </div>
      </div>
    </main>
  )
}