import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const faqs = [
    {
        category: 'Orders & Shipping',
        questions: [
            {
                q: 'How long does delivery take?',
                a: 'We dispatch all orders within 1–2 business days. Delivery typically takes 3–5 business days across India, depending on your location. Metro cities are usually faster (2–3 days).',
            },
            {
                q: 'Do you offer free shipping?',
                a: 'Yes! We offer free shipping on all orders above ₹999. Orders below ₹999 have a flat shipping fee of ₹49.',
            },
            {
                q: 'Can I track my order?',
                a: 'Yes. Once your order is dispatched, you can track it from your Account page under "My Orders". The status updates as your order moves through our fulfilment process.',
            },
            {
                q: 'Do you ship outside India?',
                a: 'Currently we only ship within India. International shipping is something we\'re working on — sign up for our newsletter to be notified when it launches.',
            },
            {
                q: 'Can I change or cancel my order after placing it?',
                a: 'You can cancel your order from your Account page as long as the status is "Placed" or "Confirmed". Once it\'s been packed or shipped, cancellation is no longer possible. For changes, please contact us immediately at hello@coconutco.in.',
            },
        ],
    },
    {
        category: 'Products',
        questions: [
            {
                q: 'Are your products 100% natural?',
                a: 'Yes. Every Coconut Co. product is made without artificial additives, preservatives, flavours, or colours. What you read on the label is everything that\'s in the product.',
            },
            {
                q: 'What is the difference between cold-pressed and wood-pressed coconut oil?',
                a: 'Cold-pressed oil is extracted using mechanical pressure at low temperatures, preserving nutrients and aroma. Wood-pressed (or Chekku) oil uses a traditional wooden press rotated by bullocks or motors at very low speed — the oldest method, resulting in an even more natural product with a slightly stronger aroma. Both are unrefined and far superior to refined coconut oil.',
            },
            {
                q: 'How should I store coconut oil?',
                a: 'Coconut oil naturally solidifies below 24°C and becomes liquid above it — this is normal and doesn\'t affect quality. Store in a cool, dry place away from direct sunlight. No refrigeration needed.',
            },
            {
                q: 'Are your protein bars suitable for vegans?',
                a: 'Yes, all our protein bars are 100% plant-based and suitable for vegans. They contain no dairy, eggs, or other animal products.',
            },
            {
                q: 'Is coconut sugar really healthier than regular sugar?',
                a: 'Coconut sugar has a lower glycemic index (GI of ~35) compared to white sugar (GI of ~65), meaning it causes a slower rise in blood sugar. It also retains small amounts of minerals like potassium, iron, and zinc that are stripped from refined sugar. That said, it\'s still sugar — consume in moderation.',
            },
            {
                q: 'What is the shelf life of your products?',
                a: 'Shelf life varies by product. Virgin coconut oil lasts 18–24 months. Protein bars are best within 6 months. Coconut sugar and flour last 12–18 months. Always check the best-before date printed on each product.',
            },
        ],
    },
    {
        category: 'Returns & Refunds',
        questions: [
            {
                q: 'What is your return policy?',
                a: 'We accept return requests within 7 days of delivery for products that are damaged, defective, or significantly different from what was described. Opened food products cannot be returned unless they are defective.',
            },
            {
                q: 'How do I request a return?',
                a: 'Go to your Account page, find the order, and use the "Request Return" option. Alternatively, email us at hello@coconutco.in with your order number and reason. We\'ll arrange a pickup within 2–3 business days.',
            },
            {
                q: 'When will I get my refund?',
                a: 'Once we receive and inspect the returned product, refunds are processed within 5–7 business days. The amount will be credited back to your original payment method. COD orders are refunded via bank transfer.',
            },
            {
                q: 'My order arrived damaged — what do I do?',
                a: 'We\'re sorry about that. Please take a photo of the damaged product and packaging and email it to hello@coconutco.in within 48 hours of delivery. We\'ll arrange a replacement or full refund immediately.',
            },
        ],
    },
    {
        category: 'Payments',
        questions: [
            {
                q: 'What payment methods do you accept?',
                a: 'We accept UPI (GPay, PhonePe, Paytm, and all UPI apps), credit/debit cards (Visa, Mastercard, RuPay), net banking, popular wallets, and Cash on Delivery (COD) for eligible pin codes.',
            },
            {
                q: 'Is Cash on Delivery available?',
                a: 'Yes, COD is available for most pin codes across India. You\'ll see the COD option at checkout if it\'s available for your address.',
            },
            {
                q: 'Is it safe to pay online on your website?',
                a: 'Absolutely. All payments are processed through Razorpay, one of India\'s most trusted payment gateways, with 256-bit SSL encryption. We never store your card details on our servers.',
            },
        ],
    },
    {
        category: 'Bulk & Business',
        questions: [
            {
                q: 'Do you offer bulk pricing?',
                a: 'Yes, we offer special pricing for bulk orders (typically 50+ units of a single product). Please fill out our Bulk Order Enquiry form and our team will get back to you within 24 hours.',
            },
            {
                q: 'Can I become a distributor for Coconut Co.?',
                a: 'We\'re actively expanding our distributor network across India. Fill out the Distributor Enquiry form and we\'ll be in touch to discuss partnership terms.',
            },
            {
                q: 'Do you do corporate gifting?',
                a: 'Yes! Our Combo Packs and Gift Boxes are popular for corporate gifting, especially around Diwali, Onam, and other festive seasons. We can also create custom hampers for bulk corporate orders. Contact us to discuss.',
            },
        ],
    },
]

