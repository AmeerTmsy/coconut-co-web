import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'

function HeartIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  )
}

function ProductCard({ product }) {
  const { name, slug, images, startingPrice, variants, isBestSeller, isNewArrival, inStock, _id } = product
  const mrp = variants?.[0]?.mrp
  const hasDiscount = mrp && mrp > startingPrice
  const { toggle, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(_id)

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-coconut-100 hover:shadow-lg hover:shadow-coconut-200/40 transition-shadow duration-300">
      {/* Wishlist button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          toggle(_id, name)
        }}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${wishlisted
            ? 'bg-red-500 text-white'
            : 'bg-white/90 text-coconut-400 hover:text-red-500'
          }`}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <HeartIcon filled={wishlisted} />
      </button>

      <Link to={`/product/${slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-coconut-50">
          <img
            src={images?.[0]}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isBestSeller && (
              <span className="bg-coconut-800 text-coconut-50 text-xs font-semibold px-2.5 py-1 rounded-full">
                Bestseller
              </span>
            )}
            {isNewArrival && (
              <span className="bg-leaf-600 text-leaf-50 text-xs font-semibold px-2.5 py-1 rounded-full">
                New
              </span>
            )}
          </div>
          {!inStock && (
            <div className="absolute inset-0 bg-coconut-900/50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm tracking-wide">OUT OF STOCK</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-display text-lg text-coconut-900 font-medium leading-snug line-clamp-2">
            {name}
          </h3>
          {product.ratingCount > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-400">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-xs text-coconut-500">
                {product.ratingAvg} ({product.ratingCount})
              </span>
            </div>
          )}
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-coconut-900 font-semibold">
              {variants?.length > 1 ? 'From ' : ''}₹{startingPrice}
            </span>
            {hasDiscount && (
              <span className="text-coconut-400 text-sm line-through">₹{mrp}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard