<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
    <div class="panel">
      <Block v-if="menu == '区块'"></Block>
      <Account v-if="menu == '账户'"></Account>
      <Peer v-if="menu == '节点'"></Peer>
      <Transact v-if="menu == '交易'"></Transact>
      <Transfer v-if="menu == '转账'"></Transfer>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Account from './block/Account'
import Block from './block/Block'
import Peer from './block/Peer'
import Transact from './block/Transact'
import Transfer from './block/Transfer'

export default {
  name: 'block-page',
  components: { NavBar, Block, Account, Peer, Transact, Transfer },
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
