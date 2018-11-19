<template>
  <div class="demo"
    @swipe="swipe"
    v-bind:style="panel">
    <list class="list" :show="true">
      <cell class="cell">
        <wxc-cell v-for="(detail, index) in infoPage.details"
          v-if="infoPage.info[detail.title]"
          :key="index"
          :label="detail.label"
          :title="infoPage.info[detail.title]"
          :has-arrow="detail.hasArrow"
          @LongPress="LongPress(detail)"
          @wxcCellClicked="wxcCellClicked(detail)"
          ></wxc-cell>
        <div v-if="infoPage.infoTitle === '病案详情'">
          <category title="--分组日志--"></category>
          <wxc-simple-flow :list="infoPage.gridList['分组日志']" :themeColor="themeColor"></wxc-simple-flow>
        </div>
        <div v-else v-for="(gridList, index) in infoPage.gridList"
              :key="index">
          <category :title="`--${index}--`"></category>
          <wxc-grid-select
              v-if="Object.keys(gridList).length !== 0"
              :single="true"
              :cols="1"
              :list="gridList"></wxc-grid-select>
          <text class="title" style="font-size: 20px;" v-else >无</text>
        </div>
        <div>
          <category v-if="infoPage.isInfoListTitleShow" :title="`--${infoPage.infoListTitle}--`"></category>
          <wxc-cell v-for="(info, index) in infoPage.infoList"
            :key="index"
            :label="info.label"
            :title="info.title"
            :has-arrow="info.hasArrow"
            @wxcCellClicked="wxcCellClicked2(info)">
          </wxc-cell>
        </div>
        <div style="height:200px"></div>
      </cell>
    </list>
    <mini-bar :title="title" rightIcon="home"></mini-bar>
  </div>
</template>
<script>
import { WxcCell, WxcButton, WxcGridSelect, WxcSimpleFlow } from 'weex-ui'
import { getServer } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
import Category from '../common/category.vue'
export default {
  components: { WxcCell, WxcButton, WxcGridSelect, WxcSimpleFlow, MiniBar, Category },
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
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
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
    title () {
      return this.infoPage.infoTitle
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
    wxcCellClicked2 (e) {
      getServer(this, this.activeTab, `${e.menu}规则详情`, e.all)
    }
  }
}
</script>
<style scoped>
  .demo {
    width: 750px;
    background-color: #f2f3f4;
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
  .list {
    margin-top: 91px;
  }
</style>
