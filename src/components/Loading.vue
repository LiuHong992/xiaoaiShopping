<template>
  <div>
    <van-overlay class="loading" :show="this.$store.state.loading">
      <div class="wrapperss">
        <div class="block">
          <van-loading class="vloding" color="#1989fa" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.loading {
  z-index: 9999 !important;
  width: 100%;
  height: 100%;
  .wrapperss {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    position: relative;
    width: 120px;
    height: 120px;
    background-color: rgba($color: #000000, $alpha: 0.01);
    .vloding {
      position: absolute;
      top: 50px;
      left: 50px;
    }
  }
}
</style>