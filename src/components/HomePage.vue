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
      <Login v-if="menu[0] == '用户登录'"></Login>
      <User v-if="menu[0] == '个人信息'"></User>
    </div>
    <!-- edit页 -->
    <div class="panel" v-bind:class="panel">
      <PopRight v-if="infoLevel[1] > 0"></PopRight>
      <HomeMenu v-else-if="menu[1] === '菜单'"></HomeMenu>
      <Introduce v-else-if="menu[1] === '介绍'"></Introduce>
      <SingleGroup v-else-if="menu[1] == '单条分组'"></SingleGroup>
      <Edit v-else></Edit>
    </div>
    <!-- library页 -->
    <div class="panel" v-bind:class="panel">
      <PopRight v-if="infoLevel[2] > 0"></PopRight>
      <HomeMenu v-else-if="menu[2] === '菜单'"></HomeMenu>
      <Introduce v-else-if="menu[2] === '介绍'"></Introduce>
      <Library v-else></Library>
    </div>
    <!-- stat页 -->
    <div class="panel" v-bind:class="panel">
      <PopRight v-if="infoLevel[3] > 0"></PopRight>
      <HomeMenu v-else-if="menu[3] === '菜单'"></HomeMenu>
      <Introduce v-else-if="menu[3] === '介绍'"></Introduce>
      <Charts v-else-if="menu[3] == '报表'"></Charts>
      <Report v-else></Report>
    </div>
    <!-- forum页 -->
    <div class="panel" v-bind:class="panel">
      <text style="font-size:100px">{{menu[4]}}</text>
      <Forum v-if="menu[4] === '帖子列表'"></Forum>
      <HomeMenu v-else-if="menu[4] === '菜单'"></HomeMenu>
      <Introduce v-else-if="menu[4] === '介绍'"></Introduce>
      <New v-else-if="menu[4] === '新建帖子'"></New>
      <ForumContent v-else-if="menu[4] === '帖子'"></ForumContent>
    </div>
  </wxc-tab-bar>
  <mini-bar></mini-bar>
</div>
</template>

<script>
  import { WxcTabBar, Utils, WxcLoading } from 'weex-ui';
  import { getServer, getLastVersion } from '../utils/server'
  import Version from './common/Version'
  import PopRight from './common/PopRight'
  import MiniBar from './common/MiniBar'
  import HomeMenu from './common/HomeMenu'
  import Introduce from './common/Introduce'
  import Edit from './edit/Edit'
  import SingleGroup from './edit/SingleGroup'
  import ForumContent from './forum/ForumContent'
  import Forum from './forum/Forum'
  import New from './forum/New'
  import Library from './library/Library'
  import Report from './stat/Report'
  import Charts from './stat/Charts'
  import User from './user/User'
  import Login from './user/Login'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  export default {
    components: { WxcTabBar, WxcLoading, User, Login, Edit, SingleGroup, Library,
      Report, Forum, PopRight, MiniBar, ForumContent, Version, Charts, New, HomeMenu, Introduce },
    data: () => ({
      tabs: [{
        title: '用户',
        menu:  ['用户登录', '个人信息'],
        icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
        activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
        }, {
          title: '病案',
          menu: ['未入组病历', 'QY病历', '低风险死亡病历', '费用异常病历', '单条分组'],
          icon: 'http://210.75.199.113/images/edit.png',
          activeIcon: 'http://210.75.199.113/images/edit_fill.png'
        }, {
          title: '字典',
          menu: ['MDC', 'ADRG', 'DRG', 'ICD10', 'ICD9'],
          icon: 'http://210.75.199.113/images/library.png',
          activeIcon: 'http://210.75.199.113/images/library_fill.png'
        }, {
          title: 'DRG分析',
          menu: ['统计分析(字母增序)', '统计分析(费用CV降序)', '统计分析(平均费用增序)', '报表'],
          icon: 'http://210.75.199.113/images/stat.png',
          activeIcon: 'http://210.75.199.113/images/stat_fill.png'
        }, {
          title: '论坛',
          menu: ['帖子列表'],
          icon: 'http://210.75.199.113/images/forum.png',
          activeIcon: 'http://210.75.199.113/images/forum_fill.png'
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
          this.$store.commit('SET_user', edata)
          this.$store.commit('SET_menu', [0, '个人信息'])
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
          getServer(this, i, menu, this.$store.state.Home.menu[activeTab])
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
