import 'isomorphic-fetch'
import 'regenerator-runtime/runtime'
import RelayServerSSR from 'react-relay-network-modern-ssr/lib/server'
import RelayClientSSR from 'react-relay-network-modern-ssr/lib/client'
import { Environment, RecordSource, Store } from 'relay-runtime'
import {
  RelayNetworkLayer,
  urlMiddleware,
  cacheMiddleware,
  // loggerMiddleware,
} from 'react-relay-network-modern'

export function createRelayEnvironment(cache) {
  const isServer = typeof window === 'undefined'

  const relaySSRMiddleware = isServer
    ? new RelayServerSSR()
    : new RelayClientSSR(cache) // eslint-disable-line

  relaySSRMiddleware.debug = false

  const network = new RelayNetworkLayer([
    relaySSRMiddleware.getMiddleware({
      lookup: true,
    }),
    cacheMiddleware({
      size: 100, // max 100 requests
      ttl: 900000, // 15 minutes
      onInit: cache => {
        // TODO: Handle this cache
        // console.log(cache)
      },
    }),
    urlMiddleware({
      url: process.env.METAPHYSICS_BASE_URL,
    }),
    // loggerMiddleware(),
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
