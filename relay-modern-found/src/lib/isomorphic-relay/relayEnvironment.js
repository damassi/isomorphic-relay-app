import 'isomorphic-fetch'
import 'regenerator-runtime/runtime'
import RelayServerSSR from 'react-relay-network-modern-ssr/lib/server'
import RelayClientSSR from 'react-relay-network-modern-ssr/lib/client'
import { Environment, RecordSource, Store } from 'relay-runtime'
import {
  RelayNetworkLayer,
  urlMiddleware,
  // loggerMiddleware,
} from 'react-relay-network-modern'

export function createRelayEnvironment(cache) {
  const isServer = typeof window === 'undefined'

  const relaySSRMiddleware = isServer
    ? new RelayServerSSR()
    : new RelayClientSSR(cache) // eslint-disable-line

  relaySSRMiddleware.debug = false

  const network = new RelayNetworkLayer([
    relaySSRMiddleware.getMiddleware(),
    // loggerMiddleware(),
    urlMiddleware({
      url: process.env.METAPHYSICS_BASE_URL,
    }),
  ])

  const source = new RecordSource()
  const store = new Store(source)
  const environment = new Environment({
    network,
    store,
  })
  environment.relaySSRMiddleware = relaySSRMiddleware

  return environment
}
