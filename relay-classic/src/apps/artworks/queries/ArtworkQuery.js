import Relay from 'react-relay'

export default {
  artwork: (component, params) => Relay.QL`
    query {
      artwork(id: $id) {
        ${component.getFragment('artwork', params)}
      }
    }
  `
}
