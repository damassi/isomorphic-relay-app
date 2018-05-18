import { mountClient } from 'lib/relay/mountClient'
import { routes } from './routes'

mountClient(routes)

if (module.hot) {
  module.hot.accept()
}
