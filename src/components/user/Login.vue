<template>
  <div class="panel">
    <div class="row">
      <image style="width:344px;height:177px" src="http://210.75.199.113/images/clipalm.png"></image>
    </div>
    <div v-bind:style="panel">
      <div class="input-bar">
        <input class="input" type="text" placeholder="用户名" v-model="user.username" />
      </div>
      <div class="input-bar">
        <input class="input" type="password" placeholder="密码" v-model="user.password"/>
      </div>
      <div class="row">
        <wxc-button type="blue" text="登录" size="null" :btnStyle="btnStyle" @wxcButtonClicked="login"></wxc-button>
        <!-- <wxc-button text="注册" size="big" :btnStyle="btnStyle" @wxcButtonClicked="register"></wxc-button> -->
      </div>
      <div class="row">
          <div class="col-md-5">
            <text class="input-forget" @wxcButtonClicked="findPassword">找回密码</text>
          </div>
          <div class="col-md-2"></div>
          <div class="col-md-5">          
            <text class="input-register" @wxcButtonClicked="register">立即注册</text>
          </div>
      </div>
      <wxc-button :text="loginResult" size="full" :textStyle="textStyle" :btnStyle="btnStyle2"></wxc-button>
    </div>  
  </div>
</template>

<script>
import { WxcButton, WxcSearchbar, WxcCell } from 'weex-ui'
import { userLogin } from '../../utils/user'
import Category from '../common/category.vue'

export default {
  name: 'login-page',
  components: { WxcButton, WxcSearchbar, WxcCell, Category },
  data () {
    return {
      visible: false,
      user: { password: '', username: '', plat: 'client' },
      barStyle: {
        backgroundColor: '#C6e2FF'
      },
      btnStyle: {
        marginTop: '20px'
      },
      btnStyle2: {
        paddingLeft: '15px',
        backgroundColor: 'rgba(224, 221, 220, 0)',
        borderWidth: '0px'
      },
      textStyle: {
        color: 'rgb(166, 162, 162)'
      },
      cellStyle: {
        backgroundColor: '#C6e2FF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: '#FFFFFF'
      }
    }
  },
  computed: {
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    },
    loginResult () {
      return this.$store.state.Home.user.loginResult
    }
  },
  methods: {
    login () {
      userLogin(this, this.user)
    },
    register () {
      const i = this.$store.state.Home.activeTab
      this.$store.commit('SET_menu', [i, '注册用户'])
    },
    NameOnInput (e) {
      this.user.username = e.value
    },
    PwdOnInput (e) {
      this.user.password = e.value
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
  }
  .input-bar {
    height: 78px;
    margin-left: 25px;
    border-top-width: 2px;
    border-top-color: #DDD;
    background-color: #FFFFFF;
    flex-direction: row;
    justify-content: space-between;
  }
  .input {
    width: 700px;
    height: 78px;
    padding-left: 30px;
    color: #606060;
    background-color: #FFFFFF;
    font-size: 36px;
  }
  .panel {
    flex-direction: column;
    justify-content: center;
    /* height: 750; */
    margin-left: 0px;
    /* border-width: 2px; */
    /* border-style: solid; */
    border-color: #BBBBBB;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
    margin-top: 201px;
  }
  .text {
    color: #666666;
    font-size: 32px;
    margin-left: 30px;
    margin-bottom: 15px;
  }
  .row {
    width: 750px;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 10px;
  }
  .input-forget{
    font-size: 30px;
  }
  .input-register{
    font-size: 30px;
  }
</style>
