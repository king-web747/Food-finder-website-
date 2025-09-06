export const metadata = {
  title: "About — FoodFinder",
  description: "Learn more about FoodFinder and our focus on clarity, speed, and accessibility.",
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-pretty text-3xl font-bold text-slate-900">About FoodFinder</h1>
        <p className="mt-3 max-w-prose text-slate-700 leading-relaxed">
          FoodFinder is a modern directory that helps you discover local food experiences with ease. We focus on
          clarity, speed, and accessibility—so you can find what you need faster.
        </p>
        <p className="mt-3 max-w-prose text-slate-700 leading-relaxed">
          This site is built with Next.js, Tailwind CSS, and accessible UI components. Content and branding are
          currently placeholders—you can replace them anytime.
        </p>
      </section>
    </main>
  )
}
