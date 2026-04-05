import { createContext, useContext, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([])

  const addToCart = (product, quantity = 1) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...current, { product, quantity }]
    })
    toast.success(`${product.title} added to cart`)
  }

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.product.id !== productId))
    toast.info('Removed from cart')
  }

  const updateQuantity = (productId, nextQuantity) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(1, nextQuantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id)
      const next = exists ? current.filter((item) => item.id !== product.id) : [...current, product]
      toast[exists ? 'info' : 'success'](
        exists ? `${product.title} removed from wishlist` : `${product.title} saved to wishlist`,
      )
      return next
    })
  }

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems],
  )

  const cartQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        cartTotal,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCartContext must be used within CartProvider')
  return context
}
