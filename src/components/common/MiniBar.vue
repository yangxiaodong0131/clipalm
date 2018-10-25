<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="demo">
        <wxc-minibar :title="infoPage.wxcCellTitle"
                    background-color="#009ff0"
                    text-color="#FFFFFF"
                    @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                    @wxcMinibarRightButtonClicked="minibarRightButtonClick">
          <wxc-icon slot="right" name="more" v-if="rightButtonShow"></wxc-icon>
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
</style>

<script>
import { WxcMinibar, WxcIcon } from 'weex-ui'
const modal = weex.requireModule('modal')
export default {
  components: { WxcMinibar, WxcIcon },
  data () {
    return {
      rightButton: '',
      leftButton: ''
    }
  },
  created () {
  },
  computed: {
    infoLevel () {
      return this.$store.state.Home.infoLevel
    },
    wxcCellTitle () {
      return this.$store.state.Edit.editMenu
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
      let show = false
      if (this.infoPage.info === '') {
        show = false
      } else {
        show = true
      }
      return show
    }
  },
  methods: {
    minibarLeftButtonClick () {
      const i = this.$store.state.Home.activeTab
      if (this.infoLevel === 1) {
        this.$store.commit('SET_infoLevel', 0)
        this.$store.commit('SET_menu', [i, this.$store.state.Home.infoMenu])
      } else {
        this.$store.commit('SET_infoLevel', this.infoLevel - 1)
      }
      modal.toast({ message: '上一页', duration: 1 })
    },
    minibarRightButtonClick () {
      this.$store.commit('SET_infoLevel', this.infoLevel + 1)
      modal.toast({ message: '下一页', duration: 1 })
    }
  }
}
</script>
