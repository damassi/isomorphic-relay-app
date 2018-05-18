import { Resolver } from 'found-relay'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

export function createResolver(fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  })

  return new Resolver(environment)
}
