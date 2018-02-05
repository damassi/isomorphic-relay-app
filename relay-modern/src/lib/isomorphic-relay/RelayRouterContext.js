import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class RelayRouterContext extends Component {
  static childContextTypes = {
    provide: PropTypes.object
  }

  getChildContext() {
    return {
      provide: this.props.provide
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
