<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">ICD10列表</text>
      <wxc-cell v-for="(icd10, i) in icd10s"
                v-bind:key="i"
                :label="icd10.code"
                :title="icd10.name"
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
    icd10s: {
      get () {
        return this.$store.state.Library.icd10Rule
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
