const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const urlConfig = require('../utils/config.js')
export function getServer (obj, type, menu, value = null) {
  // type:判断查询全部还是单项
  // menu:判断查询drg类型（mdc、adrg…）
  // value:单项查询条件
  let url = null
  if (type === 'all') {
    switch (menu) {
      case 'MDC':
        url = 'rule_bj_mdc?plat=client'
        break
      case 'ADRG':
        url = 'rule_bj_adrg?plat=client'
        break
      case 'DRG':
        url = 'rule_bj_drg?plat=client'
        break
      case 'ICD9':
        url = 'rule_bj_icd9?plat=client'
        break
      case 'ICD10':
        url = 'rule_bj_icd10?plat=client'
        break
      case '报表':
        url = 'wt4_stat_cv?plat=client'
        break
      case '未入组病历':
        url = 'wt4_2017?plat=client&drg=0000'
        break
      default:
    }
  } else if (type === 'adrgOne') {
    url = `rule_bj_adrg?mdc=${value.mdc}&plat=client`
  } else if (type === 'drgOne') {
    url = `rule_bj_drg?adrg=${value.code}&plat=client`
  } else if (type === 'wt4') {
    url = 'wt4_2017?plat=client'
  } else if (type === 'icd10One') {
    url = `rule_bj_icd10?page=${obj.$store.state.Library.icd10Page + 1}&plat=client`
  } else if (type === 'icd9One') {
    url = `rule_bj_icd9?page=${obj.$store.state.Library.icd9Page + 1}&plat=client`
  }
  if (url) {
    // 先取storage
    storage.getItem(url, e => {
      // console.log(e)
      if (e.result === 'success') {
        const edata = JSON.parse(e.data)
        setStore(obj, menu, edata)
      } else {
        stream.fetch({
          method: 'GET',
          type: 'json',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          responseType: 'json',
          url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/${url}`
        }, res => {
          if (res.ok) {
            storage.setItem(url, JSON.stringify(res.data), e => {
              console.log('storage success')
            })
            setStore(obj, menu, res.data)
          } else {
            obj.info = '- 网络连接失败 -'
          }
        })
      }
    })
  }
}

function setStore (obj, menu, rdata) {
  switch (menu) {
    case 'MDC':
      obj.$store.commit('SET_library_menu', menu)
      obj.$store.commit('SET_mdc_rule', rdata.data)
      break
    case 'ADRG':
      obj.$store.commit('SET_library_menu', menu)
      obj.$store.commit('SET_adrg_rule', rdata.data)
      break
    case 'DRG':
      obj.$store.commit('SET_library_menu', menu)
      obj.$store.commit('SET_drg_rule', rdata.data)
      break
    case 'ICD9':
      obj.$store.commit('SET_library_menu', menu)
      obj.$store.commit('SET_icd9_rule', rdata.data)
      break
    case 'ICD10':
      obj.$store.commit('SET_library_menu', menu)
      obj.$store.commit('SET_icd10_page', parseInt(rdata.page))
      obj.$store.commit('SET_icd10_rule', rdata.data)
      break
    case 'icd10One':
      obj.$store.commit('SET_icd10_page', parseInt(rdata.page))
      let data = obj.$store.state.Library.icd10Rule
      data = data.concat(rdata.data)
      obj.$store.commit('SET_icd10_rule', data)
      break
    case 'icd9One':
      obj.$store.commit('SET_icd9_page', parseInt(rdata.page))
      let data1 = obj.$store.state.Library.icd9Rule
      data1 = data1.concat(rdata.data)
      obj.$store.commit('SET_icd9_rule', data1)
      break
    case '报表':
      obj.$store.commit('SET_statDrg', rdata.data)
      break
    case '未入组病历':
      obj.$store.commit('SET_wt4Case', rdata.data)
      break
    default:
      break
  }
}
