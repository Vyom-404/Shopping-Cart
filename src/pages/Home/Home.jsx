import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx'
import { useProducts } from '../../hooks/useProducts.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import './Home.css'

function Home() {
  const { filteredProducts, loading, error, searchTerm, setSearchTerm } = useProducts()

  return (
    <section className="home-page page-section">
      <div className="home-hero shadow-card">
        <div>
          <span className="eyebrow">E-Commerce Product Explorer</span>
          <h1>Browse categories, compare prices, and manage your cart in one place.</h1>
          <p>
            Explore curated products, filter by category and price, and build a shopping list that fits your budget.
          </p>
          <Link className="hero-button" to="/products">
            Explore products
          </Link>
        </div>
        <div className="hero-pill">
          <p>Featured categories</p>
          <div className="pill-list">
            <span>electronics</span>
            <span>jewelery</span>
            <span>men's clothing</span>
            <span>women's clothing</span>
          </div>
        </div>
      </div>

      <section className="home-browse">
        <div className="section-header">
          <div>
            <h2>Search and discover trending products</h2>
            <p>Try searching smart devices, fashion, or home essentials.</p>
          </div>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="error-box">{error}</div>
        ) : (
          <motion.div
            className="home-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ProductGrid products={filteredProducts.slice(0, 6)} />
          </motion.div>
        )}
      </section>
    </section>
  )
}

export default Home
