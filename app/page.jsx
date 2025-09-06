import Hero from "@/components/hero"
import FeatureCards from "@/components/feature-cards"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import QuickFilters from "@/components/quick-filters"
import FeaturedListings from "@/components/featured-listings"
import ReviewsPreview from "@/components/reviews-preview"
import TrustInfo from "@/components/trust-info"
import MobileBottomNav from "@/components/mobile-bottom-nav"

export const metadata = {
  title: "FoodFinder — Discover local food, hotels, and stores",
  description:
    "Explore nearby restaurants, hotels, and local food stores with search and category filters in a clean, mobile-friendly UI.",
}

export default function Page() {
  return (
    <main className="bg-white">
      <Hero />
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <QuickFilters />
        </div>
      </section>
      <FeatureCards />
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <FeaturedListings />
        </div>
      </section>
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h3 className="text-pretty text-xl font-semibold text-slate-900">What people say</h3>
          <p className="mt-1 text-slate-700 leading-relaxed">Real highlights from diners and travelers.</p>
          <div className="mt-4">
            <ReviewsPreview />
          </div>
        </div>
      </section>
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h3 className="text-pretty text-xl font-semibold text-slate-900">Why FoodFinder?</h3>
          <div className="mt-4">
            <TrustInfo />
          </div>
        </div>
      </section>
      <section className="border-t bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-balance text-2xl font-semibold text-slate-900">Ready to explore?</h2>
            <p className="mt-1 text-slate-700 leading-relaxed">
              Browse restaurants, hotels, and local food stores near you.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild className="bg-orange-600 text-white hover:bg-orange-700">
              <Link href="/listings">Open Food Listings</Link>
            </Button>
            <Button asChild variant="secondary" className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100">
              <Link href="/contact">Add Your Business</Link>
            </Button>
          </div>
        </div>
      </section>
      <MobileBottomNav />
    </main>
  )
}
