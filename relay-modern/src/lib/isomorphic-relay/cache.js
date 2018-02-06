export class Cache {
  constructor() {
    this.cacheMap = new Map()
  }

  set(key, value) {
    this.cacheMap.set(key, value)
  }

  get(key) {
    return this.cacheMap.get(key)
  }
}
