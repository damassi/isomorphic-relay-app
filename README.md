Example app showing how to isomorphically render a Relay Modern or Classic app. Connects to Artsy's [GraphQL server](https://github.com/artsy/metaphysics).

For more detailed instructions see these examples:

* [Relay Modern with React Router 4](relay-modern)
* [Relay Modern with Found Router](relay-modern-found)
* [Relay Classic](relay-classic)

### Setup

```bash
git clone --recursive git@github.com:damassi/isomorphic-relay-app.git
cd isomorphic-relay-app

cd relay-modern
# or
cd relay-modern-found
# or
cd relay-classic
# then

yarn install
yarn sync-schema
yarn start

open http://localhost:5000
```
