export const box = obj => {
  let handler = {
    set() {
      throw "I'm in a box!"
    },
    get(target, key) {
      if (key === "map") {
        return fn => new Proxy(fn(target), handler)
      }

      throw "I'm in a box"
    }
  }

  return new Proxy(obj, handler)
}
