<template>
  <div class="wrapper">
    <div class="panel">
      <text class="text" lines="3">ICD10</text>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Mdc-doc'
}
</script>

<style scoped>
  .wrapper {
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
