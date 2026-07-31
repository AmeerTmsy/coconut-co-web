function PolicyLayout({ title, lastUpdated, children }) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-coconut-50 border-b border-coconut-100 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-semibold text-coconut-900">{title}</h1>
          {lastUpdated && (
            <p className="text-coconut-400 text-sm mt-2">Last updated: {lastUpdated}</p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-14 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-sm max-w-none text-coconut-700 space-y-6">
          {children}
        </div>
      </section>
    </div>
  )
}

export default PolicyLayout