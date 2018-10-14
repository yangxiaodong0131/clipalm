<template>
  <div class="wrapper">
    <wxc-ep-slider :slider-id="sliderId"
                   :card-length='cardLength'
                   :card-s="cardSize"
                   :select-index="2"
                   ref="wxc-ep-slider"
                   @wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected">

      <!--自动生成demo-->
      <div v-for="(v,index) in [1,2,3,4,5]"
           :key="index"
           @click="onClick(index)"
           :slot="`card${index}_${sliderId}`"
           :class="['slider',`slider${index}`]">
        <text>这里是第{{index + 1}}个滑块</text>
      </div>
    </wxc-ep-slider>
  </div>
</template>

<style scoped>

  .wrapper {
    padding-top: 100px;
  }

  .slider {
    width: 400px;
    height: 300px;
    background-color: #C3413D;
    align-items: center;
    justify-content: center;
  }

  .slider1 {
    background-color: #635147;
  }

  .slider2 {
    background-color: #FFC302;
  }

  .slider3 {
    background-color: #FF9090;
  }

  .slider4 {
    background-color: #546E7A;
  }
</style>

<script>
import { WxcEpSlider } from 'weex-ui'

export default {
  components: { WxcEpSlider },
  data: () => ({
    sliderId: 1,
    cardLength: 5,
    currentIndex: 0,
    cardSize: {
      width: 400,
      height: 300,
      spacing: 0,
      scale: 0.8
    }
  }),
  // computed: {
  //   playing () {
  //     return this.play
  //   }
  // },
  methods: {
    wxcEpSliderCurrentIndexSelected (e) {
      const index = e.currentIndex
      console.log(index)
    },
    onClick (index) {
      if (this.currentIndex === index) {
        this.$store.commit('SET_menu', '单张报表')
      } else {
        this.currentIndex = index
        this.$refs['wxc-ep-slider'].manualSetPage(index)
      }
    }
  }
}
</script>
