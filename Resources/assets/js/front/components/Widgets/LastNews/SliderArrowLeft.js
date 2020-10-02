import React from 'react'

export default ({ className, to, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`previous round ${className}`}
    aria-label={to}
  >
  </button>
)