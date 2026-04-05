import './Loading.css'

function Loading({ message = 'Loading products...' }) {
  return (
    <div className="loading-shell">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  )
}

export default Loading
