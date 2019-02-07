export const lens = new Proxy(
  {},
  {
    get(target, prop) {
      return _ => prop
    }
  }
)
