import 'isomorphic-fetch'
import 'regenerator-runtime/runtime'
import { Environment, RecordSource, Store } from 'relay-runtime'

import {
  RelayNetworkLayer,
  urlMiddleware,
  loggerMiddleware,
  gqlErrorsMiddleware,
  perfMiddleware
} from 'react-relay-network-modern'

const network = new RelayNetworkLayer([
  urlMiddleware({ url: process.env.METAPHYSICS_BASE_URL }),
  loggerMiddleware(),
  gqlErrorsMiddleware(),
  perfMiddleware()
])

export function getRelayEnvironment(records) {
  const source = new RecordSource(records)
  const store = new Store(source)

  return new Environment({
    network,
    store
  })
}
