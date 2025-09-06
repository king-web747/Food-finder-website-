"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function RelatedCarousel({ category, excludeSlug }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const params = new URLSearchParams()
    if (category) params.set("category", category)
    params.set("sort", "rating-desc")
    fetch(`/api/listings?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        const filtered = (data.items || []).filter((i) => i.slug !== excludeSlug)
        setItems(filtered)
      })
      .catch(() => setItems([]))
  }, [category, excludeSlug])

  if (!items.length) return null

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">More like this</h3>
        <div className="text-sm text-gray-500">Swipe to explore</div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <Link key={item.slug} href={`/listings/${item.slug}`} className="min-w-[220px]">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <img
                src={item.image || "/placeholder.svg?height=140&width=220&query=food listing"}
                alt={item.name}
                className="h-36 w-full rounded-t-lg object-cover"
              />
              <div className="p-3">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">
                  {item.category} • {item.rating}★ • {"$".repeat(item.priceLevel || 1)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
