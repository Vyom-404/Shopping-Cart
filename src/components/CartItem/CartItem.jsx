import { FaTrash } from 'react-icons/fa'
import { formatPrice } from '../../utils/helpers.js'
import './CartItem.css'

function CartItem({ item, onRemove, onUpdate }) {
  return (
    <article className="cart-item shadow-card">
      <img src={item.product.image} alt={item.product.title} />
      <div className="cart-item-details">
        <h3>{item.product.title}</h3>
        <p>{item.product.category}</p>
        <span>{formatPrice(item.product.price)}</span>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control">
          <button type="button" onClick={() => onUpdate(item.product.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onUpdate(item.product.id, item.quantity + 1)}>+</button>
        </div>
        <button className="remove-button" onClick={() => onRemove(item.product.id)}>
          <FaTrash />
        </button>
      </div>
    </article>
  )
}

export default CartItem
