<template>
  <div class="container" v-bind:style="panel">
    <scroller class="demo">
      <div>
        <text class="demo-title"></text>
        <wxc-cell v-for="(detail, index) in result.details"
          v-if="result.info[detail.title]"
          :key="index"
          :label="detail.label"
          :title="result.info[detail.title]"
          :has-arrow="detail.hasArrow"
          ></wxc-cell>
      </div>
    </scroller>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcIndexlist, WxcLoading, WxcPartLoading, WxcButton } from 'weex-ui'
import { getDetails } from '../../utils/details'
export default {
  components: { WxcIndexlist, WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcLoading, WxcPartLoading, WxcButton },
  data () {
    return {
      forceValue: 0,
      refreshing: false,
      result: {}
    }
  },
  created () {
    this.details()
  },
  computed: {
    groupResult: {
      get () {
        return this.$store.state.Edit.groupResult
      }
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    },
    menu: {
      get () {
        const i = this.$store.state.Home.activeTab
        const menu = this.$store.state.Home.menu[i]
        return menu
      }
    }
  },
  methods: {
    details () {
      this.result = getDetails(this.menu, this.groupResult)
    }
  }
}
</script>
<style scoped>
  .container {
    margin-top: 91px;
    width: 750px;
    background-color: #FFFFFF;
  }
  .demo-title {
    font-size: 35px;
    text-align: center;
  }
  .demo {
    height: 1000px;
    width: 750px;
  }
</style>
