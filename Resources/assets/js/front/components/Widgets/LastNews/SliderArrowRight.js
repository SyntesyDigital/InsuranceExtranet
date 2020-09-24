import React from 'react'

export default ({ className, to, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`next round ${className}`}
    aria-label={to}
  >
  </button>
)
