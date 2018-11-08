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
import { WxcMinibar } from 'weex-ui'
// const modal = weex.requireModule('modal')
export default {
  components: { WxcMinibar },
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
      if (this.$store.state.Home.user.login === false) {
        show = false
      }
      return show
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
      let title = this.$store.state.Home.miniBarTitle
      if (this.$store.state.Home.activeTab === 0 && this.$store.state.Home.user.login) {
        title = '个人信息'
      }
      return title
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
          menu = this.$store.state.Stat.statMenu
          break
        case 4:
          menu = this.$store.state.Forum.forumMenu
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
      const i = this.$store.state.Home.activeTab
      this.$store.commit('SET_infoLevel', 0)
      this.$store.commit('SET_menu', [i, ''])
      switch (i) {
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
        console.log([i, this.returnMenu])
        this.$store.commit('SET_menu', [i, this.returnMenu])
      }
    }
  }
}
</script>
