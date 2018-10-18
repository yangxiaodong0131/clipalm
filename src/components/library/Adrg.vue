<template>
  <div class="container">
    <!-- <div class="demo"> -->
      <text class="demo-title">ADRG列表</text>
      <wxc-indexlist :normal-list="adrgs"
                    @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                    :show-index="true"></wxc-indexlist>
    <!-- </div> -->
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcIndexlist, WxcCell } from 'weex-ui'
import { getServer } from '../../utils/server'
import PopBar from '../PopBar'
export default {
  components: { WxcCell, PopBar, WxcIndexlist },
  computed: {
    adrgs: {
      get () {
        return this.$store.state.Library.adrgRule
      }
    }
  },
  methods: {
    wxcCellClicked (adrg) {
      this.$store.commit('SET_menu', 'DRG')
      getServer(this, 'drgOne', 'DRG', adrg)
    },
    wxcIndexlistItemClicked (e) {
      this.isBottomShow = true
      this.info = e.item
    }
  }
}
</script>
