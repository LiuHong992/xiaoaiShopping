<template>
  <div class="core-container">
    <div class="wrapper" ref="wrapper">
      <div class="scroll-content">
        <slot class="height"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    init() {
      this.bs = new BScroll(".wrapper", {
        scrollY: true,
        click: true,
        probeType: 3 // listening scroll hook
      });
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss'>
.core-container {
  .wrapper {
    height: 85.2vh;
  }
}
</style>