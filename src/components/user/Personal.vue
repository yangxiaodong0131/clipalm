<template>
  <div class="panel" v-bind:style="panel">
    <scroller>
      <div>
        <div style="height: 91px;"></div>
          <text style="height: 40px;font-size: 35px">性别</text>
        <input type="text" placeholder="请输入性别" class="input" :autofocus=true value="" v-model="personal.gender" />
      </div>
      <div>
          <text style="height: 40px;font-size: 35px">所在机构</text>
        <input type="text" placeholder="请输入所在机构" class="input" v-model="personal.org" />
      </div>
      <wxc-button text="提交个人信息"
              type="blue"
              size="full"
              class="submits"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </scroller>
    <mini-bar title="完善个人信息" rightIcon="home" leftIcon="left" rightButtonShow="true"></mini-bar>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect, WxcButton, WxcCell } from 'weex-ui'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'
import { updateUser } from '../../utils/user'

export default {
  name: 'user-person',
  components: { WxcMinibar, WxcGridSelect, Category, WxcButton, WxcCell, MiniBar },
  data: () => ({
    personal: { gender: '', org: '' }
  }),
  computed: {
    userAnalyse: {
      get () {
        return this.$store.state.Home.userAnalyse
      }
    },
    panel: {
      get () {
        const tabPageHeight = weex.config.env.deviceHeight
        const style = {
          width: '750px',
          height: tabPageHeight
        }
        return style
      }
    }
  },
  created () {
  },
  methods: {
    wxcButtonClicked () {
      updateUser(this, this.personal)
    }
  }
}
</script>

<style scoped>
  .panel {
    margin-left: 0px;
    border-color: #BBBBBB;
    padding-top: 0;
    background-color: #C6e2FF;
  }
  .text {
    color: #666666;
    font-size: 32px;
  }
  .gridSelect {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .submits{
    position: relative;
    left: 23px;
    top: 1px;
  }
  .red{
    text-align: left;
  }
  .demo-title {
    font-size: 28px;
    background-color: #C6E2FF;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 14px;
    padding: 10px;
  }
  .category {
    margin-top: 91px;
  }
  .input {
    font-size: 30px;
    height: 50px;
    width: 750px;
    border-width: 1px;
    border-color: #000000;
  }
  .submits{
    position: relative;
    left: 23px;
    top: 1px;
  }
</style>
