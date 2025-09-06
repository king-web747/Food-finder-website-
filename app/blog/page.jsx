import BlogList from "@/components/blog-list"

export const metadata = {
  title: "Blog — FoodFinder",
  description: "Food culture, local specialties, and travel tips.",
}

export default function BlogPage() {
  return (
    <main className="bg-white">
      <BlogList />
    </main>
  )
}
