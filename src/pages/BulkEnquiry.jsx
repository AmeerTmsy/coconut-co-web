import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'
import FormInput from '../components/FormInput'
import SEO from '../components/SEO'

const PRODUCTS = [
  'Virgin Coconut Oil',
  'Wood-Pressed Coconut Oil',
  'Coconut MCT Oil',
  'Coconut Protein Bars',
  'Coconut Sugar',
  'Coconut Chips',
  'Coconut Flour',
  'Coconut Milk',
  'Gift Boxes / Hampers',
  'Multiple Products',
  'Other',
]

function BulkEnquiry() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await api.post('/enquiry', { ...data, type: 'bulk' })
      toast.success('Enquiry submitted! We\'ll get back to you within 24 hours.')
      reset()
      setSubmitted(true)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
        <SEO title="Bulk Order Enquiry" description="Order Coconut Co. products in bulk for your business, restaurant, hotel, or corporate gifting. Special pricing available." url="/bulk-enquiry" />
      {/* Hero */}
      <section className="bg-coconut-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-leaf-400 text-sm font-medium mb-3">For Businesses & Institutions</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white">
            Bulk Order Enquiry
          </h1>
          <p className="text-coconut-300 text-lg mt-4 max-w-2xl">
            Looking to order 50+ units for your business, restaurant, hotel, or corporate gifting? We offer special pricing, custom packaging, and dedicated account management.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-coconut-800 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: '💰', label: 'Volume Discounts', desc: 'Up to 30% off on large orders' },
              { icon: '📦', label: 'Custom Packaging', desc: 'Your brand, our product' },
              { icon: '🚚', label: 'Priority Dispatch', desc: 'Dedicated fulfilment lane' },
              { icon: '🤝', label: 'Account Manager', desc: 'Dedicated point of contact' },
            ].map((b) => (
              <div key={b.label}>
                <div className="text-2xl mb-2">{b.icon}</div>
                <p className="text-white text-sm font-medium">{b.label}</p>
                <p className="text-coconut-400 text-xs mt-0.5">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="bg-leaf-50 border border-leaf-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-leaf-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-leaf-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-semibold text-coconut-900 mb-2">
              Enquiry Received!
            </h2>
            <p className="text-coconut-600 mb-6">
              Our bulk orders team will review your requirements and get back to you within 24 hours on working days.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-leaf-600 font-medium hover:underline text-sm"
            >
              Submit another enquiry
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-coconut-100 p-8">
              <h2 className="font-display text-xl font-semibold text-coconut-900 mb-6">
                Tell Us About Your Requirements
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Your Name *"
                    error={errors.name?.message}
                    {...register('name', { required: 'Required' })}
                  />
                  <FormInput
                    label="Company / Organisation"
                    {...register('company')}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Email Address *"
                    type="email"
                    error={errors.email?.message}
                    {...register('email', { required: 'Required' })}
                  />
                  <FormInput
                    label="Phone Number *"
                    error={errors.phone?.message}
                    {...register('phone', { required: 'Required' })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-coconut-700 mb-1.5">
                    Products of Interest *
                  </label>
                  <select
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-coconut-900 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 ${errors.products ? 'border-red-400' : 'border-coconut-200'}`}
                    {...register('products', { required: 'Please select a product' })}
                  >
                    <option value="">Select a product</option>
                    {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.products && (
                    <p className="text-red-500 text-xs mt-1">{errors.products.message}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Approximate Quantity"
                    placeholder="e.g. 500 units / month"
                    {...register('quantity')}
                  />
                  <FormInput
                    label="Delivery Location"
                    placeholder="e.g. Mumbai, Maharashtra"
                    {...register('deliveryLocation')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-coconut-700 mb-1.5">
                    Additional Requirements *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your use case, any custom packaging requirements, frequency of orders, or anything else relevant..."
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-coconut-900 placeholder:text-coconut-300 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 resize-none ${errors.message ? 'border-red-400' : 'border-coconut-200'}`}
                    {...register('message', { required: 'Please describe your requirements' })}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-coconut-800 text-white font-medium py-3 rounded-full hover:bg-coconut-900 transition-colors disabled:opacity-60"
                >
                  {submitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-coconut-50 rounded-2xl p-6 border border-coconut-100">
                <h3 className="font-semibold text-coconut-900 mb-3">Who Orders in Bulk?</h3>
                <div className="space-y-2 text-sm text-coconut-600">
                  {[
                    '🏨 Hotels & Resorts',
                    '🍽️ Restaurants & Cafes',
                    '🏥 Hospitals & Clinics',
                    '🏢 Corporate Offices',
                    '🎁 Event Planners',
                    '🛒 Retail Stores',
                  ].map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>

              <div className="bg-coconut-50 rounded-2xl p-6 border border-coconut-100">
                <h3 className="font-semibold text-coconut-900 mb-3">Need Help?</h3>
                <p className="text-sm text-coconut-600 mb-4">
                  Our bulk orders team is available Monday to Saturday, 9am–6pm IST.
                </p>
                <p className="text-sm font-medium text-coconut-800">📞 +91 98765 43210</p>
                <p className="text-sm font-medium text-coconut-800 mt-1">✉️ bulk@coconutco.in</p>
              </div>

              <div className="bg-leaf-50 rounded-2xl p-6 border border-leaf-100">
                <p className="text-sm font-medium text-leaf-800 mb-1">Looking to distribute?</p>
                <p className="text-sm text-leaf-700 mb-3">
                  If you're interested in becoming a distributor, we have a separate programme for that.
                </p>
                <Link
                  to="/distributor-enquiry"
                  className="text-sm text-leaf-600 font-medium hover:underline"
                >
                  Distributor Enquiry →
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default BulkEnquiry