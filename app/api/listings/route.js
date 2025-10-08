const MOCK = [
  {
    id: "r-1",
    slug: "sunset-diner",
    name: "Sunset Diner",
    category: "restaurant",
    description: "Comfort food classics with a modern twist.",
    location: "Downtown",
    price_level: "$$",
    priceLevel: 2,
    rating: 4.3,
    videoUrl: "/videos/sample.mp4",
    image: "/food-place-photo.jpg",
    highlights: ["All-day breakfast", "Outdoor seating", "Kid friendly"],
    address: "100 Main St, Downtown",
    phone: "(555) 123-4567",
    website: "https://example.com/sunset-diner",
  },
  {
    id: "h-1",
    slug: "citrus-grove-hotel",
    name: "Citrus Grove Hotel",
    category: "hotel",
    description: "Cozy rooms and fresh breakfast near the city center.",
    location: "Riverside",
    price_level: "$$$",
    priceLevel: 3,
    rating: 4.6,
    image: "/elegant-hotel-lobby.png",
    highlights: ["Free breakfast", "Pool & spa", "City views"],
    address: "42 Riverside Ave",
    phone: "(555) 987-6543",
    website: "https://example.com/citrus-grove-hotel",
  },
  {
    id: "s-1",
    slug: "green-market",
    name: "Green Market",
    category: "store",
    description: "Local produce, fresh bread, and artisan goods.",
    location: "Old Town",
    price_level: "$",
    priceLevel: 1,
    rating: 4.2,
    image: "/busy-grocery-aisle.png",
    highlights: ["Organic produce", "Artisan breads", "Local dairy"],
    address: "5 Old Town Rd",
    phone: "(555) 222-3333",
  },
  {
    id: "r-2",
    slug: "olive-and-thyme",
    name: "Olive & Thyme",
    category: "restaurant",
    description: "Mediterranean flavors with seasonal ingredients.",
    location: "Uptown",
    price_level: "$$",
    priceLevel: 2,
    rating: 4.8,
    image: "/spicy-curry.png",
    highlights: ["Vegan options", "Seasonal menu", "Reservations"],
    address: "7 Uptown Blvd",
    phone: "(555) 111-4444",
    website: "https://example.com/olive-thyme",
  },
  {
    id: "s-2",
    slug: "sunrise-bakery",
    name: "Sunrise Bakery",
    category: "store",
    description: "Daily pastries, sourdough loaves, and great coffee.",
    location: "Market District",
    price_level: "$",
    priceLevel: 1,
    rating: 4.5,
    image: "/vibrant-mixed-salad.png",
    highlights: ["Fresh pastries", "Sourdough loaves", "Specialty coffee"],
    address: "12 Market St",
    phone: "(555) 333-7777",
  },
  {
    id: "r-3",
    slug: "jaipur-spice-kitchen",
    name: "Jaipur Spice Kitchen",
    category: "restaurant",
    description: "Authentic Rajasthani cuisine with traditional spices and flavors in a royal ambiance.",
    location: "Jaipur",
    city: "Jaipur",
    price_level: "$$",
    priceLevel: 2,
    rating: 4.7,
    image: "/modern-restaurant-interior.png",
    highlights: ["Traditional Rajasthani cuisine", "Royal ambiance", "Live music"],
    address: "123 Pink City Road, Jaipur, Rajasthan",
    phone: "+91 98765 43210",
    website: "https://jaipurspicekitchen.com",
  },
  {
    id: "h-2",
    slug: "pink-city-hotel",
    name: "Pink City Hotel",
    category: "hotel",
    description: "Luxury heritage hotel in the heart of Jaipur with traditional Rajasthani hospitality.",
    location: "Jaipur",
    city: "Jaipur",
    price_level: "$$$",
    priceLevel: 3,
    rating: 4.5,
    image: "/elegant-hotel-lobby.png",
    highlights: ["Heritage property", "Rooftop restaurant", "Palace views"],
    address: "456 Heritage Lane, Jaipur, Rajasthan",
    phone: "+91 98765 43211",
    website: "https://pinkcityhotel.com",
  },
  {
    id: "s-3",
    slug: "local-masala-mart",
    name: "Local Masala Mart",
    category: "store",
    description: "Traditional spice market offering authentic Rajasthani spices and local specialties.",
    location: "Jaipur",
    city: "Jaipur",
    price_level: "$",
    priceLevel: 1,
    rating: 4.3,
    image: "/busy-grocery-aisle.png",
    highlights: ["Authentic spices", "Local specialties", "Traditional market"],
    address: "789 Spice Bazaar, Jaipur, Rajasthan",
    phone: "+91 98765 43212",
  },
  {
    id: "r-4",
    slug: "street-chaat-corner",
    name: "Street Chaat Corner",
    category: "restaurant",
    description: "Famous street food joint serving the best chaat and snacks in Jaipur.",
    location: "Jaipur",
    city: "Jaipur",
    price_level: "$",
    priceLevel: 1,
    rating: 4.6,
    image: "/street-food-chaat.jpg",
    highlights: ["Famous chaat", "Street food", "Local favorite"],
    address: "321 Chaat Street, Jaipur, Rajasthan",
    phone: "+91 98765 43213",
  },
  {
    id: "h-3",
    slug: "amber-view-resort",
    name: "Amber View Resort",
    category: "hotel",
    description: "Luxury resort with stunning views of Amber Fort and modern amenities.",
    location: "Jaipur",
    city: "Jaipur",
    price_level: "$$$",
    priceLevel: 3,
    rating: 4.4,
    image: "/tropical-resort-pool.png",
    highlights: ["Amber Fort views", "Luxury amenities", "Spa & wellness"],
    address: "654 Amber Road, Jaipur, Rajasthan",
    phone: "+91 98765 43214",
    website: "https://amberviewresort.com",
  },
  {
    id: "r-5",
    slug: "kachori-house",
    name: "Kachori House",
    category: "restaurant",
    description: "Traditional Rajasthani kachori and sweets served fresh daily since 1950.",
    location: "Jaipur",
    city: "Jaipur",
    price_level: "$",
    priceLevel: 1,
    rating: 4.8,
    image: "/kachori.jpg",
    highlights: ["Traditional kachori", "Since 1950", "Fresh sweets"],
    address: "987 Sweet Lane, Jaipur, Rajasthan",
    phone: "+91 98765 43215",
  },
]

