import { FaSearch } from 'react-icons/fa'
import './SearchBar.css'

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar shadow-card">
      <FaSearch className="search-icon" />
      <input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search products, phones, laptops, headphones..."
        aria-label="Search products"
      />
    </div>
  )
}

export default SearchBar
