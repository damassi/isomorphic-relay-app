Example lib demonstrating how to mount an Isomorphic Relay-Router app on top of Express, including hot reloading on the client. Connects to Artsy's [GraphQL server](https://github.com/artsy/metaphysics).

### Setup

```bash
yarn install
yarn sync-schema
yarn start

open http://localhost:5000
```

### Example

Mount a Relay-enabled app like so:

#### routes.js

```javascript
import About from "./components/About";
import Artwork from "./components/Artwork";
import ArtworkQuery from "./queries/ArtworkQuery";
import Layout from "./components/Layout";

export default (
  <Route path="/" component={Layout}>
    <Route path="about" component={About} />
    <Route path="artwork/:id" component={Artwork} queries={ArtworkQuery} />
  </Route>
);
```

#### client.js

```javascript
import routes from "./routes";
import { mountClient } from "lib/isomorphic-relay/client";

mountClient(routes);
```

#### server.js

```javascript
import express from "express";
import routes from "./routes";
import { mountServer } from "lib/isomorphic-relay/server";

const app = express();
export default app;

app.use(mountServer(routes));
```

#### Artwork.js

```javascript
import React from "react";
import Relay from "react-relay";

function Artwork(props) {
  const { artwork: { meta, partner } } = props;

  return (
    <div>
      <h2>{meta.title}</h2>
      <h4>Gallery: {partner.name}</h4>
    </div>
  );
}

export default Relay.createContainer(Artwork, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        meta {
          title
        }
        partner {
          name
        }
      }
    `
  }
});
```
