"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import SearchBar from "@/components/search-bar" // import sticky search

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/listings", label: "Food Listings" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export default function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-orange-600" aria-hidden />
            <span className="text-lg font-semibold text-slate-900">FoodFinder</span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded px-3 py-2 text-sm transition-colors ${
                    active ? "bg-orange-50 text-orange-700" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="md:hidden">
            <Button asChild variant="outline" className="border-slate-200 bg-transparent text-slate-700">
              <Link href="/listings">Browse</Link>
            </Button>
          </div>
        </div>

        <div className="pb-3">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
