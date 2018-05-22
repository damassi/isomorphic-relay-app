import Nav from './Nav'
import PropTypes from 'prop-types'
import React from 'react'

export function Layout(props) {
  return (
    <div>
      <Nav />
      <div>
        <h3>Isomorphic Relay app using Found</h3>
        <div>{props.children}</div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
