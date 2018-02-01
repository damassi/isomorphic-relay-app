import Nav from './Nav'
import React, { PropTypes } from 'react'

export default function Layout({ children }) {
  return (
    <div>
      <h3>Isomorphic React-Relay</h3>

      <Nav />

      <div>{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
