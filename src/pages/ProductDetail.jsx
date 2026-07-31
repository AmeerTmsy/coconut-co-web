import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProductBySlug } from '../services/productService'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import SEO from '../components/SEO'
import ProductReviews from '../components/ProductReviews'

function ProductDetail() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
  })

  if (isLoading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-coconut-500">Loading product...</div>
  }

  if (isError || !data?.product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-coconut-700 mb-4">We couldn't find that product.</p>
        <Link to="/shop" className="text-leaf-600 font-medium hover:underline">Back to Shop</Link>
      </div>
    )
  }

  const { product, relatedProducts } = data
  const wishlisted = isWishlisted(product._id)
  const seoTitle = product.seoTitle || product.name
  const seoDescription = product.seoDescription || product.shortDescription
  const seoImage = product.images?.[0]

  const variant = product.variants[selectedVariantIdx]
  const hasDiscount = variant.mrp > variant.price
  const discountPct = hasDiscount ? Math.round(((variant.mrp - variant.price) / variant.mrp) * 100) : 0
  const outOfStock = variant.stockQuantity === 0

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'usage', label: 'How to Use' },
    { id: 'benefits', label: 'Benefits' },
  ]

  return (
    <div key={slug} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={`/product/${product.slug}`}
        type="product"
      />
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image gallery */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-coconut-50">
          <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product info */}
        <div>
          <p className="text-leaf-600 text-sm font-medium">{product.category?.name}</p>
          <h1 className="font-display text-3xl font-semibold text-coconut-900 mt-1">{product.name}</h1>
          <p className="text-coconut-600 mt-2">{product.shortDescription}</p>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-2xl font-semibold text-coconut-900">₹{variant.price}</span>
            {hasDiscount && (
              <>
                <span className="text-coconut-400 line-through">₹{variant.mrp}</span>
                <span className="text-leaf-600 text-sm font-medium">{discountPct}% off</span>
              </>
            )}
          </div>

          {/* Variant selector */}
          {product.variants.length > 1 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-coconut-700 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={v._id}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${idx === selectedVariantIdx
                      ? 'bg-coconut-800 text-white border-coconut-800'
                      : 'border-coconut-300 text-coconut-700 hover:border-coconut-500'
                      }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock status */}
          <p className={`mt-4 text-sm font-medium ${outOfStock ? 'text-red-600' : 'text-leaf-600'}`}>
            {outOfStock ? 'Out of stock' : `In stock (${variant.stockQuantity} available)`}
          </p>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-coconut-300 rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-coconut-700 hover:text-coconut-900"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(variant.stockQuantity, q + 1))}
                className="w-10 h-10 flex items-center justify-center text-coconut-700 hover:text-coconut-900"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addItem(product, variant, quantity)}
              disabled={outOfStock}
              className="flex-1 bg-coconut-800 text-white font-medium py-3 rounded-full hover:bg-coconut-900 transition-colors disabled:bg-coconut-200 disabled:cursor-not-allowed"
            >
              {outOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {/* Wishlist button */}
            <button
              onClick={() => toggle(product._id, product.name)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${wishlisted
                  ? 'bg-red-500 text-white border-red-500'
                  : 'border-coconut-300 text-coconut-400 hover:text-red-500 hover:border-red-300'
                }`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill={wishlisted ? 'currentColor' : 'none'}
                stroke="currentColor" strokeWidth={2} className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t border-coconut-200 pt-6">
            <div className="flex gap-6 border-b border-coconut-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-medium transition-colors ${activeTab === tab.id
                    ? 'text-coconut-900 border-b-2 border-coconut-800'
                    : 'text-coconut-500 hover:text-coconut-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-5 text-coconut-700 leading-relaxed">
              {activeTab === 'description' && <p>{product.longDescription}</p>}
              {activeTab === 'ingredients' && (
                <ul className="list-disc list-inside space-y-1">
                  {product.ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
              )}
              {activeTab === 'usage' && <p>{product.usageInstructions}</p>}
              {activeTab === 'benefits' && (
                <ul className="list-disc list-inside space-y-1">
                  {product.benefits?.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16 border-t border-coconut-100 pt-10">
        <ProductReviews
          productId={product._id}
          avgRating={product.ratingAvg}
          ratingCount={product.ratingCount}
        />
      </div>

      {/* Related products */}
      {relatedProducts?.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-coconut-900 mb-6">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail