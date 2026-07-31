import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import WhatsAppButton from '../components/WhatsAppButton'

function MainLayout() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream relative">
      <header className="border-b border-coconut-200 bg-coconut-50 sticky top-0 z-999 shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-semibold text-coconut-800">
            Coconut Co.
          </Link>
          <div className="flex items-center gap-6 text-coconut-700 font-medium">
            <Link to="/shop" className="hover:text-leaf-600 transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-leaf-600 transition-colors">About</Link>
            <Link to="/cart" className="hover:text-leaf-600 transition-colors relative">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-leaf-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/account" className="text-coconut-600 text-sm hover:text-leaf-600 transition-colors">
                  Hi, {user.name.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="text-sm hover:text-leaf-600 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="hover:text-leaf-600 transition-colors">Login</Link>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-coconut-900 text-coconut-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-display text-xl font-semibold text-white mb-3">Coconut Co.</p>
              <p className="text-coconut-400 text-sm leading-relaxed">
                Pure coconut products from Kerala's farms to your home.
              </p>
            </div>

            {/* Shop */}
            <div>
              <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-3">Shop</p>
              <div className="space-y-2">
                {[
                  { label: 'All Products', href: '/shop' },
                  { label: 'Coconut Oils', href: '/shop?category=coconut-oils' },
                  { label: 'Protein Bars', href: '/shop?category=protein-energy-bars' },
                  { label: 'Gift Boxes', href: '/shop?category=combo-gift-boxes' },
                ].map((l) => (
                  <Link key={l.label} to={l.href} className="block text-sm text-coconut-400 hover:text-coconut-100 transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-3">Company</p>
              <div className="space-y-2">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Bulk Orders', href: '/bulk-enquiry' },
                  { label: 'Become a Distributor', href: '/distributor-enquiry' },
                  { label: 'Partner With Us', href: '/partner-enquiry' },
                ].map((l) => (
                  <Link key={l.label} to={l.href} className="block text-sm text-coconut-400 hover:text-coconut-100 transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <p className="text-xs font-semibold text-coconut-500 uppercase tracking-wide mb-3">Policies</p>
              <div className="space-y-2">
                {[
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Refund Policy', href: '/refund-policy' },
                  { label: 'Shipping Policy', href: '/shipping-policy' },
                  { label: 'Terms & Conditions', href: '/terms' },
                ].map((l) => (
                  <Link key={l.label} to={l.href} className="block text-sm text-coconut-400 hover:text-coconut-100 transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-coconut-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-coconut-500">
            <p>&copy; {new Date().getFullYear()} Coconut Co. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-coconut-300 transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-coconut-300 transition-colors">Facebook</Link>
              <Link href="#" className="hover:text-coconut-300 transition-colors">YouTube</Link>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  )
}

export default MainLayout