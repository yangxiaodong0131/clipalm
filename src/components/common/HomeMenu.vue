<template>
  <div class="demo" v-bind:style="panel">
  <div class="bigdiv">
    <div v-for="(v, i) in menus" :key="`menus${i}`" class="row">
      <div v-for="(text, k) in v" :key="`menu${k}`" class="item" @click="wxcButtonClicked(text)">
          <image class="icon"
                 src="http://210.75.199.113/images/left.png"
                 style="height: 32px;width: 32px;"></image>
          <text class="text">{{text}}</text>
      </div>
    </div>
  </div>
  <div v-if="activeTab === 3">
    <category title="DRG专家"></category>
    <div v-for="(texts, indexs) in [['偏差分析', '主诊未入组', '手术QY']]" :key="`texts1-${indexs}s`" class="row">
      <div v-for="(text, index) in texts" :key="`text1-${index}`" class="item" @click="wxcButtonClicked(text)">
          <image class="icon"
                 src="http://210.75.199.113/images/left.png"
                 style="height: 32px;width: 32px;"></image>
          <text class="text">{{text}}</text>
      </div>
    </div>
    <category title="DRG机构"></category>
    <div v-for="(texts, indexs) in [['年', '半年', '季度', '月']]" :key="`texts2-${indexs}s`" class="row">
      <div v-for="(text, index) in texts" :key="`text2-${index}`" class="item" @click="wxcButtonClicked(text)">
          <image class="icon"
                 src="http://210.75.199.113/images/left.png"
                 style="height: 32px;width: 32px;"></image>
          <text class="text">{{text}}</text>
      </div>
    </div>
  </div>
    <mini-bar :title="menu" rightIcon="home" rightButtonShow="true"></mini-bar>
  </div>
</template>

<script>
import { Utils, WxcSpecialRichText, WxcButton, WxcRichText, WxcPopover, WxcCell, WxcTag, WxcIcon } from 'weex-ui'
import MiniBar from '../common/MiniBar.vue'
import Category from '../common/category.vue'
import { getServer } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcButton, WxcSpecialRichText, WxcRichText, Category, MiniBar, WxcPopover, WxcCell, WxcTag, WxcIcon },
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
      const list = []
      let k = 0
      for (let i = 0; i < this.$store.state.Home.menus.length; i++) {
        let menu = list[k]
        if (!menu) {
          list[k] = []
        } else if (menu.length >= 3) {
          k = k + 1
          list[k] = []
        }
        menu = list[k]
        menu.push(this.$store.state.Home.menus[i])
      }
      return list
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
      if (this.posts) {
        this.posts.map((x) => {
          const config = [
            {
              type: 'tag',
              value: x.module,
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
      }
      return configs
    }
  },
  methods: {
    wxcButtonClicked (menu) {
      switch (this.activeTab) {
        case 1:
          this.$store.commit('SET_wt4Page', 1)
          this.$store.commit('SET_wt4Case', [])
          break
        case 2:
          this.$store.commit('SET_libraryPage', 1)
          this.$store.commit('SET_rule', [])
          break
        case 3:
          this.$store.commit('SET_statPage', 1)
          this.$store.commit('SET_statDrg', [])
          break
        case 4:
          this.$store.commit('SET_post', [])
          this.$store.commit('SET_forumModule', menu)
          break
      }
      this.$store.commit('SET_menu', [this.activeTab, menu])
    },
    wxcRichTextLinkClick (i) {
      this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '帖子'])
      this.$store.commit('SET_forumIndex', i)
      getServer(this, this.activeTab, '帖子', this.posts[i])
    },
    popoverButtonClicked (obj) {
      modal.toast({ 'message': `key:${obj.key}, index:${obj.index}`, 'duration': 1 })
    },
    wxcButtonClickedMenu (ref) {
      this.$refs[ref].wxcPopoverShow()
    },
    onSelect (params) {
      console.log(params)
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
    /* flex-direction: column;
    align-items: center; */
    /* justify-content: center; */
  }
  .submits {
    position: relative;
    left: 23px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .submitss {
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .panel {
    margin-top: 140px;
  }
  .demo1 {
    margin-top: 50px;
    margin-left: 20px;
  }
  .title {
    text-align: center;
    height: 40px;
    font-size: 35px;
    background-color: rgb(224, 221, 220)
  }
  .special-rich {
    margin-top: 14px;
  }
  .bigdiv {
    margin-top: 491px;
    /* width: 550px; */
  }
  .item{
    flex:1;
    align-items: center;
    /* border-width: 2px 1px 2px 1px; */
    border-left-width: 2px;
    border-right-width: 2px;
    border-top-width: 2px;
    border-bottom-width: 2px;
    border-style: solid;
    border-color: gray;
    margin: 20px;
    background-color: #87CEFF;
  }
  .row{
    flex-direction: row;
    width: 740px;
  }
  .text {
    font-size: 27px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .icon {
    margin-top: 20px;
  }
</style>
