function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-coconut-100 animate-pulse">
      <div className="aspect-square bg-coconut-100" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-coconut-100 rounded w-3/4" />
        <div className="h-4 bg-coconut-100 rounded w-1/3" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton