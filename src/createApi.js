export const createApi = url =>
  new Proxy(
    {},
    {
      get(target, key) {
        return async function(id = "") {
          const response = await fetch(`${url}/${key}/${id}`)
          if (response.ok) {
            return response.json()
          }

          return Promise.resolve({ error: "Malformed Request" })
        }
      }
    }
  )
