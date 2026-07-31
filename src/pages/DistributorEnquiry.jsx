import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'
import FormInput from '../components/FormInput'
import SEO from '../components/SEO'

const REGIONS = [
    'North India', 'South India', 'East India', 'West India',
    'Central India', 'North-East India', 'Pan India',
]

const INVESTMENT_RANGES = [
    'Under ₹5 Lakhs',
    '₹5–10 Lakhs',
    '₹10–25 Lakhs',
    '₹25–50 Lakhs',
    'Above ₹50 Lakhs',
]

function DistributorEnquiry() {
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = async (data) => {
        setSubmitting(true)
        try {
            await api.post('/enquiry', { ...data, type: 'distributor' })
            toast.success('Enquiry submitted! Our partnerships team will be in touch soon.')
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
            <SEO title="Become a Distributor" description="Join Coconut Co.'s growing distributor network across India. Attractive margins, marketing support, and exclusive territories." url="/distributor-enquiry" />
            <section className="bg-coconut-900 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-leaf-400 text-sm font-medium mb-3">Grow With Us</p>
                    <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white">
                        Become a Distributor
                    </h1>
                    <p className="text-coconut-300 text-lg mt-4 max-w-2xl">
                        Join our growing network of distribution partners across India. We provide full support, competitive margins, and marketing materials to help you succeed.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="bg-coconut-800 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        {[
                            { icon: '📈', label: 'Attractive Margins', desc: 'Competitive trade pricing' },
                            { icon: '🎯', label: 'Marketing Support', desc: 'Collaterals & campaigns' },
                            { icon: '🏆', label: 'Exclusive Territory', desc: 'Protected sales zones' },
                            { icon: '📋', label: 'Full Onboarding', desc: 'Training & documentation' },
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
                            Application Received!
                        </h2>
                        <p className="text-coconut-600 mb-6">
                            Our partnerships team will review your application and contact you within 2–3 business days.
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
                                Distributor Application
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormInput
                                        label="Your Name *"
                                        error={errors.name?.message}
                                        {...register('name', { required: 'Required' })}
                                    />
                                    <FormInput
                                        label="Company Name"
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

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-coconut-700 mb-1.5">
                                            Preferred Region *
                                        </label>
                                        <select
                                            className={`w-full px-4 py-2.5 rounded-xl border bg-white text-coconut-900 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 ${errors.region ? 'border-red-400' : 'border-coconut-200'}`}
                                            {...register('region', { required: 'Required' })}
                                        >
                                            <option value="">Select region</option>
                                            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                        {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-coconut-700 mb-1.5">
                                            Investment Capacity
                                        </label>
                                        <select
                                            className="w-full px-4 py-2.5 rounded-xl border border-coconut-200 bg-white text-coconut-900 focus:outline-none focus:ring-2 focus:ring-leaf-500/50"
                                            {...register('investmentCapacity')}
                                        >
                                            <option value="">Select range</option>
                                            {INVESTMENT_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <FormInput
                                    label="Current Business / Background"
                                    placeholder="e.g. FMCG distributor with 5 years experience in South India"
                                    {...register('currentBusiness')}
                                />

                                <div>
                                    <label className="block text-sm font-medium text-coconut-700 mb-1.5">
                                        Why do you want to distribute Coconut Co.? *
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about your distribution network, experience, and why you think Coconut Co. is a good fit..."
                                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-coconut-900 placeholder:text-coconut-300 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 resize-none ${errors.message ? 'border-red-400' : 'border-coconut-200'}`}
                                        {...register('message', { required: 'This field is required' })}
                                    />
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-coconut-800 text-white font-medium py-3 rounded-full hover:bg-coconut-900 transition-colors disabled:opacity-60"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </form>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-coconut-50 rounded-2xl p-6 border border-coconut-100">
                                <h3 className="font-semibold text-coconut-900 mb-3">What We Look For</h3>
                                <div className="space-y-2 text-sm text-coconut-600">
                                    {[
                                        '✓ Established distribution network',
                                        '✓ Experience in FMCG / food sector',
                                        '✓ Storage and logistics capability',
                                        '✓ Passion for natural products',
                                        '✓ Long-term commitment',
                                    ].map((item) => (
                                        <p key={item}>{item}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-coconut-50 rounded-2xl p-6 border border-coconut-100">
                                <h3 className="font-semibold text-coconut-900 mb-2">Questions?</h3>
                                <p className="text-sm text-coconut-600 mb-3">
                                    Talk to our partnerships team directly.
                                </p>
                                <p className="text-sm font-medium text-coconut-800">📞 +91 98765 43210</p>
                                <p className="text-sm font-medium text-coconut-800 mt-1">✉️ partners@coconutco.in</p>
                            </div>

                            <div className="bg-leaf-50 rounded-2xl p-6 border border-leaf-100">
                                <p className="text-sm font-medium text-leaf-800 mb-1">Need bulk quantities instead?</p>
                                <Link
                                    to="/bulk-enquiry"
                                    className="text-sm text-leaf-600 font-medium hover:underline"
                                >
                                    Bulk Order Enquiry →
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default DistributorEnquiry