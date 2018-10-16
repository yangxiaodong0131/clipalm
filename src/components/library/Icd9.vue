<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">ICD9列表</text>
      <wxc-cell v-for="(icd9, i) in icd9s"
                v-bind:key="i"
                :label="icd9.code"
                :title="icd9.name"
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
    icd9s: {
      get () {
        return this.$store.state.Library.icd9Rule
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
