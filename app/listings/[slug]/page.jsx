import RelatedCarousel from "@/components/related-carousel"
import { Star, MapPin, Phone, Globe, Clock, Wifi, Car, TreePine, Baby, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export async function generateMetadata({ params }) {
  const listing = await getData(params.slug)

  if (!listing) {
    return {
      title: "Listing Not Found - FoodFinder",
      description: "The requested listing could not be found.",
    }
  }

  return {
    title: `${listing.name} - ${listing.city || "Jaipur"} | FoodFinder`,
    description:
      listing.description ||
      `Discover ${listing.name} in ${listing.city || "Jaipur"}. Find ratings, reviews, and contact information.`,
    openGraph: {
      title: `${listing.name} - ${listing.city || "Jaipur"}`,
      description: listing.description,
      images: [listing.image || "/food-place-photo.jpg"],
    },
  }
}

async function getData(slug) {
  const base =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : 'http://localhost:3000'
      : ""
  const res = await fetch(`${base}/api/listings?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
  if (!res.ok) return null
  const json = await res.json()
  return json.items?.[0] || null
}

const sampleMenuItems = [
  { name: "Butter Chicken", price: "₹280", description: "Creamy tomato-based curry with tender chicken" },
  { name: "Paneer Tikka", price: "₹220", description: "Grilled cottage cheese with aromatic spices" },
  { name: "Biryani Special", price: "₹320", description: "Fragrant basmati rice with choice of meat" },
  { name: "Dal Makhani", price: "₹180", description: "Rich and creamy black lentil curry" },
]

const sampleReviews = [
  {
    name: "Priya Sharma",
    rating: 5,
    comment: "Amazing food and great ambiance! The butter chicken was exceptional.",
    date: "2 days ago",
  },
  {
    name: "Rahul Gupta",
    rating: 4,
    comment: "Good service and tasty food. Will definitely visit again.",
    date: "1 week ago",
  },
  {
    name: "Anjali Singh",
    rating: 5,
    comment: "Best restaurant in the area. Highly recommended for families.",
    date: "2 weeks ago",
  },
]

const features = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Car, label: "Parking Available" },
  { icon: TreePine, label: "Outdoor Seating" },
  { icon: Baby, label: "Kid Friendly" },
]

export default async function ListingDetail({ params }) {
  const listing = await getData(params.slug)

  if (!listing) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4 bg-transparent">
            <Link href="/listings" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Listings
            </Link>
          </Button>
        </div>
        <h1 className="text-2xl font-semibold">Listing not found</h1>
        <p className="mt-2 text-gray-600">We couldn't find that place. Try exploring other results.</p>
      </main>
    )
  }

  const images = [
    listing.image || "/food-place-photo.jpg",
    "/modern-restaurant-interior.png",
    "/elegant-food-plating.png",
    "/restaurant-ambiance.jpg",
  ]

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="mb-6">
        <Button asChild variant="outline" className="mb-4 bg-transparent">
          <Link href="/listings" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Listings
          </Link>
        </Button>
      </div>

      <div className="space-y-6 mb-8">
        <div className="relative">
          <img
            src={images[0] || "/placeholder.svg"}
            alt={listing.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            1 / {images.length}
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {images.slice(1).map((img, i) => (
            <img
              key={i}
              src={img || "/placeholder.svg"}
              alt={`${listing.name} ${i + 2}`}
              className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <section className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl font-bold text-slate-900">{listing.name}</h1>
              <Badge className="bg-green-500 text-white">Open Now</Badge>
            </div>
            <div className="flex items-center gap-4 text-slate-600 flex-wrap">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {listing.rating} ({Math.floor(Math.random() * 200) + 50} reviews)
              </span>
              <span>{"₹".repeat(listing.priceLevel || 2)}</span>
              <span className="capitalize">{listing.category}</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-500" />
                {listing.city || "Jaipur"}
              </span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-slate-700 mb-4">
                {listing.description ||
                  "Discover authentic flavors and exceptional dining experience in a warm, welcoming atmosphere. Our chefs use fresh, locally-sourced ingredients to create memorable dishes that celebrate traditional and contemporary cuisine."}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <feature.icon className="w-4 h-4 text-orange-500" />
                    {feature.label}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Menu Highlights</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {sampleMenuItems.map((item, i) => (
                  <div key={i} className="flex justify-between items-start p-3 bg-slate-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                    </div>
                    <span className="font-semibold text-orange-600 ml-4">{item.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {sampleReviews.map((review, i) => (
                  <div key={i} className="border-b border-slate-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-slate-500">{review.date}</span>
                    </div>
                    <p className="text-slate-700 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Details</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-orange-500 mt-0.5" />
                    <div>
                      <span className="text-slate-500">Rating</span>
                      <p className="font-medium">
                        {listing.rating}★ ({Math.floor(Math.random() * 200) + 50} reviews)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 mt-0.5">₹</span>
                    <div>
                      <span className="text-slate-500">Price Level</span>
                      <p className="font-medium">{"₹".repeat(listing.priceLevel || 2)}</p>
                    </div>
                  </div>

                  {listing.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                      <div>
                        <span className="text-slate-500">Address</span>
                        <p className="font-medium">{listing.address}</p>
                      </div>
                    </div>
                  )}

                  {listing.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-orange-500 mt-0.5" />
                      <div>
                        <span className="text-slate-500">Phone</span>
                        <p className="font-medium">{listing.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-orange-500 mt-0.5" />
                    <div>
                      <span className="text-slate-500">Hours</span>
                      <p className="font-medium">Mon–Sun 9am–11pm</p>
                    </div>
                  </div>

                  {listing.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="w-4 h-4 text-orange-500 mt-0.5" />
                      <div>
                        <span className="text-slate-500">Website</span>
                        <a
                          className="font-medium text-orange-600 hover:underline"
                          href={listing.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    Call Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 font-medium py-3 px-4 rounded-lg transition-colors bg-transparent"
                  >
                    Get Directions
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 font-medium py-3 px-4 rounded-lg transition-colors bg-transparent"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Places</h2>
        <RelatedCarousel category={listing.category} excludeSlug={listing.slug} />
      </section>
    </main>
  )
}
