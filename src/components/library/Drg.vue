<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">DRG列表</text>
      <wxc-cell v-for="(drg, i) in drgs"
                v-bind:key="i"
                :label="drg.code"
                :title="drg.desc"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>
    </div>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcCell } from 'weex-ui'
import PopBar from '../PopBar'
export default {
  components: { WxcCell, PopBar },
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
    }
  }
}
</script>
