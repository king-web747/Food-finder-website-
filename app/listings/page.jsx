import ListingsBrowser from "@/components/listings-browser"

export const metadata = {
  title: "Food Listings — FoodFinder",
  description: "Browse restaurants, hotels, and local stores with search and category filters.",
}

export default function ListingsPage() {
  return (
    <main className="bg-white min-h-screen">
      <ListingsBrowser />
    </main>
  )
}
