<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">MDC列表</text>
      <wxc-cell v-for="(mdc, i) in mdcs"
                v-bind:key="i"
                :label="mdc.code"
                :title="mdc.name"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked(mdc)"
                :has-margin="true"></wxc-cell>
    </div>
  </div>
</template>

<script>
import { WxcCell } from 'weex-ui'
import { getServer } from '../../utils/server'
export default {
  components: { WxcCell },
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
