<template>
  <div>
    <van-swipe class="vswipe" :autoplay="3000" :stop-propagation="false">
      <van-swipe-item v-for="(item, index) in wheels" :key="index">
        <img :src="item.image" alt @click="$goto(item.goodsId)" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    wheels: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.vswipe {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>