<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">用户信息</text>
      <wxc-cell label="用户名"
                :title="user.data.username"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>
      <wxc-cell label="邮箱"
                :title="user.data.email"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="false"></wxc-cell>
    </div>
    <div class="demo">
      <text class="demo-title">用户权限</text>
      <wxc-cell title="专家组成员"
                :has-arrow="false"
                :has-top-border="true">
        <switch slot="value"></switch>
      </wxc-cell>
      <wxc-cell title="MDC组"
                :desc="mdcs"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true">
      </wxc-cell>
    </div>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcCell } from 'weex-ui'
import PopBar from '../PopBar'
export default {
  name: 'user-doc',
  components: { WxcCell, PopBar },
  methods: {
    wxcCellClicked (e) {
      console.log(e)
    }
  },
  computed: {
    user: {
      get () {
        console.log(this.$store.state.Home.user)
        return this.$store.state.Home.user
      }
    },
    mdcs: {
      get () {
        return this.$store.state.Home.user.data.mdc.join('、')
      }
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
  }
  .panel {
    margin-left: 0px;
    border-width: 2px;
    border-style: solid;
    border-color: #BBBBBB;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
  }
  .text {
    color: #666666;
    font-size: 32px;
  }
</style>
