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
import { getServer } from '../../utils/server'

export default {
  components: { WxcButton },
  data () {
    return {
      height: Utils.env.getPageHeight() - 120
    }
  },
  computed: {
    visible () {
      return this.$store.state.Home.visible
    },
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
    wxcRichTextLinkClick () {
    },
    popupOverlayBottomClick () {
      this.$store.commit('SET_visible', false)
    },
    wxcButtonClicked (menu) {
      this.$store.commit('SET_visible', false)
      const i = this.$store.state.Home.activeTab
      this.$store.commit('SET_menu', [i, menu])
      this.$store.commit('SET_miniBarTitle', `${menu}`)
      switch (i) {
        case 1:
          this.$store.commit('SET_editMenu', menu)
          this.$store.commit('SET_wt4Page', 1)
          this.$store.commit('SET_wt4Case', [])
          this.$store.commit('SET_wt4Info', '')
          getServer(this, 'all', menu)
          break
        case 2:
          this.$store.commit('SET_library_menu', menu)
          getServer(this, 'all', menu)
          break
        case 3:
          this.$store.commit('SET_statMenu', menu)
          getServer(this, 'all', menu)
          break
        case 4:
          this.$store.commit('SET_forumMenu', menu)
          getServer(this, 'all', menu)
          break
        default:
          getServer(this, 'all', menu)
      }
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
