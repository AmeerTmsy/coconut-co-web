import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../services/api'
import FormInput from '../components/FormInput'
import SEO from '../components/SEO'

const SUBJECTS = [
    'Order enquiry',
    'Product question',
    'Bulk order',
    'Distributor enquiry',
    'Partnership',
    'Feedback',
    'Other',
]

function Contact() {
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = async (data) => {
        setSubmitting(true)
        try {
            await api.post('/contact', data)
            toast.success('Message sent! We\'ll get back to you within 24 hours.')
            reset()
            setSubmitted(true)
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <SEO title="Contact Us" description="Get in touch with the Coconut Co. team for orders, product questions, bulk enquiries, and more." url="/contact" />
            <div>
                {/* Hero */}
                <section className="bg-coconut-50 border-b border-coconut-100 py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-coconut-900">
                            Get in Touch
                        </h1>
                        <p className="text-coconut-600 text-lg mt-4 max-w-xl mx-auto">
                            Have a question about an order, a product, or just want to say hello? We'd love to hear from you.
                        </p>
                    </div>
                </section>

                <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Contact info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="font-display text-xl font-semibold text-coconut-900 mb-6">
                                    Contact Information
                                </h2>
                                <div className="space-y-5">
                                    {[
                                        {
                                            icon: '📍',
                                            label: 'Address',
                                            value: 'Coconut Co. Foods Pvt. Ltd.\nThrissur, Kerala — 680001\nIndia',
                                        },
                                        {
                                            icon: '📞',
                                            label: 'Phone',
                                            value: '+91 98765 43210\nMon–Sat, 9am–6pm IST',
                                        },
                                        {
                                            icon: '✉️',
                                            label: 'Email',
                                            value: 'hello@coconutco.in\nWe reply within 24 hours',
                                        },
                                    ].map((item) => (
                                        <div key={item.label} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-coconut-100 flex items-center justify-center text-lg shrink-0">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-1">
                                                    {item.label}
                                                </p>
                                                <p className="text-coconut-700 text-sm whitespace-pre-line leading-relaxed">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social links */}
                            <div>
                                <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-3">
                                    Follow Us
                                </p>
                                <div className="flex gap-3">
                                    {[
                                        { label: 'Instagram', icon: '📸', href: '#' },
                                        { label: 'Facebook', icon: '👍', href: '#' },
                                        { label: 'YouTube', icon: '▶️', href: '#' },
                                    ].map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            className="w-10 h-10 rounded-xl bg-coconut-100 hover:bg-coconut-200 flex items-center justify-center text-lg transition-colors"
                                            title={s.label}
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick links */}
                            <div>
                                <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-3">
                                    Quick Links
                                </p>
                                <div className="space-y-2">
                                    {[
                                        { label: 'Track my order', href: '/account' },
                                        { label: 'Return policy', href: '/refund-policy' },
                                        { label: 'Bulk orders', href: '/bulk-enquiry' },
                                        { label: 'FAQ', href: '/faq' },
                                    ].map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="block text-sm text-coconut-600 hover:text-leaf-600 transition-colors"
                                        >
                                            → {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact form */}
                        <div className="lg:col-span-2">
                            {submitted ? (
                                <div className="bg-leaf-50 border border-leaf-200 rounded-2xl p-10 text-center">
                                    <div className="w-16 h-16 bg-leaf-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-leaf-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="font-display text-2xl font-semibold text-coconut-900 mb-2">
                                        Message Received!
                                    </h2>
                                    <p className="text-coconut-600 mb-6">
                                        Thanks for reaching out. We'll get back to you within 24 hours on working days.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-leaf-600 font-medium hover:underline text-sm"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border border-coconut-100 p-8">
                                    <h2 className="font-display text-xl font-semibold text-coconut-900 mb-6">
                                        Send us a Message
                                    </h2>
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <FormInput
                                                label="Your Name *"
                                                placeholder="Priya Menon"
                                                error={errors.name?.message}
                                                {...register('name', { required: 'Name is required' })}
                                            />
                                            <FormInput
                                                label="Email Address *"
                                                type="email"
                                                placeholder="priya@example.com"
                                                error={errors.email?.message}
                                                {...register('email', { required: 'Email is required' })}
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <FormInput
                                                label="Phone (optional)"
                                                placeholder="+91 98765 43210"
                                                {...register('phone')}
                                            />
                                            <div>
                                                <label className="block text-sm font-medium text-coconut-700 mb-1.5">
                                                    Subject *
                                                </label>
                                                <select
                                                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-coconut-900 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 transition-shadow ${errors.subject ? 'border-red-400' : 'border-coconut-200'
                                                        }`}
                                                    {...register('subject', { required: 'Please select a subject' })}
                                                >
                                                    <option value="">Select a subject</option>
                                                    {SUBJECTS.map((s) => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                                {errors.subject && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-coconut-700 mb-1.5">
                                                Message *
                                            </label>
                                            <textarea
                                                rows={6}
                                                placeholder="Tell us how we can help..."
                                                className={`w-full px-4 py-2.5 rounded-xl border bg-white text-coconut-900 placeholder:text-coconut-300 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 transition-shadow resize-none ${errors.message ? 'border-red-400' : 'border-coconut-200'
                                                    }`}
                                                {...register('message', { required: 'Message is required' })}
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
                                            {submitting ? 'Sending...' : 'Send Message'}
                                        </button>

                                        <p className="text-xs text-coconut-400 text-center">
                                            We typically respond within 24 hours on working days (Mon–Sat).
                                        </p>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Contact