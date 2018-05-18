import React from 'react'
import Loadable from 'react-loadable'

const Example2 = Loadable({
  loader: () => import('./Example2'),
  loading: (props) => {
    if (props.error) {
      return <div>Error!</div>
    } else if (props.pastDelay) {
      return <div>Loading...</div>
    } else {
      return null
    }
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
