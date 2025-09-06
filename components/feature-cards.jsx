import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  { title: "Smart Search", desc: "Find places fast with keyword and category filters." },
  { title: "Clean Listings", desc: "Card-based layout for quick scanning on mobile or desktop." },
  { title: "Local Focus", desc: "Discover nearby restaurants, hotels, and food stores." },
  { title: "SEO Friendly", desc: "Structured headings, accessible markup, fast performance." },
]

export default function FeatureCards() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-balance text-2xl font-semibold text-slate-900 md:text-3xl">
          Built for fast, friendly discovery
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <Card key={f.title} className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-700 leading-relaxed">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
