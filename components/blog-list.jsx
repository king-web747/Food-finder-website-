"use client"

import useSWR from "swr"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, User, Calendar, Facebook, Instagram, MessageCircle } from "lucide-react"
import { useState } from "react"

const fetcher = (url) => fetch(url).then((r) => r.json())

const categories = ["All", "Food Culture", "Local Specialties", "Travel Tips", "Restaurant Reviews", "Street Food"]

const popularPosts = [
  { title: "Best Street Food in Jaipur", slug: "best-street-food-jaipur" },
  { title: "Hidden Gems of Pink City", slug: "hidden-gems-pink-city" },
  { title: "Traditional Rajasthani Cuisine", slug: "traditional-rajasthani-cuisine" },
]

export default function BlogList() {
  const { data, isLoading } = useSWR("/api/blog", fetcher)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-slate-700">Loading posts…</p>
      </section>
    )
  }

  const posts = data?.posts ?? []

  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div
          className="absolute inset-0 bg-black/40"
          style={{
            backgroundImage: "url('/foodfinder-map-and-cards.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Discover Food Stories</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto text-balance">
            Explore food culture, local specialties, and hidden culinary gems across India
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((p) => (
                <Card key={p.slug} className="border-slate-200 hover:shadow-lg transition-shadow group">
                  <CardHeader className="p-0">
                    <img
                      src={p.thumbnail || "/placeholder.svg?height=200&width=400&query=food blog post"}
                      alt={p.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {(p.tags || ["Food Culture"]).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <CardTitle className="text-slate-900 group-hover:text-orange-600 transition-colors">
                      {p.title}
                    </CardTitle>

                    <p className="text-slate-700 leading-relaxed line-clamp-3">{p.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {p.author || "FoodFinder Team"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {p.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {p.readTime || "5 min read"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Link href={`/blog/${p.slug}`}>Read Article</Link>
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="p-2">
                          <Facebook className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2">
                          <Instagram className="w-4 h-4 text-pink-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            {/* Blog Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-orange-100 text-orange-700 font-medium"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block text-sm text-slate-700 hover:text-orange-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800">Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-700 mb-4">Subscribe to get updates on Jaipur's latest food spots.</p>
                <div className="space-y-3">
                  <Input placeholder="Enter your email" type="email" />
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  )
}
