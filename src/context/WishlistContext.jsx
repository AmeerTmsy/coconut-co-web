import { createContext, useContext, useState, useEffect } from 'react'
import { fetchWishlist, toggleWishlist } from '../services/wishlistService'
import { useAuth } from './AuthContext'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const [wishlistIds, setWishlistIds] = useState([])
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (user) {
      fetchWishlist()
        .then((items) => setWishlistIds(items.map((p) => p._id || p)))
        .catch(() => {})
    } else {
      setWishlistIds([])
    }
  }, [user])

  const toggle = async (productId, productName) => {
    if (!user) {
      toast.error('Please log in to save products to your wishlist')
      return
    }
    setLoading(true)
    try {
      const result = await toggleWishlist(productId)
      setWishlistIds(result.wishlist.map((id) => id.toString()))

      // Invalidate so the Account wishlist tab refetches immediately
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })

      toast.success(result.added ? `${productName} added to wishlist` : `${productName} removed from wishlist`)
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const isWishlisted = (productId) => wishlistIds.includes(productId.toString())

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggle, isWishlisted, loading }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}