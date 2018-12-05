<template>
<div class="homepage" v-if="showNewVersion">
  <Version></Version>
</div>
<div class="homepage" v-bind:class="homepage" v-else>
  <wxc-loading :show="isLoadingShow" type="default" interval="3" loading-text="正在查询"></wxc-loading>
  <wxc-tab-bar
    ref="wxc-tab-bar"
    :tab-titles="tabs"
    :tab-styles="tabStyles"
    title-type="icon"
    duration="10"
    @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- user页 -->
    <div class="panel" v-bind:class="panel">
      <Analyse v-if="menu[0] == '用户统计'"></Analyse>
      <Personal v-else-if="menu[0] == '完善个人信息'"></Personal>
      <Login v-else-if="menu[0] == '用户登录'"></Login>
      <User v-else-if="menu[0] == '个人信息'"></User>
      <Retrieve v-else-if="menu[0] == '找回密码'"><text>></text></Retrieve>
    </div>
    <!-- edit页 -->
    <div class="panel" v-bind:class="panel">
      <PopRight v-if="infoLevel[1] > 0"></PopRight>
      <HomeMenu v-else-if="menu[1] === '病案'"></HomeMenu>
      <Introduce v-else-if="menu[1] === '介绍'"></Introduce>
      <SingleGroup v-else-if="menu[1] == '单条分组'"></SingleGroup>
      <Edit v-else></Edit>
    </div>
    <!-- library页 -->
    <div class="panel" v-bind:class="panel">
      <PopRight v-if="infoLevel[2] > 0"></PopRight>
      <HomeMenu v-else-if="menu[2] === '字典'"></HomeMenu>
      <Introduce v-else-if="menu[2] === '介绍'"></Introduce>
      <Library v-else></Library>
    </div>
    <!-- stat页 -->
    <div class="panel" v-bind:class="panel">
      <PopRight v-if="infoLevel[3] > 0"></PopRight>
      <HomeMenu v-else-if="menu[3] === 'DRG分析'"></HomeMenu>
      <Introduce v-else-if="menu[3] === '介绍'"></Introduce>
      <Charts v-else-if="menu[3] == '报表'"></Charts>
      <Report v-else></Report>
    </div>
    <!-- forum页 -->
    <div class="panel" v-bind:class="panel">
      <ForumContent v-if="infoLevel[4] > 0"></ForumContent>
      <HomeMenu v-else-if="menu[4] === '论坛'"></HomeMenu>
      <Introduce v-else-if="menu[4] === '介绍'"></Introduce>
      <!-- <New v-else-if="menu[4] === '新建贴子'"></New> -->
      <!-- <ForumContent v-else-if="menu[4] === '贴子'"></ForumContent> -->
      <Forum v-else></Forum>
    </div>
  </wxc-tab-bar>
  <!-- <mini-bar></mini-bar> -->
</div>
</template>

