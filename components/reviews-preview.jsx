import RatingStars from "./rating-stars"

const reviews = [
  { id: 1, name: "Ananya", text: "Found the best street chaat within minutes. Super easy!", rating: 5 },
  { id: 2, name: "Rahul", text: "Great hotel recommendations, exactly what I needed.", rating: 4.5 },
  { id: 3, name: "Meera", text: "Loved the curated local stores list for spices.", rating: 4.5 },
]

export default function ReviewsPreview() {
  return (
    <section aria-label="User reviews" className="grid gap-4 md:grid-cols-3">
      {reviews.map((r) => (
        <figure key={r.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <blockquote className="text-slate-700 leading-relaxed">“{r.text}”</blockquote>
          <figcaption className="mt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-900">{r.name}</span>
            <RatingStars rating={r.rating} />
          </figcaption>
        </figure>
      ))}
    </section>
  )
}
