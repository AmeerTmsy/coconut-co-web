import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchAllOrders, updateOrderStatus } from '../../services/adminService'

const ALL_STATUSES = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Return Requested', 'Refunded']

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

function OrderRow({ order, onStatusChange, updating }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <tr
        className="border-b border-coconut-100 hover:bg-coconut-50 cursor-pointer transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <td className="px-4 py-3 text-sm font-medium text-coconut-900">
          #{order.orderNumber}
        </td>
        <td className="px-4 py-3 text-sm text-coconut-700">
          <p>{order.user?.name || 'Unknown'}</p>
          <p className="text-xs text-coconut-400">{order.user?.email}</p>
        </td>
        <td className="px-4 py-3 text-sm text-coconut-700">
          {new Date(order.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
          })}
        </td>
        <td className="px-4 py-3 text-sm font-semibold text-coconut-900">
          ₹{order.total}
        </td>
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order._id, e.target.value)}
            disabled={updating}
            className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-leaf-500/50 ${statusStyles[order.status] || 'bg-gray-100 text-gray-600'}`}
          >
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </td>
        <td className="px-4 py-3 text-xs text-coconut-400">
          {order.paymentMethod} · {order.paymentStatus}
        </td>
        <td className="px-4 py-3 text-coconut-400 text-sm">
          {expanded ? '▲' : '▼'}
        </td>
      </tr>

      {/* Expanded order items */}
      {expanded && (
        <tr className="bg-coconut-50 border-b border-coconut-100">
          <td colSpan={7} className="px-6 py-4">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Items */}
              <div>
                <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-2">Items</p>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-coconut-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-coconut-900 truncate">{item.name}</p>
                        <p className="text-xs text-coconut-500">{item.variantLabel} × {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-coconut-800 shrink-0">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping address */}
              <div>
                <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-2">Ship To</p>
                <p className="text-sm font-medium text-coconut-900">{order.shippingAddress.fullName}</p>
                <p className="text-sm text-coconut-600">{order.shippingAddress.phone}</p>
                <p className="text-sm text-coconut-600 mt-1">
                  {order.shippingAddress.line1}
                  {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ''},
                  {' '}{order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
                </p>

                {/* Price breakdown */}
                <div className="mt-3 text-sm space-y-1">
                  <div className="flex justify-between text-coconut-600">
                    <span>Subtotal</span><span>₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-coconut-600">
                    <span>Shipping</span>
                    <span>{order.shippingFee === 0 ? 'Free' : `₹${order.shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-coconut-900 border-t border-coconut-200 pt-1 mt-1">
                    <span>Total</span><span>₹{order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

function Orders() {
  const queryClient = useQueryClient()
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [updatingId, setUpdatingId] = useState(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-orders', statusFilter, page],
    queryFn: () => fetchAllOrders({ status: statusFilter || undefined, page }),
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onMutate: ({ id }) => setUpdatingId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      toast.success('Order status updated')
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
    onSettled: () => setUpdatingId(null),
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-coconut-900">Orders</h1>
          <p className="text-coconut-500 text-sm mt-0.5">
            {data?.pagination?.total ?? '—'} total orders
          </p>
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="text-sm border border-coconut-200 rounded-xl px-3 py-2 bg-white text-coconut-700 focus:outline-none focus:ring-2 focus:ring-leaf-500/50"
        >
          <option value="">All Statuses</option>
          {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-14 animate-pulse border border-coconut-100" />
          ))}
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
          Failed to load orders.
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="bg-white rounded-2xl border border-coconut-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-coconut-100 bg-coconut-50">
                    <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Order</th>
                    <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Customer</th>
                    <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Total</th>
                    <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-coconut-500 uppercase tracking-wide">Payment</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders?.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-coconut-400">
                        No orders found.
                      </td>
                    </tr>
                  )}
                  {data?.orders?.map((order) => (
                    <OrderRow
                      key={order._id}
                      order={order}
                      onStatusChange={(id, status) => statusMutation.mutate({ id, status })}
                      updating={updatingId === order._id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {data?.pagination?.pages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm border border-coconut-200 rounded-xl text-coconut-700 hover:bg-coconut-50 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-coconut-500">
                Page {page} of {data.pagination.pages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.pagination.pages, p + 1))}
                disabled={page === data.pagination.pages}
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

export default Orders