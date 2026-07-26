import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchProducts } from '../../services/productService'
import { fetchAllOrders } from '../../services/adminService'
import {
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from '../../services/adminService'

// We also need categories for the product form dropdown
import api from '../../services/api'

const fetchCategories = async () => {
  const { data } = await api.get('/products/categories')
  return data.data.categories
}

// ── Empty variant template ────────────────────────────────────────────────────
const emptyVariant = () => ({ label: '', price: '', mrp: '', stockQuantity: '', sku: '' })

// ── Empty product form state ──────────────────────────────────────────────────
const emptyForm = () => ({
  name: '',
  slug: '',
  category: '',
  shortDescription: '',
  longDescription: '',
  images: [''],
  variants: [emptyVariant()],
  ingredients: [''],
  benefits: [''],
  usageInstructions: '',
  tags: '',
  isFeatured: false,
  isNewArrival: false,
  isBestSeller: false,
  seoTitle: '',
  seoDescription: '',
})

// ── Auto-generate slug from name ──────────────────────────────────────────────
const toSlug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// ── Product Form (used for both create and edit) ──────────────────────────────
function ProductForm({ initial, categories, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(initial)

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const setVariant = (i, field, value) => {
    const variants = [...form.variants]
    variants[i] = { ...variants[i], [field]: value }
    setForm((f) => ({ ...f, variants }))
  }

  const addVariant = () => setForm((f) => ({ ...f, variants: [...f.variants, emptyVariant()] }))

  const removeVariant = (i) =>
    setForm((f) => ({ ...f, variants: f.variants.filter((_, idx) => idx !== i) }))

  const setArrayItem = (field, i, value) => {
    const arr = [...form[field]]
    arr[i] = value
    setForm((f) => ({ ...f, [field]: arr }))
  }

  const addArrayItem = (field) =>
    setForm((f) => ({ ...f, [field]: [...f[field], ''] }))

  const removeArrayItem = (field, i) =>
    setForm((f) => ({ ...f, [field]: f[field].filter((_, idx) => idx !== i) }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Clean up before sending
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      images: form.images.filter(Boolean),
      ingredients: form.ingredients.filter(Boolean),
      benefits: form.benefits.filter(Boolean),
      variants: form.variants.map((v) => ({
        ...v,
        price: Number(v.price),
        mrp: Number(v.mrp),
        stockQuantity: Number(v.stockQuantity),
      })),
    }
    onSubmit(payload)
  }

  const inputCls = 'w-full px-3 py-2 text-sm border border-coconut-200 rounded-xl bg-white text-coconut-900 focus:outline-none focus:ring-2 focus:ring-leaf-500/50'
  const labelCls = 'block text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Product Name *</label>
          <input
            className={inputCls} value={form.name} required
            onChange={(e) => {
              set('name', e.target.value)
              set('slug', toSlug(e.target.value))
            }}
          />
        </div>
        <div>
          <label className={labelCls}>Slug *</label>
          <input className={inputCls} value={form.slug} required onChange={(e) => set('slug', e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Category *</label>
        <select className={inputCls} value={form.category} required onChange={(e) => set('category', e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls}>Short Description *</label>
        <input className={inputCls} value={form.shortDescription} required onChange={(e) => set('shortDescription', e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>Long Description *</label>
        <textarea className={inputCls} rows={4} value={form.longDescription} required onChange={(e) => set('longDescription', e.target.value)} />
      </div>

      {/* Images */}
      <div>
        <label className={labelCls}>Image URLs</label>
        {form.images.map((img, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className={inputCls} placeholder="https://..." value={img}
              onChange={(e) => setArrayItem('images', i, e.target.value)}
            />
            {form.images.length > 1 && (
              <button type="button" onClick={() => removeArrayItem('images', i)}
                className="text-red-400 hover:text-red-600 px-2">✕</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('images')}
          className="text-xs text-leaf-600 hover:underline mt-1">+ Add image URL</button>
      </div>

      {/* Variants */}
      <div>
        <label className={labelCls}>Variants *</label>
        <div className="space-y-3">
          {form.variants.map((v, i) => (
            <div key={i} className="grid grid-cols-5 gap-2 items-end bg-coconut-50 p-3 rounded-xl">
              <div>
                <p className="text-xs text-coconut-400 mb-1">Label</p>
                <input className={inputCls} placeholder="e.g. 200ml" value={v.label}
                  onChange={(e) => setVariant(i, 'label', e.target.value)} />
              </div>
              <div>
                <p className="text-xs text-coconut-400 mb-1">Price ₹</p>
                <input className={inputCls} type="number" placeholder="0" value={v.price}
                  onChange={(e) => setVariant(i, 'price', e.target.value)} />
              </div>
              <div>
                <p className="text-xs text-coconut-400 mb-1">MRP ₹</p>
                <input className={inputCls} type="number" placeholder="0" value={v.mrp}
                  onChange={(e) => setVariant(i, 'mrp', e.target.value)} />
              </div>
              <div>
                <p className="text-xs text-coconut-400 mb-1">Stock</p>
                <input className={inputCls} type="number" placeholder="0" value={v.stockQuantity}
                  onChange={(e) => setVariant(i, 'stockQuantity', e.target.value)} />
              </div>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <p className="text-xs text-coconut-400 mb-1">SKU</p>
                  <input className={inputCls} placeholder="SKU" value={v.sku}
                    onChange={(e) => setVariant(i, 'sku', e.target.value)} />
                </div>
                {form.variants.length > 1 && (
                  <button type="button" onClick={() => removeVariant(i)}
                    className="text-red-400 hover:text-red-600 pb-2">✕</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addVariant}
          className="text-xs text-leaf-600 hover:underline mt-2">+ Add variant</button>
      </div>

      {/* Ingredients */}
      <div>
        <label className={labelCls}>Ingredients</label>
        {form.ingredients.map((ing, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className={inputCls} value={ing} placeholder="e.g. 100% Coconut"
              onChange={(e) => setArrayItem('ingredients', i, e.target.value)} />
            {form.ingredients.length > 1 && (
              <button type="button" onClick={() => removeArrayItem('ingredients', i)}
                className="text-red-400 hover:text-red-600 px-2">✕</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('ingredients')}
          className="text-xs text-leaf-600 hover:underline">+ Add ingredient</button>
      </div>

      {/* Benefits */}
      <div>
        <label className={labelCls}>Benefits</label>
        {form.benefits.map((b, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className={inputCls} value={b} placeholder="e.g. Rich in MCTs"
              onChange={(e) => setArrayItem('benefits', i, e.target.value)} />
            {form.benefits.length > 1 && (
              <button type="button" onClick={() => removeArrayItem('benefits', i)}
                className="text-red-400 hover:text-red-600 px-2">✕</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('benefits')}
          className="text-xs text-leaf-600 hover:underline">+ Add benefit</button>
      </div>

      <div>
        <label className={labelCls}>Usage Instructions</label>
        <textarea className={inputCls} rows={2} value={form.usageInstructions}
          onChange={(e) => set('usageInstructions', e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>Tags (comma-separated)</label>
        <input className={inputCls} placeholder="e.g. vegan, gluten-free, keto-friendly"
          value={form.tags} onChange={(e) => set('tags', e.target.value)} />
      </div>

      {/* Flags */}
      <div className="flex gap-6">
        {[['isFeatured', 'Featured'], ['isNewArrival', 'New Arrival'], ['isBestSeller', 'Bestseller']].map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form[key]}
              onChange={(e) => set(key, e.target.checked)}
              className="accent-leaf-600 w-4 h-4" />
            <span className="text-sm text-coconut-700">{label}</span>
          </label>
        ))}
      </div>

      {/* SEO */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>SEO Title</label>
          <input className={inputCls} value={form.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>SEO Description</label>
          <input className={inputCls} value={form.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 border-t border-coconut-100">
        <button type="submit" disabled={submitting}
          className="bg-coconut-800 text-white font-medium px-6 py-2.5 rounded-full hover:bg-coconut-900 transition-colors disabled:opacity-60">
          {submitting ? 'Saving...' : 'Save Product'}
        </button>
        <button type="button" onClick={onCancel}
          className="text-coconut-600 font-medium px-6 py-2.5 rounded-full hover:bg-coconut-100 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

// ── Main Products page ────────────────────────────────────────────────────────
function AdminProducts() {
  const queryClient = useQueryClient()
  const [view, setView] = useState('list') // 'list' | 'create' | 'edit'
  const [editingProduct, setEditingProduct] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['admin-products', page, search],
    queryFn: () => fetchProducts({ page, limit: 15, search: search || undefined }),
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/products/categories')
      return data.data?.categories ?? []
    },
  })

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-products'] })
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }

  const createMutation = useMutation({
    mutationFn: adminCreateProduct,
    onSuccess: () => { invalidate(); toast.success('Product created'); setView('list') },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create product'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => adminUpdateProduct(id, payload),
    onSuccess: () => { invalidate(); toast.success('Product updated'); setView('list') },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update product'),
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteProduct,
    onSuccess: () => { invalidate(); toast.success('Product deleted') },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete product'),
  })

  const handleEdit = (product) => {
    setEditingProduct({
      ...product,
      category: product.category?._id || product.category,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags,
      images: product.images?.length ? product.images : [''],
      ingredients: product.ingredients?.length ? product.ingredients : [''],
      benefits: product.benefits?.length ? product.benefits : [''],
    })
    setView('edit')
  }

  if (view === 'create') {
    return (
      <div className="p-6 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView('list')} className="text-coconut-400 hover:text-coconut-700">←</button>
          <h1 className="font-display text-2xl font-semibold text-coconut-900">Add New Product</h1>
        </div>
        <div className="bg-white rounded-2xl border border-coconut-100 p-6">
          <ProductForm
            initial={emptyForm()}
            categories={categories}
            onSubmit={(payload) => createMutation.mutate(payload)}
            onCancel={() => setView('list')}
            submitting={createMutation.isPending}
          />
        </div>
      </div>
    )
  }

  if (view === 'edit' && editingProduct) {
    return (
      <div className="p-6 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView('list')} className="text-coconut-400 hover:text-coconut-700">←</button>
          <h1 className="font-display text-2xl font-semibold text-coconut-900">Edit Product</h1>
        </div>
        <div className="bg-white rounded-2xl border border-coconut-100 p-6">
          <ProductForm
            initial={editingProduct}
            categories={categories}
            onSubmit={(payload) => updateMutation.mutate({ id: editingProduct._id, payload })}
            onCancel={() => setView('list')}
            submitting={updateMutation.isPending}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-coconut-900">Products</h1>
          <p className="text-coconut-500 text-sm mt-0.5">
            {productsData?.pagination?.total ?? '—'} total products
          </p>
        </div>
        <button
          onClick={() => setView('create')}
          className="bg-coconut-800 text-white font-medium px-5 py-2.5 rounded-full hover:bg-coconut-900 transition-colors text-sm"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          className="w-full max-w-sm px-4 py-2 text-sm border border-coconut-200 rounded-xl bg-white text-coconut-900 focus:outline-none focus:ring-2 focus:ring-leaf-500/50"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
        />
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-16 animate-pulse border border-coconut-100" />
          ))}
        </div>
      )}

      {!isLoading && (
        <>
          <div className="bg-white rounded-2xl border border-coconut-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-coconut-100 bg-coconut-50">
                  <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Product</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Category</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Variants</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Stock</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Flags</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {productsData?.products?.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-coconut-400">
                      No products found.
                    </td>
                  </tr>
                )}
                {productsData?.products?.map((product) => (
                  <tr key={product._id} className="border-b border-coconut-100 hover:bg-coconut-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-coconut-100 shrink-0"
                        />
                        <div>
                          <p className="text-sm font-medium text-coconut-900">{product.name}</p>
                          <p className="text-xs text-coconut-400">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-coconut-600">
                      {product.category?.name || '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-coconut-600">
                      {product.variants?.length} variant{product.variants?.length !== 1 ? 's' : ''}
                      <p className="text-xs text-coconut-400">From ₹{product.startingPrice}</p>
                    </td>
                    <td className="px-4 py-3">
                      {product.variants?.map((v) => (
                        <p key={v._id} className={`text-xs ${v.stockQuantity <= 5 ? 'text-red-500 font-medium' : 'text-coconut-600'}`}>
                          {v.label}: {v.stockQuantity}
                        </p>
                      ))}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {product.isBestSeller && <span className="text-xs bg-coconut-100 text-coconut-700 px-2 py-0.5 rounded-full">Bestseller</span>}
                        {product.isNewArrival && <span className="text-xs bg-leaf-100 text-leaf-700 px-2 py-0.5 rounded-full">New</span>}
                        {product.isFeatured && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Featured</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-sm text-leaf-600 hover:text-leaf-800 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
                              deleteMutation.mutate(product._id)
                            }
                          }}
                          className="text-sm text-red-400 hover:text-red-600 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {productsData?.pagination?.pages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm border border-coconut-200 rounded-xl text-coconut-700 hover:bg-coconut-50 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-coconut-500">
                Page {page} of {productsData.pagination.pages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(productsData.pagination.pages, p + 1))}
                disabled={page === productsData.pagination.pages}
                className="px-4 py-2 text-sm border border-coconut-200 rounded-xl text-coconut-700 hover:bg-coconut-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminProducts