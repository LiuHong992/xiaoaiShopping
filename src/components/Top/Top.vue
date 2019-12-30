<template>
  <div class="top">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="center"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
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
.top {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;
  height: 7.8vh;
  line-height: 40px;
  // background-color: #ececec;
  // margin-bottom: 8px;
}
</style>