import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getRelayRouteProps } from './getRelayRouteProps'
import { routes } from 'apps/artworks/routes'
import { fetchQuery } from 'react-relay'
import { getRelayEnvironment } from './getRelayEnvironment'
import * as cache from './cache'

export class PreloadLink extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        replace: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
      }),
    }).isRequired,
  }

  state = {
    isLoading: false,
  }

  fetchData() {
    return new Promise(async (resolve, reject) => {
      // TODO: Check cache against relay store
      const cacheKey = this.props.to

      if (cache.get(cacheKey)) {
        return resolve()
      }

      const { query, variables } = getRelayRouteProps(routes, cacheKey)
      const environment = getRelayEnvironment()

      try {
        if (query) {
          const response = await fetchQuery(environment, query, variables)
          cache.set(cacheKey, response)
        }

        resolve()
      } catch (error) {
        console.error('[isomorphic-relay] PreloadLink.js Error:', error)
      }
    })
  }

  handleClick = (event) => {
    event.preventDefault()

    this.setState({
      isLoading: true,
    })

    this.fetchData().then(() => {
      const { replace, to } = this.props
      const { router: { history } } = this.context

      this.setState({
        isLoading: false,
      })

      if (replace) {
        history.replace(to)
      } else {
        history.push(to)
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
