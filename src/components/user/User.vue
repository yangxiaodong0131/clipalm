<template>
  <div class="container">
    <div class="demo">
      <wxc-cell label="用户名"
                :title="user.username"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>
      <wxc-cell label="邮箱"
                :title="user.email"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="false"></wxc-cell>
    </div>
    <div class="demo">
      <text class="demo-title">用户权限</text>
      <wxc-cell title="专家组成员"
                :has-arrow="false"
                :has-top-border="true">
        <switch slot="value" disabled="true"></switch>
      </wxc-cell>
      <wxc-cell title="MDC组"
                :desc="mdcs"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true">
      </wxc-cell>
    </div>
    <wxc-button text="重新登陆" size="big"
              @wxcButtonClicked="login"></wxc-button>
  </div>
</template>

<script>
import { WxcCell, WxcButton } from 'weex-ui'
export default {
  name: 'user-doc',
  components: { WxcCell, WxcButton },
  methods: {
    wxcCellClicked (e) {
      console.log(e)
    },
    login () {
      this.$store.commit('SET_menu', [0, '用户登陆'])
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.Home.user.data
      }
    },
    mdcs: {
      get () {
        if (this.$store.state.Home.user.data.mdc) {
          return this.$store.state.Home.user.data.mdc.join('、')
        }
        return ''
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
