import crypto from "crypto"

type CreatePaymentParams = {
  amount: number
  orderNumber: string
  description?: string
  siteUrl?: string
}

function normalizeSiteUrl(rawSiteUrl?: string) {
  const fallback = "http://localhost:3000"
  const value = (rawSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || fallback).replace(/\/+$/, "")

  try {
    const url = new URL(value)

    // Для localhost всегда используем http, а не https
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      url.protocol = "http:"
    }

    return url.toString().replace(/\/+$/, "")
  } catch {
    return fallback
  }
}

export async function createPayment({
  amount,
  orderNumber,
  description,
  siteUrl,
}: CreatePaymentParams) {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl)

  const shopId = process.env.YOOKASSA_SHOP_ID
  const secretKey = process.env.YOOKASSA_SECRET_KEY

  // Пока нет реальных ключей — работаем через fake payment
  if (!shopId || !secretKey) {
    return {
      paymentId: `fake_${Date.now()}`,
      paymentUrl: `/fake-payment?order=${encodeURIComponent(orderNumber)}`,
      isFake: true,
    }
  }

  const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64")
  const idempotenceKey = crypto.randomUUID()

  const response = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
      "Idempotence-Key": idempotenceKey,
    },
    body: JSON.stringify({
      amount: {
        value: amount.toFixed(2),
        currency: "RUB",
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: `${normalizedSiteUrl}/success?order=${encodeURIComponent(orderNumber)}`,
      },
      description: description || `Оплата заказа ${orderNumber}`,
      metadata: {
        orderNumber,
      },
    }),
    cache: "no-store",
  })

  const data = await response.json()

  if (!response.ok) {
    console.error("YOOKASSA ERROR:", data)
    throw new Error(data?.description || "Ошибка создания платежа в ЮKassa")
  }

  return {
    paymentId: data.id as string,
    paymentUrl: data.confirmation?.confirmation_url as string,
    isFake: false,
  }
}