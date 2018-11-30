import { getDetails } from './details'
const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const urlConfig = require('./config.js')
const routers = require('./routers.js')

export function getServer (obj, activeTab, menu, value = null) {
  // activeTab:页面, menu:判断查询菜单, value:查询条件
  // 先取storage
  const url = routers(obj, activeTab, menu, value)
  storage.getItem(url, e => {
    if (e.result === 'success!') {
      const edata = JSON.parse(e.data)
      setStore(obj, menu, 'type', edata)
    } else {
      obj.$store.commit('SET_isLoadingShow', true)
      stream.fetch({
        method: 'GET',
        type: 'json',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        responseType: 'json',
        url: url
      }, function (res) {
        if (res.ok) {
          storage.setItem(url, JSON.stringify(res.data))
          setStore(obj, activeTab, menu, res.data)
        } else {
          obj.$store.commit('SET_isLoadingShow', false)
          modal.toast({ message: '- 网络连接超时 -', duration: 1 })
        }
      })
    }
  })
}

export function getLastVersion (obj) {
  stream.fetch({
    method: 'GET',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/clipalm_last_version`
  }, res => {
    if (res.ok) {
      obj.$store.commit('SET_serverVersion', res.data)
    } else {
      obj.info = '- 网络连接失败 -'
    }
  })
}

function setStore (obj, activeTab, menu, rdata) {
  let data = []
  let details = {}
  const infoLevel = obj.$store.state.Home.infoLevel
  switch (activeTab) {
    case 1:
      data = obj.$store.state.Edit.wt4Case
      data = data.concat(rdata.data)
      obj.$store.commit('SET_wt4Info', rdata.info)
      obj.$store.commit('SET_wt4Case', data)
      break
    case 2:
      switch (menu) {
        case 'ADRG':
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, rdata.data[0])
          obj.$store.commit('SET_info', details)
          break
        case 'DRG':
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, rdata.data[0])
          obj.$store.commit('SET_info', details)
          break
        case 'ICD10亚目':
          data.icd = rdata.data.map((x) => {
            x.name = x.desc
            return x
          })
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, data)
          obj.$store.commit('SET_info', details)
          break
        case 'ICD10细目':
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, rdata.data[0])
          obj.$store.commit('SET_info', details)
          break
        case 'ICD9亚目':
          data.icd = rdata.data.map((x) => {
            x.name = x.desc
            return x
          })
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, data)
          obj.$store.commit('SET_info', details)
          break
        case 'ICD9细目':
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, rdata.data[0])
          obj.$store.commit('SET_info', details)
          break
        case '诊断术语-部位':
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, { icd: rdata.data })
          obj.$store.commit('SET_info', details)
          break
        case '操作术语-部位':
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, { icd: rdata.data })
          obj.$store.commit('SET_info', details)
          break
        default:
          data = obj.$store.state.Library.rule
          data = data.concat(rdata.data)
          obj.$store.commit('SET_rule', data)
          break
      }
      break
    case 3:
      switch (menu) {
        case 'ADRG分析':
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, rdata.data[0])
          obj.$store.commit('SET_info', details)
          break
        case 'DRG分析':
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, rdata.data[0])
          obj.$store.commit('SET_info', details)
          break
        default:
          data = obj.$store.state.Stat.statDrg
          data = data.concat(rdata.data)
          obj.$store.commit('SET_statDrg', rdata.data)
          break
      }
      break
    case 4:
      switch (menu) {
        case '贴子列表':
          obj.$store.commit('SET_post', rdata.data)
          break
        case '最新贴子':
          obj.$store.commit('SET_post', rdata.data)
          break
        case '贴子':
          obj.$store.commit('SET_forumContent', rdata.data[0])
          break
      }
      break
  }
  // 判断是否有数据
  if (data.length === 0) {
    obj.$store.commit('SET_showData', false)
  }
  // 判断是否有更多数据
  if (rdata.data.length === 0 || data.length === 0) {
    obj.$store.commit('SET_showMore', false)
  } else {
    obj.$store.commit('SET_showMore', true)
  }
  // 隐藏查询loading
  obj.$store.commit('SET_isLoadingShow', false)
}
