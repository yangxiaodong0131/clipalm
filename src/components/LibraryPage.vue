<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
    <div class="panel">
      <Mdc v-if="menu == 'MDC'"></Mdc>
      <Adrg v-if="menu == 'ADRG'"></Adrg>
      <Drg v-if="menu == 'DRG'"></Drg>
      <Icd10 v-if="menu == 'ICD10'"></Icd10>
      <Icd9 v-if="menu == 'ICD9'"></Icd9>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Mdc from './library/Mdc'
import Adrg from './library/Adrg'
import Drg from './library/Drg'
import Icd10 from './library/Icd10'
import Icd9 from './library/Icd9'

export default {
  name: 'library-page',
  components: { NavBar, Mdc, Adrg, Drg, Icd10, Icd9 },
  computed: {
    menu () {
      return this.$store.state.Home.menu[2]
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
