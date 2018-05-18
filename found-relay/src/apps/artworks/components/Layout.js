// import Nav from './Nav'
import PropTypes from 'prop-types'
import React from 'react'
// import { renderRoutes } from 'react-router-config'

export function Layout(props) {
  return (
    <div>
      {/* <Nav /> */}
      <div>
        <h3>Isomorphic React / Relay Modern / React Router App</h3>
        {/* <div>{renderRoutes(props.route.routes, props)}</div> */}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
