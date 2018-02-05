
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

const cacheMap = new Map()

export function set(key, value) {
  cacheMap.set(key, value)
}

export function get(key) {
  return cacheMap.get(key)
}
