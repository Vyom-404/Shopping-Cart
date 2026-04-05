import axios from 'axios'
import { fallbackProducts, fallbackCategories } from './mockData.js'

const client = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
})

const handleFallback = (error, fallbackData, label) => {
  console.warn(`API request failed (${label}):`, error.message || error)
  return fallbackData
}

export const fetchProducts = () =>
  client
    .get('/products')
    .then((res) => res.data)
    .catch((err) => handleFallback(err, fallbackProducts, 'products'))

export const fetchCategories = () =>
  client
    .get('/products/categories')
    .then((res) => res.data)
    .catch((err) => handleFallback(err, fallbackCategories, 'categories'))

export const fetchProductById = (id) =>
  client
    .get(`/products/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      const product = fallbackProducts.find((item) => item.id === Number(id))
      if (product) {
        console.warn(`Product lookup failed for id ${id}, using fallback item.`)
        return product
      }
      return Promise.reject(err)
    })
