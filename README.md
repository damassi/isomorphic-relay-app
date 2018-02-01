Example app showing how to isomorphically render a Relay Modern or Classic app. Connects to Artsy's [GraphQL server](https://github.com/artsy/metaphysics).

### Setup

```bash
git clone --recursive git@github.com:damassi/isomorphic-relay-app.git

cd relay-modern
# Or
cd relay-classic

yarn install
yarn sync:schema
yarn start

open http://localhost:5000
```

For more detailed instructions, see the [Relay Modern](relay-modern) or [Relay Classic](relay-classic) folders.
