import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class PreloaderLink extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor() {
    super()
    this.state = { loading: false }
  }

  handleClick = (evt) => {
    evt.preventDefault()
    this.setState({ loading: true })
    this.props.onPreload().then(() => {
      this.setState({ loading: false })
      const { replace, to } = this.props
      if (replace) {
        this.context.router.replace(to)
      } else {
        this.context.router.push(to)
      }
    })
  }

  render() {
    return (
      <Link onClick={this.handleClick} {...this.props}>
        {this.props.children}
        {this.state.loading ? ' [loading...]' : null}
      </Link>
    )
  }
}
