<template>
  <wxc-tab-page ref="wxc-tab-page"
                :tab-titles="tabs"
                :tab-styles="tabStyles"
                title-type="icon"
                :tab-page-height="tabPageHeight"
                @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
    <user-page :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }"></user-page>
    <edit-page :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }"></edit-page>
    <library-page :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }"></library-page>
    <stat-page :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }"></stat-page>
    <forum-page :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }"></forum-page>
  </wxc-tab-page>
</template>

<script>
  import Vue from 'vue'
  const dom = weex.requireModule('dom')
  const storage = weex.requireModule('storage')
  import { WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui'
  import UserPage from './user/UserPage'
  import EditPage from './edit/EditPage'
  import LibraryPage from './library/LibraryPage'  
  import StatPage from './stat/StatPage'
  import ForumPage from './forum/ForumPage'

  export default {
    components: { WxcTabPage, WxcPanItem, UserPage, EditPage, LibraryPage, StatPage, ForumPage },
    data: () => ({
      tabs: [
      { title: '用户',
        menu: ['用户登陆', '个人信息'],
        icon: '//img.alicdn.com/tfs/TB1D4RzQFXXXXcoXpXXXXXXXXXX-45-45.png'
      }, {
        title: '病案',
        menu: ['录入', '查询', 'DRG分组'],
        icon: '//gw.alicdn.com/tfs/TB1I2E9OVXXXXbFXVXXXXXXXXXX-45-45.png'
      }, {
        title: '字典',
        menu: ['MDC', 'ADRG', 'DRG', 'ICD10', 'ICD9'],
        icon: '//gw.alicdn.com/tfs/TB1gUhyPXXXXXX5XXXXXXXXXXXX-45-45.png'
      }, {
        title: 'DRG',
        menu: ['报表', '查询'],
        icon: '//gw.alicdn.com/tfs/TB1N1.6OVXXXXXqaXXXXXXXXXXX-45-45.png'
      }, {
        title: '论坛',
        menu: ['论坛', '论坛'],
        icon: '//gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
        activeIcon: '//gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
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
        hasActiveBottom: true,
        activeBottomColor: '#FFC900',
        activeBottomHeight: 6,
        activeBottomWidth: 120,
        textPaddingLeft: 10,
        textPaddingRight: 10
      },
      tabList: [],
      demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      tabPageHeight: 1334
    }),
    created () {
      this.tabPageHeight = Utils.env.getPageHeight();
      this.tabList = [...Array(this.tabs.length).keys()].map(i => []);
      Vue.set(this.tabList, 0, this.demoList);
    },
    methods: {
      wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const i = e.page;
        if (i === this.$store.state.Home.activeTab && this.$store.state.Home.activeTab !== -1) {
          this.$store.commit('SET_visible', !this.$store.state.Home.visible)
        } else if (this.$store.state.Home.activeTab === -1 || i !== this.$store.state.Home.activeTab) {
          this.$store.commit('SET_visible', true)
        } else {
          this.$store.commit('SET_visible', this.$store.state.Home.visible)
        }
        this.$store.commit('SET_activeTab', i)
        this.$store.commit('SET_activeTab', i)
        storage.setItem('activeTab', i, e => {})
        storage.getItem('activeTab', e => {
          // this.activeTab = e.data
        })
        switch (i) {
          case 0:
            this.$store.commit('SET_menu', '用户登陆')
            this.$store.commit('SET_menus', this.tabs[0]['menu'])
            this.$router.push('/')
            break
          case 1:
            this.$store.commit('SET_menu', '查询')
            this.$store.commit('SET_menus', this.tabs[1]['menu'])
            this.$router.push('/edit')
            break
          case 2:
            this.$store.commit('SET_menu', 'MDC')
            this.$store.commit('SET_menus', this.tabs[2]['menu'])
            this.$router.push('/library')
            break
          case 3:
            this.$store.commit('SET_menu', '报表')
            this.$store.commit('SET_menus', this.tabs[3]['menu'])
            this.$router.push('/stat')
            break
          case 4:
            this.$store.commit('SET_menu', '论坛')
            this.$store.commit('SET_menus', this.tabs[4]['menu'])
            this.$router.push('/forum')
            break
          default :
            this.$store.commit('SET_menu', '用户登陆')
            this.$router.push('/')
        }
      }
    }
  };
</script>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
  }

  .border-cell {
    background-color: #f2f3f4;
    width: 750px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e0e0e0;
  }

  .cell {
    background-color: #ffffff;
  }

  .content{
    width:750px;
    height:300px;
    border-bottom-width:1px;
    align-items: center;
    justify-content: center;
  }
</style>