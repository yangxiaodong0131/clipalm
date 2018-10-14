<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
    <Reports v-if="menu == '报表'"></Reports>
    <Report v-if="menu == '单张报表'"></Report>
    <Query v-if="menu == '查询'"></Query>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Reports from './stat/Reports'
import Report from './stat/Report'
import Query from './stat/Query'

export default {
  name: 'drg-page',
  components: { NavBar, Report, Reports, Query },
  computed: {
    menu () {
      return this.$store.state.Home.menu
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
