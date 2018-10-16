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
const stream = weex.requireModule('stream')
const urlConfig = require('../../utils/config.js')
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
      stream.fetch({
        method: 'GET',
        type: 'json',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        responseType: 'json',
        url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/rule_bj_adrg?mdc=${mdc.mdc}`
      }, res => {
        if (res.ok) {
          this.$store.commit('SET_menu', 'ADRG')
          this.$store.commit('SET_adrg_rule', res.data.data)
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
