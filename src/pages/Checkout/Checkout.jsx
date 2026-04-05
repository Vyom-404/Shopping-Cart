import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCart } from '../../hooks/useCart.jsx'
import { formatPrice } from '../../utils/helpers.js'
import './Checkout.css'

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  address: yup.string().required('Shipping address is required'),
}).required()

function Checkout() {
  const { cartItems, cartTotal } = useCart()
  const tax = Number((cartTotal * 0.08).toFixed(2))
  const total = Number((cartTotal + tax).toFixed(2))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const summaryItems = useMemo(
    () =>
      cartItems.map((item) => ({
        title: item.product.title,
        quantity: item.quantity,
        amount: formatPrice(item.product.price * item.quantity),
      })),
    [cartItems],
  )

  const onSubmit = () => {
    window.alert('Order simulation complete. Thank you for shopping!')
  }

  return (
    <section className="checkout-page page-section">
      <div className="checkout-grid">
        <div className="checkout-form shadow-card">
          <h2>Checkout details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
            <label>
              Full name
              <input type="text" {...register('fullName')} />
              {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}
            </label>
            <label>
              Email address
              <input type="email" {...register('email')} />
              {errors.email && <p className="field-error">{errors.email.message}</p>}
            </label>
            <label className="full-width">
              Shipping address
              <textarea rows="4" {...register('address')} />
              {errors.address && <p className="field-error">{errors.address.message}</p>}
            </label>
            <button type="submit" className="primary-btn checkout-submit">
              Place order
            </button>
          </form>
        </div>
        <aside className="checkout-summary shadow-card">
          <h2>Order summary</h2>
          <div className="summary-list">
            {summaryItems.map((item) => (
              <div key={item.title} className="summary-item">
                <span>{item.quantity} × {item.title}</span>
                <strong>{item.amount}</strong>
              </div>
            ))}
          </div>
          <div className="total-row">
            <span>Subtotal</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <div className="total-row">
            <span>Estimated tax</span>
            <strong>{formatPrice(tax)}</strong>
          </div>
          <div className="total-row total-final">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Checkout
