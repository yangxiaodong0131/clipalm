<template>
  <div class="panel" v-bind:style="panel">
    <scroller>
      <div>
        <div style="height: 91px;"></div>
          <text style="height: 55px;font-size: 35px;text-align: center;">性别</text>
        <!--<input type="text" placeholder="请输入性别" class="input" :autofocus=true value="" v-model="personal.gender" />-->
          <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
      </div>
      <div>
          <text style="height: 55px;font-size: 35px;text-align: center;">所在机构</text>
        <input type="text" placeholder="请输入所在机构" class="input" v-model="personal.org" />
      </div>
      <wxc-button text="提交"
              type="blue"
              size="full"
              class="submits"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </scroller>
    <mini-bar title="完善个人信息" rightIcon="home" leftIcon="left" rightButtonShow="true"></mini-bar>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect, WxcButton, WxcRadio, WxcCell } from 'weex-ui'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'
import { updateUser } from '../../utils/user'
var modal = weex.requireModule('modal')
export default {
  name: 'user-person',
  components: { WxcMinibar, WxcGridSelect, Category, WxcRadio, WxcButton, WxcCell, MiniBar },
  data: () => ({
    list: [
      { title: '男', value: 1 },
      { title: '女', value: 2, checked: true }
    ],
    checkedInfo: { title: '女', value: 2 },
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
    wxcRadioListChecked (e) {
      console.log(e)
      this.personal.gender = e.title
    },
    wxcButtonClicked () {
      if (this.personal.org === '') {
        modal.alert({
          message: '请输入所在机构',
          duration: 0.3
        })
      } else {
        updateUser(this, this.personal)
        console.log(this.personal)
      }
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
    margin-top: 20px;
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
    height: 100px;
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
