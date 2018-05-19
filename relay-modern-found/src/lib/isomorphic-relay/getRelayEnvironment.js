import 'isomorphic-fetch'
import 'regenerator-runtime/runtime'
import { Resolver } from 'found-relay'
import { Environment, RecordSource, Store } from 'relay-runtime'
import RelayServerSSR from 'react-relay-network-modern-ssr/lib/server'
import RelayClientSSR from 'react-relay-network-modern-ssr/lib/client'
// import schema from '../../../../graphql/metaphysics/data/schemaj'

import {
  RelayNetworkLayer,
  urlMiddleware,
  // loggerMiddleware,
  // gqlErrorsMiddleware,
  // perfMiddleware,
} from 'react-relay-network-modern'

let environment
let resolver

export function getRelayEnvironment(records) {
  // if (environment && resolver) {
  //   return {
  //     environment,
  //     resolver,
  //   }
  // }

  const relaySSRMiddleware =
    typeof window === 'undefined'
      ? new RelayServerSSR()
      : new RelayClientSSR(window.relayData)

  const network = new RelayNetworkLayer([
    relaySSRMiddleware.getMiddleware(),
    urlMiddleware({ url: process.env.METAPHYSICS_BASE_URL }),
    // next => async req => {
    //   const res = await next(req)
    //   // Store SSR payloads here
    //   console.log(await RelayResponse.createFromFetch(res))
    //   // console.log('RelayResponse', res)
    // },
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

  const source = new RecordSource(records)
  const store = new Store(source)

  environment = new Environment({
    network,
    store,
  })

  resolver = new Resolver(environment)

  return {
    environment,
    resolver,
    relaySSRMiddleware,
  }
}
