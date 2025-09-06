"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, LocateFixed, Search } from "lucide-react"

export default function SearchBar({ className = "" }) {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [loc, setLoc] = useState("")
  const [loadingLoc, setLoadingLoc] = useState(false)

  const onNearMe = () => {
    if (!navigator.geolocation) return
    setLoadingLoc(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setLoc(`${latitude.toFixed(5)},${longitude.toFixed(5)}`)
        setLoadingLoc(false)
      },
      () => {
        setLoadingLoc(false)
      },
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (loc) params.set("loc", loc)
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`} role="search" aria-label="Search listings">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg md:flex-row md:items-center md:gap-4">
        {/* Search input with icon */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by food, hotel, or store name…"
            className="pl-10 border-slate-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg h-11"
            aria-label="Search query"
          />
        </div>

        {/* Location input with icon */}
        <div className="relative flex-1 md:max-w-xs">
          <MapPin className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <Input
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            placeholder="Enter city or 'lat,lng'"
            className="pl-10 border-slate-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg h-11"
            aria-label="Location"
          />
        </div>

        {/* Find near me button */}
        <Button
          type="button"
          onClick={onNearMe}
          variant="outline"
          className="whitespace-nowrap border-slate-200 hover:bg-slate-50 rounded-lg h-11 px-4 bg-transparent"
          disabled={loadingLoc}
        >
          <LocateFixed className="mr-2 size-4" aria-hidden="true" />
          {loadingLoc ? "Locating…" : "Find near me"}
        </Button>

        {/* Search button */}
        <Button
          type="submit"
          className="bg-orange-600 text-white hover:bg-orange-700 font-semibold rounded-lg h-11 px-8 shadow-sm"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
