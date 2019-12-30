<template>
  <div>
    <div class="logins">
      <mytop>
        <div class="leftarrow" slot="left" @click="backTomy">
          <van-icon color="white" size="20px" class="lefticon" name="arrow-left" />
        </div>
      </mytop>
      <div class="logincontent">
        <h3 class="loginh">登录 / 注册</h3>
        <van-cell-group class="logingroup">
          <van-field
            v-model="username"
            clearable
            label="用户名"
            left-icon="contact"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('输入完整信息再进行登录(注册)哦')"
          />
          <van-field
            v-model="passwords"
            @click-left-icon="iconchange"
            :left-icon="lefticon"
            :type="types"
            label="密码"
            placeholder="请输入密码"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            clearable
            v-model="phone"
            type="number"
            label="手机号码"
            left-icon="phone-o"
            placeholder="仅注册时使用"
            maxlength="11"
          />
          <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
            <van-button @click="verification" slot="button" size="small" type="primary">{{msg}}</van-button>
          </van-field>
          <!-- 验证码 -->
          <div class="yzm">
            <span>验证码</span>
            <van-field v-model="yzm" placeholder="请输入验证码" />
            <img @click="changeCaptcha" src="/api/verify" ref="captcha" alt width="100" height="44" />
          </div>
          <div class="loginr">
            <van-button @click="goTohome" type="primary">登录</van-button>
            <van-button @click="registers" type="danger">注册</van-button>
          </div>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      passwords: "",
      lefticon: "closed-eye",
      types: "password",
      phone: "",
      sms: "",
      msg: "发送验证码",
      yzm: ""
    };
  },
  components: {},
  methods: {
    // 跳转回我的
    backTomy() {
      this.$router.go(-1);
    },
    // 密码icon改变
    iconchange() {
      if (this.lefticon === "closed-eye") {
        this.lefticon = "eye-o";
        this.types = "text";
      } else {
        (this.lefticon = "closed-eye"), (this.types = "password");
      }
    },
    // 发送手机验证码
    verification() {
      if (
        !this.phone ||
        this.phone.length != 11 ||
        !/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)
      ) {
        this.$toast("请输入手机号码");
      } else {
        let time = 4;
        let timer = setInterval(() => {
          if (time <= 0) {
            this.msg = "发送验证码";
            clearInterval(timer);
          } else {
            this.msg = `${time}秒后重试`;
            time--;
          }
        }, 1000);
      }
    },
    //动态获取随机验证码
    changeCaptcha() {
      this.$refs.captcha.src = "/api/verify?time=" + Date.now();
    },
    // 登录
    goTohome() {
      this.$api
        .login({
          nickname: this.username,
          password: this.passwords,
          verify: this.yzm
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast(res.msg);
            this.$router.go(-1);
            sessionStorage.setItem("user", JSON.stringify(res.userInfo));
            this.changeCaptcha();
          } else if (res.code === -1) {
            this.$toast(res.msg);
            this.username = this.passwords = this.phone = this.yzm = "";
            this.changeCaptcha();
          } else if (res.code === -2) {
            this.$toast(res.msg);
            this.yzm = "";
            this.changeCaptcha();
          }
        });
    },
    // 注册并登录
    registers() {
      this.$api
        .register({
          nickname: this.username,
          password: this.passwords,
          verify: this.yzm
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast(res.msg);
            this.$router.go(-1);
            this.changeCaptcha();
          } else if (res.code === -1) {
            this.$toast(res.msg);
            this.username = this.passwords = this.phone = this.yzm = "";
            this.changeCaptcha();
          } else if (res.code === -2) {
            this.$toast(res.msg);
            this.yzm = "";
            this.changeCaptcha();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.changeCaptcha();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.logins {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/login.jpg") no-repeat;
  background-size: cover;
  .leftarrow {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.35);
    .lefticon {
      font-size: 20px;
      margin-top: 10px;
      margin-left: 8px;
    }
  }
  .logincontent {
    width: 90vw;
    height: 75vh;
    margin: 100px auto 0;
    background-color: white;
    box-shadow: 1px 1px 10px rgb(197, 196, 196);
    .loginh {
      margin: 0;
      padding: 10px;
      font-size: 24px;
      font-weight: normal;
    }
    .logingroup {
      margin-top: 40px;
    }
    // 验证码
    .yzm {
      display: flex;
      line-height: 40px;
      font-size: 14px;
      color: #323233;
      span {
        margin-left: 15px;
      }
    }
    .loginr {
      display: flex;
      justify-content: space-between;
      width: 150px;
      margin: 20px auto 0;
    }
  }
}
</style>