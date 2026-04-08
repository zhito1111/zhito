import OrderForm from "@/components/OrderForm"

const oils = [
  {
    name: "Льняное масло",
    image: "/images/linseed-new.jpg",
    badge: "Хит продаж",
    badgeClass: "bg-amber-50 text-amber-700",
    description:
      "Мягкое по вкусу масло для ежедневного рациона. Его выбирают те, кто хочет добавить в питание источник полезных жирных кислот и сделать рацион более насыщенным без сложных схем и добавок.",
    points: [
      "Для салатов, каш и готовых блюд",
      "Для ежедневного употребления",
      "Для тех, кто следит за питанием",
      "Для мягкой поддержки общего тонуса",
    ],
    prices: [
      { volume: "250 мл", price: "700 ₽" },
      { volume: "500 мл", price: "1200 ₽" },
      { volume: "1 л", price: "2200 ₽" },
    ],
    buttonClass: "bg-neutral-900 text-white hover:bg-neutral-800",
    buttonText: "Заказать льняное масло",
  },
  {
    name: "Тыквенное масло",
    image: "/images/pumpkin.jpg",
    badge: "Насыщенный вкус",
    badgeClass: "bg-lime-50 text-lime-700",
    description:
      "Более яркое и насыщенное масло с характерным ароматом. Подходит тем, кто хочет не только пользу, но и выраженный вкус в рационе, особенно в овощных блюдах и тёплых салатах.",
    points: [
      "Для поддержки ЖКТ и печени",
      "Для салатов и овощных блюд",
      "Для яркого вкуса без добавок",
      "Для тех, кто любит насыщенный аромат",
    ],
    prices: [
      { volume: "250 мл", price: "900 ₽" },
      { volume: "500 мл", price: "1600 ₽" },
      { volume: "1 л", price: "3000 ₽" },
    ],
    buttonClass: "bg-amber-600 text-white hover:bg-amber-700",
    buttonText: "Заказать тыквенное масло",
  },
  {
    name: "Подсолнечное масло",
    image: "/images/sunflower.jpg",
    badge: "Понятный вкус",
    badgeClass: "bg-orange-50 text-orange-700",
    description:
      "Универсальный вариант на каждый день. Подходит тем, кто хочет начать с привычного вкуса, но выбрать более свежий и понятный по составу продукт без лишней промышленной обработки.",
    points: [
      "Для ежедневного стола",
      "Для салатов и готовых блюд",
      "Для семьи и базового рациона",
      "Для тех, кто любит мягкий вкус",
    ],
    prices: [
      { volume: "250 мл", price: "10 ₽" },
      { volume: "500 мл", price: "900 ₽" },
      { volume: "1 л", price: "1700 ₽" },
    ],
    buttonClass:
      "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100",
    buttonText: "Заказать подсолнечное масло",
  },
  {
    name: "Кунжутное масло",
    image: "/images/sesame.jpg",
    badge: "Ореховый вкус",
    badgeClass: "bg-stone-100 text-stone-800",
    description:
      "Насыщенное масло с ярким ореховым вкусом и выразительным ароматом. Часто выбирают для салатов, азиатских блюд и тех случаев, когда хочется сделать рацион интереснее без лишней сложности.",
    points: [
      "Для салатов и заправок",
      "Для азиатских блюд",
      "Для яркого орехового вкуса",
      "Для тех, кто любит более насыщенные продукты",
    ],
    prices: [
      { volume: "250 мл", price: "950 ₽" },
      { volume: "500 мл", price: "1700 ₽" },
      { volume: "1 л", price: "3200 ₽" },
    ],
    buttonClass: "bg-neutral-900 text-white hover:bg-neutral-800",
    buttonText: "Заказать кунжутное масло",
  },
  {
    name: "Масло расторопши",
    image: "/images/milk-thistle.jpg",
    badge: "Мягкий вкус",
    badgeClass: "bg-emerald-50 text-emerald-700",
    description:
      "Более спокойное по вкусу масло для тех, кто хочет добавить новый продукт в рацион без резких вкусовых акцентов. Удобный вариант для ежедневного использования и более мягкого сценария питания.",
    points: [
      "Для ежедневного употребления",
      "Для салатов и готовых блюд",
      "Для мягкого вкуса без резкости",
      "Для спокойного и понятного рациона",
    ],
    prices: [
      { volume: "250 мл", price: "800 ₽" },
      { volume: "500 мл", price: "1400 ₽" },
      { volume: "1 л", price: "2600 ₽" },
    ],
    buttonClass: "bg-emerald-600 text-white hover:bg-emerald-700",
    buttonText: "Заказать масло расторопши",
  },
  {
    name: "Кокосовое масло",
    image: "/images/coconut.jpg",
    badge: "Универсальный формат",
    badgeClass: "bg-sky-50 text-sky-700",
    description:
      "Лёгкий и более универсальный вариант, который используют в рационе те, кто любит мягкий вкус и простые понятные продукты. Подходит для каш, напитков, готовых блюд и повседневного использования.",
    points: [
      "Для каш и готовых блюд",
      "Для напитков и повседневного рациона",
      "Для мягкого вкуса",
      "Для универсального использования",
    ],
    prices: [
      { volume: "250 мл", price: "600 ₽" },
      { volume: "500 мл", price: "1100 ₽" },
      { volume: "1 л", price: "2000 ₽" },
    ],
    buttonClass: "bg-sky-600 text-white hover:bg-sky-700",
    buttonText: "Заказать кокосовое масло",
  },
  {
    name: "Масло чёрного тмина",
    image: "/images/black-cumin.jpg",
    badge: "Выразительный вкус",
    badgeClass: "bg-purple-50 text-purple-700",
    description:
      "Интенсивное масло с характерным вкусом и более премиальным ощущением продукта. Обычно его выбирают в небольших объёмах те, кто ищет не базовый вариант, а более функциональный и акцентный продукт.",
    points: [
      "Для небольших дозировок",
      "Для тех, кто ищет функциональный продукт",
      "Для насыщенного и выраженного вкуса",
      "Для более премиального выбора",
    ],
    prices: [
      { volume: "250 мл", price: "1200 ₽" },
      { volume: "500 мл", price: "2100 ₽" },
      { volume: "1 л", price: "3900 ₽" },
    ],
    buttonClass: "bg-purple-600 text-white hover:bg-purple-700",
    buttonText: "Заказать масло чёрного тмина",
  },
]

