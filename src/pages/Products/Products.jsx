import { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import Filters from '../../components/Filters/Filters.jsx'
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import { useProducts } from '../../hooks/useProducts.jsx'
import { useDebounce } from '../../hooks/useDebounce.jsx'
import './Products.css'

function Products() {
  const {
    categories,
    loading,
    error,
    filteredProducts,
    selectedCategory,
    priceFilters,
    priceRange,
    sortBy,
    searchTerm,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    setSearchTerm,
  } = useProducts()

  const [searchValue, setSearchValue] = useState(searchTerm)
  const debouncedSearch = useDebounce(searchValue, 250)

  useEffect(() => {
    setSearchTerm(debouncedSearch)
  }, [debouncedSearch, setSearchTerm])

  return (
    <section className="products-page page-section">
      <div className="products-header">
        <div>
          <p className="eyebrow">Products</p>
          <h1>Browse products across all categories</h1>
          <p>Search, filter, and sort products quickly to find the perfect match.</p>
        </div>
      </div>
      <div className="products-grid-layout">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceFilters={priceFilters}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="products-content">
          <SearchBar searchTerm={searchValue} setSearchTerm={setSearchValue} />
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="error-box">{error}</div>
          ) : (
            <>
              <div className="results-summary">
                <span>{filteredProducts.length} products found</span>
                <span>Showing matched results</span>
              </div>
              <ProductGrid products={filteredProducts} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Products
