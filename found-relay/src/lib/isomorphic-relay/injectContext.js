import PropTypes from 'prop-types'
import React, { Component } from 'react'

export function injectContext(getContextSlice, WrappedComponent) {
  return class RelayRouterContextInjector extends Component {
    static contextTypes = {
      provide: PropTypes.object.isRequired
    }

    render() {
      const contextSlice = getContextSlice(this.context.provide)

      return (
        <WrappedComponent {...contextSlice} {...this.props} {...this.state} />
      )
    }
  }
}
