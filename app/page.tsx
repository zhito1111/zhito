import OrderForm from "@/components/OrderForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-gradient-to-b from-amber-50 to-neutral-50 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-1 text-sm font-medium text-amber-700 shadow-sm">
              Свежий отжим под заказ
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Натуральное масло холодного отжима без добавок и долгого хранения
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
              Делаем масло небольшими партиями под заказ, чтобы вы получали
              свежий продукт с насыщенным вкусом, ароматом и пользой. Подходит
              для питания, восстановления, поддержки ЖКТ и ежедневного
              рациона.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#order"
                className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
              >
                Оформить заказ
              </a>
              <a
                href="#catalog"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
              >
                Смотреть ассортимент
              </a>
              <a
                href="#benefits"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
              >
                Узнать пользу
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Без консервантов</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Только натуральный продукт
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Свежий отжим</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Не залеживается на складе
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Доставка 24 часа</p>
                <p className="mt-1 text-sm text-neutral-600">
                  По Москве и области
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-amber-100 bg-white p-5 shadow-lg">
            <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-amber-100 via-orange-50 to-lime-50 p-6">
              <div className="aspect-[4/5] rounded-[24px] border border-white/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,255,255,0.35))] p-6 shadow-inner">
                <div className="flex h-full flex-col justify-between rounded-[20px] border border-amber-200/60 bg-white/70 p-6 backdrop-blur">
                  <div>
                    <img
                      src="/images/main.jpg"
                      alt="Масло холодного отжима"
                      className="mb-4 h-56 w-full rounded-2xl object-cover"
                    />
                    <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                      Авторское производство
                    </p>
                    <h2 className="mt-3 text-2xl font-bold">
                      Масло для ежедневной пользы и вкуса
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      Для салатов, каш, восстановления после нагрузок и
                      поддержания здорового рациона.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-amber-200 bg-white px-4 py-3 text-sm">
                      Льняное масло → Омега-3, ежедневная поддержка организма
                    </div>
                    <div className="rounded-2xl border border-amber-200 bg-white px-4 py-3 text-sm">
                      Тыквенное масло → мягкая поддержка печени и ЖКТ
                    </div>
                    <a
                      href="#order"
                      className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                    >
                      Выбрать масло и заказать
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">Ассортимент</h2>
            <p className="mt-3 text-neutral-600">
              Выберите масло под свои задачи: ежедневное питание, поддержка
              организма, мягкое восстановление и здоровый рацион без лишней
              химии.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <img
                src="/images/linseed.jpg"
                alt="Льняное масло"
                className="mb-5 h-64 w-full rounded-2xl object-cover"
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">Льняное масло</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Подходит для тех, кто хочет добавить в рацион источник
                    полезных жирных кислот, поддержать сердце, сосуды и общий
                    тонус организма.
                  </p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Хит продаж
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-neutral-50 p-4">
                <p className="text-sm font-semibold">Для чего выбирают</p>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li>• Для ежедневного рациона</li>
                  <li>• Для салатов, каш и готовых блюд</li>
                  <li>• Для тех, кто следит за питанием</li>
                  <li>• Для мягкой поддержки иммунитета</li>
                </ul>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <span>250 мл</span>
                  <span className="font-semibold">990 ₽</span>
                </div>
                <div className="flex justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <span>500 мл</span>
                  <span className="font-semibold">1790 ₽</span>
                </div>
                <div className="flex justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <span>1 л</span>
                  <span className="font-semibold">3290 ₽</span>
                </div>
              </div>

              <a
                href="#order"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Заказать льняное масло
              </a>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <img
                src="/images/pumpkin.jpg"
                alt="Тыквенное масло"
                className="mb-5 h-64 w-full rounded-2xl object-cover"
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">Тыквенное масло</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Более насыщенное по вкусу масло для тех, кто ищет не только
                    пользу, но и яркий аромат. Часто выбирают для поддержки ЖКТ,
                    печени и разнообразия питания.
                  </p>
                </div>
                <span className="rounded-full bg-lime-50 px-3 py-1 text-xs font-semibold text-lime-700">
                  Насыщенный вкус
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-neutral-50 p-4">
                <p className="text-sm font-semibold">Для чего выбирают</p>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li>• Для поддержки печени и ЖКТ</li>
                  <li>• Для салатов и овощных блюд</li>
                  <li>• Для насыщенного вкуса без добавок</li>
                  <li>• Для тех, кто хочет более яркий аромат</li>
                </ul>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <span>250 мл</span>
                  <span className="font-semibold">1290 ₽</span>
                </div>
                <div className="flex justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <span>500 мл</span>
                  <span className="font-semibold">2190 ₽</span>
                </div>
                <div className="flex justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <span>1 л</span>
                  <span className="font-semibold">3990 ₽</span>
                </div>
              </div>

              <a
                href="#order"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
              >
                Заказать тыквенное масло
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="border-y border-neutral-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Почему заказывают у нас
            </h2>
            <p className="mt-3 text-neutral-600">
              Мы не продаём безликий массовый продукт. Смысл в свежести,
              натуральности и понятном составе.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm">
              <h3 className="text-lg font-semibold">Свежий отжим</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Готовим под заказ, а не держим месяцами на полке.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm">
              <h3 className="text-lg font-semibold">Без добавок</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Без ароматизаторов, усилителей и лишней химии.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm">
              <h3 className="text-lg font-semibold">Понятный состав</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Клиент понимает, что он покупает и зачем это нужно.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm">
              <h3 className="text-lg font-semibold">Быстрая доставка</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                По Москве и МО, чтобы продукт попадал к вам свежим.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Как это работает</h2>
            <div className="mt-5 space-y-3 text-sm text-neutral-700">
              <p>1. Вы выбираете масло, объём и количество</p>
              <p>2. Оставляете заявку на сайте</p>
              <p>3. Мы принимаем заказ в работу</p>
              <p>4. Связываемся для подтверждения</p>
              <p>5. Отжимаем и доставляем в течение 24 часов</p>
            </div>

            <a
              href="#order"
              className="mt-6 inline-flex rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              Перейти к заказу
            </a>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Доставка и оплата</h2>
            <div className="mt-5 space-y-3 text-sm text-neutral-700">
              <p>• Доставка по Москве и Московской области</p>
              <p>• Заказ принимается сразу после оформления формы</p>
              <p>• Сейчас доступна заявка через сайт и подтверждение вручную</p>
              <p>• Оплата при получении, онлайн-оплата скоро появится</p>
            </div>

            <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
              После оформления заявки вы сразу увидите подтверждение, что заказ
              принят в работу.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/5 p-8">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Готовы оформить заказ?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 md:text-base">
                Выберите масло, объём и оставьте контакты. Мы примем заказ,
                свяжемся для подтверждения и запустим его в работу.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                href="#order"
                className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-amber-400"
              >
                Оформить заказ сейчас
              </a>
              <a
                href="#catalog"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Выбрать масло
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="order" className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">Оформить заказ</h2>
            <p className="mt-3 text-neutral-600">
              Оставьте заявку, и мы сразу примем заказ в работу. После
              оформления вы увидите подтверждение на сайте.
            </p>
          </div>

          <div className="relative z-20">
            <OrderForm />
          </div>
        </div>
      </section>
    </main>
  )
}