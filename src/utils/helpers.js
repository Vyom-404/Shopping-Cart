export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

export const placeholderImage =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%20viewBox%3D%220%200%20300%20300%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23f8fafc%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23738%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2220%22%3ENo%20image%3C%2Ftext%3E%3C%2Fsvg%3E'

export const formatProducts = (products) =>
  products.map((product) => ({
    ...product,
    title: product.title.trim(),
    rating: product.rating || { rate: 0, count: 0 },
  }))
