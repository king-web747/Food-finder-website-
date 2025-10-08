import { notFound } from "next/navigation"
import Link from "next/link"
import { headers } from "next/headers"
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

async function getPost(slug) {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3002'
  const res = await fetch(`${baseUrl}/api/blog`, { cache: "no-store" })
  if (!res.ok) return null
  const data = await res.json()
  return data.posts?.find(p => p.slug === slug) || null
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found - FoodFinder Blog",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} - FoodFinder Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="bg-white">
      <article className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4 bg-transparent">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {(post.tags || ["Food Culture"]).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{post.title}</h1>

          <p className="text-xl text-slate-600 mb-6">{post.excerpt}</p>

          <div className="flex items-center gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author || "FoodFinder Team"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime || "5 min read"}
            </span>
          </div>
        </header>

        <div className="mb-8">
          <img
            src={post.thumbnail || "/placeholder.svg?height=400&width=800&query=food blog post"}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="prose prose-lg max-w-none mb-8">
          <p>
            {post.content ||
              "This is a placeholder for the full blog post content. In a real application, this would contain the complete article text with rich formatting, images, and detailed information about the topic."}
          </p>

          <p>
            Food culture is an essential part of any travel experience. Understanding local customs, ingredients, and cooking techniques can transform a simple meal into a memorable cultural encounter. Whether you're exploring street food markets or fine dining establishments, each dish tells a story about the region's history and traditions.
          </p>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Respect local customs and dining etiquette</li>
            <li>Try authentic local specialties</li>
            <li>Support local businesses and artisans</li>
            <li>Learn basic phrases in the local language</li>
          </ul>

          <p>
            By embracing these principles, travelers can create meaningful connections with local communities and gain deeper insights into the rich tapestry of global cuisine.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Share this article</h3>
                <p className="text-sm text-slate-600">Help others discover great food stories</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="border-t border-slate-200 pt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Enjoyed this article?</h3>
            <p className="text-slate-600 mb-4">Check out more food stories and travel tips</p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/blog">Read More Articles</Link>
            </Button>
          </div>
        </div>
      </article>
    </main>
  )
}
