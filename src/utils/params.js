export function toParams(params) {
  let param = ''
  for (const name in params) {
    console.log(name);
    if (typeof params[name] === 'object') {
      const paramsName = params[name]
      for (const name2 in paramsName) {
        param = `${param}&${name2}=${encodeURI(paramsName[name2])}`
      }
    } else if (typeof params[name] !== 'function') {
      param = `${param}&${name}=${encodeURI(params[name])}`
    }
  }
  console.log(param);
  console.log(param.substring(1));
  // console.log(param.substring(1));
  console.log(JSON.stringify(params))
  // return param.substring(1)
  return JSON.stringify(params)
}
