import { inspect } from 'util'
import RelayResponse from 'react-relay-network-modern/lib/RelayResponse'
import { getCacheKey, isFunction } from './utils'

// type SSRGraphQLArgs = {|
//   schema: GraphQLSchema,
//   rootValue?: mixed,
//   contextValue?: mixed,
//   operationName?: ?string,
//   fieldResolver?: ?GraphQLFieldResolver<any, any>,
// |};

export default class RelayServerSSR {
  cache
  debug

  constructor() {
    this.cache = new Map()
  }

  getMiddleware(args) {
    return () => async r => {
      const req = r
      const cacheKey = getCacheKey(req.operation.name, req.variables)

      const cachedResponse = this.cache.get(cacheKey)
      if (cachedResponse) {
        this.log('Get graphql query from cache', cacheKey)
        return RelayResponse.createFromGraphQL(await cachedResponse)
      }

      this.log('Run graphql query', cacheKey)
      const gqlResponse = new Promise(async (resolve, reject) => {
        setTimeout(() => {
          reject(new Error('RelayRequest timeout'))
        }, 30000)

        // const res = await next(req);
        // console.log('RelayResponse', res);
        // const graphqlArgs = isFunction(args) ? await args() : args
        // const payload = await graphql({
        //   ...graphqlArgs,
        //   source: req.getQueryString(),
        //   variableValues: req.getVariables(),
        // })
        resolve(payload)
      })
      this.cache.set(cacheKey, gqlResponse)

      const res = await gqlResponse
      this.log(
        'Recieved response for',
        cacheKey,
        inspect(res, { colors: true, depth: 4 })
      )
      return RelayResponse.createFromGraphQL(res)
    }
  }

  async getCache() {
    const arr = []
    const keys = Array.from(this.cache.keys())
    for (let i = 0; i < keys.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const payload = await this.cache.get(keys[i])
      arr.push([keys[i], payload])
    }
    this.log('Recieved all payloads', arr.length)
    return arr
  }

  log(...args) {
    if (this.debug) {
      console.log(...args)
    }
  }
}
