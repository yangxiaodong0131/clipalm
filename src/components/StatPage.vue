<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
    <Drg></Drg>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Drg from './stat/Drg'

export default {
  name: 'drg-page',
  components: { NavBar, Drg },
  computed: {
    menu () {
      return this.$store.state.Stat.menu
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
