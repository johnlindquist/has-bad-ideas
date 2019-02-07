let map = new WeakMap()

export const review = (proxy, index) => {
  let history = map.get(proxy)
  if (index === undefined) {
    return history
  }
  if (index < 0) {
    return history[history.length + index - 1]
  }

  return history[index]
}

export const track = obj => {
  let proxy = new Proxy(obj, {
    set(target, key, value) {
      //maybe add Date and more info?
      map.set(proxy, [...map.get(proxy), { ...target, [key]: value }])

      return Reflect.set(target, key, value)
    }
  })

  map.set(proxy, [{ ...obj }])

  return proxy
}
