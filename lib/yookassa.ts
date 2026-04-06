import crypto from "crypto"

type CreatePaymentParams = {
  amount: number
  orderNumber: string
  description?: string
  siteUrl?: string
}

type CreatePaymentResult = {
  paymentId: string
  paymentUrl: string
  isFake: boolean
}

function normalizeSiteUrl(rawSiteUrl?: string) {
  const fallback = "http://localhost:3000"
  const value = (rawSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || fallback).trim()

  try {
    const url = new URL(value)

    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      url.protocol = "http:"
    }

    return url.toString().replace(/\/+$/, "")
  } catch {
    return fallback
  }
}

function buildSuccessUrl(siteUrl: string, orderNumber: string) {
  return `${siteUrl}/success?order=${encodeURIComponent(orderNumber)}`
}

export async function createPayment({
  amount,
  orderNumber,
  description,
  siteUrl,
}: CreatePaymentParams): Promise<CreatePaymentResult> {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl)

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Некорректная сумма платежа")
  }

  if (!orderNumber || typeof orderNumber !== "string") {
    throw new Error("Некорректный номер заказа")
  }

  const shopId = process.env.YOOKASSA_SHOP_ID
  const secretKey = process.env.YOOKASSA_SECRET_KEY

  // Fallback для локальной разработки или если ключи не заданы
  if (!shopId || !secretKey) {
    return {
      paymentId: `fake_${Date.now()}`,
      paymentUrl: `/fake-payment?order=${encodeURIComponent(orderNumber)}`,
      isFake: true,
    }
  }

  const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64")
  const idempotenceKey = crypto.randomUUID()

  const payload = {
    amount: {
      value: amount.toFixed(2),
      currency: "RUB",
    },
    capture: true,
    confirmation: {
      type: "redirect",
      return_url: buildSuccessUrl(normalizedSiteUrl, orderNumber),
    },
    description: description || `Оплата заказа ${orderNumber}`,
    metadata: {
      orderNumber,
      source: "zhito",
      paid: "false",
    },
  }

  let response: Response

  try {
    response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
        "Idempotence-Key": idempotenceKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
  } catch (error) {
    console.error("YOOKASSA NETWORK ERROR:", error)
    throw new Error("Не удалось связаться с ЮKassa")
  }

  let data: any = null

  try {
    data = await response.json()
  } catch (error) {
    console.error("YOOKASSA INVALID JSON:", error)
    throw new Error("ЮKassa вернула некорректный ответ")
  }

  if (!response.ok) {
    console.error("YOOKASSA ERROR:", data)

    const errorMessage =
      data?.description ||
      data?.error ||
      data?.type ||
      "Ошибка создания платежа в ЮKassa"

    throw new Error(errorMessage)
  }

  const paymentId = data?.id
  const paymentUrl = data?.confirmation?.confirmation_url

  if (!paymentId || !paymentUrl) {
    console.error("YOOKASSA INVALID RESPONSE SHAPE:", data)
    throw new Error("ЮKassa не вернула ссылку на оплату")
  }

  return {
    paymentId: String(paymentId),
    paymentUrl: String(paymentUrl),
    isFake: false,
  }
}