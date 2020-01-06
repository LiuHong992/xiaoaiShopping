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
  // // 返回按钮
  // .leftarrow {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   z-index: 100;
  //   width: 40px;
  //   height: 40px;
  //   border-radius: 50%;
  //   background-color: rgba(0, 0, 0, 0.35);
  //   .lefticon {
  //     font-size: 20px;
  //     margin-top: 10px;
  //     margin-left: 8px;
  //   }
  // }
}
</style>