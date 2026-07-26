import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '../../services/api'
import { adminCreateCategory, adminUpdateCategory, adminDeleteCategory } from '../../services/adminService'

const fetchCategories = async () => {
  const { data } = await api.get('/products/categories')
  return data.data.categories
}

const emptyForm = () => ({
  name: '',
  slug: '',
  description: '',
  image: '',
  displayOrder: 0,
})

const toSlug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function CategoryForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(initial)
  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))
  const inputCls = 'w-full px-3 py-2 text-sm border border-coconut-200 rounded-xl bg-white text-coconut-900 focus:outline-none focus:ring-2 focus:ring-leaf-500/50'
  const labelCls = 'block text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-1'

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form) }}
      className="space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Category Name *</label>
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
          <input
            className={inputCls} value={form.slug} required
            onChange={(e) => set('slug', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Description</label>
        <textarea
          className={inputCls} rows={2} value={form.description}
          onChange={(e) => set('description', e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Image URL</label>
          <input
            className={inputCls} placeholder="https://..." value={form.image}
            onChange={(e) => set('image', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Display Order</label>
          <input
            className={inputCls} type="number" value={form.displayOrder}
            onChange={(e) => set('displayOrder', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Image preview */}
      {form.image && (
        <div>
          <label className={labelCls}>Preview</label>
          <img
            src={form.image} alt="preview"
            className="w-24 h-24 object-cover rounded-xl border border-coconut-100"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>
      )}

      <div className="flex gap-3 pt-2 border-t border-coconut-100">
        <button
          type="submit" disabled={submitting}
          className="bg-coconut-800 text-white font-medium px-6 py-2.5 rounded-full hover:bg-coconut-900 transition-colors disabled:opacity-60"
        >
          {submitting ? 'Saving...' : 'Save Category'}
        </button>
        <button
          type="button" onClick={onCancel}
          className="text-coconut-600 font-medium px-6 py-2.5 rounded-full hover:bg-coconut-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function AdminCategories() {
  const queryClient = useQueryClient()
  const [view, setView] = useState('list') // 'list' | 'create' | 'edit'
  const [editingCategory, setEditingCategory] = useState(null)

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  }

  const createMutation = useMutation({
    mutationFn: adminCreateCategory,
    onSuccess: () => {
      invalidate()
      toast.success('Category created')
      setView('list')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create category'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => adminUpdateCategory(id, payload),
    onSuccess: () => {
      invalidate()
      toast.success('Category updated')
      setView('list')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update category'),
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteCategory,
    onSuccess: () => {
      invalidate()
      toast.success('Category deleted')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete category'),
  })

  if (view === 'create') {
    return (
      <div className="p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView('list')} className="text-coconut-400 hover:text-coconut-700">←</button>
          <h1 className="font-display text-2xl font-semibold text-coconut-900">Add New Category</h1>
        </div>
        <div className="bg-white rounded-2xl border border-coconut-100 p-6">
          <CategoryForm
            initial={emptyForm()}
            onSubmit={(payload) => createMutation.mutate(payload)}
            onCancel={() => setView('list')}
            submitting={createMutation.isPending}
          />
        </div>
      </div>
    )
  }

  if (view === 'edit' && editingCategory) {
    return (
      <div className="p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView('list')} className="text-coconut-400 hover:text-coconut-700">←</button>
          <h1 className="font-display text-2xl font-semibold text-coconut-900">Edit Category</h1>
        </div>
        <div className="bg-white rounded-2xl border border-coconut-100 p-6">
          <CategoryForm
            initial={editingCategory}
            onSubmit={(payload) => updateMutation.mutate({ id: editingCategory._id, payload })}
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
          <h1 className="font-display text-2xl font-semibold text-coconut-900">Categories</h1>
          <p className="text-coconut-500 text-sm mt-0.5">{categories.length} categories</p>
        </div>
        <button
          onClick={() => setView('create')}
          className="bg-coconut-800 text-white font-medium px-5 py-2.5 rounded-full hover:bg-coconut-900 transition-colors text-sm"
        >
          + Add Category
        </button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-16 animate-pulse border border-coconut-100" />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="bg-white rounded-2xl border border-coconut-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-coconut-100 bg-coconut-50">
                <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Category</th>
                <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Slug</th>
                <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Description</th>
                <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Order</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-coconut-400">
                    No categories yet.
                  </td>
                </tr>
              )}
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b border-coconut-100 hover:bg-coconut-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {cat.image ? (
                        <img
                          src={cat.image} alt={cat.name}
                          className="w-10 h-10 rounded-lg object-cover bg-coconut-100 shrink-0"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-coconut-100 shrink-0 flex items-center justify-center text-coconut-400 text-lg">
                          🗂️
                        </div>
                      )}
                      <p className="text-sm font-medium text-coconut-900">{cat.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-coconut-500 font-mono">{cat.slug}</td>
                  <td className="px-4 py-3 text-sm text-coconut-600 max-w-xs truncate">
                    {cat.description || '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-coconut-600">{cat.displayOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => { setEditingCategory(cat); setView('edit') }}
                        className="text-sm text-leaf-600 hover:text-leaf-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${cat.name}"? Products in this category will lose their category reference.`)) {
                            deleteMutation.mutate(cat._id)
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
      )}
    </div>
  )
}

export default AdminCategories