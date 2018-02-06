import React from 'react'
import Loadable from 'react-loadable'

const Example2 = Loadable({
  loader: () => import('./Example2'),
  loading() {
    return <div>Loading...</div>
  },
})

export function ReactLoadableServerRoute() {
  return (
    <div>
      <h3>ReactLoadableServer!</h3>
      <Example2 />
    </div>
  )
}