import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")
  const q = (searchParams.get("query") || "").toLowerCase()
  const rawCat = (searchParams.get("category") || "all").toLowerCase()
  const price = searchParams.get("price") // "1" | "2" | "3"
  const ratingMin = Number.parseFloat(searchParams.get("rating") || "0")
  const sort = searchParams.get("sort") || "relevance"

  let cat = rawCat
  if (cat === "restaurants") cat = "restaurant"
  if (cat === "hotels") cat = "hotel"
  if (cat === "stores") cat = "store"

  // Single listing by slug
  if (slug) {
    const single = MOCK.filter((i) => i.slug === slug)
    return NextResponse.json({ items: single })
  }

  let items = [...MOCK]

  if (cat !== "all") items = items.filter((i) => i.category === cat)
  if (q) {
    items = items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q),
    )
  }
  if (price) {
    const p = Number(price)
    if ([1, 2, 3].includes(p)) {
      items = items.filter((i) => (i.priceLevel || 1) === p)
    }
  }
  if (!Number.isNaN(ratingMin) && ratingMin > 0) {
    items = items.filter((i) => (i.rating || 0) >= ratingMin)
  }

  if (sort === "rating-desc") {
    items.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  } else if (sort === "price-asc") {
    items.sort((a, b) => (a.priceLevel || 1) - (b.priceLevel || 1))
  } else if (sort === "price-desc") {
    items.sort((a, b) => (b.priceLevel || 1) - (a.priceLevel || 1))
  }

  return NextResponse.json({ items })
}
