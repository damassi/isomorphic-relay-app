import Relay from 'react-relay'

const {
  METAPHYSICS_BASE_URL
} = process.env

export function artsyNetworkLayer () {
  return new Relay.DefaultNetworkLayer(METAPHYSICS_BASE_URL, {
    headers: {
      // 'X-USER-ID': ''
      // 'X-ACCESS-TOKEN': ''
    }
  })
}

/**
 * For the server.
 */
export function artsyRelayMiddleware (req, res, next) {
  res.locals.networkLayer = artsyNetworkLayer()
  next()
}

/**
 * For the client.
 */
export function artsyRelayEnvironment () {
  const env = new Relay.Environment()
  env.injectNetworkLayer(artsyNetworkLayer())
  return env
}
