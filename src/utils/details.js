const caseInfo = {
  infoTitle: '病案详情',
  isInfoButtonShow: false,
  buttonText: '',
  gridList: [],
  details: [
    {'label': '入组DRG', 'title': 'drg'},
    {'label': '病案ID', 'title': 'b_wt4_v1_id'},
    {'label': '主要诊断编码', 'title': 'disease_code'},
    {'label': '主要诊断名称', 'title': 'disease_name'},
    {'label': '其他诊断', 'title': 'diags_code'},
    {'label': '手术/操作', 'title': 'opers_code'},
    {'label': '住院天数', 'title': 'acctual_days'},
    {'label': '住院总费用', 'title': 'total_expense'},
    {'label': '性别', 'title': 'gender'},
    {'label': '年龄', 'title': 'age'},
    {'label': '新生儿天数', 'title': 'sf0100'},
    {'label': '新生儿体重', 'title': 'sf0102'},
    {'label': '呼吸机使用时间', 'title': 'sf0104'},
    {'label': '出院转归', 'title': 'sf0108'},
    {'label': '分组日志', 'title': 'log'}]
}
const statInfo = {
  infoTitle: '分析详情',
  isInfoButtonShow: false,
  buttonText: '',
  gridList: [],
  details: [
    {'label': '编码', 'title': 'code'},
    {'label': '名称', 'title': 'desc'},
    {'label': '费用变异系数', 'title': 'fee_cv'},
    {'label': '时间变异系数', 'title': 'day_cv'},
    {'label': '死亡风险等级', 'title': 'death_level'},
    {'label': '权重', 'title': 'weight'},
    {'label': '平均费用', 'title': 'fee_avg'},
    {'label': '平均住院天数', 'title': 'day_avg'},
    {'label': '病历数', 'title': 'num_sum'}]
}
const info = {
  infoTitle: '',
  isInfoButtonShow: false,
  buttonText: '',
  gridList: [],
  details: []
}

export function getDetails (menu) {
  let result = info
  switch (menu) {
    case '病案详情':
      result = caseInfo
      break
    case '分析详情':
      result = statInfo
      break
    default:
      break
  }
  return result
}
