import { Link } from 'react-router-dom'
import { useWishlist } from '../../hooks/useWishlist.jsx'
import { useCart } from '../../hooks/useCart.jsx'
import { formatPrice } from '../../utils/helpers.js'
import './Wishlist.css'

function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <section className="wishlist-page page-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Wishlist</p>
          <h1>Saved items for later</h1>
          <p>Keep an eye on products you want to revisit or move to your cart.</p>
        </div>
      </div>
      {wishlist.length === 0 ? (
        <div className="empty-state shadow-card">
          <h2>Your wishlist is empty</h2>
          <p>Browse products and add favorites to see them here.</p>
          <Link className="primary-btn" to="/products">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <article key={product.id} className="wishlist-card shadow-card">
              <img src={product.image} alt={product.title} />
              <div className="wishlist-body">
                <div>
                  <span className="category-tag">{product.category}</span>
                  <h3>{product.title}</h3>
                </div>
                <p className="price">{formatPrice(product.price)}</p>
                <div className="wishlist-actions">
                  <button className="secondary-btn" onClick={() => toggleWishlist(product)}>
                    Remove
                  </button>
                  <button className="primary-btn" onClick={() => addToCart(product)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Wishlist
