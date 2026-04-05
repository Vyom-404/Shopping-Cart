# Amaazon

A React + Vite e-commerce product explorer built with a clean product browsing experience, shopping cart, wishlist, and dark mode support.

## Overview

This project is a small online store UI that includes:

- product list and dynamic filtering by category, price, and search term
- product detail pages with image gallery and description
- wishlist toggle and cart management
- client-side checkout summary
- dark mode toggle with saved preference
- resilient data loading with fallback product data when the external API is unavailable

## Key files and folders

- `src/App.jsx` - top-level router, app shell, navigation, and dark mode toggle
- `src/index.css` - global theme variables and base styles
- `src/App.css` - app layout styling and header/footer theme handling
- `src/pages/Products/Products.jsx` - main product browsing page with filters, search, and results
- `src/pages/ProductDetails/ProductDetails.jsx` - detailed product view with gallery and actions
- `src/pages/Home/Home.jsx` - home landing page with featured search
- `src/pages/Cart/Cart.jsx` - cart page that shows selected items and total
- `src/pages/Wishlist/Wishlist.jsx` - wishlist page for saved products
- `src/pages/Checkout/Checkout.jsx` - checkout page and summary
- `src/components/Filters/Filters.jsx` - product filter controls
- `src/components/ProductGrid/ProductGrid.jsx` - product grid layout
- `src/components/ProductCard/ProductCard.jsx` - individual product cards
- `src/components/Loading/Loading.jsx` - reusable loading state UI
- `src/context/CartContext.jsx` - cart and wishlist state provider
- `src/hooks/useProducts.jsx` - reusable product fetching and filtering hook
- `src/services/api.js` - API client and fallback loading logic
- `src/services/mockData.js` - local sample products and categories used when the network is unavailable
- `src/utils/helpers.js` - shared formatting helpers and placeholder image data

## Architecture

- Uses React Router for page navigation
- Uses component-based styling with CSS modules per component/page
- Stores cart and wishlist state with React context
- Fetches products from `https://fakestoreapi.com` and falls back to local mock data if the API is unreachable
- Persists dark mode preference in `localStorage`

## Running locally

```bash
npm install
npm run dev
```

Then open the local Vite server URL shown in the terminal.

## Build for production

```bash
npm run build
```

## Notes

- If the external API is blocked, the app still loads sample products from `src/services/mockData.js`.
- The dark mode toggle is available in the top header and will remember the selected theme.
- Components are styled responsively to support mobile and desktop layouts.
