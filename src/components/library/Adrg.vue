<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">ADRG列表</text>
      <wxc-cell v-for="(adrg, i) in adrgs"
                v-bind:key="i"
                :label="adrg.code"
                :title="adrg.name"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked(adrg)"
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
    }
  }
}
</script>
