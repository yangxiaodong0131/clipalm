<template>
  <div class="demo" v-bind:style="panel">
    <wxc-button class="submits"
      v-for="(menu, index) in menus" :key="index"
      :text="menu"
      type="white"
      @wxcButtonClicked="wxcButtonClicked(menu)"></wxc-button>
  </div>
</template>

<script>
import { Utils, WxcButton } from 'weex-ui'

export default {
  components: { WxcButton },
  data () {
    return {
      height: Utils.env.getPageHeight() - 120
    }
  },
  computed: {
    menus () {
      return this.$store.state.Home.menus
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    }
  },
  methods: {
    wxcButtonClicked (menu) {
      const i = this.$store.state.Home.activeTab
      this.$store.commit('SET_menu', [i, menu])
    }
  }
}
</script>
<style scoped>
  .demo-title {
    font-size: 28px;
    background-color: #C6E2FF;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 14px;
    padding: 10px;
  }
  .demo {
    width: 750px;
    margin-top: 140px;
  }
  .row {
    width: 750px;
  }
  .submits{
    position: relative;
    left: 23px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
