import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'
import { fetchAddresses, addAddress } from '../services/userService'
import { createOrder } from '../services/orderService'
import AddressForm from '../components/AddressForm'
import { useRazorpay } from '../hooks/useRazorpay'

function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { initiatePayment } = useRazorpay()
  const navigate = useNavigate()
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [addingAddress, setAddingAddress] = useState(false)

  const shippingFee = subtotal >= 999 ? 0 : 49
  const total = subtotal + shippingFee

  const { data: addresses = [], isLoading: loadingAddresses, refetch: refetchAddresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: fetchAddresses,
    onSuccess: (data) => {
      // Auto-select the default address if none is selected yet
      if (!selectedAddressId && data.length > 0) {
        const def = data.find((a) => a.isDefault) || data[0]
        setSelectedAddressId(def._id)
      }
    },
  })

  // Auto-select default address once loaded
  if (!selectedAddressId && addresses.length > 0) {
    const def = addresses.find((a) => a.isDefault) || addresses[0]
    setSelectedAddressId(def._id)
  }

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      clearCart()
      toast.success('Order placed successfully!')
      navigate(`/order-confirmation/${order._id}`)
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to place order. Please try again.')
    },
  })

  const handleAddAddress = async (formData) => {
    setAddingAddress(true)
    try {
      const updated = await addAddress(formData)
      await refetchAddresses()
      const newest = updated[updated.length - 1]
      setSelectedAddressId(newest._id)
      setShowNewAddressForm(false)
      toast.success('Address added')
    } catch {
      toast.error('Failed to add address')
    } finally {
      setAddingAddress(false)
    }
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error('Please select a delivery address')
      return
    }
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    const address = addresses.find((a) => a._id === selectedAddressId)
    if (!address) {
      toast.error('Selected address not found')
      return
    }

    const shippingAddress = {
      fullName: address.fullName,
      phone: address.phone,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    }

    const cartItems = items.map((i) => ({
      productId: i.productId,
      variantId: i.variantId,
      quantity: i.quantity,
    }))

    if (paymentMethod === 'COD') {
      // COD flow — same as before
      orderMutation.mutate({
        items: cartItems,
        shippingAddress,
        paymentMethod: 'COD',
      })
    } else {
      // Online payment flow — open Razorpay popup
      initiatePayment({
        amount: total,
        items: cartItems,
        shippingAddress,
        onSuccess: (order) => {
          clearCart()
          toast.success('Payment successful! Order confirmed.')
          navigate(`/order-confirmation/${order._id}`)
        },
        onError: (message) => {
          toast.error(message)
        },
      })
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold text-coconut-900 mb-3">Nothing to checkout</h1>
        <p className="text-coconut-600 mb-6">Your cart is empty.</p>
        <a href="/shop" className="inline-block bg-coconut-800 text-white font-medium px-6 py-3 rounded-full hover:bg-coconut-900 transition-colors">
          Back to Shop
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-semibold text-coconut-900 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Left column — address + payment */}
        <div className="md:col-span-2 space-y-8">

          {/* Delivery address */}
          <section>
            <h2 className="font-display text-xl font-semibold text-coconut-900 mb-4">Delivery Address</h2>

            {loadingAddresses && <p className="text-coconut-500">Loading addresses...</p>}

            <div className="space-y-3">
              {addresses.map((addr) => (
                <label
                  key={addr._id}
                  className={`flex gap-4 p-4 rounded-2xl border cursor-pointer transition-colors ${selectedAddressId === addr._id
                      ? 'border-coconut-800 bg-coconut-50'
                      : 'border-coconut-100 bg-white hover:border-coconut-300'
                    }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr._id}
                    checked={selectedAddressId === addr._id}
                    onChange={() => setSelectedAddressId(addr._id)}
                    className="mt-1 accent-coconut-800"
                  />
                  <div>
                    <p className="font-medium text-coconut-900">{addr.fullName}
                      <span className="ml-2 text-xs bg-coconut-100 text-coconut-600 px-2 py-0.5 rounded-full">{addr.label}</span>
                      {addr.isDefault && <span className="ml-2 text-xs text-leaf-600 font-medium">Default</span>}
                    </p>
                    <p className="text-sm text-coconut-600 mt-0.5">{addr.phone}</p>
                    <p className="text-sm text-coconut-600">
                      {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {!showNewAddressForm ? (
              <button
                onClick={() => setShowNewAddressForm(true)}
                className="mt-4 text-leaf-600 font-medium text-sm hover:underline"
              >
                + Add a new address
              </button>
            ) : (
              <div className="mt-4 bg-coconut-50 rounded-2xl p-5 border border-coconut-100">
                <h3 className="font-medium text-coconut-900 mb-4">New Address</h3>
                <AddressForm
                  onSubmit={handleAddAddress}
                  onCancel={() => setShowNewAddressForm(false)}
                  submitting={addingAddress}
                />
              </div>
            )}
          </section>

          {/* Payment method */}
          <section>
            <h2 className="font-display text-xl font-semibold text-coconut-900 mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className={`flex gap-4 p-4 rounded-2xl border cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-coconut-800 bg-coconut-50' : 'border-coconut-100 bg-white hover:border-coconut-300'
                }`}>
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 accent-coconut-800"
                />
                <div>
                  <p className="font-medium text-coconut-900">Cash on Delivery</p>
                  <p className="text-sm text-coconut-500">Pay when your order arrives</p>
                </div>
              </label>

              <label className={`flex gap-4 p-4 rounded-2xl border cursor-pointer transition-colors ${paymentMethod === 'ONLINE' ? 'border-coconut-800 bg-coconut-50' : 'border-coconut-100 bg-white hover:border-coconut-300'
                }`}>
                <input
                  type="radio"
                  name="payment"
                  value="ONLINE"
                  checked={paymentMethod === 'ONLINE'}
                  onChange={() => setPaymentMethod('ONLINE')}
                  className="mt-1 accent-coconut-800"
                />
                <div>
                  <p className="font-medium text-coconut-900">Pay Online</p>
                  <p className="text-sm text-coconut-500">UPI, cards, netbanking, wallets (Razorpay)</p>
                </div>
              </label>
            </div>

            {/* {paymentMethod === 'ONLINE' && (
              <div className="mt-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl p-3 text-sm">
                Online payment integration coming soon — please use Cash on Delivery for now.
              </div>
            )} */}
          </section>
        </div>

        {/* Right column — order summary */}
        <div className="bg-coconut-50 rounded-2xl border border-coconut-100 p-6 h-fit">
          <h2 className="font-display text-lg font-semibold text-coconut-900 mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-coconut-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-coconut-900 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-coconut-500">{item.variantLabel} × {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-coconut-900 shrink-0">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-coconut-200 pt-4 space-y-2 text-sm text-coconut-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee}`}</span>
            </div>
          </div>

          <div className="border-t border-coconut-200 mt-3 pt-3 flex justify-between font-semibold text-coconut-900">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={orderMutation.isPending}
            className="w-full mt-6 bg-coconut-800 text-white font-medium py-3 rounded-full hover:bg-coconut-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {orderMutation.isPending ? 'Placing Order...' : 'Place Order'}
          </button>

          {/* {paymentMethod === 'ONLINE' && (
            <p className="text-xs text-center text-coconut-400 mt-2">Switch to COD to place order now</p>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Checkout