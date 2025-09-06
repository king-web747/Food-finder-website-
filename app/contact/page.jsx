import ContactForm from "@/components/contact-form"

export const metadata = {
  title: "Contact — FoodFinder",
  description: "Send us a message and we'll get back to you.",
}

export default function ContactPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-pretty text-3xl font-bold text-slate-900">Contact</h1>
        <p className="mt-2 text-slate-700 leading-relaxed">Send us a message and we'll get back to you shortly.</p>
        <div className="mt-6 rounded border border-slate-200 bg-white p-6">
          <ContactForm />
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Tip: Add RESEND_API_KEY (and optional CONTACT_TO_EMAIL) in Project Settings to enable real email delivery.
        </p>
      </section>
    </main>
  )
}
