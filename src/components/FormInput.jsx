function FormInput({ label, error, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-medium text-coconut-700 mb-1.5">{label}</label>
      <input
        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-coconut-900 placeholder:text-coconut-300 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 transition-shadow ${
          error ? 'border-red-400' : 'border-coconut-200'
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default FormInput