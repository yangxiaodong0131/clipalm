const stream = weex.requireModule('stream')
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
      case '查询':
        url = 'wt4_stat_cv?plat=client'
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
    stream.fetch({
      method: 'GET',
      type: 'json',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      responseType: 'json',
      url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/${url}`
    }, res => {
      if (res.ok) {
        switch (menu) {
          case 'MDC':
            obj.$store.commit('SET_mdc_rule', res.data.data)
            break
          case 'ADRG':
            obj.$store.commit('SET_adrg_rule', res.data.data)
            break
          case 'DRG':
            obj.$store.commit('SET_drg_rule', res.data.data)
            break
          case 'ICD9':
            obj.$store.commit('SET_icd9_rule', res.data.data)
            break
          case 'ICD10':
            obj.$store.commit('SET_icd10_page', parseInt(res.data.page))
            obj.$store.commit('SET_icd10_rule', res.data.data)
            break
          case 'icd10One':
            obj.$store.commit('SET_icd10_page', parseInt(res.data.page))
            let data = obj.$store.state.Library.icd10Rule
            data = data.concat(res.data.data)
            obj.$store.commit('SET_icd10_rule', data)
            break
          case 'icd9One':
            obj.$store.commit('SET_icd9_page', parseInt(res.data.page))
            let data1 = obj.$store.state.Library.icd9Rule
            data1 = data1.concat(res.data.data)
            obj.$store.commit('SET_icd9_rule', data1)
            break
          case '查询':
            obj.$store.commit('SET_statDrg', res.data.data)
            break
          case '病案查询':
            obj.$store.commit('SET_wt4Case', res.data.data)
            break
          default:
            break
        }
      } else {
        obj.info = '- 网络连接失败 -'
      }
    })
  }
}
