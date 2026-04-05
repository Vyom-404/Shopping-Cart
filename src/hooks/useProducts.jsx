import { useEffect, useMemo, useState } from 'react'
import { fetchCategories, fetchProducts } from '../services/api.js'
import { formatProducts } from '../utils/helpers.js'

const priceFilters = [
  { label: 'All', value: 'all' },
  { label: '0 - 100', value: '0-100' },
  { label: '100 - 500', value: '100-500' },
  { label: '500 - 1000', value: '500-1000' },
  { label: '1000+', value: '1000+' },
]

export function useProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    let active = true
    setLoading(true)

    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productsData, categoriesData]) => {
        if (!active) return
        setProducts(formatProducts(productsData))
        setCategories(['all', ...categoriesData])
        setError(null)
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Failed to load products')
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  const filteredProducts = useMemo(() => {
    let result = products

    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory)
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter((item) => item.title.toLowerCase().includes(term))
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-')
      result = result.filter((item) => {
        if (priceRange === '1000+') return item.price >= 1000
        return item.price >= Number(min) && item.price <= Number(max)
      })
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating.rate - a.rating.rate)
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => b.id - a.id)
    }

    return result
  }, [products, selectedCategory, searchTerm, priceRange, sortBy])

  return {
    products,
    categories,
    loading,
    error,
    filteredProducts,
    selectedCategory,
    priceRange,
    sortBy,
    searchTerm,
    priceFilters,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    setSearchTerm,
  }
}
