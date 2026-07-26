import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchOrderById } from '../services/orderService'

function OrderConfirmation() {
  const { id } = useParams()

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id),
  })

  if (isLoading) return <div className="max-w-2xl mx-auto px-4 py-20 text-center text-coconut-500">Loading your order...</div>

  if (isError || !order) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-coconut-600">Order not found.</p>
      <Link to="/" className="text-leaf-600 hover:underline mt-4 inline-block">Go Home</Link>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-leaf-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-leaf-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-semibold text-coconut-900">Order Confirmed!</h1>
        <p className="text-coconut-600 mt-2">Thank you for your order. We'll get it to you soon.</p>
        <p className="text-coconut-500 text-sm mt-1">Order #{order.orderNumber}</p>
      </div>

      <div className="bg-white border border-coconut-100 rounded-2xl p-6 space-y-6">
        {/* Items */}
        <div>
          <h2 className="font-semibold text-coconut-900 mb-3">Items Ordered</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-coconut-100" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-coconut-900">{item.name}</p>
                  <p className="text-xs text-coconut-500">{item.variantLabel} × {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery address */}
        <div className="border-t border-coconut-100 pt-4">
          <h2 className="font-semibold text-coconut-900 mb-2">Delivering To</h2>
          <p className="text-sm text-coconut-700">{order.shippingAddress.fullName}</p>
          <p className="text-sm text-coconut-600">{order.shippingAddress.phone}</p>
          <p className="text-sm text-coconut-600">
            {order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ''},
            {' '}{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
          </p>
        </div>

        {/* Price summary */}
        <div className="border-t border-coconut-100 pt-4 space-y-1 text-sm text-coconut-700">
          <div className="flex justify-between">
            <span>Subtotal</span><span>₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shippingFee === 0 ? 'Free' : `₹${order.shippingFee}`}</span>
          </div>
          <div className="flex justify-between font-semibold text-coconut-900 pt-1 border-t border-coconut-100 mt-2">
            <span>Total</span><span>₹{order.total}</span>
          </div>
        </div>

        {/* Payment + status */}
        <div className="border-t border-coconut-100 pt-4 flex items-center justify-between text-sm">
          <span className="text-coconut-600">Payment: <span className="font-medium text-coconut-800">{order.paymentMethod}</span></span>
          <span className="bg-leaf-100 text-leaf-700 font-medium px-3 py-1 rounded-full">{order.status}</span>
        </div>
      </div>

      <div className="flex gap-4 mt-8 justify-center">
        <Link to="/shop" className="bg-coconut-800 text-white font-medium px-6 py-3 rounded-full hover:bg-coconut-900 transition-colors">
          Continue Shopping
        </Link>
        <Link to="/account" className="border border-coconut-300 text-coconut-700 font-medium px-6 py-3 rounded-full hover:bg-coconut-50 transition-colors">
          View My Orders
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation