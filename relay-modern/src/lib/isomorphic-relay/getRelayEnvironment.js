import 'isomorphic-fetch'
import 'regenerator-runtime/runtime'
import { Environment, RecordSource, Store } from 'relay-runtime'
import RelayServerSSR from 'react-relay-network-modern-ssr/lib/server'
// import schema from '../../../../graphql/metaphysics/data/schemaj'

// const relayServerSSR = new RelayServerSSR()

import {
  RelayNetworkLayer,
  urlMiddleware,
  // loggerMiddleware,
  // gqlErrorsMiddleware,
  // perfMiddleware,
} from 'react-relay-network-modern'

const network = new RelayNetworkLayer([
  urlMiddleware({ url: process.env.METAPHYSICS_BASE_URL }),
  // relayServerSSR.getMiddleware({
  //   schema,
  //   contextValue: {},
  // }),
  // loggerMiddleware(),
  // gqlErrorsMiddleware({
  //   disableServerMiddlewareTip: true,
  // }),
  // perfMiddleware(),
])

let environment

export function getRelayEnvironment(records) {
  if (environment) {
    return environment
  }

  const source = new RecordSource(records)
  const store = new Store(source)

  environment = new Environment({
    network,
    store,
  })

  return environment
}
