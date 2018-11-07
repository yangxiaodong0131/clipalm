<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="demo">
        <wxc-minibar :title="miniBarTitle"
                    background-color="#009ff0"
                    text-color="#FFFFFF"
                    :show="isShow"
                    left-button=""
                    :use-default-return="false"
                    @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                    @wxcMinibarLeftButtonClicked="minibarLeftButtonClick">
          <image src="http://210.75.199.113/images/left.png"
                 slot="left"
                 v-if="leftButtonShow"
                 style="height: 32px;width: 32px;"></image>
          <image src="http://210.75.199.113/images/home.png"
                 slot="right"
                 v-if="homeButtonShow"
                 style="height: 32px;width: 32px;"></image>
        </wxc-minibar>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    background-color: #FFFFFF;
  }
  .scroller {
    flex: 1;
  }
  .demo {
    width: 750px;
    align-items: flex-start;
  }
  .button {
    margin-top: 10px;
    margin-left: 30px;
  }
  .popup {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<script>
import { WxcMinibar, WxcIcon, WxcPopup, WxcButton, WxcCell } from 'weex-ui'
// const modal = weex.requireModule('modal')
export default {
  components: { WxcMinibar, WxcIcon, WxcPopup, WxcButton, WxcCell },
  data () {
    return {
      rightButton: '',
      leftButton: '',
      isBottomShow: false
    }
  },
  created () {
  },
  computed: {
    infoLevel () {
      return this.$store.state.Home.infoLevel
    },
    isShow () {
      let show = true
      if (this.$store.state.Home.menu[0] === '登录') {
        show = false
      }
      return show
    },
    infoPage () {
      let result = {}
      switch (this.infoLevel) {
        case 1:
          result = this.$store.state.Home.infoPage1
          break
        case 2:
          result = this.$store.state.Home.infoPage2
          break
        case 3:
          result = this.$store.state.Home.infoPage3
          break
        case 4:
          result = this.$store.state.Home.infoPage4
          break
      }
      return result
    },
    rightButtonShow () {
      let info = ''
      const menu = this.$store.state.Home.menu
      const activeTab = this.$store.state.Home.activeTab
      let disabled = false
      if (menu[activeTab] === '') {
        disabled = false
      } else {
        switch (this.infoLevel) {
          case 0:
            info = this.$store.state.Home.infoPage1.info
            break
          case 1:
            info = this.$store.state.Home.infoPage2.info
            break
          case 2:
            info = this.$store.state.Home.infoPage3.info
            break
          case 3:
            info = this.$store.state.Home.infoPage4.info
            break
          case 4:
            info = ''
            break
        }
        if (info === '') {
          disabled = true
        } else {
          disabled = false
        }
      }
      return disabled
    },
    leftButtonShow () {
      let show = false
      if (this.infoLevel === 0) {
        show = false
      } else {
        show = true
      }
      return show
    },
    miniBarTitle () {
      return this.$store.state.Home.miniBarTitle
    },
    returnMenu () {
      let menu = ''
      switch (this.$store.state.Home.activeTab) {
        case 1:
          menu = this.$store.state.Edit.editMenu
          break
        case 2:
          menu = this.$store.state.Library.libraryMenu
          break
        case 3:
          menu = '报表'
          break
        case 4:
          menu = '论坛'
          break
      }
      return menu
    },
    homeButtonShow () {
      let show = true
      if (this.$store.state.Home.activeTab === 0) {
        show = false
      }
      return show
    }
  },
  methods: {
    minibarRightButtonClick () {
      // this.isBottomShow = true
      // if (this.$store.state.Home.activeTab === 0) {
      //   this.$store.commit('SET_menu', [0, '用户登陆'])
      // } else {
      //   this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, ''])
      // }
      this.$store.commit('SET_infoLevel', 0)
      switch (this.$store.state.Home.activeTab) {
        case 0:
          this.$store.commit('SET_miniBarTitle', '用户')
          break
        case 1:
          this.$store.commit('SET_miniBarTitle', '病案')
          break
        case 2:
          this.$store.commit('SET_miniBarTitle', '字典')
          break
        case 3:
          this.$store.commit('SET_miniBarTitle', 'DRG分析')
          break
        case 4:
          this.$store.commit('SET_miniBarTitle', '论坛')
          break
      }
    },
    minibarLeftButtonClick () {
      const i = this.$store.state.Home.activeTab
      const level = this.infoLevel - 1
      switch (this.$store.state.Home.activeTab) {
        case 0:
          this.$store.commit('SET_miniBarTitle', '用户')
          break
        case 1:
          this.$store.commit('SET_miniBarTitle', this.$store.state.Edit.editMenu)
          break
        case 2:
          this.$store.commit('SET_miniBarTitle', this.$store.state.Library.libraryMenu)
          break
        case 3:
          this.$store.commit('SET_miniBarTitle', this.$store.state.Stat.statMenu)
          break
        case 4:
          this.$store.commit('SET_miniBarTitle', this.$store.state.Forum.forumMenu)
          break
      }
      this.$store.commit('SET_infoLevel', level)
      if (level === 0) {
        this.$store.commit('SET_menu', [i, this.returnMenu])
      }
    }
  }
}
</script>
