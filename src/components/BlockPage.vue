<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
    <div class="panel">
      <text class="text" lines="3">block page. </text>
      <block></block>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Block from './block/Block'

export default {
  name: 'block-page',
  components: { NavBar, Block }
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
