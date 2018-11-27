import { getDetails } from './details'
const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const urlConfig = require('./config.js')
const qs = require('qs')

export function getServer (obj, activeTab, menu, value = null) {
  // activeTab:页面
  // menu:判断查询菜单
  // value:查询条件
  let version = ''
  let year = ''
  let url = ''
  let router = urlConfig.router
  switch (obj.$store.state.Home.user.data.clipalm_version) {
    case 'BJ编码版':
      version = 'BJ'
      break
    case 'CC编码版':
      version = 'CC'
      break
    case 'GB编码版':
      version = 'GB'
      break
    case '术语版':
      version = 'CN'
      break
    default:
      version = 'BJ'
      break
  }
  if (obj.$store.state.Home.user.data.clipalm_year) {
    year = obj.$store.state.Home.user.data.clipalm_year
  } else {
    year = '2017'
  }
  if (value && !value.version) {
    value.version = 'CN'
  }
  if (value === null) {
    switch (menu) {
      case 'QY病历':
        url = `wt4_2017?plat=client&drg=QY&page=${obj.$store.state.Edit.wt4Page}&version=${version}`
        router = 'drgwork_wt4/expert'
        break
      case '未入组病历':
        url = `wt4_2017?plat=client&drg=0000&page=${obj.$store.state.Edit.wt4Page}&version=${version}`
        router = 'drgwork_wt4/expert'
        break
      case '低风险死亡病历':
        url = `wt4_2017?plat=client&sf0108=5&page=${obj.$store.state.Edit.wt4Page}&version=${version}`
        router = 'drgwork_wt4/expert'
        break
      case '费用异常病历':
        url = `wt4_2017?plat=client&cv=1&page=${obj.$store.state.Edit.wt4Page}&version=${version}`
        router = 'drgwork_wt4/expert'
        break
      case 'CN-DRG':
        url = `rule_bj_mdc?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case 'ADRG':
        url = `rule_bj_adrg?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case 'DRG':
        url = `rule_bj_drg?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case 'BJ-ICD10':
        url = `icd10c?plat=client&year=2017&page=${obj.$store.state.Library.page}`
        break
      case 'BJ-ICD9':
        url = `icd9c?plat=client&year=2017&page=${obj.$store.state.Library.page}`
        break
      case 'GB-ICD10':
        url = `icd10c?plat=client&version=GB&year=2018&page=${obj.$store.state.Library.page}`
        break
      case 'GB-ICD9':
        url = `icd9c?plat=client&version=GB&year=2018&page=${obj.$store.state.Library.page}`
        break
      case '疾病分类/诊断术语':
        url = `rule_bj_mdc?plat=client&version=CN&type=dissect`
        break
      case '临床手术/操作术语':
        url = `rule_bj_mdc?plat=client&version=CN&type=dissect`
        break
      case 'DRG基础':
        url = `wt4_stat_mdc?plat=client&order=code&page=${obj.$store.state.Stat.statPage}`
        break
      case '主诊未入组':
        url = `wt4_stat_cv_disease?plat=client&version=${version}&page=${obj.$store.state.Stat.statPage}`
        router = 'drgwork_wt4/expert'
        break
      case 'DRG专家':
        url = `wt4_stat_cv?plat=client&order=cv&page=${obj.$store.state.Stat.statPage}`
        break
      case 'DRG机构':
        url = `wt4_stat_cv?plat=client&order=fee&page=${obj.$store.state.Stat.statPage}`
        break
      case '贴子列表':
        url = `forum?plat=client&table=`
        break
      case '最新贴子':
        url = `forum?plat=client&table=&order=time`
        break
    }
  } else {
    switch (menu) {
      case 'ADRG':
        url = `rule_bj_adrg?plat=client&page=1&code=${value.code}&version=${version}`
        break
      case 'DRG':
        url = `rule_bj_drg?plat=client&page=1&code=${value.code}&version=${version}`
        break
      case 'ICD10亚目':
        url = `rule_bj_icd10?plat=client&version=${value.version}&year=${value.year}&page=1&code=${value.code}`
        break
      case 'ICD10细目':
        url = `rule_bj_icd10?plat=client&version=${value.version}&year=${value.year}&page=1&code=${value.code}`
        break
      case 'ICD9亚目':
        url = `rule_bj_icd9?plat=client&version=${value.version}&year=${value.year}&page=1&code=${value.code}`
        break
      case 'ICD9细目':
        url = `rule_bj_icd9?plat=client&version=${value.version}&year=${value.year}&page=1&code=${value.code}`
        break
      case 'ADRG分析':
        url = `wt4_stat_adrg?plat=client&order=code&code=${value.code}`
        break
      case 'DRG分析':
        url = `wt4_stat_cv?plat=client&order=code&drg=${value.code}`
        break
      case '诊断术语-部位':
        url = `rule_bj_icd10?plat=client&version=CN&page=1&dissect=${value.name}&mdc=${value.mdc}`
        break
      case '操作术语-部位':
        url = `rule_bj_icd9?plat=client&version=CN&page=1&dissect=${value.name}&mdc=${value.mdc}`
        break
      case '贴子列表':
        url = `forum?plat=client&table=${value.b_wt4_v1_id}&username=${value.username}&module=${value.module}`
        break
      case '贴子':
        url = `forum?id=${value.id}`
        break
    }
  }
  if (url) {
    // 先取storage
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
          url: `${urlConfig.http}:${urlConfig.port}/${router}/${url}`
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
      switch (menu) {
        case 'statInfo':
          obj.$store.commit('SET_infoLevel', 2)
          details = getDetails(obj, '分析详情', rdata.data[0])
          obj.$store.commit('SET_info', details)
          break
        default:
          data = obj.$store.state.Edit.wt4Case
          data = data.concat(rdata.data)
          obj.$store.commit('SET_wt4Info', rdata.info)
          obj.$store.commit('SET_wt4Case', data)
          break
      }
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
  obj.$store.commit('SET_isLoadingShow', false)
}

export function createForum (obj, forum, type, activeTab) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/forum`,
    body: qs.stringify(forum)
  }, res => {
    if (res.ok) {
      switch (type) {
        case 'reply':
          modal.toast({ message: '回复成功', duration: 1 })
          obj.$store.commit('SET_menu', [activeTab, '贴子'])
          getServer(obj, activeTab, '贴子', res.data)
          break
        default:
          obj.$store.commit('SET_menu', [activeTab, '贴子列表'])
          obj.$store.commit('SET_post', [])
          obj.$store.commit('SET_forumPage', 1)
          modal.toast({ message: '贴子创建成功', duration: 1 })
          const module = forum.forum_all.forum.module
          getServer(obj, activeTab, '贴子列表', { module: module })
      }
    } else {
      obj.info = '- 网络连接超时 -'
    }
  })
}

export function deleteForum (obj, id) {
  stream.fetch({
    method: 'del',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/forum/${id}`
    // body: qs.stringify(forum)
  }, res => {
    if (res.ok) {
      console.log('===')
      // switch (type) {
      //   case 'reply':
      //     modal.toast({ message: '回复成功', duration: 1 })
      //     obj.$store.commit('SET_menu', [activeTab, '贴子'])
      //     getServer(obj, activeTab, '贴子', res.data)
      //     break
      //   default:
      //     obj.$store.commit('SET_menu', [activeTab, '贴子列表'])
      //     obj.$store.commit('SET_post', [])
      //     obj.$store.commit('SET_forumPage', 1)
      //     modal.toast({ message: '贴子创建成功', duration: 1 })
      //     const module = forum.forum_all.forum.module
      //     getServer(obj, activeTab, '贴子列表', { module: module })
      // }
    } else {
      obj.info = '- 网络连接超时 -'
    }
  })
}
