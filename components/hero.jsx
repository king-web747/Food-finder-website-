import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-pretty text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Discover the best local food, hotels, and stores
          </h1>
          <p className="mt-4 max-w-prose text-slate-700 leading-relaxed">
            FoodFinder helps you quickly explore nearby restaurants, hotels, and local food stores. Search, filter, and
            compare in a clean, mobile-friendly experience.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
              <Link href="/listings">Start browsing</Link>
            </Button>
            <Button asChild variant="outline" className="border-slate-300 text-slate-800 bg-transparent">
              <Link href="/about">Learn more</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <div
            className="aspect-[16/10] w-full rounded bg-[url('/foodfinder-map-and-cards.jpg')] bg-cover bg-center"
            aria-label="FoodFinder preview image"
          />
        </div>
      </div>
    </section>
  )
}
