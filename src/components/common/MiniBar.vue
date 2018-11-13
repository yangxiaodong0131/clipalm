<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="demo">
        <wxc-minibar :title="title"
                    background-color="#009ff0"
                    text-color="#FFFFFF"
                    :show="isShow"
                    left-button=""
                    :use-default-return="false"
                    @wxcMinibarRightButtonClicked="homeButtonClick"
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

<script>
import { WxcMinibar } from 'weex-ui'
import { getServer } from '../../utils/server'
// const modal = weex.requireModule('modal')
export default {
  components: { WxcMinibar },
  props: {
    title: ''
  },
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
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    infoLevel () {
      return this.$store.state.Home.infoLevel[this.activeTab]
    },
    isShow () {
      let show = true
      if (this.menu === '介绍') {
        show = false
      } else if (this.activeTab === 0 && this.menu === '用户登录') {
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
      return this.$store.state.Home.miniBarTitle
    },
    homeButtonShow () {
      let show = true
      if (this.activeTab === 0) {
        show = false
      }
      return show
    }
  },
  methods: {
    homeButtonClick () {
      const menu = ['', '病案', '字典', 'DRG分析', '论坛']
      this.$store.commit('SET_infoLevel', 0)
      this.$store.commit('SET_menu', [this.activeTab, menu[this.activeTab]])
      if (this.activeTab === 4) {
        getServer(this, this.activeTab, '帖子列表', { username: this.$store.state.Home.user.data.username })
      }
    },
    minibarLeftButtonClick () {
      this.$store.commit('SET_infoLevel', this.infoLevel - 1)
    }
  }
}
</script>

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
