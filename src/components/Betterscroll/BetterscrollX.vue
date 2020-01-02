<template>
  <div class="core-containers">
    <div class="wrappers" ref="wrappers">
        <slot class="width"></slot>
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
      this.bs = new BScroll(".wrappers", {
        scrollX: true,
        // click: false,
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
.core-containers {
  .wrappers {
    height: 166px;
    overflow: hidden;
  }
}
</style>