"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Filter, Star } from "lucide-react"

const fetcher = (url) => fetch(url).then((r) => r.json())

const categories = [
  { key: "all", label: "All" },
  { key: "restaurant", label: "Restaurants" },
  { key: "hotel", label: "Hotels" },
  { key: "store", label: "Local Stores" },
]

function normalizeCategory(param) {
  if (!param) return "all"
  const v = String(param).toLowerCase()
  if (v === "restaurants") return "restaurant"
  if (v === "hotels") return "hotel"
  if (v === "stores") return "store"
  if (["all", "restaurant", "hotel", "store"].includes(v)) return v
  return "all"
}

function CategoryBadge({ cat }) {
  const color = cat === "restaurant" ? "bg-green-600" : cat === "hotel" ? "bg-orange-600" : "bg-yellow-500"
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${color}`}>
      {cat}
    </span>
  )
}

function PriceRangeSlider({ value, onChange }) {
  const priceLabels = ["$", "$$", "$$$", "$$$$"]

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-slate-600">Price:</span>
      <div className="flex items-center gap-1">
        {priceLabels.map((label, index) => {
          const priceLevel = index + 1
          const isActive = value >= priceLevel
          return (
            <button
              key={priceLevel}
              onClick={() => onChange(priceLevel === value ? 0 : priceLevel)}
              className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                isActive ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StarRatingFilter({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-slate-600">Rating:</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star === value ? 0 : star)}
            className={`p-1 rounded transition-colors ${
              value >= star ? "text-orange-500" : "text-gray-300 hover:text-gray-400"
            }`}
          >
            <Star className="w-4 h-4 fill-current" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ListingsBrowser() {
  const sp = useSearchParams()
  const initialQuery = sp.get("q") || ""
  const initialCategory = normalizeCategory(sp.get("category"))
  const loc = sp.get("loc") || ""

  const [category, setCategory] = useState(initialCategory)
  const [priceRange, setPriceRange] = useState(Number(sp.get("price")) || 0)
  const [minRating, setMinRating] = useState(Number(sp.get("rating")) || 0)
  const [sort, setSort] = useState(sp.get("sort") || "relevance")
  const [showFilters, setShowFilters] = useState(false)

  const params = new URLSearchParams()
  params.set("query", initialQuery)
  params.set("category", category)
  if (loc) params.set("loc", loc)
  if (priceRange) params.set("price", priceRange.toString())
  if (minRating) params.set("rating", minRating.toString())
  if (sort) params.set("sort", sort)

  const { data, isLoading } = useSWR(`/api/listings?${params.toString()}`, fetcher, { keepPreviousData: true })

  const results = useMemo(() => data?.items ?? [], [data])

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-pretty text-3xl font-bold text-slate-900">Food Listings</h1>
        {initialQuery && (
          <p className="text-slate-600">
            Showing results for: <span className="font-medium">"{initialQuery}"</span>
          </p>
        )}
      </div>

      <div className="mt-6">
        {/* Category filters - always visible */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {categories.map((c) => {
            const active = c.key === category
            return (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-orange-50 hover:border-orange-300"
                }`}
                aria-pressed={active}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Advanced filters */}
        <div
          className={`space-y-4 md:space-y-0 md:flex md:items-center md:gap-8 ${showFilters ? "block" : "hidden md:flex"}`}
        >
          <PriceRangeSlider value={priceRange} onChange={setPriceRange} />
          <StarRatingFilter value={minRating} onChange={setMinRating} />

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              aria-label="Sort results"
            >
              <option value="relevance">Relevance</option>
              <option value="rating-desc">Rating (high)</option>
              <option value="price-asc">Price (low)</option>
              <option value="price-desc">Price (high)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-700 text-lg">No results found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <Link key={item.slug || item.id} href={`/listings/${item.slug || encodeURIComponent(item.id)}`}>
                <Card className="border-slate-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 overflow-hidden group">
                  <div className="relative">
                    <div
                      className="aspect-[16/10] w-full bg-[url('/food-place-photo.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      aria-label="Listing image placeholder"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {Math.random() > 0.5 && (
                        <Badge className="bg-green-500 text-white text-xs px-2 py-1">Open Now</Badge>
                      )}
                      {Math.random() > 0.7 && (
                        <Badge className="bg-orange-500 text-white text-xs px-2 py-1">Trending</Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <CategoryBadge cat={item.category} />
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-900 text-lg group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {"$".repeat(item.priceLevel || 1)}
                        </Badge>
                        {item.rating && (
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {item.rating}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 truncate max-w-24">{item.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
