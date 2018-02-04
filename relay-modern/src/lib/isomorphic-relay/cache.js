const cacheMap = new Map()

export function set(key, value) {
  cacheMap.set(key, value)
}

export function get(key) {
  return cacheMap.get(key)
}
