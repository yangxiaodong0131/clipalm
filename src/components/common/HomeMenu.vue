<template>
  <div class="demo" v-bind:style="panel">
    <list class="list">
      <cell class="cell">
        <div class="panel">
            <wxc-button class="submits"
              v-for="(menu, index) in menus" :key="index"
              :text="menu"
              type="white"
              @wxcButtonClicked="wxcButtonClicked(menu)"></wxc-button>
          <div v-if="activeTab === 3 && menu === 'DRG分析'">
            <div class="demo demo1">
              <wxc-button text="DRG专家"
                          class="submitss"
                          type="white"
                          @wxcButtonClicked="wxcButtonClickedMenu('wxc-expert')"></wxc-button>
              <wxc-button text="DRG机构"
                          class="submitss"
                          type="white"
                          @wxcButtonClicked="wxcButtonClickedMenu('wxc-mechanism')"></wxc-button>
            </div>
             <wxc-popover ref="wxc-expert"
                         :buttons="btns1"
                         :position="popoverPosition1"
                         :arrowPosition="popoverArrowPosition1"
                         @wxcPopoverButtonClicked="popoverButtonClicked">
            </wxc-popover>
             <wxc-popover ref="wxc-mechanism"
                         :buttons="btns2"
                         :position="popoverPosition2"
                         :arrowPosition="popoverArrowPosition2"
                         @wxcPopoverButtonClicked="popoverButtonClicked">
            </wxc-popover>
          </div>
          <!--<div v-if="activeTab === 4 && menu === '论坛'">
            <text class="title">我的帖子</text>
            <div class="special-rich" v-for="(specialList, index) in specialConfigList" v-bind:key="`rich-${index}`">
              <div @click="wxcRichTextLinkClick(index)">
                <wxc-rich-text :config-list="specialList"></wxc-rich-text>
              </div>
            </div>
            <text class="title">最新帖子</text>
            <div class="special-rich" v-for="(specialList, index) in specialConfigList" v-bind:key="`rich2-${index}`">
              <div @click="wxcRichTextLinkClick(index)">
                <wxc-rich-text :config-list="specialList"></wxc-rich-text>
              </div>
            </div>
          </div>-->
        </div>
      </cell>
    </list>
    <mini-bar :title="menu"></mini-bar>
  </div>
</template>

<script>
import { Utils, WxcSpecialRichText, WxcButton, WxcRichText, WxcPopover, WxcCell, WxcTag } from 'weex-ui'
import MiniBar from '../common/MiniBar.vue'
import { getServer } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcButton, WxcSpecialRichText, WxcRichText, MiniBar, WxcPopover, WxcCell, WxcTag },
  data () {
    return {
      height: Utils.env.getPageHeight() - 120,
      btns1: [{ text: '偏差分布', key: 's1' }],
      popoverPosition1: { x: 200, y: 230 },
      popoverArrowPosition1: { pos: 'bottom', x: 500 },
      btns2: [{ text: '年', key: 't1' }],
      popoverPosition2: { x: 200, y: 520 },
      popoverArrowPosition2: { pos: 'bottom', x: 500 },
      submits: {},
      cellStyle: { backgroundColor: '#f2f3f4', height: '20' }
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
    minibarRightButtonClick () {
      this.$refs['wxc-popover'].wxcPopoverShow()
    },
    popoverButtonClicked (obj) {
      modal.toast({ 'message': `key:${obj.key}, index:${obj.index}`, 'duration': 1 })
    },
    wxcButtonClickedMenu (ref) {
      this.$refs[ref].wxcPopoverShow()
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
    /* margin-top: 21px; */
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
</style>
