type FakePaymentPageProps = {
  searchParams?: {
    order?: string
  }
}

export default function FakePaymentPage({
  searchParams,
}: FakePaymentPageProps) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Оплата (тест)</h1>
      <p>Заказ № {searchParams?.order || "не найден"}</p>
      <p>💳 Здесь будет ЮKassa</p>
      <p style={{ color: "green", fontWeight: "bold" }}>
        Оплата будет доступна после подключения ЮKassa
      </p>
    </div>
  )
}