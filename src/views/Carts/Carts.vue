<template>
  <div>
    <mytop class="cartstitle">
      <div slot="center">购物车</div>
    </mytop>
    <div class="cartscontent" v-if="user">
    </div>
    <!-- 未登录状态购物车显示内容 -->
    <div class="cartscontents" v-else>
      <div class="cartsicon">
        <img src="../../assets/images/shop.png" alt />
      </div>
      <p>请先登录哦~~~</p>
      <div class="gologin" @click="goTologin">
        去登录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  components: {},
  methods: {
    // 未登录时跳转去登录
    goTologin() {
      this.$router.push('/login')
    }
  },
  mounted() {
    this.user = sessionStorage.getItem('user');
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.cartstitle {
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid rgb(233, 232, 232);
}
.cartscontents {
  .cartsicon {
    width: 140px;
    height: 140px;
    padding: 10px;
    border-radius: 50%;
    background-color: rgb(189, 185, 185);
    margin: 30px auto 10px;
    img {
      display: block;
      margin: 10px auto;
    }
  }
  p {
    font-size: 16px;
    color: rgb(136, 134, 134);
    text-align: center;
    margin-top: 20px;
  }
  .gologin{
    width: 100px;
    height: 20px;
    padding: 5px;
    border: 1px solid darkgray;
    border-radius: 15px;
    margin: 30px auto 0;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color: rgb(136, 134, 134);
  }
}
</style>