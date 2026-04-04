"use client"

import { useMemo, useState } from "react"

const catalog: Record<string, Record<string, number>> = {
  "Льняное масло": {
    "250 мл": 700,
    "500 мл": 1200,
    "1 л": 2200,
  },
  "Подсолнечное масло": {
    "250 мл": 500,
    "500 мл": 900,
    "1 л": 1700,
  },
  "Тыквенное масло": {
    "250 мл": 900,
    "500 мл": 1600,
    "1 л": 3000,
  },
}

const productDescriptions: Record<string, string> = {
  "Льняное масло":
    "Подходит для ежедневного рациона, салатов и тех, кто хочет добавить в питание полезные жирные кислоты.",
  "Подсолнечное масло":
    "Мягкий и понятный вкус на каждый день. Хорошо подходит для привычного питания и свежих блюд.",
  "Тыквенное масло":
    "Более насыщенный вкус и аромат. Часто выбирают для салатов, овощных блюд и разнообразия рациона.",
}

type CartItem = {
  id: string
  product: string
  volume: string
  amount: number
  unitPrice: number
  totalPrice: number
}

const products = Object.keys(catalog)
const initialProduct = products[0]
const initialVolume = Object.keys(catalog[initialProduct])[0]

function formatRussianPhone(value: string) {
  const digits = value.replace(/\D/g, "")

  if (!digits) return ""

  let normalized = digits

  if (normalized[0] === "8") {
    normalized = "7" + normalized.slice(1)
  } else if (normalized[0] !== "7") {
    normalized = "7" + normalized
  }

  normalized = normalized.slice(0, 11)

  const country = normalized[0]
  const code = normalized.slice(1, 4)
  const first = normalized.slice(4, 7)
  const second = normalized.slice(7, 9)
  const third = normalized.slice(9, 11)

  let result = `+${country}`

  if (code) result += ` (${code}`
  if (code.length === 3) result += `)`
  if (first) result += ` ${first}`
  if (second) result += `-${second}`
  if (third) result += `-${third}`

  return result
}

function normalizePhoneForSubmit(value: string) {
  const digits = value.replace(/\D/g, "")

  if (!digits) return ""

  let normalized = digits

  if (normalized[0] === "8") {
    normalized = "7" + normalized.slice(1)
  } else if (normalized[0] !== "7") {
    normalized = "7" + normalized
  }

  return normalized.slice(0, 11)
}

