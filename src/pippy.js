let viewer = _ => _

export const peep = getter => {
  return getter(viewer)
}

export const pippy = obj => {
  let handler = {
    get(target, key) {
      return (value => {
        return fn => {
          if (fn === viewer) {
            return target[key]
          }
          return new Proxy(
            {
              ...target,
              [key]: fn(value)
            },
            handler
          )
        }
      })(target[key])
    }
  }

  let proxy = new Proxy(obj, handler)

  return proxy
}
