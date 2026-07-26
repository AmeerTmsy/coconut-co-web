import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchDashboardStats } from '../../services/adminService'

const statusStyles = {
  Placed:             'bg-blue-100 text-blue-700',
  Confirmed:          'bg-indigo-100 text-indigo-700',
  Packed:             'bg-yellow-100 text-yellow-700',
  Shipped:            'bg-orange-100 text-orange-700',
  'Out for Delivery': 'bg-amber-100 text-amber-700',
  Delivered:          'bg-leaf-100 text-leaf-700',
  Cancelled:          'bg-red-100 text-red-600',
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-coconut-100 p-5">
      <p className="text-sm text-coconut-500">{label}</p>
      <p className="font-display text-3xl font-semibold text-coconut-900 mt-1">{value}</p>
      {sub && <p className="text-xs text-coconut-400 mt-1">{sub}</p>}
    </div>
  )
}

function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: fetchDashboardStats,
    refetchInterval: 60000, // auto-refresh every minute
  })

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-coconut-100 p-5 animate-pulse h-24" />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return <div className="p-8 text-red-500">Failed to load dashboard stats.</div>
  }

  const { stats, recentOrders, lowStockProducts } = data

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-coconut-900">Dashboard</h1>
        <p className="text-coconut-500 text-sm mt-0.5">Welcome back — here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`} sub="Excluding cancelled orders" />
        <StatCard label="Total Orders" value={stats.totalOrders} />
        <StatCard label="Products" value={stats.totalProducts} />
        <StatCard label="Customers" value={stats.totalCustomers} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-coconut-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-coconut-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-leaf-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 && (
              <p className="text-coconut-400 text-sm">No orders yet.</p>
            )}
            {recentOrders.map((order) => (
              <div key={order._id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-coconut-900 truncate">
                    {order.user?.name || 'Unknown'}
                  </p>
                  <p className="text-xs text-coconut-400">#{order.orderNumber}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-semibold text-coconut-900">₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock alerts */}
        <div className="bg-white rounded-2xl border border-coconut-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-coconut-900">Low Stock Alerts</h2>
            <Link to="/admin/products" className="text-xs text-leaf-600 hover:underline">Manage</Link>
          </div>
          <div className="space-y-3">
            {lowStockProducts.length === 0 && (
              <p className="text-coconut-400 text-sm">All products are well stocked.</p>
            )}
            {lowStockProducts.map((product) => (
              <div key={product._id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-9 h-9 rounded-lg object-cover bg-coconut-100 shrink-0"
                  />
                  <p className="text-sm font-medium text-coconut-900 truncate">{product.name}</p>
                </div>
                <div className="shrink-0 text-right">
                  {product.variants.filter(v => v.stockQuantity <= 5).map((v) => (
                    <p key={v._id} className="text-xs text-red-500 font-medium">
                      {v.label}: {v.stockQuantity} left
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard