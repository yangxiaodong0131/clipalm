<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
    <Edit></Edit>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Edit from './edit/Edit'

export default {
  name: 'edit-page',
  components: { NavBar, Edit },
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
