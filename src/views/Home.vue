<template>
  <div>
    <router-view />
    <van-tabbar route v-model="active" @change="clearvx">
      <van-tabbar-item replace to="/" icon="wap-home-o">商城</van-tabbar-item>
      <van-tabbar-item replace to="/classfy" icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item replace to="/carts" icon="shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:'home',
    };
  },
  components: {},
  methods: {
    clearvx() {
      this.$store.state.classId = ''
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.van-tabbar{
  height: 7vh;
}
</style>