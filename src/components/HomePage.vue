<template>
<div class="homepage">
  <wxc-tab-bar
    :tab-titles="tabs"
    :tab-styles="tabStyles"
    title-type="icon"
    duration="10"
    @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- user页 -->
    <div class="panel">
      <Login v-if="menu[0] == '用户登陆'"></Login>
      <User v-if="menu[0] == '个人信息'"></User>
    </div>
    <!-- edit页 -->
    <div class="panel">
      <Edit v-if="menu[1] == '未入组病历'"></Edit>
      <Edit v-if="menu[1] == '数据展示'"></Edit>
      <Query v-if="menu[1] == '自定义查询'"></Query>
    </div>
    <!-- library页 -->
    <div class="panel">
      <Library v-if="menu[2] == '数据展示'"></Library>
      <Query v-if="menu[2] == '自定义查询'"></Query>
    </div>
    <!-- stat页 -->
    <div class="wrapper">
      <Report v-if="menu[3] == '数据展示'"></Report>
      <Query v-if="menu[3] == '自定义查询'"></Query>
    </div>
    <!-- forum页 -->
    <div class="panel">
      <Forum v-if="menu[4] == '数据展示'"></Forum>
      <Query v-if="menu[4] == '自定义查询'"></Query>
    </div>
  </wxc-tab-bar>
  <pop-bar></pop-bar>
  <pop-up></pop-up>
</div>
</template>

<script>
  import { WxcTabBar, Utils } from 'weex-ui';
  import PopBar from './common/PopBar'
  import PopUp from './common/PopUp'
  import User from './user/User'
  import Login from './user/Login'
  import Edit from './edit/Edit'
  import Library from './library/Library'
  import Report from './stat/Report'
  import Query from './stat/Query'
  import Forum from './forum/Forum'

  export default {
    components: { WxcTabBar, PopBar, PopUp, User, Login, Edit, Library,
      Report, Query, Forum },
    data: () => ({
      tabs: [{
        title: '用户',
        menu: [],
        // icon: '//img.alicdn.com/tfs/TB1D4RzQFXXXXcoXpXXXXXXXXXX-45-45.png',
        icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
        activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
        }, {
          title: '病案',
          menu: ['未入组病历', 'QY病历', '低风险死亡病历', '高CV病历', '自定义查询'],
          // icon: '//gw.alicdn.com/tfs/TB1I2E9OVXXXXbFXVXXXXXXXXXX-45-45.png',
          icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
        }, {
          title: '字典',
          menu: ['MDC', 'ADRG', 'DRG', 'ICD10', 'ICD9', '自定义查询'],
          // icon: '//gw.alicdn.com/tfs/TB1gUhyPXXXXXX5XXXXXXXXXXXX-45-45.png',
          icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
        }, {
          title: 'DRG',
          menu: ['报表', '自定义查询'],
          // icon: '//gw.alicdn.com/tfs/TB1N1.6OVXXXXXqaXXXXXXXXXXX-45-45.png',
          icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
        }, {
          title: '论坛',
          menu: ['论坛', '自定义查询'],
          icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
      }],
      tabStyles: {
        bgColor: '#FFFFFF',
        titleColor: '#666666',
        activeTitleColor: '#3D3D3D',
        activeBgColor: '#FFFFFF',
        isActiveTitleBold: true,
        iconWidth: 70,
        iconHeight: 70,
        width: 160,
        height: 120,
        fontSize: 24,
        textPaddingLeft: 10,
        textPaddingRight: 10
      }
    }),
    computed: {
      menu () {
        return this.$store.state.Home.menu
      }
    },
    created () {
      const tabPageHeight = Utils.env.getPageHeight();
      // 如果页面没有导航栏，可以用下面这个计算高度的方法
      // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
      const { tabStyles } = this;
      this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
    },
    methods: {
      wxcTabBarCurrentTabSelected (e) {
        const i = e.page;
        if (i === this.$store.state.Home.activeTab && i !== 0) {
          this.$store.commit('SET_visible', true)
        }
        this.$store.commit('SET_activeTab', i)
        switch (i) {
          case 0:
            this.$store.commit('SET_menus', this.tabs[0]['menu'])
            break
          case 1:
            this.$store.commit('SET_menus', this.tabs[1]['menu'])
            break
          case 2:
            this.$store.commit('SET_menus', this.tabs[2]['menu'])
            break
          case 3:
            this.$store.commit('SET_menus', this.tabs[3]['menu'])
            break
          case 4:
            this.$store.commit('SET_menus', this.tabs[4]['menu'])
            break
          default :
            this.$store.commit('SET_menus', this.tabs[0]['menu'])
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
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
    margin-left: 0px;
    border-width: 2px;
    border-style: solid;
    border-color: #BBBBBB;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
  }
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
  }
</style>
