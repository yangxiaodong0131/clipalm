<template>
  <div class="container">
    <text class="demo-title">MDC列表</text>
    <wxc-cell v-for="(mdc, i) in mdcs"
              v-bind:key="i"
              :label="mdc.code"
              :title="mdc.desc"
              :has-arrow="true"
              @wxcCellClicked="wxcCellClicked(mdc)"
              :has-margin="true"></wxc-cell>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcCell } from 'weex-ui'
import PopBar from '../PopBar'
import { getServer } from '../../utils/server'
export default {
  components: { WxcCell, PopBar },
  computed: {
    mdcs: {
      get () {
        return this.$store.state.Library.mdcRule
      }
    }
  },
  updated: function () {
  },
  methods: {
    wxcCellClicked (mdc) {
      this.$store.commit('SET_menu', 'ADRG')
      getServer(this, 'adrgOne', 'ADRG', mdc)
    }
  }
}
</script>
