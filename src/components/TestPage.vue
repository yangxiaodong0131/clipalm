<template>
  <div class="demo-container">
    <div class="btn" @click="openLightBox">
      <text class="btn-txt">点击按钮弹出全屏图片</text>
    </div>
    <wxc-lightbox
      ref="wxc-lightbox"
      height="800"
      :show="show"
      :image-list="imageList"
      @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
    </wxc-lightbox>
  </div>
</template>

<script>
  import { WxcLightbox } from 'weex-ui';
  export default {
    components: {
      WxcLightbox
    },
    data: function () {
      return {
        imageList: [
          { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg' },
          { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg' },
          { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg' }
        ],
        show: false
      };
    },
    methods: {
      openLightBox () {
        this.show = true;
      },
      wxcLightboxOverlayClicked () {
      // 无状态组件，需要在此次关闭
        this.show = false;
      }
    }
  };
</script>