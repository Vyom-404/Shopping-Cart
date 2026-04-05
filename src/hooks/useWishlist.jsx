import { useCartContext } from '../context/CartContext.jsx'
export function useWishlist() {
  return useCartContext()
}
