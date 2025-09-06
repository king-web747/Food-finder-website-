import { Star } from "lucide-react"

export default function RatingStars({ rating = 0 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating))
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} out of 5`}>
      {stars.map((filled, i) => (
        <Star
          key={i}
          className={`size-4 ${filled ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
          aria-hidden="true"
        />
      ))}
      <span className="ml-2 text-sm text-slate-600">{rating.toFixed(1)}</span>
    </div>
  )
}
