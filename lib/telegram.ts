export async function sendTelegramMessage(text: string) {
  const token = process.env.TG_TOKEN
  const chatId = process.env.TG_CHAT_ID

  if (!token || !chatId) {
    console.warn("TG_TOKEN или TG_CHAT_ID не заданы")
    return { ok: false, skipped: true }
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        cache: "no-store",
      }
    )

    const data = await response.json()

    if (!response.ok || !data.ok) {
      console.error("TELEGRAM SEND FAILED:", data)
      return { ok: false, error: data }
    }

    return { ok: true, data }
  } catch (error) {
    console.error("TELEGRAM ERROR:", error)
    return { ok: false, error }
  }
}