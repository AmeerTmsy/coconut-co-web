import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { fetchProductReviews, submitReview, deleteReview } from '../services/reviewService'

// ── Star display ──────────────────────────────────────────────────────────────
function Stars({ rating, size = 'sm', interactive = false, onRate }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' }

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={() => interactive && onRate?.(star)}
          disabled={!interactive}
          className={`${sizes[size]} transition-colors ${
            interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          } ${star <= rating ? 'text-amber-400' : 'text-coconut-200'}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

// ── Review form ───────────────────────────────────────────────────────────────
function ReviewForm({ productId, onSuccess }) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (payload) => submitReview(productId, payload),
    onSuccess: (review) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
      toast.success('Review submitted!')
      onSuccess?.()
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to submit review'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) { toast.error('Please select a star rating'); return }
    if (!title.trim()) { toast.error('Please add a review title'); return }
    if (!body.trim()) { toast.error('Please write your review'); return }
    mutation.mutate({ rating, title, body })
  }

  const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-coconut-200 bg-white text-coconut-900 placeholder:text-coconut-300 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 text-sm'

  return (
    <form onSubmit={handleSubmit} className="bg-coconut-50 rounded-2xl p-6 border border-coconut-100">
      <h3 className="font-semibold text-coconut-900 mb-4">Write a Review</h3>

      {/* Star rating picker */}
      <div className="mb-4">
        <p className="text-sm text-coconut-600 mb-2">Your rating *</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="w-8 h-8 transition-transform hover:scale-110"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-7 h-7 transition-colors ${
                  star <= (hovered || rating) ? 'text-amber-400' : 'text-coconut-200'
                }`}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-coconut-500 self-center">
              {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <input
          className={inputCls}
          placeholder="Review title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
        />
        <textarea
          className={inputCls}
          placeholder="Write your review here... *"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          maxLength={1000}
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-4 bg-coconut-800 text-white font-medium px-6 py-2.5 rounded-full hover:bg-coconut-900 transition-colors disabled:opacity-60 text-sm"
      >
        {mutation.isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}

// ── Single review card ────────────────────────────────────────────────────────
function ReviewCard({ review, currentUserId, productId }) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteReview(review._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
      toast.success('Review deleted')
    },
    onError: () => toast.error('Failed to delete review'),
  })

  return (
    <div className="border-b border-coconut-100 last:border-b-0 py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-coconut-200 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-coconut-700">
              {review.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-coconut-900">{review.user?.name}</p>
            <p className="text-xs text-coconut-400">
              {new Date(review.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <Stars rating={review.rating} size="sm" />
      </div>

      <h4 className="font-medium text-coconut-900 mt-3">{review.title}</h4>
      <p className="text-coconut-600 text-sm mt-1 leading-relaxed">{review.body}</p>

      {currentUserId === review.user?._id && (
        <button
          onClick={() => {
            if (window.confirm('Delete your review?')) deleteMutation.mutate()
          }}
          disabled={deleteMutation.isPending}
          className="mt-2 text-xs text-red-400 hover:text-red-600"
        >
          Delete my review
        </button>
      )}
    </div>
  )
}

// ── Rating summary bar ────────────────────────────────────────────────────────
function RatingSummary({ reviews, avgRating, totalCount }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  return (
    <div className="flex gap-8 items-center mb-6 p-5 bg-coconut-50 rounded-2xl border border-coconut-100">
      <div className="text-center shrink-0">
        <p className="font-display text-5xl font-semibold text-coconut-900">{avgRating || '—'}</p>
        <Stars rating={Math.round(avgRating)} size="sm" />
        <p className="text-xs text-coconut-400 mt-1">{totalCount} review{totalCount !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex-1 space-y-1.5">
        {counts.map(({ star, count }) => (
          <div key={star} className="flex items-center gap-3">
            <span className="text-xs text-coconut-500 w-3">{star}</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-amber-400 shrink-0">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <div className="flex-1 bg-coconut-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full"
                style={{ width: totalCount ? `${(count / totalCount) * 100}%` : '0%' }}
              />
            </div>
            <span className="text-xs text-coconut-400 w-4 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Reviews section ──────────────────────────────────────────────────────
function ProductReviews({ productId, avgRating, ratingCount }) {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => fetchProductReviews(productId),
  })

  const userHasReviewed = reviews.some((r) => r.user?._id === user?._id)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl font-semibold text-coconut-900">
          Customer Reviews
        </h2>
        {user && !userHasReviewed && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-leaf-600 font-medium hover:underline"
          >
            + Write a Review
          </button>
        )}
      </div>

      {/* Rating summary */}
      {reviews.length > 0 && (
        <RatingSummary
          reviews={reviews}
          avgRating={avgRating}
          totalCount={ratingCount}
        />
      )}

      {/* Review form */}
      {showForm && (
        <div className="mb-6">
          <ReviewForm
            productId={productId}
            onSuccess={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Login prompt */}
      {!user && (
        <p className="text-sm text-coconut-500 mb-5">
          <a href="/login" className="text-leaf-600 font-medium hover:underline">Log in</a>
          {' '}to write a review. Only customers who have purchased and received this product can leave a review.
        </p>
      )}

      {/* Reviews list */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="animate-pulse h-20 bg-coconut-100 rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && reviews.length === 0 && (
        <p className="text-coconut-400 text-sm py-6 text-center">
          No reviews yet. Be the first to review this product!
        </p>
      )}

      {!isLoading && reviews.length > 0 && (
        <div className="bg-white rounded-2xl border border-coconut-100 px-5">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              currentUserId={user?._id}
              productId={productId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductReviews