<template>
  <div>
    <keep-alive include="home,my">
      <router-view />
    </keep-alive>
    <van-tabbar route v-model="active" @change="clearvx">
      <van-tabbar-item replace to="/" icon="wap-home-o">商城</van-tabbar-item>
      <van-tabbar-item replace to="/classfy" icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item
        replace
        to="/carts"
        icon="shopping-cart"
        :info="this.$store.state.cartsum"
      >购物车</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home",
      sum: 0
    };
  },
  components: {},
  methods: {
    // 跳转路由时将Vuex中的参数清零从而使分类页重置到第一栏第一项
    clearvx() {
      this.$store.state.classId = "";
    },
    // 每次进详情页就对购物车数据进行请求，通过购物车数据数组长度来对购物车按钮
    // 徽标数字进行动态变化
    getCarts() {
      this.$api
        .getCard()
        .then(res => {
          res.shopList.map(item => {
            this.sum += Number(item.count);
            this.$store.state.cartsum = Number(this.sum);
          });
          if (this.$store.state.cartsum === 0) {
            this.$store.state.cartsum = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (!localStorage.getItem("user")) {
      this.$store.state.cartsum = "";
    } else {
      this.getCarts();
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.van-tabbar {
  height: 7vh;
}
</style>