<template>
  <div class="goodswheels">
    <!-- 轮播图 -->
    <van-swipe class="goodsswipe" @change="onChange" :autoplay="play">
      <van-swipe-item v-for="item in 3" :key="item.id">
        <img :src="imagebig[0]" alt @click="changeShow" />
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/3</div>
    </van-swipe>
    <van-image-preview v-model="show" :images="imagebig" @change="onChanges" @close="changeShows">
      <template v-slot:index>第{{ current+1 }}张</template>
    </van-image-preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      // images: [this.imagebig],
      current: 0,
      play: 5000
    };
  },
  props: {
    imagebig: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    // 点击轮播图内图片时停止轮播图，然后让预览图片的遮罩层显示出来
    changeShow() {
      if (this.play !== 0) {
        this.play = 0;
      }
      this.show = !this.show;
    },
    changeShows() {
      if (this.play === 0) {
        this.play = 5000;
      }
    },
    onChange(index) {
      this.current = index;
    },
    onChanges(index) {
      this.index = index;
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.goodswheels {
  // position: relative;
  .goodsswipe {
    position: relative;
    height: 414px !important;
    img {
      width: 100%;
      height: 100%;
    }
    .custom-indicator {
      position: absolute;
      right: 10px;
      bottom: 10px;
      font-size: 14px;
      color: rgb(99, 96, 96);
    }
  }
}
</style>