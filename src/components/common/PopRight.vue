<template>
  <div class="demo"
    :show="infoPage.isBottomShow" @swipe="swipe">
      <wxc-button :text="infoPage.buttonText"
            v-if="infoPage.isInfoButtonShow"
            size="full"
            @wxcButtonClicked="wxcButtonClicked"></wxc-button>
      <div class="demo-content">
        <wxc-cell v-for="(detail, index) in infoPage.details"
          :key="index"
          :label="detail.label"
          :title="infoPage.info[detail.title]"
          :has-arrow="false"
          @LongPress="LongPress(detail)"
          @wxcCellClicked="wxcCellClicked(detail)"
          :has-margin="true"></wxc-cell>
        <wxc-grid-select
            :single="true"
            :cols="2"
            :list="infoPage.gridList"></wxc-grid-select>
      </div>
  </div>
</template>
<script>
import { WxcPopup, WxcCell, WxcButton, WxcGridSelect } from 'weex-ui'
import { getServer } from '../../utils/server'
import { getDetails } from '../../utils/details'

export default {
  components: { WxcPopup, WxcCell, WxcButton, WxcGridSelect },
  data () {
    return {
      a: '1'
      // isBottomShow: false
    }
  },
  computed: {
    infoLevel () {
      return this.$store.state.Home.infoLevel
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
    }
  },
  methods: {
    wxcRichTextLinkClick () {
    },
    popupOverlayBottomClick () {
      this.$store.commit('SET_isBottomShow', false)
    },
    wxcCellClicked (detail) {
      switch (detail.label) {
        case '入组DRG':
          const details = getDetails('分析详情', this.infoPage.info)
          const drg = this.infoPage.info[detail.title]
          this.$store.commit('SET_infoLevel', this.infoLevel + 1)
          this.$store.commit('SET_infoPage', details)
          getServer(this, 'statOne', 'info', drg)
          break
        default:
          break
      }
    },
    wxcButtonClicked () {
      switch (this.infoPage.infoTitle) {
        case 'MDC规则详情':
          getServer(this, 'adrgOne', 'ADRG', this.infoPage.info)
          break
        case 'ADRG规则详情':
          getServer(this, 'drgOne', 'DRG', this.infoPage.info)
          break
        default :
          break
      }
      this.$store.commit('SET_infoLevel', 0)
      this.$store.commit('SET_isBottomShow', false)
      this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, this.$store.state.Home.infoMenu])
    },
    swipe (e) {
      if (e.direction === 'right') {
        const i = this.$store.state.Home.activeTab
        if (this.infoLevel === 1) {
          this.$store.commit('SET_infoLevel', 0)
          this.$store.commit('SET_menu', [i, this.$store.state.Home.infoMenu])
        } else {
          this.$store.commit('SET_infoLevel', this.infoLevel - 1)
        }
      }
    },
    LongPress (e) {
      this.a = '2'
      console.log(e)
    }
  }
}
</script>
<style scoped>
  .wxc-demo {
    width: 750px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
  }
  .container {
    flex: 1;
  }
  .demo {
    width: 750px;
    background-color: #f2f3f4;
  }
  .category {
    margin-top: 40px;
  }
  .default {
    color: #000000;
  }
  .active {
    color: #FFC900;
  }
  .red {
    color: #C3413D;
  }
  .image {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
  .demo-title {
    font-size: 30px;
    color: #333333;
    margin-top: 30px;
    margin-left: 30px;
    margin-bottom: 16px;
  }
</style>
