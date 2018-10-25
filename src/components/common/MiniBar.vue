<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="demo">
        <wxc-minibar title="右侧带icon的导航栏"
                    background-color="#009ff0"
                    text-color="#FFFFFF"
                    @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                    @wxcMinibarRightButtonClicked="minibarRightButtonClick">
          <wxc-icon slot="right" name="more"></wxc-icon>
        </wxc-minibar>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    background-color: #FFFFFF;
  }
  .scroller {
    flex: 1;
  }
  .demo {
    width: 750px;
    align-items: flex-start;
  }
</style>

<script>
import { WxcMinibar, WxcIcon } from 'weex-ui'
const modal = weex.requireModule('modal')
export default {
  components: { WxcMinibar, WxcIcon },
  data () {
    return {
      rightButton: '',
      leftButton: ''
    }
  },
  created () {
  },
  methods: {
    minibarLeftButtonClick () {
      console.log('asdasasdsa')
    },
    minibarRightButtonClick () {
      modal.toast({ message: 'click rightButton!', duration: 1 })
    }
  }
}
</script>
