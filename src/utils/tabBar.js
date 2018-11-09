const url = 'http://210.75.199.113/images/'
module.exports = {
  tabs: [
    { 'title': '用户', 'menu':  ['用户登录', '个人信息'], 'icon': `${url}/user.png`, 'activeIcon': `${url}/user_fill.png`},
    { 'title': '病案', 'menu':  ['未入组病历', 'QY病历', '低风险死亡病历', '费用异常病历', '单条分组'], 'icon': `${url}/edit.png`, 'activeIcon': `${url}/edit_fill.png`},
    { 'title': '字典', 'menu':  ['MDC', 'ADRG', 'DRG', 'ICD10', 'ICD9'], 'icon': `${url}/user.png`, 'activeIcon': `${url}/user_fill.png`},
    { 'title': '用户', 'menu':  ['用户登录', '个人信息'], 'icon': `${url}/library.png`, 'activeIcon': `${url}/library_fill.png`},
    { 'title': 'DRG分析', 'menu':  ['统计分析(字母增序)', '统计分析(费用CV降序)', '统计分析(平均费用增序)', '报表'], 'icon': `${url}/stat.png`, 'activeIcon': `${url}/stat_fill.png`},
    { 'title': '论坛', 'menu':  ['论坛'], 'icon': `${url}/forum.png`, 'activeIcon': `${url}/forum_fill.png`}]
}
