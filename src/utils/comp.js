import { getDetails } from './details.js'
const stream = weex.requireModule('stream')
const urlConfig = require('./config.js')
const qs = require('qs')
export function compDrg (obj, wt4, i) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.drgserver}:3001/comp_drg`,
    body: qs.stringify(wt4)
  }, res => {
    if (res.ok) {
      const index = obj.$store.state.Home.activeTab
      const menu = obj.$store.state.Home.menu[index]
      const result = getDetails(obj, menu, res.data)
      compWt4(obj, wt4, result)
      obj.$store.commit('SET_groupResult', result)
    } else {
      obj.info = '- 网络连接超时 -'
    }
  })
}

export function compWt4 (obj, wt4, result) {
  let obj1 = {}
  const keys = Object.keys(wt4)
  keys.map((x) => {
    const lower = x.toLowerCase()
    obj1[lower] = wt4[x]
    return obj1
  })
  const keys1 = Object.keys(result)
  keys1.map((x) => {
    obj1[x] = result[x]
    return obj1
  })
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/wt4_comp`,
    body: qs.stringify({ wt4_comp: obj1 })
  }, res => {
    if (res.ok) {
    } else {
      obj.info = '- 网络连接超时 -'
    }
  })
}
