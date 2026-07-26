import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartItemRow({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-5 border-b border-coconut-100 last:border-b-0">
      <Link to={`/product/${item.slug}`} className="w-20 h-20 rounded-xl overflow-hidden bg-coconut-50 shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.slug}`} className="font-medium text-coconut-900 hover:text-leaf-600 transition-colors">
          {item.name}
        </Link>
        <p className="text-sm text-coconut-500 mt-0.5">{item.variantLabel}</p>
        <p className="text-coconut-900 font-medium mt-1">₹{item.price}</p>

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-coconut-300 rounded-full">
            <button
              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-coconut-700 hover:text-coconut-900"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.variantId, Math.min(item.stockQuantity, item.quantity + 1))}
              className="w-8 h-8 flex items-center justify-center text-coconut-700 hover:text-coconut-900"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.productId, item.variantId)}
            className="text-sm text-coconut-400 hover:text-red-500 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="font-semibold text-coconut-900">₹{item.price * item.quantity}</p>
      </div>
    </div>
  )
}

function Cart() {
  const { items, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold text-coconut-900 mb-3">Your cart is empty</h1>
        <p className="text-coconut-600 mb-6">Looks like you haven't added any coconut goodness yet.</p>
        <Link
          to="/shop"
          className="inline-block bg-coconut-800 text-white font-medium px-6 py-3 rounded-full hover:bg-coconut-900 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  // Placeholder shipping logic — flat fee, free above ₹999. Adjust later from admin settings.
  const shipping = subtotal >= 999 ? 0 : 49
  const total = subtotal + shipping

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-semibold text-coconut-900 mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 bg-white rounded-2xl border border-coconut-100 px-5">
          {items.map((item) => (
            <CartItemRow key={`${item.productId}-${item.variantId}`} item={item} />
          ))}
        </div>

        <div className="bg-coconut-50 rounded-2xl border border-coconut-100 p-6 h-fit">
          <h2 className="font-display text-lg font-semibold text-coconut-900 mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm text-coconut-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-leaf-600 pt-1">
                Add ₹{999 - subtotal} more for free shipping
              </p>
            )}
          </div>

          <div className="border-t border-coconut-200 mt-4 pt-4 flex justify-between font-semibold text-coconut-900">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center bg-coconut-800 text-white font-medium py-3 rounded-full hover:bg-coconut-900 transition-colors mt-6"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart