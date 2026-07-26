import api from '../services/api'

export function useRazorpay() {
  const initiatePayment = async ({ amount, items, shippingAddress, onSuccess, onError }) => {
    try {
      // Step 1: ask our backend to create a Razorpay order
      const { data } = await api.post('/orders/create-razorpay-order', { amount })
      const { orderId, keyId } = data.data

      // Step 2: open the Razorpay payment popup
      const options = {
        key: keyId,
        amount: amount * 100,
        currency: 'INR',
        name: 'Coconut Co.',
        description: 'Pure Coconut Products',
        order_id: orderId,

        // Step 3: this runs when the customer successfully pays
        handler: async (response) => {
          try {
            const verifyRes = await api.post('/orders/verify-payment', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              items,
              shippingAddress,
            })
            onSuccess(verifyRes.data.data.order)
          } catch (err) {
            onError(err.response?.data?.message || 'Payment verification failed')
          }
        },

        prefill: {
          name: shippingAddress.fullName,
          contact: shippingAddress.phone,
        },

        theme: {
          color: '#4A341D', // coconut-800 from our palette
        },

        modal: {
          ondismiss: () => {
            onError('Payment was cancelled')
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      onError(err.response?.data?.message || 'Could not initiate payment')
    }
  }

  return { initiatePayment }
}