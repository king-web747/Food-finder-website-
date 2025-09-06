"use client"
import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const categories = [
  { key: "restaurants", label: "Restaurants" },
  { key: "hotels", label: "Hotels" },
  { key: "stores", label: "Local Stores" },
]

const priceLevels = [
  { key: "1", label: "$" },
  { key: "2", label: "$$" },
  { key: "3", label: "$$$" },
]

export default function ListingsFilters() {
  const router = useRouter()
  const sp = useSearchParams()
  const [category, setCategory] = useState(sp.get("category") || "restaurants")
  const [price, setPrice] = useState(sp.get("price") || "")
  const [rating, setRating] = useState(sp.get("rating") || "")
  const [sort, setSort] = useState(sp.get("sort") || "relevance")

  useEffect(() => {
    const n = new URLSearchParams(sp.toString())
    n.set("category", category)
    price ? n.set("price", price) : n.delete("price")
    rating ? n.set("rating", rating) : n.delete("rating")
    sort ? n.set("sort", sort) : n.delete("sort")
    router.replace(`/listings?${n.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, price, rating, sort])

  const makeChip = (active, setter, label, value) => (
    <button
      type="button"
      onClick={() => setter(value)}
      className={`rounded-full px-3 py-1 text-sm border ${active ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
    >
      {label}
    </button>
  )

  const ratingChips = useMemo(
    () =>
      [4, 4.5, 5].map((r) => ({
        key: String(r),
        label: `${r}+`,
      })),
    [],
  )

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`rounded-full px-4 py-1.5 text-sm border ${category === c.key ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Price:</span>
          {priceLevels.map((p) => (
            <span key={p.key}>{makeChip(price === p.key, setPrice, p.label, p.key)}</span>
          ))}
          {makeChip(price === "", setPrice, "Any", "")}

          <span className="ml-4 text-sm text-gray-500">Rating:</span>
          {ratingChips.map((r) => (
            <span key={r.key}>{makeChip(rating === r.key, setRating, r.label, r.key)}</span>
          ))}
          {makeChip(rating === "", setRating, "Any", "")}

          <span className="ml-4 text-sm text-gray-500">Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm"
          >
            <option value="relevance">Relevance</option>
            <option value="rating-desc">Rating (high)</option>
            <option value="price-asc">Price (low)</option>
            <option value="price-desc">Price (high)</option>
          </select>
        </div>
      </div>
    </div>
  )
}
