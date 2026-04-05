import { FaFilter } from 'react-icons/fa'
import './Filters.css'

function Filters({ categories, selectedCategory, setSelectedCategory, priceFilters, priceRange, setPriceRange, sortBy, setSortBy }) {
  return (
    <aside className="filters-panel shadow-card">
      <div className="filters-header">
        <FaFilter />
        <h3>Filters</h3>
      </div>
      <div className="filter-group">
        <label>Categories</label>
        <div className="tabs">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === selectedCategory ? 'tab active' : 'tab'}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <label htmlFor="priceRange">Price range</label>
        <select id="priceRange" value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
          {priceFilters.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="sortBy">Sort by</label>
        <select id="sortBy" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to high</option>
          <option value="price-high">Price: High to low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </aside>
  )
}

export default Filters
