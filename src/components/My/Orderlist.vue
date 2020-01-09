<template>
  <div>
    <van-tabbar v-model="active" :fixed="false">
      <van-tabbar-item icon="pending-payment" @click="goTo('')">待付款</van-tabbar-item>
      <van-tabbar-item icon="clock-o" @click="goTo('')">待发货</van-tabbar-item>
      <van-tabbar-item icon="logistics" @click="goTo('')">待收货</van-tabbar-item>
      <van-tabbar-item icon="records" :info="evalutioncount" @click="goTo('/evaluationcenter')">评价</van-tabbar-item>
      <van-tabbar-item icon="passed" @click="goTo('/myorder')">已完成</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: "",
      active: "",
      // 接收待评价条数
      evalutioncount: 0
    };
  },
  components: {},
  methods: {
    // 跳转路由
    goTo(path) {
      if (localStorage.getItem("user")) {
        this.users = JSON.parse(localStorage.getItem("user"));
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
    },
    // 获取待评价数据
    getOrdercount() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          if (res.code === 200) {
            if (res.data.count > 0) {
              this.evalutioncount = res.data.count;
            } else {
              this.evalutioncount = "";
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.getOrdercount();
    } else {
      this.evalutioncount = "";
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>