<template>
  <scroller class="container" v-bind:style="panel">
    <div style="height:20px"></div>
    <div class="special-rich" v-for="(specialList, index) in specialConfigList" v-bind:key="index">
      <div class="panel" @click="wxcRichTextLinkClick(index)">
        <wxc-rich-text :config-list="specialList"></wxc-rich-text>
      </div>
    </div>
    <wxc-button text="新建帖子"
          size="full"
          class="submits"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
  </scroller>
</template>

<script>
import { WxcSpecialRichText, WxcButton, WxcRichText } from 'weex-ui'
import { getServer } from '../../utils/server'
// const modal = weex.requireModule('modal')
export default {
  components: { WxcSpecialRichText, WxcButton, WxcRichText },
  data: () => ({
  }),
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    posts () {
      return this.$store.state.Forum.post
    },
    forumLabel () {
      return this.$store.state.Forum.forumLabel
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
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const i = this.$store.state.Home.activeTab
      if (this.posts.length === 0) {
        getServer(this, i, '帖子列表', { category: this.menu })
      }
    },
    wxcRichTextLinkClick (i) {
      this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '帖子'])
      this.$store.commit('SET_forumIndex', i)
      getServer(this, this.activeTab, '帖子', this.posts[i])
    },
    wxcButtonClicked () {
      this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '新建帖子'])
    },
    menuClicked (menu) {
      this.$store.commit('SET_forumCategory', menu)
      // console.log(menu)
    }
  }
}
</script>

<style scoped>
.panel {
  width: 750px;
  background-color: #f2f3f4;
  font-size: 30px;
  border-style: solid;
  border-left-width: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 1px;
  border-bottom-color: gray;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
}
.container {
  margin-top: 91px;
  width: 750px;
  font-size: 30px;
}
.submits{
  position: relative;
  left: 23px;
  top: 1px;
}
</style>
