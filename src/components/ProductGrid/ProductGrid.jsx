import './ProductGrid.css'
import ProductCard from '../ProductCard/ProductCard.jsx'
import { useCart } from '../../hooks/useCart.jsx'
import { useWishlist } from '../../hooks/useWishlist.jsx'

function ProductGrid({ products }) {
  const { addToCart } = useCart()
  const { wishlist, toggleWishlist } = useWishlist()

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isWishlisted={wishlist.some((item) => item.id === product.id)}
        />
      ))}
    </div>
  )
}

export default ProductGrid
