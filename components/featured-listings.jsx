"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RatingStars from "./rating-stars"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const data = [
  {
    id: 1,
    title: "Jaipur Spice Kitchen",
    category: "Restaurants",
    city: "Jaipur",
    rating: 4.7,
    img: "/modern-restaurant-interior.png",
  },
  {
    id: 2,
    title: "Pink City Hotel",
    category: "Hotels",
    city: "Jaipur",
    rating: 4.5,
    img: "/elegant-hotel-lobby.png",
  },
  {
    id: 3,
    title: "Local Masala Mart",
    category: "Local Stores",
    city: "Jaipur",
    rating: 4.3,
    img: "/busy-grocery-aisle.png",
  },
  {
    id: 4,
    title: "Street Chaat Corner",
    category: "Street Food",
    city: "Jaipur",
    rating: 4.6,
    img: "/street-food-chaat.jpg",
  },
  {
    id: 5,
    title: "Amber View Resort",
    category: "Hotels",
    city: "Jaipur",
    rating: 4.4,
    img: "/tropical-resort-pool.png",
  },
  {
    id: 6,
    title: "Kachori House",
    category: "Restaurants",
    city: "Jaipur",
    rating: 4.8,
    img: "/kachori.jpg",
  },
]

export default function FeaturedListings() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h3 className="text-pretty text-xl font-semibold text-slate-900">Featured Listings</h3>
        <Button
          asChild
          variant="outline"
          className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
        >
          <Link href="/listings">See All</Link>
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <Link key={item.id} href={`/listings/${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
            <Card className="snap-start group cursor-pointer hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-orange-200">
              <CardHeader className="p-0 overflow-hidden">
                <img
                  src={item.img || "/placeholder.svg"}
                  alt={`${item.title} photo`}
                  className="h-44 w-full rounded-t-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-slate-900 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </CardTitle>
                <div className="mt-1 text-sm text-slate-600">{item.category}</div>
                <div className="mt-2 flex items-center gap-1 text-sm text-slate-700">
                  <MapPin className="size-4 text-slate-500" aria-hidden="true" />
                  <span>{item.city}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <RatingStars rating={item.rating} />
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
