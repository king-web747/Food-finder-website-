const POSTS = [
  {
    slug: "regional-specialties",
    title: "Exploring Regional Specialties",
    excerpt: "From coastal seafood to mountain cheeses, discover what makes each region unique.",
    date: "2025-08-15",
  },
  {
    slug: "how-to-find-local-gems",
    title: "How to Find Local Food Gems",
    excerpt: "Use simple signals—locally sourced menus, small crowds, and passionate owners.",
    date: "2025-07-30",
  },
  {
    slug: "hotel-breakfast-guide",
    title: "A Practical Guide to Hotel Breakfasts",
    excerpt: "Buffet or à la carte? Tips to pick the right stay for your morning routine.",
    date: "2025-06-20",
  },
]

export async function GET() {
  return Response.json({ posts: POSTS })
}