function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="border-b border-coconut-100 last:border-b-0">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
                <span className="font-medium text-coconut-900 pr-4">{question}</span>
                <span className={`shrink-0 w-6 h-6 rounded-full bg-coconut-100 flex items-center justify-center text-coconut-600 text-sm transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            {open && (
                <p className="pb-5 text-coconut-600 leading-relaxed text-sm pr-10">
                    {answer}
                </p>
            )}
        </div>
    )
}

function FAQ() {
    const [activeCategory, setActiveCategory] = useState(faqs[0].category)
    const [search, setSearch] = useState('')

    const filteredFaqs = search.trim()
        ? faqs.map((section) => ({
            ...section,
            questions: section.questions.filter(
                (q) =>
                    q.q.toLowerCase().includes(search.toLowerCase()) ||
                    q.a.toLowerCase().includes(search.toLowerCase())
            ),
        })).filter((section) => section.questions.length > 0)
        : faqs.filter((section) => section.category === activeCategory)

    return (
        <>
            <SEO title="FAQ" description="Answers to common questions about Coconut Co. products, orders, shipping, returns, and payments." url="/faq" />
            <div>
                {/* Hero */}
                <section className="bg-coconut-50 border-b border-coconut-100 py-16">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-coconut-900">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-coconut-600 mt-4 mb-8">
                            Everything you need to know about our products, orders, and policies.
                        </p>
                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-coconut-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-full border border-coconut-200 bg-white text-coconut-900 placeholder:text-coconut-400 focus:outline-none focus:ring-2 focus:ring-leaf-500/50 text-sm"
                            />
                        </div>
                    </div>
                </section>

                <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {search.trim() ? (
                        // Search results
                        <div>
                            <p className="text-coconut-500 text-sm mb-6">
                                {filteredFaqs.reduce((acc, s) => acc + s.questions.length, 0)} results for "{search}"
                            </p>
                            {filteredFaqs.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-coconut-400 mb-4">No results found for "{search}"</p>
                                    <button
                                        onClick={() => setSearch('')}
                                        className="text-leaf-600 font-medium hover:underline text-sm"
                                    >
                                        Clear search
                                    </button>
                                </div>
                            ) : (
                                filteredFaqs.map((section) => (
                                    <div key={section.category} className="mb-10">
                                        <h2 className="font-display text-xl font-semibold text-coconut-900 mb-4">
                                            {section.category}
                                        </h2>
                                        <div className="bg-white rounded-2xl border border-coconut-100 px-6">
                                            {section.questions.map((item) => (
                                                <FAQItem key={item.q} question={item.q} answer={item.a} />
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        // Categorised view
                        <div className="grid lg:grid-cols-4 gap-8">
                            {/* Category nav */}
                            <div className="lg:col-span-1">
                                <nav className="space-y-1 sticky top-6">
                                    {faqs.map((section) => (
                                        <button
                                            key={section.category}
                                            onClick={() => setActiveCategory(section.category)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeCategory === section.category
                                                ? 'bg-coconut-800 text-white'
                                                : 'text-coconut-600 hover:bg-coconut-100'
                                                }`}
                                        >
                                            {section.category}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Questions */}
                            <div className="lg:col-span-3">
                                {filteredFaqs.map((section) => (
                                    <div key={section.category}>
                                        <h2 className="font-display text-2xl font-semibold text-coconut-900 mb-1">
                                            {section.category}
                                        </h2>
                                        <p className="text-coconut-500 text-sm mb-5">
                                            {section.questions.length} questions
                                        </p>
                                        <div className="bg-white rounded-2xl border border-coconut-100 px-6 mb-8">
                                            {section.questions.map((item) => (
                                                <FAQItem key={item.q} question={item.q} answer={item.a} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Still need help */}
                    <div className="mt-12 bg-coconut-50 rounded-2xl p-8 text-center border border-coconut-100">
                        <h3 className="font-display text-xl font-semibold text-coconut-900 mb-2">
                            Still have questions?
                        </h3>
                        <p className="text-coconut-600 text-sm mb-5">
                            Can't find what you're looking for? Our team is happy to help.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-coconut-800 text-white font-medium px-6 py-3 rounded-full hover:bg-coconut-900 transition-colors text-sm"
                        >
                            Contact Us
                        </Link>
                    </div>
                </section>
            </div>
        </>
    )
}

export default FAQ