const productionSteps = [
  {
    title: "1. Отбираем сырьё",
    text: "Используем качественные семена и подходим к сырью внимательно: вкус и итоговое качество начинаются именно с него.",
    image: "/images/production-1.jpg",
    alt: "Сырьё для производства масла",
  },
  {
    title: "2. Делаем холодный отжим",
    text: "Работаем небольшими партиями, чтобы сохранить вкус, аромат и естественные свойства продукта без лишнего перегрева.",
    image: "/images/production-2.jpg",
    alt: "Процесс холодного отжима масла",
  },
  {
    title: "3. Разливаем малыми партиями",
    text: "Не штампуем тонны товара впрок. Разлив и подготовка идут под заказ, чтобы продукт не лежал месяцами без смысла.",
    image: "/images/production-3.jpg",
    alt: "Розлив масла по бутылкам",
  },
]

const trustPoints = [
  {
    title: "Свежий отжим",
    text: "Масло не лежит долго на складе. Работаем под заказ и малыми партиями.",
  },
  {
    title: "Без лишних добавок",
    text: "Без ароматизаторов, усилителей вкуса и всего того, что обычно маскирует посредственный продукт.",
  },
  {
    title: "Понятный состав",
    text: "Клиент видит, что покупает: конкретный продукт, объём, вкус и назначение без маркетингового тумана.",
  },
  {
    title: "Ручной контроль",
    text: "На каждом этапе важна аккуратность: от сырья и розлива до общения с клиентом и подтверждения заказа.",
  },
  {
    title: "Быстрая доставка",
    text: "По Москве и области, чтобы масло приезжало свежим и не превращалось в просто красивую банку на витрине.",
  },
  {
    title: "Живой сервис",
    text: "После заказа мы связываемся с вами, уточняем детали и подтверждаем доставку без пустых ожиданий.",
  },
]