<script>
  import { WxcTabBar, Utils, WxcLoading } from 'weex-ui';
  import { getServer, getLastVersion } from '../utils/server'
  import Version from './common/Version'
  import PopRight from './common/PopRight'
  import HomeMenu from './common/HomeMenu'
  import Introduce from './common/Introduce'
  import Edit from './edit/Edit'
  import SingleGroup from './edit/SingleGroup'
  import ForumContent from './forum/ForumContent'
  import Forum from './forum/Forum'
  import Library from './library/Library'
  import Report from './stat/Report'
  import Charts from './stat/Charts'
  import Analyse from './user/Analyse'
  import User from './user/User'
  import Login from './user/Login'
  import Personal from './user/Personal'
  import Retrieve from './user/Retrieve'
  import { userLogin } from '../utils/user'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  const urlConfig = require('../utils/config.js')
  export default {
    components: { WxcTabBar, WxcLoading, User, Login, Personal, Retrieve, Edit, SingleGroup, Library,
      Report, Forum, PopRight, ForumContent, Version, Charts, HomeMenu, Introduce, Analyse },
    data: () => ({
      icon: `${urlConfig.static}/images/`,
      tabs: [{
        title: '用户',
        menu:  [{'用户': ['用户登录', '个人信息', '完善个人信息', '找回密码']}],
        icon: `${urlConfig.static}/images/user.png`,
        activeIcon: `${urlConfig.static}/images/user_fill.png`
        }, {
          title: '病案',
          menu: [{'病案查询':
                    [{'text': '未入组病历', 'icon': '未入组病历.png'},
                    {'text': 'QY病历', 'icon': 'QY病历.png'},
                    {'text': '低风险死亡病历', 'icon': '低风险死亡病历.png'},
                    {'text': '费用异常病历', 'icon': '费用异常病历.png'},
                    {'text': '填报异常病历', 'icon': '填报异常病历.png'}],
                  '单条分组': [{'text': '单条分组', 'icon': '单条分组.png'}],
                  '我的病案': [{'text': '我的病案', 'icon': '我的病案.png'}]}],
          icon: `${urlConfig.static}/images/edit.png`,
          activeIcon: `${urlConfig.static}/images/edit_fill.png`
        }, {
          title: '字典',
          menu: [{'DRG':
                    [{'text': 'CN-DRG', 'icon': 'CN-DRG.png'}],
                  '疾病': [{'text': '疾病分类/诊断术语', 'icon': '疾病分类/诊断术语.png'},
                          {'text': 'BJ-ICD10', 'icon': 'BJ-ICD10.png'},
                          {'text': 'GB-ICD10', 'icon': 'GB-ICD10.png'}],
                  '手术': [{'text': '临床手术/操作术语', 'icon': '临床手术/操作术语.png'},
                          {'text': 'BJ-ICD9', 'icon': 'BJ-ICD9.png'},
                          {'text': 'GB-ICD9', 'icon': 'GB-ICD9.png'}]}],
          icon: `${urlConfig.static}/images/library.png`,
          activeIcon: `${urlConfig.static}/images/library_fill.png`
        }, {
          title: 'DRG分析',
          menu: [{'DRG基础': [{'text': 'DRG基础', 'icon': 'DRG基础.png'}],
                  'DRG专家': [{'text': '偏差分布', 'icon': '偏差分布.png'},
                              {'text': '主诊未入组', 'icon': '主诊未入组.png'},
                              {'text': '手术QY', 'icon': '手术QY.png'}],
                  'DRG机构': [{'text': '年', 'icon': '年.png'},
                              {'text': '半年', 'icon': '半年.png'},
                              {'text': '季度', 'icon': '季度.png'},
                              {'text': '月', 'icon': '月.png'}]}],
          icon: `${urlConfig.static}/images/stat.png`,
          activeIcon: `${urlConfig.static}/images/stat_fill.png`
        }, {
          title: '论坛',
          menu: [{'论坛版块': [{'text': '用户反馈', 'icon': '用户反馈.png'},
                              {'text': '病案讨论', 'icon': '病案讨论.png'},
                              {'text': '字典交流', 'icon': '字典交流.png'},
                              {'text': 'DRG分析', 'icon': 'DRG分析.png'},
                              {'text': '论坛建议', 'icon': '论坛建议.png'}],
                  '贴子': [{'text': '我的贴子', 'icon': '我的贴子.png'},
                  {'text': '最新贴子', 'icon': '最新贴子.png'}]}],
          icon: `${urlConfig.static}/images/forum.png`,
          activeIcon: `${urlConfig.static}/images/forum_fill.png`
        }],
      tabStyles: {
        bgColor: '#FFFFFF',
        titleColor: '#666666',
        activeTitleColor: '#3D3D3D',
        activeBgColor: '#FFFFFF',
        isActiveTitleBold: true,
        iconWidth: 54,
        iconHeight: 54,
        width: 160,
        height: 100,
        fontSize: 24,
        textPaddingLeft: 10,
        textPaddingRight: 10
      }
    }),
    computed: {
      activeTab () {
        return this.$store.state.Home.activeTab
      },
      user () {
        return this.$store.state.Home.user
      },
      infoLevel () {
        return this.$store.state.Home.infoLevel
      },
      menu () {
        if (this.activeTab === 3) {
          this.setPage(this.activeTab)
        }
        return this.$store.state.Home.menu
      },
      isLoadingShow () {
        return this.$store.state.Home.isLoadingShow
      },
      showNewVersion () {
        let show = false
        if (this.$store.state.Home.version < this.$store.state.Home.serverVersion.version) {
          show = true
        }
        return show
      },
      height () {
        const { tabStyles } = this
        const tabPageHeight = weex.config.env.deviceHeight
        const height = (tabPageHeight - tabStyles.height) + 'px'
        return height
      },
      homepage () {
        const style = {
          height: this.height,
        }
        return style
      },
      panel () {
        const style = {
          width: '750px',
          height: this.height,
        }
        return style
      }
    },
    created: function () {
      this.newVersion()
      storage.getItem('user', e => {
        if (e.result === 'success') {
          const edata = JSON.parse(e.data)
          if (edata.username && edata.password) {
            this.$store.commit('SET_menu_all', ['个人信息', '病案', '字典', 'DRG分析', '论坛'])
            userLogin(this, edata)
          } else {
            this.$store.commit('SET_menu_all', ['用户登录', '介绍', '介绍', '介绍', '介绍'])
          }
        } else {
          this.$store.commit('SET_menu_all', ['用户登录', '介绍', '介绍', '介绍', '介绍'])
        }
      })
      const tabPageHeight = Utils.env.getPageHeight();
      // 如果页面没有导航栏，可以用下面这个计算高度的方法
      // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
      const { tabStyles } = this
      this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' }
    },
    beforeMount: function () {
    },
    mounted: function () {
      this.wxcTabBarCurrentTabSelected({ page: 0 })
    },
    methods: {
      newVersion () {
        getLastVersion(this)
      },
      setPage (num) {
        this.$refs['wxc-tab-bar'].setPage(num)
      },
      wxcTabBarCurrentTabSelected (e) {
        const i = e.page
        const menus = this.tabs[i].menu
        const menu = this.$store.state.Home.menu[i]
        const activeTab = this.$store.state.Home.activeTab
        this.$store.commit('SET_activeTab', i)
        this.$store.commit('SET_menus', menus)
        this.$store.commit('SET_menu', [i, menu])
        // 论坛
        if (i === 4 && menu === '介绍') {
          this.$store.commit('SET_menu', [i, menu])
        } else if (i === 4) {
          this.$store.commit('SET_menu', [i, menu])
          this.$store.commit('SET_forumLabel', this.$store.state.Home.menu[activeTab])
          // getServer(this, i, '贴子列表', { username: this.user.data.username })
        }
      }
    }
  };
</script>

<style scoped>
  .homepage {
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #cccccc;
  }
  .panel {
    width: 750px;
    background-color: #C6e2FF;
    align-items: center;
    margin-left: 0px;
    border-color: #BBBBBB;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 0px;
  }
  .item-container {
    width: 750px;
    align-items: center;
    justify-content: center;
  }
</style>
