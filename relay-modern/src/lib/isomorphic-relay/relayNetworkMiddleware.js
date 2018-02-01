import 'regenerator-runtime/runtime'

import {
  RelayNetworkLayer,
  urlMiddleware,
  loggerMiddleware,
  gqlErrorsMiddleware,
  perfMiddleware
} from 'react-relay-network-modern'

export const network = new RelayNetworkLayer([
  urlMiddleware({ url: process.env.METAPHYSICS_BASE_URL }),
  loggerMiddleware(),
  gqlErrorsMiddleware(),
  perfMiddleware()
])
