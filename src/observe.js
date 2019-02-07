import { Subject } from "rxjs"

export const observe = obj => {
  let subjectMap = {}
  let handler = {
    get(target, key) {
      if (Reflect.has(target, key)) {
        let ref = Reflect.get(target, key)
        let subject = subjectMap[key]
        if (subject) return subject

        subject = new Subject()
        subjectMap[key] = subject
        return subject
      }

      return undefined
    },

    set(target, key, value) {
      let passed = Reflect.set(target, key, value)
      if (passed) {
        subjectMap[key].next(value)
      }

      return passed
    }
  }

  return new Proxy(obj, handler)
}
