import { mountClient } from 'lib/relay/mountClient'
import { routes } from './routes'

console.log('is this working????')
mountClient(routes)

if (module.hot) {
  module.hot.accept()
}
