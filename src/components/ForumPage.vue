<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
    <Forum v-if="menu == '论坛'"></Forum>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Forum from './forum/Forum'

export default {
  name: 'forum-page',
  components: { NavBar, Forum },
  computed: {
    menu () {
      return this.$store.state.Home.menu[4]
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
