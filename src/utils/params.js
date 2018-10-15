export function toParams(params) {
  let param = ''
  for (const name in params) {
    if (typeof params[name] === 'object') {
      const paramsName = params[name]
      for (const name2 in paramsName) {
        param = `${param}&${name2}=${encodeURI(paramsName[name2])}`
      }
    } else if (typeof params[name] !== 'function') {
      param = `${param}&${name}=${encodeURI(params[name])}`
    }
  }
  return JSON.stringify(params)
}
