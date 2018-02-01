import { graphql } from 'react-relay'

export const RootQuery = graphql`
  query RootQuery($id: String!) {
    artwork(id: $id) {
      ...App_artwork
    }
  }
`
