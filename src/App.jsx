import { Routes, Route, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import GuestOnly from './components/GuestOnly'
import Account from './pages/Account'
import RequireAuth from './components/RequireAuth'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import AdminLayout from './layouts/AdminLayout'
import RequireAdmin from './components/RequireAdmin'
import Dashboard from './pages/admin/Dashboard'
import Orders from './pages/admin/Orders'
import AdminProducts from './pages/admin/Products'
import AdminCategories from './pages/admin/Categories'
import AdminCustomers from './pages/admin/Customers'
import About from './pages/About'
import Contact from './pages/Contact'


function App() {
  const location = useLocation()

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:slug" element={<ProductDetail key={location.pathname} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
        <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />
        <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
        <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
        <Route path="/order-confirmation/:id" element={<RequireAuth><OrderConfirmation /></RequireAuth>} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="customers" element={<AdminCustomers />} />
      </Route>
    </Routes>
  )
}

export default App