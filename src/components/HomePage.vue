<template>
<div class="homepage">
  <wxc-tab-bar 
    :tab-titles="tabs"
    :tab-styles="tabStyles"
    title-type="icon"
    duration="10"
    @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <user-page></user-page>
    <edit-page></edit-page>
    <library-page></library-page>
    <stat-page></stat-page>
    <forum-page></forum-page>
  </wxc-tab-bar>
  <pop-bar></pop-bar>
</div>
</template>

<script>
  import { WxcTabBar, Utils } from 'weex-ui';
  import PopBar from './common/PopBar'
  import UserPage from './user/UserPage'
  import EditPage from './edit/EditPage'
  import LibraryPage from './library/LibraryPage'
  import StatPage from './stat/StatPage'
  import ForumPage from './forum/ForumPage'

  export default {
    components: { WxcTabBar, PopBar, UserPage, EditPage, LibraryPage, StatPage, ForumPage },
    data: () => ({
      tabs: [{
        title: '用户',
        menu: [],
        // icon: '//img.alicdn.com/tfs/TB1D4RzQFXXXXcoXpXXXXXXXXXX-45-45.png',
        icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
        activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
      }, {
        title: '病案',
        menu: ['录入', '查询', 'DRG分组'],
        // icon: '//gw.alicdn.com/tfs/TB1I2E9OVXXXXbFXVXXXXXXXXXX-45-45.png',
        icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
        activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
      }, {
        title: '字典',
        menu: ['MDC', 'ADRG', 'DRG', 'ICD10', 'ICD9'],
        // icon: '//gw.alicdn.com/tfs/TB1gUhyPXXXXXX5XXXXXXXXXXXX-45-45.png',
        icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
        activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
      }, {
        title: 'DRG',
        menu: ['报表', '查询'],
        // icon: '//gw.alicdn.com/tfs/TB1N1.6OVXXXXXqaXXXXXXXXXXX-45-45.png',
        icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
        activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
      }, {
        title: '论坛',
        menu: ['论坛', '论坛'],
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
        if (i === this.$store.state.Home.activeTab) {
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
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
  }
</style>