import React from 'react'

export function HomeRoute({ children }) {
  return (
    <div>
      <h3>Home</h3>
      <div>
        Click the links below to explore different kinds of loading strategies
      </div>

      <div>{children}</div>
    </div>
  )
}
