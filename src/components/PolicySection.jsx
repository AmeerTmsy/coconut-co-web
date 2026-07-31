export function PolicySection({ title, children }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-coconut-900 mb-3 mt-8 first:mt-0">
        {title}
      </h2>
      <div className="text-coconut-600 leading-relaxed space-y-3 text-sm">
        {children}
      </div>
    </div>
  )
}

export function PolicyList({ items }) {
  return (
    <ul className="list-disc list-inside space-y-1.5 text-coconut-600 text-sm">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  )
}