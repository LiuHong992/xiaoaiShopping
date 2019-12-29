<template>
  <div>
    <!-- 头部导航 -->
    <mytop>
      <div slot="left">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">
        <van-icon name="arrow" />
      </div>
    </mytop>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    this.$axios.req('/v1/sendCodeMsg').then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>