<template>
<div class="homepage" v-if="showNewVersion">
  <Version></Version>
</div>
<div class="homepage" v-bind:class="homepage" v-else>
  <wxc-loading :show="isLoadingShow" type="default" interval="3" loading-text="正在查询"></wxc-loading>
  <wxc-tab-bar
    ref="wxcTabBar"
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
      <text class="title" style="font-size:200px;">{{['未入组病历', '低风险死亡病历', '费用异常病历', 'QY病历'].includes(menu[1])}}</text>
      <HomeMenu v-if="menu[1] === '菜单'"></HomeMenu>
      <Edit v-else-if="['未入组病历', '低风险死亡病历', '费用异常病历', 'QY病历'].includes(menu[1])"></Edit>
      <SingleGroup v-else-if="menu[1] == '单条分组'"></SingleGroup>
      <PopRight v-else></PopRight>
    </div>
    <!-- library页 -->
    <!-- <div class="panel" v-bind:class="panel">
      <Library v-if="['MDC', 'ADRG', 'DRG', 'ICD10', 'ICD9'].includes(menu[2])"></Library>
      <PopRight v-else-if="menu[2] == '规则详情'"></PopRight>
      <HomeMenu v-else-if="menu[2] === ''"></HomeMenu>
    </div> -->
    <!-- stat页 -->
    <!-- <div class="panel" v-bind:class="panel">
      <Report v-if="['统计分析(字母增序)', '统计分析(费用CV降序)', '统计分析(平均费用增序)'].includes(menu[3])"></Report>
      <Charts v-if="menu[3] == '报表'"></Charts>
      <Query v-else-if="menu[3] == '自定义查询'"></Query>
      <HomeMenu v-else-if="menu[3] === ''"></HomeMenu>
      <PopRight v-else></PopRight>
    </div> -->
    <!-- forum页 -->
    <!-- <div class="panel" v-bind:class="panel">
      <New v-if="menu[4] === '新建帖子'"></New>
      <ForumContent v-else-if="menu[4] === '帖子内容'"></ForumContent>
      <HomeMenu v-else-if="menu[4] === ''"></HomeMenu>
      <Forum v-else></Forum>
    </div> -->
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
  import User from './user/User'
  import Login from './user/Login'
  import Register from './user/Register'
  import Edit from './edit/Edit'
  import SingleGroup from './edit/SingleGroup'
  import Library from './library/Library'
  import Report from './stat/Report'
  import Charts from './stat/Charts'
  import Query from './stat/Query'
  import ForumContent from './forum/ForumContent'
  import Forum from './forum/Forum'
  import New from './forum/New'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  export default {
    components: { WxcTabBar, WxcLoading, User, Login, Edit, SingleGroup, Library,
      Report, Query, Forum, PopRight, MiniBar, ForumContent, Version, Charts, New, Register, HomeMenu },
    data: () => ({
      // icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
      // activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
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
          menu: ['论坛'],
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
      },
      test: ''
    }),
    computed: {
      menu () {
        console.log(this.$store.state.Home.menu)
        return this.$store.state.Home.menu
      },
      showForum () {
        return this.$store.state.Home.showForum
      },
      isShow () {
        let isShow = false
        if (this.$store.state.Home.activeTab > 0) {
          isShow = true
        }
        return isShow
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
      storage.getItem('user', e => {
        if (e.result === 'success') {
          const edata = JSON.parse(e.data)
          this.$store.commit('SET_user', edata)
          this.$store.commit('SET_menu', [0, '个人信息'])
          this.$store.commit('SET_userMenu', '个人信息')
        }
      })
      const tabPageHeight = Utils.env.getPageHeight();
      // 如果页面没有导航栏，可以用下面这个计算高度的方法
      // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
      const { tabStyles } = this
      this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' }
      this.newVersion()
      storage.getItem('point', e => {
        if (e.result === 'success') {
          this.$store.commit('SET_pointIndex', parseInt(e.data))
        } else {
          this.$store.commit('SET_pointIndex', 0)
        }
      })
    },
    beforeMount: function () {
      // this.$store.commit('SET_activeTab', 0)
      // const point = this.$store.state.Home.point
      // const pointIndex = this.$store.state.Home.pointIndex
      // if (pointIndex === point.length - 1) {
      //   modal.confirm({ 'message': `Tips: ${point[pointIndex]}`, 'duration': 5, 'cancelTitle': '重新显示提示', 'okTitle': '我知道了' }, function (value) {
      //     if (value === '重新显示提示') {
      //       storage.setItem('point', 0)
      //     } else {
      //       storage.setItem('point', pointIndex + 1)
      //     }
      //   })
      // } else if (pointIndex <= point.length) {
      //   modal.toast({ 'message': `${pointIndex}`, 'duration': 0.3 })
      //   modal.alert({ 'message': `Tips: ${point[pointIndex]}`, 'duration': 5, 'okTitle': '我知道了' }, function () {
      //     storage.setItem('point', pointIndex + 1, e => {
      //       modal.toast({ 'message': `${e.result}`, 'duration': 0.3 })
      //     })
      //   })
      // }
    },
    mounted: function () {
      this.wxcTabBarCurrentTabSelected({ page: 0 })
      // if (this.$store.state.Home.user.login) {
      //   this.setPage(2)
      // }
    },
    methods: {
      newVersion () {
        getLastVersion(this)
      },
      setPage (num) {
        this.$refs['wxcTabBar'].setPage(num)
      },
      wxcTabBarCurrentTabSelected (e) {
        const i = e.page
        const menus = this.tabs[i].menu
        const activeMenu = this.$store.state.Home.activeMenu[i]
        let menu = menus[activeMenu]
        // 解决多页面问题
        if (activeMenu === -1) {
          menu = '菜单'
        }
        this.$store.commit('SET_activeTab', i)
        this.$store.commit('SET_menus', menus)
        this.$store.commit('SET_menu', [i, menu])
        // const menus = this.tabs[i]['menu']
        // const activeMenu = this.$store.state.Home.activeMenu[i]
        // this.$store.commit('SET_activeTab', i)
        // this.$store.commit('SET_menus', this.tabs[i]['menu'])
        // this.$store.commit('SET_menu', [i, menus[activeMenu]])

        // let menu = ''
        // let miniBarTitle = ''
        // switch (i) {
        //   case 0:
        //     menu = this.$store.state.Home.userMenu
        //     miniBarTitle = this.tabs[e.page]['title']
        //     break
        //   case 1:
        //     menu = this.$store.state.Edit.editMenu
        //     miniBarTitle = this.tabs[e.page]['title']
        //     break
        //   case 2:
        //     menu = this.$store.state.Library.libraryMenu
        //     miniBarTitle = this.tabs[e.page]['title']
        //     break
        //   case 3:
        //     menu = this.$store.state.Stat.statMenu
        //     miniBarTitle = this.tabs[e.page]['title']
        //     break
        //   case 4:
        //     if (this.$store.state.Home.activeTab !== 4) {
        //       this.$store.commit('SET_forumHead', this.$store.state.Home.miniBarTitle)
        //       miniBarTitle = `${this.$store.state.Forum.forumHead}-帖子`
        //       this.$store.commit('SET_forumLabel', `${this.$store.state.Home.miniBarTitle}`)
        //       menu = '论坛'
        //     } else {
        //       miniBarTitle = this.$store.state.Home.miniBarTitle
        //       menu = `${this.$store.state.Forum.forumMenu}`
        //     }
        //     getServer(this, 'all', menu)
        //     this.$store.commit('SET_forumMenu', menu)
        //     break
        // }
        // this.$store.commit('SET_menu', [i, menu])
        // if (menu != '' && i !== 4) {
        //   miniBarTitle = menu
        // }
        // this.$store.commit('SET_miniBarTitle', miniBarTitle)
        // // 设定loading查询隐藏
        // if (i !== this.$store.state.Home.activeTab && this.$store.state.Home.isLoadingShow == true) {
        //   this.$store.commit('SET_isLoadingShow', false)
        // }
        // this.$store.commit('SET_activeTab', i)
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
