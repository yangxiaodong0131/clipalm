<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
    <div class="panel">
      <text class="text" lines="3">Weex 是一套简单易用的跨平台开发方案，能以 Web 的开发体验构建高性能、可扩展的原生应用。Vue 是一个轻量并且功能强大的渐进式前端框架。</text>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'

export default {
  name: 'home-page',
  components: { NavBar }
}
</script>

<style scoped>
  .wrapper {
    /* flex-direction: column; */
    justify-content: center;
  }
  .panel {
    width: 100%;
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
