export const logger = obj =>
  new Proxy(obj, {
    set(target, key, value) {
      console.log(`${key}: ${target[key]} -> ${value}`)
      return Reflect.set(target, key, value)
    }
  })
