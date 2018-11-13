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
    <mini-bar :title="menu"></mini-bar>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell } from 'weex-ui'
import { getDetails } from '../../utils/details'
import { getServer } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell, MiniBar },
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
    menu: {
      get () {
        const i = this.$store.state.Home.activeTab
        const menu = this.$store.state.Home.menu[i]
        return menu
      }
    },
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
      if (this.stats.length === 0) {
        getServer(this, i, menu)
      }
    },
    wxcIndexlistItemClicked (e) {
      this.$store.commit('SET_infoLevel', 1)
      const details = getDetails('分析详情', e)
      this.$store.commit('SET_info', details)
    },
    fetch () {
      this.$store.commit('SET_statPage', this.$store.state.Stat.statPage + 1)
      getServer(this, 'all', '统计分析')
    }
  }
}
</script>

<style scoped>
  .container {
    width: 750px;
  }
  .list {
    margin-top: 91px;
  }
</style>