const uses = [
  "Добавлять в салаты и тёплые овощные блюда",
  "Использовать с кашами и гарнирами",
  "Включать в ежедневный рацион как источник полезных жиров",
  "Выбирать как более осознанную альтернативу массовому продукту",
]

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-gradient-to-b from-amber-50 via-orange-50/40 to-neutral-50 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center md:gap-10">
          <div>
            <span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-1 text-sm font-medium text-amber-700 shadow-sm">
              Свежий отжим под заказ
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Натуральное масло холодного отжима для ежедневного рациона
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
              Мы делаем масло небольшими партиями, чтобы вы получали не просто
              красивую бутылку, а свежий продукт с насыщенным вкусом, ароматом и
              понятным составом. Без лишних добавок, без долгого хранения, без
              ощущения, что это ещё один безликий товар с полки.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
              Льняное, тыквенное, подсолнечное, кунжутное, кокосовое масло,
              масло расторопши и чёрного тмина подходят для разных сценариев:
              от ежедневного питания до более насыщенного и функционального
              выбора. Мы принимаем заказ, подтверждаем детали и запускаем его в
              работу вручную, чтобы вы получали свежий продукт, а не то, что
              случайно залежалось.
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
                href="#production"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
              >
                Как мы производим
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Без лишних добавок</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Только понятный и натуральный продукт
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Свежий отжим</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Готовим под заказ, а не впрок
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">Доставка 24 часа</p>
                <p className="mt-1 text-sm text-neutral-600">
                  По Москве и Московской области
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-amber-100 bg-white p-4 shadow-lg sm:rounded-[32px] sm:p-5">
            <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-amber-100 via-orange-50 to-lime-50 p-4 sm:rounded-[28px] sm:p-6">
              <div className="rounded-[22px] border border-white/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,255,255,0.35))] p-4 shadow-inner sm:rounded-[24px] sm:p-6">
                <div className="flex flex-col gap-5 rounded-[18px] border border-amber-200/60 bg-white/70 p-4 backdrop-blur sm:rounded-[20px] sm:gap-6 sm:p-6">
                  <div>
                    <img
                      src="/images/kitchen.jpg"
                      alt="Масло холодного отжима"
                      className="mb-4 h-56 w-full rounded-2xl object-cover sm:h-64"
                    />
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 sm:text-sm">
                      Небольшие партии и ручной подход
                    </p>
                    <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-2xl">
                      Масло, которое покупают за вкус, свежесть и доверие
                    </h2>
                    <p className="mt-3 text-base leading-7 text-neutral-600 sm:text-sm sm:leading-6">
                      Подходит для ежедневного рациона, салатов, каш, тёплых
                      блюд и тех случаев, когда хочется выбирать продукт
                      осознанно, а не по громким обещаниям на этикетке.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-amber-200 bg-white px-4 py-3 text-base leading-7 sm:text-sm sm:leading-6">
                      Льняное масло → для ежедневного рациона и мягкой поддержки
                      питания
                    </div>
                    <div className="rounded-2xl border border-amber-200 bg-white px-4 py-3 text-base leading-7 sm:text-sm sm:leading-6">
                      Тыквенное масло → для насыщенного вкуса и более яркого
                      рациона
                    </div>
                    <div className="rounded-2xl border border-amber-200 bg-white px-4 py-3 text-base leading-7 sm:text-sm sm:leading-6">
                      Кунжутное и кокосовое масла → для тех, кто хочет больше
                      вариантов и вкусов в рационе
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

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Что значит сыродавленное масло
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Для клиента это не про модное слово, а про вполне понятную вещь:
              масло сохраняет естественный вкус, аромат и воспринимается как
              живой продукт, а не как ещё одна стандартная бутылка из
              супермаркета.
            </p>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Мы не делаем ставку на агрессивный маркетинг. Ставка здесь в
              другом: небольшие партии, свежесть, понятное происхождение и
              внятный сценарий заказа. Вы оставляете заявку, мы подтверждаем её
              вручную и запускаем продукт в работу.
            </p>
            <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900">
                Это хороший формат для тех, кто хочет:
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  Добавить в рацион более натуральный продукт
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  Получать масло без долгого складского хранения
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  Понимать, что именно он заказывает и зачем
                </div>
                <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
                  Выбирать вкус и пользу, а не только этикетку
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-neutral-200 bg-white p-4 shadow-sm">
            <img
              src="/images/kitchen.jpg"
              alt="Использование масла в готовых блюдах"
              className="h-[420px] w-full rounded-[28px] object-cover"
            />
          </div>
        </div>
      </section>

      <section
        id="production"
        className="border-y border-neutral-200 bg-white px-4 py-10 sm:px-6 sm:py-14"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Как проходит производство
            </h2>
            <p className="mt-3 text-neutral-600">
              Мы хотим, чтобы клиент видел не только цену и кнопку заказа, но и
              сам путь продукта. Это повышает доверие лучше, чем любые красивые
              лозунги, которые так любят люди, когда им пытаются что-то продать.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {productionSteps.map((step) => (
              <div
                key={step.title}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 shadow-sm"
              >
                <img
                  src={step.image}
                  alt={step.alt}
                  className="h-56 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">Ассортимент</h2>
            <p className="mt-3 text-neutral-600">
              Выберите масло под свой вкус и сценарий использования: для
              ежедневного питания, более насыщенных блюд, мягкой поддержки
              рациона и замены привычного магазинного продукта на более свежий и
              понятный вариант.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {oils.map((oil) => (
              <div
                key={oil.name}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={oil.image}
                  alt={oil.name}
                  className="mb-5 h-64 w-full rounded-2xl object-cover"
                />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{oil.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {oil.description}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${oil.badgeClass}`}
                  >
                    {oil.badge}
                  </span>
                </div>

                <div className="mt-5 rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold">Для чего выбирают</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                    {oil.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  {oil.prices.map((price) => (
                    <div
                      key={price.volume}
                      className="flex justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3"
                    >
                      <span>{price.volume}</span>
                      <span className="font-semibold">{price.price}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#order"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${oil.buttonClass}`}
                >
                  {oil.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="benefits"
        className="border-y border-neutral-200 bg-white px-4 py-10 sm:px-6 sm:py-14"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Почему заказывают у нас
            </h2>
            <p className="mt-3 text-neutral-600">
              Здесь важна не только бутылка масла, но и весь пользовательский
              опыт: понятный продукт, живой контакт, свежесть, аккуратная
              доставка и ощущение, что за заказом стоят реальные люди, а не
              очередной ленивый шаблон с маркетплейса.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Где и как использовать</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Наши масла чаще всего берут не ради абстрактной «пользы», а для
              вполне нормальной жизни: чтобы еда была вкуснее, рацион понятнее,
              а выбор продукта не выглядел как игра в маркетинговую лотерею.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-neutral-700">
              {uses.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
              Лучше всего использовать масло в готовых блюдах, салатах и
              повседневном рационе, где важны вкус, аромат и свежесть продукта.
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Как это работает</h2>
            <div className="mt-5 space-y-3 text-sm text-neutral-700">
              <p>1. Вы выбираете масло, объём и количество</p>
              <p>2. Оставляете заявку на сайте</p>
              <p>3. Мы сразу принимаем заказ в работу</p>
              <p>4. Связываемся с вами для подтверждения деталей</p>
              <p>5. Готовим, упаковываем и передаём заказ на доставку</p>
            </div>

            <a
              href="#order"
              className="mt-6 inline-flex rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              Перейти к заказу
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <img
              src="/images/production-1.jpg"
              alt="Сырьё для масла"
              className="h-72 w-full rounded-[28px] object-cover"
            />
            <img
              src="/images/production-2.jpg"
              alt="Производство масла"
              className="h-72 w-full rounded-[28px] object-cover"
            />
            <img
              src="/images/kitchen.jpg"
              alt="Масло в сервировке"
              className="h-72 w-full rounded-[28px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Доставка и оплата</h2>
            <div className="mt-5 space-y-3 text-sm text-neutral-700">
              <p>• Доставка по Москве и Московской области</p>
              <p>• Заказ принимается сразу после оформления формы</p>
              <p>• Мы связываемся с вами для подтверждения деталей</p>
              <p>• Сейчас сайт работает в формате MVP с ручным подтверждением</p>
              <p>• Онлайн-оплата скоро появится</p>
            </div>

            <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
              После оформления заявки вы сразу увидите подтверждение на сайте, а
              затем мы свяжемся с вами, чтобы согласовать заказ и доставку.
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-900 p-6 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">
              Почему лучше заказать сейчас
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-300">
              Когда продукт делают небольшими партиями, ключевая ценность не в
              бесконечном выборе, а в свежести и понятном процессе. Вы
              оставляете заявку, а мы уже дальше берём на себя подтверждение,
              упаковку и передачу заказа.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-200">
                Свежий продукт без долгого хранения
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-200">
                Понятный состав и живой контакт после заявки
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-200">
                Подходит для регулярного рациона и осознанного выбора
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
                Готовы оформить заказ?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 md:text-base">
                Выберите масло, объём и оставьте контакты. Мы примем заявку,
                свяжемся с вами для подтверждения и запустим заказ в работу.
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
                href="#production"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Посмотреть производство
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="order" className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">Оформить заказ</h2>
            <p className="mt-3 text-neutral-600">
              Оставьте заявку, и мы сразу примем заказ в работу. После
              оформления вы увидите подтверждение на сайте, а затем свяжемся с
              вами для уточнения деталей доставки.
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