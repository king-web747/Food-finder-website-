"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [pending, setPending] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Missing information", description: "Please fill out all fields." })
      return
    }
    setPending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to send message")
      toast({ title: "Message sent", description: data?.message || "Thanks for reaching out!" })
      setForm({ name: "", email: "", message: "" })
    } catch (err) {
      toast({ title: "Something went wrong", description: err.message })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-live="polite">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-800">
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Your name"
          className="text-slate-900"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-800">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="you@example.com"
          className="text-slate-900"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-800">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="How can we help?"
          rows={6}
          className="text-slate-900"
          required
        />
      </div>
      <Button type="submit" className="bg-orange-600 text-white hover:bg-orange-700" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  )
}