export default function OrderForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [product, setProduct] = useState(initialProduct)
  const [volume, setVolume] = useState(initialVolume)
  const [amount, setAmount] = useState(1)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const volumes = useMemo(() => {
    return Object.keys(catalog[product] || {})
  }, [product])

  const unitPrice = useMemo(() => {
    return catalog[product]?.[volume] || 0
  }, [product, volume])

  const previewTotalPrice = useMemo(() => {
    return unitPrice * amount
  }, [unitPrice, amount])

  const cartTotalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
  }, [cartItems])

  function handleProductChange(nextProduct: string) {
    const nextVolumes = Object.keys(catalog[nextProduct] || {})
    setProduct(nextProduct)
    setVolume(nextVolumes[0] || "")
  }

  function decreaseAmount() {
    if (loading) return
    setAmount((prev) => Math.max(1, prev - 1))
  }

  function increaseAmount() {
    if (loading) return
    setAmount((prev) => prev + 1)
  }

  function handleAmountChange(value: string) {
    if (loading) return

    const digitsOnly = value.replace(/\D/g, "")

    if (!digitsOnly) {
      setAmount(1)
      return
    }

    setAmount(Math.max(1, Number(digitsOnly)))
  }

  function handlePhoneChange(value: string) {
    if (loading) return
    setPhone(formatRussianPhone(value))
  }

  function addToCart() {
    if (loading) return

    const currentUnitPrice = catalog[product]?.[volume]

    if (!currentUnitPrice) {
      setError("Не удалось добавить товар")
      return
    }

    setError("")
    setSuccessMessage("")

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.product === product && item.volume === volume
      )

      if (existingItem) {
        return prev.map((item) => {
          if (item.id !== existingItem.id) return item

          const nextAmount = item.amount + amount

          return {
            ...item,
            amount: nextAmount,
            totalPrice: nextAmount * item.unitPrice,
          }
        })
      }

      const newItem: CartItem = {
        id: `${product}-${volume}-${Date.now()}`,
        product,
        volume,
        amount,
        unitPrice: currentUnitPrice,
        totalPrice: currentUnitPrice * amount,
      }

      return [...prev, newItem]
    })

    setAmount(1)
  }

  function removeFromCart(id: string) {
    if (loading) return
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return

    setError("")
    setSuccessMessage("")
    setLoading(true)

    try {
      const normalizedPhone = normalizePhoneForSubmit(phone)

      if (normalizedPhone.length !== 11) {
        throw new Error("Введите корректный номер телефона РФ")
      }

      if (!cartItems.length) {
        throw new Error("Добавьте хотя бы один товар в заказ")
      }

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalizedPhone,
          items: cartItems.map((item) => ({
            product: item.product,
            volume: item.volume,
            amount: item.amount,
          })),
        }),
      })

      const data = await res.json()
      console.log("ORDER RESPONSE:", data)

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Ошибка оформления заказа")
      }

      setSuccessMessage("Заказ принят в работу. Перенаправляем дальше...")

      setTimeout(() => {
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl
          return
        }

        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 1200)
    } catch (err) {
      console.error("ORDER SUBMIT ERROR:", err)
      setError(
        err instanceof Error
          ? err.message
          : "Не удалось оформить заказ. Попробуйте ещё раз."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative mx-auto w-full max-w-3xl rounded-[32px] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
            Оформить заказ
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Соберите заказ из нескольких масел, проверьте состав и отправьте
            заявку одним разом.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Свежий отжим под заказ
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">
              Имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
              className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-800">
              Телефон
            </label>
            <input
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="+7 (999) 123-45-67"
              className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
              required
              disabled={loading}
              maxLength={18}
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-neutral-800">
            Выберите масло
          </label>

          <div className="grid gap-3 md:grid-cols-3">
            {products.map((item) => {
              const isActive = item === product

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleProductChange(item)}
                  disabled={loading}
                  className={`rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                      : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <div className="text-sm font-semibold">{item}</div>
                  <div
                    className={`mt-2 text-xs leading-5 ${
                      isActive ? "text-neutral-200" : "text-neutral-600"
                    }`}
                  >
                    {productDescriptions[item]}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-neutral-800">
            Объём
          </label>

          <div className="flex flex-wrap gap-3">
            {volumes.map((item) => {
              const isActive = item === volume

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setVolume(item)}
                  disabled={loading}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-amber-500 text-neutral-900 shadow-sm"
                      : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-neutral-800">
            Количество
          </label>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Уменьшить количество"
                onClick={decreaseAmount}
                disabled={loading}
                className="h-12 w-12 touch-manipulation rounded-2xl border border-neutral-300 bg-white text-xl font-medium transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                −
              </button>

              <input
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                disabled={loading}
                className="w-28 rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-center text-lg font-semibold text-neutral-900 outline-none transition focus:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                aria-label="Увеличить количество"
                onClick={increaseAmount}
                disabled={loading}
                className="h-12 w-12 touch-manipulation rounded-2xl border border-neutral-300 bg-white text-xl font-medium transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                +
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 5].map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  disabled={loading}
                  onClick={() => setAmount(quickAmount)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    amount === quickAmount
                      ? "bg-neutral-900 text-white"
                      : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {quickAmount} шт.
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-neutral-100 p-5">
            <p className="text-sm font-semibold text-neutral-900">
              Текущая позиция
            </p>
            <div className="mt-3 space-y-2 text-sm text-neutral-700">
              <div className="flex items-center justify-between gap-4">
                <span>Масло</span>
                <span className="font-medium text-neutral-900">{product}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Объём</span>
                <span className="font-medium text-neutral-900">{volume}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Количество</span>
                <span className="font-medium text-neutral-900">{amount} шт.</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between text-sm text-neutral-600">
              <span>Цена за 1 шт.</span>
              <span>{unitPrice} ₽</span>
            </div>

            <div className="mt-3 border-t border-neutral-200 pt-3">
              <div className="flex items-center justify-between text-lg font-semibold text-neutral-900">
                <span>Сумма позиции</span>
                <span>{previewTotalPrice} ₽</span>
              </div>
            </div>

            <button
              type="button"
              onClick={addToCart}
              disabled={loading}
              className="mt-4 w-full rounded-2xl bg-amber-500 px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Добавить в заказ
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-neutral-900">
              Ваш заказ
            </p>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-700 shadow-sm">
              {cartItems.length} поз.
            </span>
          </div>

          {cartItems.length ? (
            <div className="mt-4 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-neutral-200 bg-white p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {item.product}
                      </p>
                      <p className="mt-1 text-sm text-neutral-600">
                        {item.volume} · {item.amount} шт.
                      </p>
                      <p className="mt-1 text-sm text-neutral-600">
                        {item.unitPrice} ₽ за 1 шт.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                      <p className="text-base font-semibold text-neutral-900">
                        {item.totalPrice} ₽
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        disabled={loading}
                        className="text-sm font-medium text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                <div className="flex items-center justify-between text-lg font-semibold text-neutral-900">
                  <span>Итого по заказу</span>
                  <span>{cartTotalPrice} ₽</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-neutral-500">
              Пока ничего не добавлено. Выберите масло, объём и нажмите
              «Добавить в заказ».
            </p>
          )}
        </div>

        {successMessage ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            {successMessage}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading || !cartItems.length}
          className="w-full touch-manipulation rounded-2xl bg-black px-4 py-4 text-base font-medium text-white transition hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Оформляем заказ..." : "Оформить весь заказ"}
        </button>
      </form>
    </section>
  )
}