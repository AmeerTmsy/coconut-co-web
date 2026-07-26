import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'

function Shop() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-coconut-900">Shop All Products</h1>
        <p className="text-coconut-600 mt-1">
          {data ? `${data.pagination.total} products` : 'Loading our coconut collection...'}
        </p>
      </div>

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          Something went wrong loading products: {error.message}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}

        {data?.products?.length === 0 && (
          <p className="col-span-full text-coconut-500 text-center py-12">
            No products found.
          </p>
        )}

        {data?.products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Shop