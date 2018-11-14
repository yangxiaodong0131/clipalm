function caseInfo (data) {
  const gridList = {}
  gridList['分组日志'] = data.log.map((x) => {
    const obj = { date: '', desc: '', highlight: false, title: x }
    return obj
  })
  const result = {
    info: data,
    infoTitle: '病案详情',
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: gridList,
    details: [
      {'label': '入组DRG', 'title': 'drg', 'hasArrow': true},
      {'label': '病案ID', 'title': 'b_wt4_v1_id', 'hasArrow': false},
      {'label': '主要诊断编码', 'title': 'disease_code', 'hasArrow': false},
      {'label': '主要诊断名称', 'title': 'disease_name', 'hasArrow': false},
      {'label': '其他诊断', 'title': 'diags_code', 'hasArrow': false},
      {'label': '手术/操作', 'title': 'opers_code', 'hasArrow': false},
      {'label': '住院天数', 'title': 'acctual_days', 'hasArrow': false},
      {'label': '住院总费用', 'title': 'total_expense', 'hasArrow': false},
      {'label': '性别', 'title': 'gender', 'hasArrow': false},
      {'label': '年龄', 'title': 'age', 'hasArrow': false},
      {'label': '新生儿天数', 'title': 'sf0100', 'hasArrow': false},
      {'label': '新生儿体重', 'title': 'sf0102', 'hasArrow': false},
      {'label': '呼吸机使用时间', 'title': 'sf0104', 'hasArrow': false},
      {'label': '出院转归', 'title': 'sf0108', 'hasArrow': false}]
  }
  return result
}
function statInfo (data) {
  const result = {
    info: data,
    infoTitle: '分析详情',
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: [],
    details: [
      {'label': '编码', 'title': 'code', 'hasArrow': false},
      {'label': '名称', 'title': 'desc', 'hasArrow': false},
      {'label': '费用变异系数', 'title': 'fee_cv', 'hasArrow': false},
      {'label': '时间变异系数', 'title': 'day_cv', 'hasArrow': false},
      {'label': '死亡风险等级', 'title': 'death_level', 'hasArrow': false},
      {'label': '权重', 'title': 'weight', 'hasArrow': false},
      {'label': '平均费用', 'title': 'fee_avg', 'hasArrow': false},
      {'label': '平均住院天数', 'title': 'day_avg', 'hasArrow': false},
      {'label': '病历数', 'title': 'num_sum', 'hasArrow': false}]
  }
  return result
}
function mdcInfo (data) {
  const gridList = {}
  const infoList = data.adrg.map((x) => {
    const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: 'ADRG', all: x}
    return obj
  })
  gridList['非QY小手术规则'] = data.icd9_aa.map((x) => {
    const obj = { title: x }
    return obj
  })
  const result = {
    info: data,
    infoTitle: `${data.code}规则详情`,
    infoListTitle: 'ADRG列表',
    isInfoListShow: true,
    infoList: infoList,
    gridList: gridList,
    details: [
      {'label': '编码', 'title': 'code', 'hasArrow': false},
      {'label': '名称', 'title': 'desc', 'hasArrow': false},
      {'label': '年份', 'title': 'year', 'hasArrow': false},
      {'label': '版本', 'title': 'version', 'hasArrow': false}]
  }
  return result
}
function adrgInfo (data) {
  const gridList = {}
  const infoList = data.drg.map((x) => {
    const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: 'DRG', all: x}
    return obj
  })
  gridList['主要诊断规则'] = data.icd10_aa.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  gridList['其他诊断规则'] = data.icd10_bb.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  gridList['主要手术规则'] = data.icd9_aa.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  gridList['其他手术规则'] = data.icd9_bb.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  const result = {
    info: data,
    infoTitle: `${data.code}规则详情`,
    isInfoListShow: true,
    infoListTitle: 'DRG列表',
    infoList: infoList,
    gridList: gridList,
    details: [
      {'label': '编码', 'title': 'code', 'hasArrow': false},
      {'label': '名称', 'title': 'desc', 'hasArrow': false},
      {'label': '年份', 'title': 'year', 'hasArrow': false},
      {'label': '版本', 'title': 'version', 'hasArrow': false}]
  }
  return result
}
function drgInfo (data) {
  const result = {
    info: data,
    infoTitle: `${data.code}规则详情`,
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: [],
    details: [
      {'label': '编码', 'title': 'code', 'hasArrow': false},
      {'label': '名称', 'title': 'desc', 'hasArrow': false},
      {'label': '年份', 'title': 'year', 'hasArrow': false},
      {'label': '版本', 'title': 'version', 'hasArrow': false}]
  }
  return result
}
function icd10Info (data) {
  const gridList = {}
  gridList['ADRG规则'] = data.adrg.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  const result = {
    info: data,
    infoTitle: 'ICD10规则详情',
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: gridList,
    details: [
      {'label': '编码', 'title': 'code', 'hasArrow': false},
      {'label': '名称', 'title': 'desc', 'hasArrow': false},
      {'label': '年份', 'title': 'year', 'hasArrow': false},
      {'label': '版本', 'title': 'version', 'hasArrow': false},
      {'label': 'MCC', 'title': 'mcc', 'hasArrow': false},
      {'label': 'CC', 'title': 'cc', 'hasArrow': false}]
  }
  return result
}
function icd9Info (data) {
  const gridList = {}
  gridList['ADRG规则'] = data.adrg.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  const result = {
    info: data,
    infoTitle: 'ICD9规则详情',
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: gridList,
    details: [
      {'label': '编码', 'title': 'code', 'hasArrow': false},
      {'label': '名称', 'title': 'desc', 'hasArrow': false},
      {'label': '年份', 'title': 'year', 'hasArrow': false},
      {'label': '版本', 'title': 'version', 'hasArrow': false},
      {'label': '手术室手术', 'title': 'p_type', 'hasArrow': false}]
  }
  return result
}
function compResultInfo (data) {
  const result = {
    info: data,
    infoTitle: '分组结果',
    isInfoButtonShow: false,
    buttonText: ``,
    details: [
      {'label': '入组DRG', 'title': 'drg', 'hasArrow': false},
      {'label': '分组日志', 'title': 'log', 'hasArrow': false}]
  }
  return result
}
function icd (data, title) {
  const infoList = data.icd.map((x) => {
    const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: title, all: x}
    return obj
  })
  const result = {
    info: data,
    infoTitle: title,
    isInfoListShow: true,
    infoListTitle: '',
    isInfoListTitleShow: false,
    infoList: infoList,
    gridList: [],
    details: []
  }
  return result
}

const info = {
  infoTitle: '',
  isInfoButtonShow: false,
  buttonText: '',
  gridList: [],
  details: []
}

export function getDetails (menu, data) {
  let result = info
  if (data) {
    switch (menu) {
      case '病案详情':
        result = caseInfo(data)
        break
      case '单条分组':
        result = compResultInfo(data)
        break
      case '分析详情':
        result = statInfo(data)
        break
      case 'MDC规则详情':
        result = mdcInfo(data)
        break
      case 'ADRG规则详情':
        result = adrgInfo(data)
        break
      case 'DRG规则详情':
        result = drgInfo(data)
        break
      case 'BJ-ICD10':
        result = icd(data, 'ICD10亚目列表')
        break
      case 'ICD10规则详情':
        result = icd10Info(data)
        break
      case 'ICD10亚目列表规则详情':
        result = icd(data, 'ICD10细目列表')
        break
      case 'ICD10细目列表规则详情':
        result = icd10Info(data)
        break
      case 'ICD9规则详情':
        result = icd9Info(data)
        break
      default:
        break
    }
  }
  return result
}
