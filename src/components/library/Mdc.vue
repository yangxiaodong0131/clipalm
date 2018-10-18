<template>
  <div class="container">
      <text class="demo-title">MDC列表</text>
      <wxc-indexlist :normal-list="mdcs"
                    @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                    :show-index="true"></wxc-indexlist>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell } from 'weex-ui'
import PopBar from '../PopBar'
import { getServer } from '../../utils/server'
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell, PopBar },
  computed: {
    mdcs: {
      get () {
        return this.$store.state.Library.mdcRule
      }
    }
  },
  data () {
    return {
      refreshing: false,
      lists: [1, 2, 3, 4, 5]
    }
  },
  updated: function () {
  },
  methods: {
    wxcCellClicked (mdc) {
      this.$store.commit('SET_menu', 'ADRG')
      getServer(this, 'adrgOne', 'ADRG', mdc)
    },
    wxcIndexlistItemClicked (e) {
      this.isBottomShow = true
      this.info = e.item
    }
  }
}
</script>
<style>
</style>
