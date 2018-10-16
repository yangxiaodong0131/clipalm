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
const stream = weex.requireModule('stream')
const urlConfig = require('../../utils/config.js')
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
      stream.fetch({
        method: 'GET',
        type: 'json',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        responseType: 'json',
        url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/rule_bj_drg?adrg=${adrg.code}`
      }, res => {
        if (res.ok) {
          this.$store.commit('SET_menu', 'DRG')
          this.$store.commit('SET_drg_rule', res.data.data)
          // if (res.data.login) {
          //   this.info = res.data
          //   this.islogin = true
          // } else {
          //   this.info = '- 账号或密码错误 -'
          //   this.islogin = false
          // }
        } else {
          this.info = '- 网络连接失败 -'
        }
      })
    }
  }
}
</script>
