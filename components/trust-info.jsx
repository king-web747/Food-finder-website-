import { CheckCircle2, Star, MapPin } from "lucide-react"

const items = [
  { Icon: CheckCircle2, title: "Verified Listings", text: "We review top places and keep details fresh." },
  { Icon: Star, title: "Real Reviews", text: "Highlights from real diners and travelers." },
  { Icon: MapPin, title: "Local Focus", text: "Discover spots around you with smart search." },
]

export default function TrustInfo() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map(({ Icon, title, text }) => (
        <div key={title} className="rounded-lg border border-slate-200 bg-white p-5">
          <Icon className="size-6 text-green-600" aria-hidden="true" />
          <h4 className="mt-2 text-lg font-semibold text-slate-900">{title}</h4>
          <p className="mt-1 text-slate-700 leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  )
}
