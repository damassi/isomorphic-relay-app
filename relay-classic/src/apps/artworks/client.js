import routes from './routes'
import { mountClient } from 'lib/isomorphic-relay/client'

mountClient(routes)

if (module.hot) {
  module.hot.accept()
}
