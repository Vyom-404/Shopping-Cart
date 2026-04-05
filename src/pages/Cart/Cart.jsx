import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart.jsx'
import CartItem from '../../components/CartItem/CartItem.jsx'
import { formatPrice } from '../../utils/helpers.js'
import './Cart.css'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  return (
    <section className="cart-page page-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Cart</p>
          <h1>Review your shopping bag</h1>
          <p>Update quantities, remove items, and continue to checkout when ready.</p>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty-state shadow-card">
          <h2>Your cart is empty</h2>
          <p>Add products from the store to see them here.</p>
          <Link className="primary-btn" to="/products">
            Shop products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} onRemove={removeFromCart} onUpdate={updateQuantity} />
            ))}
          </div>
          <aside className="summary-panel shadow-card">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Estimated tax</span>
              <strong>{formatPrice(cartTotal * 0.08)}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(cartTotal * 1.08)}</strong>
            </div>
            <Link className="primary-btn checkout-button" to="/checkout">
              Continue to checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Cart
