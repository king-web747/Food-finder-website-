import Link from "next/link"
import { Home, Search, BookOpen, Mail } from "lucide-react"

export default function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-4">
        <li>
          <Link
            href="/"
            className="flex flex-col items-center gap-1 p-3 text-xs text-slate-700 hover:text-slate-900"
            aria-label="Home"
          >
            <Home className="size-5" aria-hidden="true" />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/listings"
            className="flex flex-col items-center gap-1 p-3 text-xs text-slate-700 hover:text-slate-900"
            aria-label="Browse"
          >
            <Search className="size-5" aria-hidden="true" />
            Browse
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className="flex flex-col items-center gap-1 p-3 text-xs text-slate-700 hover:text-slate-900"
            aria-label="Blog"
          >
            <BookOpen className="size-5" aria-hidden="true" />
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="flex flex-col items-center gap-1 p-3 text-xs text-slate-700 hover:text-slate-900"
            aria-label="Contact"
          >
            <Mail className="size-5" aria-hidden="true" />
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}
