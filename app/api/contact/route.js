export async function POST(req) {
  try {
    const body = await req.json()
    const name = (body?.name || "").trim()
    const email = (body?.email || "").trim()
    const message = (body?.message || "").trim()

    if (!name || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO = process.env.CONTACT_TO_EMAIL || "owner@example.com"

    if (!RESEND_API_KEY) {
      console.log("[contact] Received message (dev mode):", { name, email, message })
      return Response.json({ message: "Message received. (Email sending not configured yet.)" })
    }

    const payload = {
      from: "FoodFinder <onboarding@resend.dev>",
      to: [TO],
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const detail = await res.text()
      return Response.json({ error: "Email failed", detail }, { status: 500 })
    }

    return Response.json({ message: "Message sent successfully!" })
  } catch (err) {
    return Response.json({ error: "Unexpected error", detail: String(err) }, { status: 500 })
  }
}
