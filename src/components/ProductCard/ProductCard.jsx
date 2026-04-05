import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatPrice, placeholderImage } from '../../utils/helpers.js'
import './ProductCard.css'

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  return (
    <motion.article className="product-card shadow-card" whileHover={{ y: -6 }}>
      <Link to={`/products/${product.id}`} className="card-image-link">
        <div className="product-image-wrap">
          <img
            src={product.image || placeholderImage}
            alt={product.title}
            loading="lazy"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src = placeholderImage
            }}
          />
        </div>
      </Link>
      <div className="product-card-body">
        <div className="product-badge">{product.category}</div>
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title}
        </Link>
        <div className="product-meta">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="rating">{product.rating.rate.toFixed(1)} <FaStar /></span>
        </div>
      </div>
      <div className="card-actions">
        <button className="secondary-btn" onClick={() => onToggleWishlist(product)}>
          <FaHeart className={isWishlisted ? 'active' : ''} />
          <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
        </button>
        <button className="primary-btn" onClick={() => onAddToCart(product)}>
          <FaShoppingCart />
          Add to cart
        </button>
      </div>
    </motion.article>
  )
}

export default ProductCard
