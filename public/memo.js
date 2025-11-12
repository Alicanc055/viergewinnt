function memo (func) {
  let cache = new Map()

  return (...args) => {
    let argStr = args.toString(), result
    if ((result = cache.get(argStr)) === undefined) {
      result = func(...args)
      cache.set(argStr, result)
    }
    return result
  }
}
