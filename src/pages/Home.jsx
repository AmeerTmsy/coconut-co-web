import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../services/productService'
import { fetchCategories } from '../services/categoryService'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../services/api'

// ── Hero Section ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-coconut-900 overflow-hidden min-h-[85vh] flex items-center">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <span className="inline-block bg-leaf-600/20 text-leaf-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            100% Natural · Farm to Home
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-tight">
            Pure Coconut.
            <br />
            <span className="text-coconut-300">Pure Goodness.</span>
          </h1>
          <p className="text-coconut-300 text-lg mt-6 max-w-md leading-relaxed">
            From cold-pressed oils to protein bars — everything we make starts with one ingredient: the finest coconuts, harvested fresh from Kerala's coastal farms.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/shop"
              className="bg-leaf-600 text-white font-medium px-8 py-3.5 rounded-full hover:bg-leaf-700 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="border border-coconut-500 text-coconut-200 font-medium px-8 py-3.5 rounded-full hover:bg-coconut-800 transition-colors"
            >
              Our Story
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-12">
            {['No Additives', 'Cold-Pressed', 'Free Shipping ₹999+', 'Kerala Sourced'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-coconut-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-leaf-500" />
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Hero image grid */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden aspect-square bg-coconut-800">
              <img
                src="https://images.unsplash.com/photo-1670087603885-d3b40a384d9c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Virgin Coconut Oil"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video bg-coconut-800">
              <img
                src="https://images.unsplash.com/photo-1629705744513-03b66a5b043d?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Coconut Chips"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="rounded-2xl overflow-hidden aspect-video bg-coconut-800">
              <img
                src="https://res.cloudinary.com/dhs5i1k5f/image/upload/v1785089889/my%20folder/ChatGPT_Image_Jul_26_2026_11_44_40_PM_gfmcwa.png"
                alt="Protein Bars"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square bg-coconut-800">
              <img
                src="https://images.unsplash.com/photo-1599451897608-ad6eb8676edf?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Coconut Sugar"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Categories Strip ──────────────────────────────────────────────────────────
function CategoriesStrip() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const categoryEmojis = {
    'coconut-oils': '🫙',
    'protein-energy-bars': '💪',
    'coconut-sugar-sweeteners': '🍯',
    'coconut-snacks': '🥥',
    'coconut-flour-baking': '🌾',
    'coconut-milk-cream': '🥛',
    'wellness-personal-care': '✨',
    'combo-gift-boxes': '🎁',
  }

  if (isLoading) return null

  return (
    <section className="py-12 bg-white border-b border-coconut-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/shop?category=${cat._id}`}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-coconut-50 flex items-center justify-center text-2xl group-hover:bg-coconut-100 transition-colors">
                {categoryEmojis[cat.slug] || '🥥'}
              </div>
              <p className="text-xs text-center text-coconut-700 font-medium leading-tight group-hover:text-leaf-600 transition-colors">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Featured Products ─────────────────────────────────────────────────────────
function FeaturedProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => fetchProducts({ limit: 4, page: 1 }),
  })

  const featured = data?.products?.filter((p) => p.isFeatured) ?? []
  const toShow = featured.length >= 4 ? featured.slice(0, 4) : data?.products?.slice(0, 4) ?? []

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-leaf-600 text-sm font-medium">Handpicked for you</p>
          <h2 className="font-display text-3xl font-semibold text-coconut-900 mt-1">Featured Products</h2>
        </div>
        <Link to="/shop" className="text-coconut-600 text-sm font-medium hover:text-leaf-600 transition-colors">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : toShow.map((p) => <ProductCard key={p._id} product={p} />)
        }
      </div>
    </section>
  )
}

// ── Bestsellers ───────────────────────────────────────────────────────────────
function Bestsellers() {
  const { data, isLoading } = useQuery({
    queryKey: ['bestseller-products'],
    queryFn: () => fetchProducts({ limit: 12, page: 1 }),
  })

  const bestsellers = data?.products?.filter((p) => p.isBestSeller) ?? []

  if (!isLoading && bestsellers.length === 0) return null

  return (
    <section className="py-16 bg-coconut-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-leaf-600 text-sm font-medium">Most loved</p>
            <h2 className="font-display text-3xl font-semibold text-coconut-900 mt-1">Bestsellers</h2>
          </div>
          <Link to="/shop" className="text-coconut-600 text-sm font-medium hover:text-leaf-600 transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : bestsellers.slice(0, 4).map((p) => <ProductCard key={p._id} product={p} />)
          }
        </div>
      </div>
    </section>
  )
}

