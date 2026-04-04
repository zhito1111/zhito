"use client"

import { useEffect, useMemo, useState } from "react"

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

const products = Object.keys(catalog)
const initialProduct = products[0]
const initialVolume = Object.keys(catalog[initialProduct])[0]

export default function OrderForm() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [product, setProduct] = useState(initialProduct)
  const [volume, setVolume] = useState(initialVolume)
  const [amount, setAmount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setMounted(true)
    console.log("ORDER FORM HYDRATED")
  }, [])

  const volumes = useMemo(() => {
    return Object.keys(catalog[product] || {})
  }, [product])

  const unitPrice = useMemo(() => {
    return catalog[product]?.[volume] || 0
  }, [product, volume])

  const totalPrice = useMemo(() => {
    return unitPrice * amount
  }, [unitPrice, amount])

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return

    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          product,
          volume,
          amount,
        }),
      })

      const data = await res.json()
      console.log("ORDER RESPONSE:", data)

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Ошибка оформления заказа")
      }

      if (!data.paymentUrl) {
        throw new Error("Не получена ссылка на оплату")
      }

      window.location.href = data.paymentUrl
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
    <section className="relative mx-auto w-full max-w-xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-4 rounded-xl bg-neutral-100 px-3 py-2 text-xs text-neutral-700">
        React: {mounted ? "активен" : "не активен"}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          Оформить заказ
        </h2>
        <p className="mt-2 text-neutral-600">
          Выберите масло, объём и количество. Сумма пересчитывается автоматически.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Имя
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
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
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 123-45-67"
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Товар
          </label>
          <select
            value={product}
            onChange={(e) => handleProductChange(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {products.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Объём
          </label>
          <select
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {volumes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Количество
          </label>

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
              className="flex-1 rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-center text-lg font-semibold text-neutral-900 outline-none focus:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
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
        </div>

        <div className="rounded-2xl bg-neutral-100 p-4">
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>Цена за 1 шт.</span>
            <span>{unitPrice} ₽</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-lg font-semibold text-neutral-900">
            <span>Итого</span>
            <span>{totalPrice} ₽</span>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full touch-manipulation rounded-2xl bg-black px-4 py-3 font-medium text-white transition hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Оформляем заказ..." : "Перейти к оплате"}
        </button>
      </form>
    </section>
  )
}