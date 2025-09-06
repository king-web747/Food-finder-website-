import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "FoodFinder — Discover Local Food & Places",
  description: "Find the best restaurants, hotels, and local food stores near you with FoodFinder.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
