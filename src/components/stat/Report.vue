<template>
  <div class="container" v-bind:style="panel">
      <list class="list" @loadmore="fetch" loadmoreoffset="30000">
        <cell class="cell" v-for="(stat, index) in stats" v-bind:key="index">
          <wxc-cell :label="stat.code"
              @wxcCellClicked="wxcIndexlistItemClicked(stat)"
              :has-margin="false"
              :has-arrow="true"
              :extraContent="stat.desc"></wxc-cell>
        </cell>
      </list>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell } from 'weex-ui'
import { getDetails } from '../../utils/details'
import { getServer } from '../../utils/server'
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell },
  created: function () {
    this.getData()
  },
  data () {
    return {
      isBottomShow: false,
      height: 400,
      info: {}
    }
  },
  computed: {
    stats: {
      get () {
        return this.$store.state.Stat.statDrg
      }
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
    getData () {
      const i = this.$store.state.Home.activeTab
      const menu = this.$store.state.Home.menu[i]
      getServer(this, 'all', menu)
    },
    wxcIndexlistItemClicked (e) {
      this.$store.commit('SET_infoLevel', 1)
      this.$store.commit('SET_infoPage', getDetails(`分析详情`, e))
    },
    fetch () {
      this.$store.commit('SET_statPage', this.$store.state.Stat.statPage + 1)
      getServer(this, 'all', '统计分析')
    },
    openBottomPopup () {
      this.isBottomShow = true
    },
    popupOverlayBottomClick () {
      this.isBottomShow = false
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 91px;
  width: 750px;
}
</style>
