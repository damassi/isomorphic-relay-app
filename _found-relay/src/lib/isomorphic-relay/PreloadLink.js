import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getRelayRouteProps } from './getRelayRouteProps'
import { fetchQuery } from 'react-relay'
import { getRelayEnvironment } from './getRelayEnvironment'
import { omit } from 'lodash/fp'
import { injectContext } from './injectContext'

export const PreloadLink = injectContext(context => {
  return {
    routerCache: context.routerCache,
    routes: context.routes
  }
}, class extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        replace: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
      }),
    }).isRequired,
  }

  static propTypes = {
    routerCache: PropTypes.object.isRequired,
    to: PropTypes.string.isRequired,
    immediate: PropTypes.bool, // load page data in the background on mount
  }

  static defaultProps = {
    immediate: false,
  }

  state = {
    isLoading: false,
  }

  componentDidMount() {
    if (this.props.immediate) {
      this.fetchData()
    }
  }

  fetchData() {
    return new Promise(async (resolve, reject) => {
      const { to, routerCache, routes } = this.props // TODO: Check cache against relay store
      const cacheKey = to

      if (routerCache.get(cacheKey)) {
        return resolve()
      }

      const { query, variables } = getRelayRouteProps(routes, cacheKey)
      const environment = getRelayEnvironment()

      try {
        if (query) {
          const response = await fetchQuery(environment, query, variables)
          routerCache.set(cacheKey, response)
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
    // RR will pass all props down to dom, leading to props warnings from React
    const props = omit(['immediate', 'routerCache'], this.props)

    return (
      <Link onClick={this.handleClick} {...props}>
        {this.props.children}
        {this.state.isLoading ? ' [loading...]' : null}
      </Link>
    )
  }
})
