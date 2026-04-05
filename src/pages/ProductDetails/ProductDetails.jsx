import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { FaHeart, FaShoppingCart, FaArrowLeft, FaStar } from 'react-icons/fa'
import { fetchProductById } from '../../services/api.js'
import { useCart } from '../../hooks/useCart.jsx'
import { useWishlist } from '../../hooks/useWishlist.jsx'
import { formatPrice, placeholderImage } from '../../utils/helpers.js'
import Loading from '../../components/Loading/Loading.jsx'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()
  const { wishlist, toggleWishlist } = useWishlist()

  useEffect(() => {
    setLoading(true)
    fetchProductById(id)
      .then((data) => {
        setProduct(data)
        setError(null)
      })
      .catch((err) => setError(err.message || 'Unable to load details'))
      .finally(() => setLoading(false))
  }, [id])

  const isWishlisted = wishlist.some((item) => item.id === product?.id)

  if (loading) return <Loading message="Loading product details..." />
  if (error) return <div className="error-box">{error}</div>
  if (!product) return null

  return (
    <article className="details-page page-section shadow-card">
      <div className="details-back">
        <Link to="/products" className="back-link">
          <FaArrowLeft /> Back to products
        </Link>
      </div>
      <div className="details-grid">
        <div className="details-gallery shadow-card">
          <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} spaceBetween={20} slidesPerView={1}>
            <SwiperSlide>
              <img
                src={product.image || placeholderImage}
                alt={product.title}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = placeholderImage
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={product.image || placeholderImage}
                alt={`${product.title} alternate`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = placeholderImage
                }}
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="details-summary">
          <span className="category-tag">{product.category}</span>
          <h1>{product.title}</h1>
          <div className="price-rating">
            <span className="detail-price">{formatPrice(product.price)}</span>
            <span className="detail-rating">
              <FaStar /> {product.rating.rate.toFixed(1)} / 5 ({product.rating.count} reviews)
            </span>
          </div>
          <p>{product.description}</p>
          <div className="details-actions">
            <button className="primary-btn" onClick={() => addToCart(product)}>
              <FaShoppingCart /> Add to cart
            </button>
            <button className="secondary-btn" onClick={() => toggleWishlist(product)}>
              <FaHeart className={isWishlisted ? 'active' : ''} /> {isWishlisted ? 'Saved' : 'Add to wishlist'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductDetails
