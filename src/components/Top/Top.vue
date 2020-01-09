<template>
  <div class="top">
    <div>
      <slot class="leftarrow" name="left"></slot>
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
  z-index: 100;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgb(233, 232, 232);
  font-size: 14px;
  i {
    display: block;
    margin-top: 10px;
  }
}
</style>