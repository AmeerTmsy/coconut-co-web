import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { fetchAddresses, addAddress, updateAddress, deleteAddress } from '../services/userService'
import { fetchMyOrders, cancelOrder } from '../services/orderService'
import AddressForm from '../components/AddressForm'

// ─── Order status badge colours ───────────────────────────────────────────────
const statusStyles = {
  Placed:             'bg-blue-100 text-blue-700',
  Confirmed:          'bg-indigo-100 text-indigo-700',
  Packed:             'bg-yellow-100 text-yellow-700',
  Shipped:            'bg-orange-100 text-orange-700',
  'Out for Delivery': 'bg-amber-100 text-amber-700',
  Delivered:          'bg-leaf-100 text-leaf-700',
  Cancelled:          'bg-red-100 text-red-600',
  'Return Requested': 'bg-purple-100 text-purple-700',
  Refunded:           'bg-gray-100 text-gray-600',
}

// ─── Orders tab ───────────────────────────────────────────────────────────────
function OrdersTab() {
  const queryClient = useQueryClient()

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: fetchMyOrders,
  })

  const cancelMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-orders'] })
      toast.success('Order cancelled')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not cancel order'),
  })

  if (isLoading) return <p className="text-coconut-500">Loading orders...</p>

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-coconut-500 mb-4">You haven't placed any orders yet.</p>
        <Link
          to="/shop"
          className="inline-block bg-coconut-800 text-white font-medium px-6 py-2.5 rounded-full hover:bg-coconut-900 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order._id} className="bg-white border border-coconut-100 rounded-2xl p-5">
          {/* Order header */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-semibold text-coconut-900">#{order.orderNumber}</p>
              <p className="text-xs text-coconut-400 mt-0.5">
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[order.status] || 'bg-gray-100 text-gray-600'}`}>
                {order.status}
              </span>
              <span className="font-semibold text-coconut-900">₹{order.total}</span>
            </div>
          </div>

          {/* Items */}
          <div className="mt-4 space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover bg-coconut-50 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-coconut-900 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-coconut-500">{item.variantLabel} × {item.quantity}</p>
                </div>
                <p className="text-sm text-coconut-700 shrink-0">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Footer — payment method + cancel */}
          <div className="mt-4 pt-4 border-t border-coconut-100 flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-coconut-500">
              Payment: <span className="font-medium text-coconut-700">{order.paymentMethod}</span>
              {' · '}
              <span className={order.paymentStatus === 'paid' ? 'text-leaf-600' : 'text-amber-600'}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </span>
            </p>

            {['Placed', 'Confirmed'].includes(order.status) && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to cancel this order?')) {
                    cancelMutation.mutate(order._id)
                  }
                }}
                disabled={cancelMutation.isPending}
                className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Addresses tab ────────────────────────────────────────────────────────────
function AddressesTab() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: fetchAddresses,
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['addresses'] })

  const addMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => { invalidate(); toast.success('Address added'); setShowForm(false) },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to add address'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateAddress(id, payload),
    onSuccess: () => { invalidate(); toast.success('Address updated'); setEditingAddress(null) },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update address'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => { invalidate(); toast.success('Address removed') },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to remove address'),
  })

  if (isLoading) return <p className="text-coconut-500">Loading addresses...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-coconut-600 text-sm">{addresses.length} saved address{addresses.length !== 1 ? 'es' : ''}</p>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-leaf-600 font-medium text-sm hover:underline"
          >
            + Add New Address
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-coconut-50 rounded-2xl p-5 mb-6 border border-coconut-100">
          <AddressForm
            onSubmit={(data) => addMutation.mutate(data)}
            onCancel={() => setShowForm(false)}
            submitting={addMutation.isPending}
          />
        </div>
      )}

      {addresses.length === 0 && !showForm && (
        <p className="text-coconut-500">No saved addresses yet.</p>
      )}

      <div className="space-y-3">
        {addresses.map((addr) => (
          <div key={addr._id} className="bg-white border border-coconut-100 rounded-2xl p-5">
            {editingAddress === addr._id ? (
              <AddressForm
                defaultValues={addr}
                onSubmit={(data) => updateMutation.mutate({ id: addr._id, payload: data })}
                onCancel={() => setEditingAddress(null)}
                submitting={updateMutation.isPending}
              />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-coconut-100 text-coconut-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-leaf-600 text-xs font-medium">Default</span>
                  )}
                </div>
                <p className="font-medium text-coconut-900 mt-2">{addr.fullName}</p>
                <p className="text-coconut-600 text-sm">{addr.phone}</p>
                <p className="text-coconut-600 text-sm mt-1">
                  {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => setEditingAddress(addr._id)}
                    className="text-sm text-coconut-600 hover:text-coconut-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(addr._id)}
                    className="text-sm text-coconut-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Account page ────────────────────────────────────────────────────────
function Account() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('orders')

  const tabs = [
    { id: 'orders', label: 'My Orders' },
    { id: 'addresses', label: 'Addresses' },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-coconut-200 flex items-center justify-center shrink-0">
          <span className="font-display text-xl font-semibold text-coconut-800">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-coconut-900">{user?.name}</h1>
          <p className="text-coconut-500 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-coconut-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-coconut-900 border-b-2 border-coconut-800'
                : 'text-coconut-500 hover:text-coconut-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'orders' && <OrdersTab />}
      {activeTab === 'addresses' && <AddressesTab />}
    </div>
  )
}

export default Account