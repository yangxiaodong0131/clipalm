<template>
  <div class="demo" v-bind:style="panel">
  <div class="bigdiv">
    <div v-for="(v, i) in menus" :key="i" class="row">
      <div v-for="(text, k) in v" :key="k" class="item" @click="wxcButtonClicked(text)">
          <!-- <wxc-icon class="icon" name="scanning" :icon-style="iconStyle"></wxc-icon> -->
          <image class="icon"
                 src="http://210.75.199.113/images/left.png"
                 style="height: 32px;width: 32px;"></image>
          <text class="text">{{text}}</text>
      </div>
    </div>
  </div>
    <!-- <list class="list">
      <cell class="cell">
        <div class="panel">
            <wxc-button class="submits"
              v-for="(menu, index) in menus" :key="index"
              :text="menu"
              type="white"
              @wxcButtonClicked="wxcButtonClicked(menu)"></wxc-button>
        </div>
      </cell>
    </list> -->
  <div v-if="activeTab === 3">
  <wxc-rich-text  :config-list='configHeader'
                  :has-text-margin="true"
                  @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
    <div v-for="(v, i) in analysis" :key="i" class="row">
      <div v-for="(text, k) in v" :key="k" class="item" @click="wxcButtonClicked(text)">
          <!-- <wxc-icon class="icon" name="scanning" :icon-style="iconStyle"></wxc-icon>-->
          <image class="icon"
                 src="http://210.75.199.113/images/left.png"
                 style="height: 32px;width: 32px;"></image>
          <text class="text">{{text}}</text>
      </div>
    </div>
    <wxc-rich-text  :config-list='configHeader2'
                    :has-text-margin="true"
                    @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
    <div v-for="(v, i) in mechanism" :key="i" class="row">
      <div v-for="(text, k) in v" :key="k" class="item" @click="wxcButtonClicked(text)">
          <!-- <wxc-icon class="icon" name="scanning" :icon-style="iconStyle"></wxc-icon>-->
          <image class="submits"
                 src="http://210.75.199.113/images/left.png"
                 style="height: 32px;width: 32px;"></image>
          <text class="text">{{text}}</text>
      </div>
    </div>
  </div>
    <mini-bar :title="menu" rightIcon="home"></mini-bar>
  </div>
</template>

<script>
import { Utils, WxcSpecialRichText, WxcButton, WxcRichText, WxcPopover, WxcCell, WxcTag, WxcIcon } from 'weex-ui'
import MiniBar from '../common/MiniBar.vue'
import { getServer } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcButton, WxcSpecialRichText, WxcRichText, MiniBar, WxcPopover, WxcCell, WxcTag, WxcIcon },
  data () {
    return {
      height: Utils.env.getPageHeight() - 120,
      analysis: [['偏差分析', '主诊未入组', '手术QY']],
      mechanism: [['年', '季度', '月']],
      configHeader: [{
        type: 'tag',
        value: 'DRG专家',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      configHeader2: [{
        type: 'tag',
        value: 'DRG机构',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }]
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
      const aa = this.$store.state.Home.menus.slice(0, 3)
      list.push(aa)
      const bb = this.$store.state.Home.menus.slice(3, 6)
      list.push(bb)
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
