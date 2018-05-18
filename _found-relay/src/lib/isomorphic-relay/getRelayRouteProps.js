import invariant from 'invariant'
import { matchRoutes } from 'react-router-config'
import { isUndefined, pick, prop } from 'lodash/fp'

// Namespace under which we should look for root-level relay query / variable
// definitions. TODO: Make this configurable
const KEY = 'relay'

export function getRelayRouteProps(routes, url) {
  let query
  let variables

  matchRoutes(routes, url).forEach(({ route }) => {
    const firstMatch = prop(KEY, route)
    const secondMatch = prop(`component.${KEY}`, route)
    let toGrab

    const validateAgainstDup = (prop) => {
      invariant(
        isUndefined(prop),
        '[isomorphic-relay-router/getRouteProps] Error: Relay root query found ' +
          'on route definition and component. A root query can only exist in one ' +
          'location or the other.'
      )
    }

    if (firstMatch) {
      validateAgainstDup(secondMatch)
      toGrab = firstMatch
    } else if (secondMatch) {
      validateAgainstDup(firstMatch)
      toGrab = secondMatch
    }

    ;({ query, variables } = pick(['query', 'variables'], toGrab))
  })

  return {
    query,
    variables,
  }
}
