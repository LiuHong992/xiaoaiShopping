<template>
  <div>
    <van-tabbar v-model="active" :fixed="false">
      <van-tabbar-item icon="pending-payment" @click="goTo('')">待付款</van-tabbar-item>
      <van-tabbar-item icon="clock-o" @click="goTo('')">待发货</van-tabbar-item>
      <van-tabbar-item icon="logistics" @click="goTo('')">待收货</van-tabbar-item>
      <van-tabbar-item icon="records" info="6" @click="goTo('/evaluationcenter')">评价</van-tabbar-item>
      <van-tabbar-item icon="passed" @click="goTo('/myorder')">已完成</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: "",
      active: ""
    };
  },
  components: {},
  methods: {
    goTo(path) {
      if (sessionStorage.getItem("user")) {
        this.users = JSON.parse(sessionStorage.getItem("user"));
      }
      if (this.users) {
        if (path !== "") {
          this.$router.push(path);
        } else {
          this.$toast("该功能还在开发中哦");
        }
      } else {
        this.$toast("请先登录哦!");
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>