type FakePaymentPageProps = {
  searchParams: Promise<{
    order?: string
  }>
}

export default async function FakePaymentPage({
  searchParams,
}: FakePaymentPageProps) {
  const params = await searchParams

  return (
    <div style={{ padding: 40 }}>
      <h1>Оплата (тест)</h1>
      <p>Заказ № {params.order || "не найден"}</p>
      <p>💳 Здесь будет ЮKassa</p>
      <p style={{ color: "green", fontWeight: "bold" }}>
        Оплата будет доступна после подключения ЮKassa
      </p>
    </div>
  )
}