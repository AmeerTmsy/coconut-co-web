import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../services/productService'
import { fetchCategories } from '../services/categoryService'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import SEO from '../components/SEO'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

const TAGS = [
  'vegan', 'gluten-free', 'cold-pressed', 'keto-friendly',
  'no added sugar', 'high-protein', 'low-gi', 'dairy-free',
]

// ── Filters panel — defined OUTSIDE Shop so it never gets redefined on re-render
function FiltersPanel({ categories, selectedCategory, selectedTags, searchQuery, minPrice, maxPrice, updateParam, clearAllFilters, hasActiveFilters }) {
  console.log('API URL:', import.meta.env.VITE_API_URL || '/api') // Log the API URL for debugging
  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-2">Search</p>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => updateParam('search', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-coconut-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-leaf-500/50"
        />
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-2">Category</p>
        <div className="space-y-1">
          <button
            onClick={() => updateParam('category', '')}
            className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${
              !selectedCategory
                ? 'bg-coconut-800 text-white font-medium'
                : 'text-coconut-600 hover:bg-coconut-100'
            }`}
          >
            All Products
          </button>
          {categories?.map((cat) => (
            <button
              key={cat._id}
              onClick={() => updateParam('category', cat._id)}
              className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${
                selectedCategory === cat._id
                  ? 'bg-coconut-800 text-white font-medium'
                  : 'text-coconut-600 hover:bg-coconut-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-2">Price Range (₹)</p>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateParam('minPrice', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-coconut-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-leaf-500/50"
          />
          <span className="text-coconut-400 shrink-0">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateParam('maxPrice', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-coconut-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-leaf-500/50"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-2">Tags</p>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => {
            const currentTags = selectedTags ? selectedTags.split(',') : []
            const isSelected = currentTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => {
                  const next = isSelected
                    ? currentTags.filter((t) => t !== tag)
                    : [...currentTags, tag]
                  updateParam('tags', next.join(','))
                }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  isSelected
                    ? 'bg-leaf-600 text-white border-leaf-600'
                    : 'border-coconut-200 text-coconut-600 hover:border-leaf-400'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full text-sm text-red-500 hover:text-red-700 font-medium py-2 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  )
}

// ── Main Shop page ────────────────────────────────────────────────────────────
function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const selectedCategory = searchParams.get('category') || ''
  const selectedTags = searchParams.get('tags') || ''
  const selectedSort = searchParams.get('sort') || 'newest'
  const searchQuery = searchParams.get('search') || ''
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  useEffect(() => { setPage(1) }, [selectedCategory, selectedTags, selectedSort, searchQuery, minPrice, maxPrice])

  const updateParam = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) {
        next.set(key, value)
      } else {
        next.delete(key)
      }
      return next
    })
  }

  const clearAllFilters = () => setSearchParams({})
  const hasActiveFilters = !!(selectedCategory || selectedTags || searchQuery || minPrice || maxPrice)

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', selectedCategory, selectedTags, selectedSort, searchQuery, minPrice, maxPrice, page],
    queryFn: () => fetchProducts({
      category: selectedCategory || undefined,
      tags: selectedTags || undefined,
      sort: selectedSort !== 'newest' ? selectedSort : undefined,
      search: searchQuery || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      page,
      limit: 12,
    }),
    keepPreviousData: true,
  })

  const filterProps = {
    categories: categoriesData,
    selectedCategory,
    selectedTags,
    searchQuery,
    minPrice,
    maxPrice,
    updateParam,
    clearAllFilters,
    hasActiveFilters,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO
        title="Shop All Products"
        description="Browse our full range of pure coconut products — oils, bars, sugar, snacks, flour, milk, and wellness products."
        url="/shop"
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-semibold text-coconut-900">
            {selectedCategory && categoriesData
              ? categoriesData.find((c) => c._id === selectedCategory)?.name || 'Shop'
              : 'Shop All Products'
            }
          </h1>
          <p className="text-coconut-500 text-sm mt-1">
            {data ? `${data.pagination.total} products` : 'Loading...'}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="ml-2 text-red-400 hover:text-red-600 text-xs underline"
              >
                Clear filters
              </button>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="text-sm border border-coconut-200 rounded-xl px-3 py-2 bg-white text-coconut-700 focus:outline-none focus:ring-2 focus:ring-leaf-500/50"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <button
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="lg:hidden flex items-center gap-2 text-sm border border-coconut-200 rounded-xl px-3 py-2 bg-white text-coconut-700"
          >
            <span>🔧</span> Filters
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-leaf-600" />}
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block w-52 shrink-0">
          <FiltersPanel {...filterProps} />
        </aside>

        {/* Mobile filters drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-coconut-900">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-coconut-400 hover:text-coconut-700"
                >✕</button>
              </div>
              <FiltersPanel {...filterProps} />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
              Something went wrong loading products.
            </div>
          )}

          {!isLoading && data?.products?.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🥥</p>
              <p className="text-coconut-700 font-medium mb-2">No products found</p>
              <p className="text-coconut-500 text-sm mb-6">Try adjusting your filters or search term.</p>
              <button
                onClick={clearAllFilters}
                className="text-leaf-600 font-medium hover:underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : data?.products?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
            }
          </div>

          {/* Pagination */}
          {data?.pagination?.pages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm border border-coconut-200 rounded-xl text-coconut-700 hover:bg-coconut-50 disabled:opacity-40"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: data.pagination.pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 text-sm rounded-xl transition-colors ${
                      page === i + 1
                        ? 'bg-coconut-800 text-white font-medium'
                        : 'border border-coconut-200 text-coconut-600 hover:bg-coconut-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(data.pagination.pages, p + 1))}
                disabled={page === data.pagination.pages}
                className="px-4 py-2 text-sm border border-coconut-200 rounded-xl text-coconut-700 hover:bg-coconut-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Shop