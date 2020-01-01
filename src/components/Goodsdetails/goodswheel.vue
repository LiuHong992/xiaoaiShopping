<template>
  <div class="goodswheels">
    <!-- 返回按钮 -->
    <div class="leftarrow" @click="backTomy">
      <van-icon color="white" class="lefticon" name="arrow-left" />
    </div>
    <!-- 轮播图 -->
    <van-swipe class="goodsswipe" @change="onChange" :autoplay="5000">
      <van-swipe-item v-for="item in 3" :key="item.id">
        <img :src="imagebig" alt />
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/3</div>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  props: {
    imagebig: {
      type: String,
      default: ""
    },
    imagesmall: {
      type: String,
      default: ""
    }
  },
  components: {},
  methods: {
    onChange(index) {
      this.current = index;
    },
    // 跳转回我的
    backTomy() {
      this.$router.go(-1);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.goodswheels {
  position: relative;
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
  .leftarrow {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.35);
    .lefticon {
      font-size: 20px;
      margin-top: 10px;
      margin-left: 8px;
    }
  }
}
</style>