import { mountClient } from 'lib/isomorphic-relay/mountClient'
import { routes } from './routes'

mountClient(routes, 'react-root')

if (module.hot) {
  module.hot.accept()
}
