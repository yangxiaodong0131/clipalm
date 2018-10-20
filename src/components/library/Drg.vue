<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">DRG列表</text>
      <wxc-indexlist :normal-list="drgs"
                    @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                    :show-index="true"></wxc-indexlist>
    </div>
    <!-- <pop-bar></pop-bar> -->
  </div>
</template>

<script>
import { WxcIndexlist, WxcCell } from 'weex-ui'
import PopBar from '../common/PopBar'
export default {
  components: { WxcCell, PopBar, WxcIndexlist },
  computed: {
    drgs: {
      get () {
        return this.$store.state.Library.drgRule
      }
    }
  },
  methods: {
    wxcCellClicked (e) {
      console.log(e)
    },
    wxcIndexlistItemClicked (e) {
      this.isBottomShow = true
      this.info = e.item
    }
  }
}
</script>
