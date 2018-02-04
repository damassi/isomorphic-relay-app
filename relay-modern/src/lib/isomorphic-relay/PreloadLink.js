import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'

class PreloaderLink extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    isLoading: false,
  }

  handleClick = (event) => {
    event.preventDefault()

    this.setState({
      isLoading: true,
    })

    this.props.onPreload().then(() => {
      this.setState({
        isLoading: false,
      })

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
        {this.state.isLoading ? ' [loading...]' : null}
      </Link>
    )
  }
}