// ── Brand Story ───────────────────────────────────────────────────────────────
function BrandStory() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden aspect-square">
            <img
              src="https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop"
              alt="Coconut farm"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square mt-8">
            <img
              src="https://images.unsplash.com/photo-1599451897608-ad6eb8676edf?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Coconut water"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square">
            <img
              src="https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&h=400&fit=crop"
              alt="Natural soap"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square mt-8">
            <img
              src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop"
              alt="Gift box"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <span className="inline-block bg-coconut-100 text-coconut-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Our Story
          </span>
          <h2 className="font-display text-4xl font-semibold text-coconut-900 leading-tight">
            From Kerala's Farms<br />to Your Home
          </h2>
          <p className="text-coconut-600 mt-5 leading-relaxed">
            We started with a simple belief: that the coconut — one of nature's most complete foods — deserves better than industrial processing and artificial additives.
          </p>
          <p className="text-coconut-600 mt-4 leading-relaxed">
            Every product we make is sourced directly from small-scale coconut farmers in Kerala, processed using traditional cold-press and wood-press methods, and packed without preservatives or fillers.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { number: '50+', label: 'Farm Partners' },
              { number: '100%', label: 'Natural Ingredients' },
              { number: '8', label: 'Product Categories' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-semibold text-coconut-900">{stat.number}</p>
                <p className="text-coconut-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="inline-block mt-8 border border-coconut-300 text-coconut-700 font-medium px-6 py-3 rounded-full hover:bg-coconut-100 transition-colors"
          >
            Read Our Full Story
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────
function WhyUs() {
  const points = [
    {
      icon: '🌿',
      title: 'No Additives Ever',
      desc: 'Every product is made with just coconut — no preservatives, artificial flavours, or fillers.',
    },
    {
      icon: '🧴',
      title: 'Cold-Pressed Process',
      desc: 'We use traditional cold-press methods to retain natural nutrients and aroma.',
    },
    {
      icon: '🚚',
      title: 'Free Shipping ₹999+',
      desc: 'Free delivery across India on orders above ₹999. Fast dispatch, safe packaging.',
    },
    {
      icon: '↩️',
      title: 'Easy Returns',
      desc: 'Not happy? Return within 7 days of delivery — no questions asked.',
    },
  ]

  return (
    <section className="py-16 bg-coconut-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-semibold text-white">Why Coconut Co.?</h2>
          <p className="text-coconut-400 mt-2">What makes us different from the rest</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((p) => (
            <div key={p.title} className="text-center">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-coconut-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── New Arrivals ──────────────────────────────────────────────────────────────
function NewArrivals() {
  const { data, isLoading } = useQuery({
    queryKey: ['new-arrival-products'],
    queryFn: () => fetchProducts({ limit: 12, page: 1 }),
  })

  const newArrivals = data?.products?.filter((p) => p.isNewArrival) ?? []

  if (!isLoading && newArrivals.length === 0) return null

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-leaf-600 text-sm font-medium">Just dropped</p>
          <h2 className="font-display text-3xl font-semibold text-coconut-900 mt-1">New Arrivals</h2>
        </div>
        <Link to="/shop" className="text-coconut-600 text-sm font-medium hover:text-leaf-600 transition-colors">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : newArrivals.slice(0, 4).map((p) => <ProductCard key={p._id} product={p} />)
        }
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Menon',
      location: 'Bangalore',
      text: 'The virgin coconut oil is absolutely pure — you can smell the difference the moment you open the jar. Have been using it for cooking and my hair for 3 months now.',
      rating: 5,
    },
    {
      name: 'Arjun Nair',
      location: 'Mumbai',
      text: 'The protein bars are a game changer for my post-gym snack. Clean ingredients, no weird aftertaste, and actually tastes good. Ordering my third batch!',
      rating: 5,
    },
    {
      name: 'Deepa Krishnan',
      location: 'Chennai',
      text: 'Switched to coconut sugar from regular sugar 2 months ago. My morning coffee tastes just as good and my blood sugar spikes are much more manageable.',
      rating: 5,
    },
  ]

  return (
    <section className="py-16 bg-coconut-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-leaf-600 text-sm font-medium">What our customers say</p>
          <h2 className="font-display text-3xl font-semibold text-coconut-900 mt-1">Loved by Thousands</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border border-coconut-100">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-coconut-700 leading-relaxed text-sm">"{t.text}"</p>
              <div className="mt-4 pt-4 border-t border-coconut-100">
                <p className="font-medium text-coconut-900 text-sm">{t.name}</p>
                <p className="text-coconut-400 text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    try {
      await api.post('/newsletter/subscribe', { email })
      toast.success('You\'re subscribed! Welcome to the Coconut Co. family.')
      setEmail('')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-leaf-600">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl font-semibold text-white">Stay in the Loop</h2>
        <p className="text-leaf-100 mt-3 mb-8">
          Get new product launches, seasonal recipes, and exclusive offers straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-3 rounded-full bg-white text-coconut-900 placeholder:text-coconut-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-coconut-900 text-white font-medium px-6 py-3 rounded-full hover:bg-coconut-800 transition-colors disabled:opacity-60 text-sm shrink-0"
          >
            {submitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        <p className="text-leaf-200 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}

// ── Main Home page ────────────────────────────────────────────────────────────
function Home() {
  return (
    <div>
      <Hero />
      <CategoriesStrip />
      <FeaturedProducts />
      <Bestsellers />
      <BrandStory />
      <WhyUs />
      <NewArrivals />
      <Testimonials />
      <Newsletter />
    </div>
  )
}

export default Home