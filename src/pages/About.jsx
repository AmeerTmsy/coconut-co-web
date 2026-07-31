import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

function About() {
  return (
    <div>
      <SEO
        title="About Us"
        description="Coconut Co. sources pure coconut products directly from Kerala's farms. Learn about our story, values, and commitment to natural ingredients."
        url="/about"
      />
      {/* Hero */}
      <section className="bg-coconut-900 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-leaf-600/20 text-leaf-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Our Story
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-white leading-tight">
            Born from the<br />
            <span className="text-coconut-300">Coconut Grove</span>
          </h1>
          <p className="text-coconut-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            We believe that what you put in and on your body should come from nature — unprocessed, unadulterated, and honestly made.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl font-semibold text-coconut-900 leading-tight">
              It Started with a Single Jar
            </h2>
            <p className="text-coconut-600 mt-5 leading-relaxed">
              Coconut Co. started when our founder noticed something frustrating: the coconut oil at the local supermarket — despite being labelled "pure" — had a faint chemical smell and none of the warm, nutty aroma of the oil their grandmother used to make at home.
            </p>
            <p className="text-coconut-600 mt-4 leading-relaxed">
              That led to a visit to a small farm in Thrissur, Kerala, where they watched coconuts being cold-pressed the traditional way. The difference was immediate and undeniable. That jar came home, and Coconut Co. was born.
            </p>
            <p className="text-coconut-600 mt-4 leading-relaxed">
              Today we work with over 50 small-scale coconut farmers across Kerala, paying fair prices and using traditional processing methods that preserve every bit of nutritional value the coconut has to offer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-square">
              <img
                src="https://images.unsplash.com/photo-1599451897608-ad6eb8676edf?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Cold pressed coconut oil"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square mt-8">
              <img
                src="https://images.unsplash.com/photo-1668198699393-4720bacb04a9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Coconut farm"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-coconut-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-leaf-600 text-sm font-medium">What we stand for</p>
            <h2 className="font-display text-3xl font-semibold text-coconut-900 mt-1">Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🌿',
                title: 'Ingredient Honesty',
                desc: 'Every label tells the whole truth. If it\'s not something you\'d find in a kitchen, it\'s not in our products.',
              },
              {
                icon: '🤝',
                title: 'Farmer First',
                desc: 'We pay fair prices to our farmer partners and commit to long-term relationships — not one-off transactions.',
              },
              {
                icon: '🧴',
                title: 'Traditional Methods',
                desc: 'Cold-press. Wood-press. Sun-dry. Techniques that have worked for generations, and still work best.',
              },
              {
                icon: '📦',
                title: 'Minimal Packaging',
                desc: 'We use recyclable and biodegradable packaging wherever possible, because the environment isn\'t a footnote.',
              },
              {
                icon: '🔬',
                title: 'Quality Tested',
                desc: 'Every batch is tested for purity and quality before it leaves our facility. No compromises.',
              },
              {
                icon: '💚',
                title: 'Health Forward',
                desc: 'We design products that genuinely support a healthier lifestyle — not just products that sound healthy.',
              },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-coconut-100">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-semibold text-coconut-900 mb-2">{v.title}</h3>
                <p className="text-coconut-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient storytelling */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1588413333412-82148535db53?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Fresh coconuts"
              className="rounded-2xl w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-4xl font-semibold text-coconut-900 leading-tight">
              One Ingredient.<br />Endless Potential.
            </h2>
            <p className="text-coconut-600 mt-5 leading-relaxed">
              The coconut palm is called "Kalpavriksha" — the tree that fulfils all wishes — in ancient Indian texts. And for good reason: from its water to its oil, its meat to its sugar, almost no part of the coconut goes to waste.
            </p>
            <p className="text-coconut-600 mt-4 leading-relaxed">
              Cold-pressed coconut oil retains lauric acid, MCTs, and antioxidants that refined oils lose. Coconut sugar carries minerals like potassium and magnesium that white sugar has none of. Coconut flour carries more fibre per gram than wheat flour.
            </p>
            <p className="text-coconut-600 mt-4 leading-relaxed">
              We didn't build a product range. We built a better way to use one of nature's most complete ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* How to prepare */}
      <section className="py-16 bg-coconut-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-semibold text-white mb-4">
            How to Get the Most from Coconut Co.
          </h2>
          <p className="text-coconut-400 mb-10">
            Simple ways to bring our products into your daily routine.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              {
                step: '01',
                title: 'Cooking',
                desc: 'Replace your regular cooking oil with our virgin coconut oil for a subtle flavour boost and higher smoke point.',
              },
              {
                step: '02',
                title: 'Snacking',
                desc: 'Swap processed snacks for our coconut chips or energy bars — same convenience, far cleaner ingredients.',
              },
              {
                step: '03',
                title: 'Sweetening',
                desc: 'Use coconut sugar 1:1 in place of white sugar in your tea, coffee, or baking. Lower GI, deeper flavour.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-coconut-800 rounded-2xl p-6">
                <p className="font-display text-4xl font-semibold text-coconut-600 mb-3">{item.step}</p>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-coconut-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-leaf-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Farmer Partners' },
              { number: '26+', label: 'Products' },
              { number: '8', label: 'Categories' },
              { number: '100%', label: 'Natural' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-semibold text-white">{stat.number}</p>
                <p className="text-leaf-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl font-semibold text-coconut-900">
          Ready to Try Real Coconut?
        </h2>
        <p className="text-coconut-600 mt-4 mb-8">
          Browse our full range and find something your kitchen — and body — will love.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/shop"
            className="bg-coconut-800 text-white font-medium px-8 py-3.5 rounded-full hover:bg-coconut-900 transition-colors"
          >
            Shop All Products
          </Link>
          <Link
            to="/contact"
            className="border border-coconut-300 text-coconut-700 font-medium px-8 py-3.5 rounded-full hover:bg-coconut-50 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About