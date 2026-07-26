import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)
const STORAGE_KEY = 'coconut_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // Each cart line is identified by productId + variantId together
  const addItem = (product, variant, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === product._id && i.variantId === variant._id
      )
      if (existing) {
        return prev.map((i) =>
          i.productId === product._id && i.variantId === variant._id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [
        ...prev,
        {
          productId: product._id,
          variantId: variant._id,
          name: product.name,
          slug: product.slug,
          image: product.images?.[0],
          variantLabel: variant.label,
          price: variant.price,
          mrp: variant.mrp,
          stockQuantity: variant.stockQuantity,
          quantity,
        },
      ]
    })
    toast.success(`${product.name} added to cart`)
  }

  const updateQuantity = (productId, variantId, quantity) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId
          ? { ...i, quantity }
          : i
      )
    )
  }

  const removeItem = (productId, variantId) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    )
  }

  const clearCart = () => setItems([])

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, subtotal, totalItems }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}