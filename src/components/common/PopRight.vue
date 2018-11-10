<template>
  <div class="demo"
    @swipe="swipe"
    v-bind:style="panel">
    <list class="list" :show="true">
      <cell class="cell">
        <wxc-cell v-for="(detail, index) in infoPage.details"
          :key="index"
          :label="detail.label"
          :title="infoPage.info[detail.title]"
          :has-arrow="detail.hasArrow"
          @LongPress="LongPress(detail)"
          @wxcCellClicked="wxcCellClicked(detail)"
          ></wxc-cell>
        <div v-if="infoPage.infoTitle === '病案详情'">
          <text class="title">分组日志</text>
          <wxc-simple-flow :list="infoPage.gridList['分组日志']" :themeColor="themeColor"></wxc-simple-flow>
        </div>
        <div v-else v-for="(gridList, index) in infoPage.gridList"
              :key="index">
          <text class="title">{{index}}</text>
          <wxc-grid-select
              v-if="Object.keys(gridList).length !== 0"
              :single="true"
              :cols="1"
              :list="gridList"></wxc-grid-select>
          <text class="title" style="font-size: 20px;" v-else >无</text>
        </div>
        <wxc-button :text="infoPage.buttonText"
              v-if="infoPage.isInfoButtonShow"
              size="big"
              class="btns"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <div style="height:200px"></div>
      </cell>
    </list>
  </div>
</template>
<script>
import { WxcCell, WxcButton, WxcGridSelect, WxcSimpleFlow } from 'weex-ui'
import { getServer } from '../../utils/server'
export default {
  components: { WxcCell, WxcButton, WxcGridSelect, WxcSimpleFlow },
  data () {
    return {
      themeColor: {
        lineColor: '#bf280b',
        pointInnerColor: '#b95048',
        pointBorderColor: '#bf280b',
        highlightTitleColor: '#bf280b',
        highlightPointInnerColor: '#bf280b',
        highlightPointBorderColor: '#d46262'
      }
    }
  },
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    infoLevel () {
      return this.$store.state.Home.infoLevel[this.activeTab] - 1
    },
    infoPage () {
      let infoPage = this.$store.state.Home.infoPages[this.activeTab][this.infoLevel]
      if (!infoPage) {
        infoPage = {}
      }
      return infoPage
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    }
  },
  methods: {
    wxcCellClicked (detail) {
      switch (detail.label) {
        case '入组DRG':
          const drg = this.infoPage.info[detail.title]
          getServer(this, this.activeTab, 'statInfo', drg)
          break
        default:
          break
      }
    },
    wxcButtonClicked () {
      let menu = ''
      switch (this.infoPage.infoTitle) {
        case 'MDC规则详情':
          menu = 'ADRG'
          break
        case 'ADRG规则详情':
          menu = 'DRG'
          break
        default:
          break
      }
      getServer(this, this.activeTab, menu, this.infoPage.info)
      this.$store.commit('SET_infoLevel', 0)
      this.$store.commit('SET_menu', [this.activeTab, menu])
    }
  }
}
</script>
<style scoped>
  .demo {
    width: 750px;
    background-color: #f2f3f4;
    margin-top: 91px;
  }
  .text {
    font-size: 35px;
  }
  .title {
    text-align: center;
    font-size: 35px;
  }
  .btns {
    margin-left: 200px;
  }
</style>
