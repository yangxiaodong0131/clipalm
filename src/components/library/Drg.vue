<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">DRG列表</text>
      <wxc-cell v-for="(drg, i) in drgs"
                v-bind:key="i"
                :label="drg.code"
                :title="drg.name"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>
    </div>
  </div>
</template>

<script>
import { WxcCell } from 'weex-ui'
export default {
  components: { WxcCell },
  computed: {
    drgs: {
      get () {
        return this.$store.state.Library.rule
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
