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
      if (this.bs) {
        this.bs.refresh();
      } else {
        this.bs = new BScroll(".wrapper", {
          scrollY: true,
          click: true,
          probeType: 3 // listening scroll hook
          // pullDownRefresh:true++
        });
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 500);
  },
  updated() {
    setTimeout(() => {
      this.init();
    }, 20);
  },
  beforeDestroy() {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss'>
</style>