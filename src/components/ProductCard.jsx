import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const { name, slug, images, startingPrice, variants, isBestSeller, isNewArrival, inStock } = product
  const mrp = variants?.[0]?.mrp
  const hasDiscount = mrp && mrp > startingPrice

  return (
    <Link
      to={`/product/${slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-coconut-100 hover:shadow-lg hover:shadow-coconut-200/40 transition-shadow duration-300"
    >
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
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-coconut-900 font-semibold">
            {variants?.length > 1 ? 'From ' : ''}₹{startingPrice}
          </span>
          {hasDiscount && (
            <span className="text-coconut-400 text-sm line-through">₹{mrp}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard