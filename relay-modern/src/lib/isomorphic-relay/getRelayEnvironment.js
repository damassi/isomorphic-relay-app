import 'isomorphic-fetch'
import 'regenerator-runtime/runtime'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

function fetchQuery(operation, variables) {
  return fetch(process.env.METAPHYSICS_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then((response) => {
    return response.json()
  })
}

const network = Network.create(fetchQuery)

export function getRelayEnvironment(records) {
  const source = new RecordSource(records)
  const store = new Store(source)

  return new Environment({
    network,
    store
  })
}
