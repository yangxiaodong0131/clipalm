<template>
  <div class="demo" v-bind:style="panel">
    <wxc-button class="submits"
      v-for="(menu, index) in menus" :key="index"
      :text="menu"
      type="white"
      @wxcButtonClicked="wxcButtonClicked(menu)"></wxc-button>
    <div v-if="activeTab === 4 && menu === '菜单'">
      <text class="title">我的帖子</text>
      <div class="special-rich" v-for="(specialList, index) in specialConfigList" v-bind:key="`rich-${index}`">
        <div class="panel" @click="wxcRichTextLinkClick(index)">
          <wxc-rich-text :config-list="specialList"></wxc-rich-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Utils, WxcSpecialRichText, WxcButton, WxcRichText } from 'weex-ui'

export default {
  components: { WxcButton, WxcSpecialRichText, WxcRichText },
  data () {
    return {
      height: Utils.env.getPageHeight() - 120
    }
  },
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
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
    },
    user () {
      return this.$store.state.Home.user
    },
    posts () {
      return this.$store.state.Forum.post
    },
    specialConfigList () {
      const configs = []
      this.posts.map((x) => {
        const config = [
          {
            type: 'tag',
            value: x.label,
            style: {
              fontSize: 34,
              color: '#3D3D3D',
              borderColor: '#FFC900',
              backgroundColor: '#FFC900',
              borderRadius: 14
            }
          },
          {
            type: 'text',
            value: x.title,
            theme: 'black',
            style: { fontSize: 35 }
          }
        ]
        configs.push(config)
      })
      return configs
    }
  },
  methods: {
    wxcButtonClicked (menu) {
      switch (this.activeTab) {
        case 1:
          this.$store.commit('SET_wt4Case', [])
          break
        case 2:
          this.$store.commit('SET_rule', [])
          break
        case 3:
          this.$store.commit('SET_statDrg', [])
          break
        case 4:
          this.$store.commit('SET_post', [])
          break
      }
      this.$store.commit('SET_menu', [this.activeTab, menu])
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
    padding: 5px;
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
  .title {
    text-align: center;
    font-size: 35px;
    background-color: #f2f3f4;
  }
  .text {
    font-size: 35px;
  }
</style>
