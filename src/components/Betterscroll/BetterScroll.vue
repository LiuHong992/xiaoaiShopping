<template>
    <div ref="wrapper">
      <div class="scroll-content">
        <slot class="height"></slot>
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
</style>