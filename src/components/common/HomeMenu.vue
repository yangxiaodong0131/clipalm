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
        </div>
      </cell>
    </list>
    <div class="submits" v-if="activeTab === 3">
      <div>
        <wxc-button text="DRG专家"
          type="blue"
          disabled="true"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <wxc-button text="偏差分析"
          type="white"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <wxc-button text="主诊未入组"
          type="white"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <wxc-button text="手术QY"
          type="white"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <wxc-button text="DRG机构"
          type="blue"
          disabled="true"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <wxc-button text="年"
          type="white"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <wxc-button text="季度"
          type="white"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <wxc-button text="月"
          type="white"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
      </div>
      <!--<div class="wxc-demo">
        <scroller class="scroller">
          <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
          <text class="radio-text">checkedItem: {{checkedInfo}}</text>
          <category title="Radio不可选"></category>
          <wxc-radio :list="list2"></wxc-radio>
        </scroller>
      </div>-->
    </div>
    <mini-bar :title="menu" rightIcon="home"></mini-bar>
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
      list: [
        { title: '选项1', value: 1 },
        { title: '选项2', value: 2, checked: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 },
      ],
      list2: [
        { title: '未选不可修改', value: 5, disabled: true },
        { title: '已选不可修改', value: 6, disabled: true, checked: true },
      ],
      checkedInfo: { title: '选项2', value: 2 }
    }
  },
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    wxcRadioListChecked (e) {
      this.checkedInfo = e;
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
