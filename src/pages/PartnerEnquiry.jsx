import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../services/api'
import FormInput from '../components/FormInput'
import SEO from '../components/SEO'

const PARTNERSHIP_TYPES = [
    'Influencer / Content Creator',
    'Recipe Collaboration',
    'Brand Collaboration',
    'Media / Press',
    'NGO / Social Impact',
    'Other',
]

function PartnerEnquiry() {
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = async (data) => {
        setSubmitting(true)
        try {
            await api.post('/enquiry', { ...data, type: 'partner' })
            toast.success('Enquiry submitted! We\'ll review and get back to you soon.')
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
            <SEO title="Partner With Us" description="Collaborate with Coconut Co. as a creator, brand, chef, or organisation. Let's build something great together." url="/partner-enquiry" />
            <section className="bg-coconut-900 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-leaf-400 text-sm font-medium mb-3">Let's Create Together</p>
                    <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white">
                        Partner With Us
                    </h1>
                    <p className="text-coconut-300 text-lg mt-4 max-w-2xl">
                        We love collaborating with creators, brands, and organisations that share our love for natural, honest living. If that sounds like you, let's talk.
                    </p>
                </div>
            </section>

            {/* Partnership types */}
            <section className="py-12 bg-coconut-50 border-b border-coconut-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                            { icon: '📸', title: 'Creators & Influencers', desc: 'Food, health, lifestyle, and wellness content creators' },
                            { icon: '🍳', title: 'Chefs & Recipes', desc: 'Collaborate on recipes using our products' },
                            { icon: '🤝', title: 'Brand Partnerships', desc: 'Co-branded products and campaigns' },
                            { icon: '📰', title: 'Media & Press', desc: 'Editorial coverage and PR collaborations' },
                            { icon: '💚', title: 'Social Impact', desc: 'NGOs working in health, nutrition, or farming' },
                            { icon: '✨', title: 'Something Else', desc: 'Have a unique idea? We\'re all ears' },
                        ].map((item) => (
                            <div key={item.title} className="bg-white rounded-2xl p-5 border border-coconut-100">
                                <div className="text-2xl mb-2">{item.icon}</div>
                                <p className="font-medium text-coconut-900 text-sm">{item.title}</p>
                                <p className="text-coconut-500 text-xs mt-1">{item.desc}</p>
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
                            Thanks for Reaching Out!
                        </h2>
                        <p className="text-coconut-600 mb-6">
                            We review all partnership enquiries personally. If it's a good fit, we'll be in touch within 3–5 business days.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-leaf-600 font-medium hover:underline text-sm"
                        >
                            Submit another enquiry
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-coconut-100 p-8 max-w-2xl mx-auto">
                        <h2 className="font-display text-xl font-semibold text-coconut-900 mb-6">
                            Tell Us About Your Collaboration Idea
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <FormInput
                                    label="Your Name *"
                                    error={errors.name?.message}
                                    {...register('name', { required: 'Required' })}
                                />
                                <FormInput
                                    label="Company / Channel / Handle"
                                    placeholder="e.g. @yourhandle or Brand Name"
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
                                    Partnership Type *
                                </label>
                                <select
                                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-coconut-900 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 ${errors.partnershipType ? 'border-red-400' : 'border-coconut-200'}`}
                                    {...register('partnershipType', { required: 'Please select a type' })}
                                >
                                    <option value="">Select type</option>
                                    {PARTNERSHIP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                                {errors.partnershipType && (
                                    <p className="text-red-500 text-xs mt-1">{errors.partnershipType.message}</p>
                                )}
                            </div>

                            <FormInput
                                label="Website / Social Profile / Portfolio"
                                placeholder="https://..."
                                {...register('website')}
                            />

                            <div>
                                <label className="block text-sm font-medium text-coconut-700 mb-1.5">
                                    Tell Us About Your Idea *
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Describe your collaboration idea, your audience or reach, and what you're hoping to create together..."
                                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-coconut-900 placeholder:text-coconut-300 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 resize-none ${errors.message ? 'border-red-400' : 'border-coconut-200'}`}
                                    {...register('message', { required: 'Please describe your idea' })}
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
                                {submitting ? 'Submitting...' : 'Send Collaboration Enquiry'}
                            </button>

                            <p className="text-xs text-coconut-400 text-center">
                                We review every enquiry personally. We'll respond within 3–5 business days if it's a good fit.
                            </p>
                        </form>
                    </div>
                )}
            </section>
        </div>
    )
}

export default PartnerEnquiry