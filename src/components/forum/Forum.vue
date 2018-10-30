<template>
  <div class="panel">
    <div class="special-rich" v-for="(specialList, index) in specialConfigList" v-bind:key="index">
      <div class="panel" @click="wxcRichTextLinkClick(index)">
        <wxc-rich-text :config-list="specialList"></wxc-rich-text>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText } from 'weex-ui'
import { getServer } from '../../utils/server'
export default {
  components: { WxcRichText, WxcSpecialRichText },
  data: () => ({
  }),
  computed: {
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
              fontSize: 24,
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
            style: { fontSize: 28 }
          }
        ]
        configs.push(config)
      })
      return configs
    }
  },
  created: function () {
  },
  methods: {
    wxcRichTextLinkClick (i) {
      // this.$store.commit('SET_isBottomShow', true)
      // this.$store.commit('SET_visible', false)
      const menu = '帖子'
      this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, menu])
      // this.$store.commit('SET_infoMenu', this.wxcCellTitle)
      // this.$store.commit('SET_infoLevel', 1)
      getServer(this, 'forumOne', '帖子', this.posts[i])
    }
  }
}
</script>

<style scoped>
  .wrapper {
    /* flex-direction: column; */
    justify-content: center;
  }
  .panel {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
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
</style>
<style scoped>
.container {
  margin-top: 91px;
  width: 750px;
  height: 1250px;
}
</style>
