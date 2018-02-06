import React from 'react'
import Loadable from 'react-loadable'

const Example1 = Loadable({
  loader: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(import('./Example1'))
      }, 1000)
    })
  },
  loading: (props) => {
    if (props.error) {
      return <div>Error!</div>
    } else {
      return <div>Loading...</div>
    }
  },
})

export function ReactLoadableClientRoute() {
  return (
    <div>
      <h3>ReactLoadableClient!</h3>
      <Example1 />
    </div>
  )
}
