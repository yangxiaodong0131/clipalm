<template>
  <div class="wrapper">
    <!-- <nav-bar></nav-bar> -->
    <div class="panel">
      <User v-if="menu == '个人信息'"></User>
      <Login v-if="menu == '用户登陆'"></Login>
    </div>
  </div>
</template>

<script>
import NavBar from '../common/NavBar'
import User from './User'
import Login from './Login'

export default {
  name: 'user-page',
  components: { NavBar, User, Login },
  computed: {
    menu () {
      return this.$store.state.Home.menu[0]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .wrapper {
    /* flex-direction: column; */
    justify-content: center;
  }
  .panel {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
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
