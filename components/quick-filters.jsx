import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Utensils, Hotel, Store, Sandwich } from "lucide-react"

const filters = [
  {
    label: "Restaurants",
    value: "restaurants",
    Icon: Utensils,
    color: "bg-orange-50 text-orange-700 hover:bg-orange-100",
  },
  { label: "Hotels", value: "hotels", Icon: Hotel, color: "bg-green-50 text-green-700 hover:bg-green-100" },
  { label: "Local Stores", value: "stores", Icon: Store, color: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100" },
  { label: "Street Food", value: "street", Icon: Sandwich, color: "bg-slate-50 text-slate-700 hover:bg-slate-100" },
]

export default function QuickFilters() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map(({ label, value, Icon, color }) => (
        <Button key={value} asChild variant="secondary" className={`gap-2 ${color}`}>
          <Link href={`/listings?category=${encodeURIComponent(value)}`} aria-label={`Filter by ${label}`}>
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </Link>
        </Button>
      ))}
    </div>
  )
}
