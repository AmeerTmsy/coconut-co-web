import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/orders', label: 'Orders', icon: '📦' },
  { to: '/admin/products', label: 'Products', icon: '🥥' },
  { to: '/admin/categories', label: 'Categories', icon: '🗂️' },
  { to: '/admin/customers', label: 'Customers', icon: '👥' },
]

function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex bg-coconut-50">
      {/* Sidebar */}
      <aside className="w-56 bg-coconut-900 text-coconut-100 flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-coconut-700">
          <p className="font-display text-lg font-semibold text-white">Coconut Co.</p>
          <p className="text-xs text-coconut-400 mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-coconut-700 text-white'
                    : 'text-coconut-300 hover:bg-coconut-800 hover:text-white'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-coconut-700 space-y-1">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-coconut-300 hover:bg-coconut-800 hover:text-white transition-colors"
          >
            <span>🛍️</span> View Store
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-coconut-300 hover:bg-coconut-800 hover:text-white transition-colors"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout