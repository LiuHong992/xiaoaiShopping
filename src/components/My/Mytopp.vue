<template>
  <div class="infotop">
    <div class="settings" v-if="users">
      <van-icon size="24px" color="white" name="setting" @click="changeShow" />
    </div>
    <div class="settings" v-else></div>
    <div class="portrait">
      <img src="../../assets/images/tx.jpg" alt />
    </div>
    <div class="welogin" v-if="users">
      <p class="welcome">欢迎您：{{users.nickname}}</p>
      <p class="loginout" @click="editOut">退出登录</p>
    </div>
    <div class="welogin" v-else>
      <p class="loginout logins" @click="goTologin">登录/注册</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: ""
    };
  },
  components: {},
  methods: {
    // 退出登录
    editOut() {
      this.$api
        .loginOut()
        .then(res => {
          if (res.code === 0) {
            this.$toast("退出成功");
            this.users = "";
            sessionStorage.setItem("user", this.users);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 登录/注册
    goTologin() {
      this.$router.push("/login");
    },
    changeShow() {
      this.$parent.show = true;
    }
  },
  mounted() {
    if (sessionStorage.getItem("user")) {
      this.users = JSON.parse(sessionStorage.getItem("user"));
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.infotop {
  position: relative;
  width: 100%;
  height: 215px;
  background-color: #e30c7b;
  .settings {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 24px;
    height: 24px;
  }
  // 头像
  .portrait {
    position: absolute;
    top: 32px;
    left: 155px;
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .welogin {
    position: absolute;
    top: 120px;
    left: 145px;
    text-align: center;
    color: white;
    .welcome {
      font-size: 19px;
      font-weight: 700;
    }
    .loginout {
      font-size: 14px;
      margin-top: 13px;
    }
    .logins {
      margin-left: 15px;
    }
  }
}
</style>