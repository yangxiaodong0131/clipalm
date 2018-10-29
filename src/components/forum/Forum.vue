<template>
  <div class="panel">
    <div class="special-rich" v-for="(specialList, index) in specialConfigList" v-bind:key="index">
       <!-- <wxc-special-rich-text :config-list="specialList" @wxcRichTextLinkClick="wxcRichTextLinkClick"></wxc-special-rich-text> -->
       <wxc-rich-text :config-list="specialList"
                   @wxcRichTextLinkClick="wxcRichTextLinkClick"></wxc-rich-text>
    </div>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText } from 'weex-ui'

export default {
  components: { WxcRichText, WxcSpecialRichText },
  data: () => ({
  }),
  computed: {
    specialConfigList () {
      const configs = []
      const posts = this.$store.state.Forum.post
      posts.map((x) => {
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
    wxcRichTextLinkClick (e) {
      console.log('ss')
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
