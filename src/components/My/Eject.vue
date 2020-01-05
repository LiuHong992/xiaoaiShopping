<template>
  <div>
    <!-- 弹出层头部 -->
    <mytop>
      <div class="backto" slot="left">
        <van-icon name="arrow-left" @click="changes" />
      </div>
      <div class="centercont" slot="center">个人资料</div>
    </mytop>
    <!-- 头像 -->
    <div class="headimg">
      <div class="headleft">
        <span>头像</span>
      </div>
      <div class="headright">
        <div class="headicon">
          <img src="../../assets/images/tx.jpg" alt />
        </div>
        <div class="headrighticon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <!-- 用户名 -->
    <div class="username headimg">
      <div class="headleft">
        <span>用户名</span>
      </div>
      <van-field v-model="userInfo.username" placeholder="请输入用户名" />
    </div>
    <!-- 昵称 -->
    <div class="nickname username headimg">
      <div class="headleft">
        <span>昵称</span>
      </div>
      <van-field v-model="userInfo.nickname" placeholder="请输入昵称" />
    </div>
    <!-- 性别 -->
    <div class="username headimg sex">
      <div class="headleft">
        <span>性别</span>
      </div>
      <van-radio-group v-model="userInfo.gender">
        <van-radio name="男">男</van-radio>
        <van-radio name="女" class="vradio">女</van-radio>
      </van-radio-group>
    </div>
    <!-- 邮箱 -->
    <div class="email username headimg">
      <div class="headleft">
        <span>邮箱</span>
      </div>
      <van-field v-model="emails" placeholder="请输入邮箱" />
    </div>
    <!-- 出生年月 -->
    <div class="born username headimg">
      <div class="headleft borns">
        <span>出生年月</span>
      </div>
      <van-field v-model="borns" placeholder="请输入生日" />
    </div>
    <!-- 保存按钮 -->
    <div class="save buttons" @click="saveUsers">保存</div>
    <!-- 取消按钮 -->
    <div class="buttons cancel">取消</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      emails: "",
      // 出生年月
      borns: ""
    };
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {
    // 修改信息弹出层消失
    changes() {
      this.$emit("changes", this.flag);
    },
    // 用户信息修改
    saveUsers() {
      // this.$parent.userInfo = this.userInfo
      this.$api
        .saveUser(this.$parent.userInfo)
        .then(res => {
          if (res.code === 200) {
            sessionStorage.setItem(
              "user",
              JSON.stringify(this.$parent.userInfo)
            );
            this.$toast(res.msg);
            this.changes();
            console.log(this.$parent.userInfo);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.borns = `${this.userInfo.year}年${this.userInfo.month}月${this.userInfo.day}日`;
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.backto {
  i {
    display: block;
    font-size: 20px;
    line-height: 40px;
  }
}
// 头像
.headimg {
  display: flex;
  justify-content: space-between;
  height: 80px;
  padding: 0 10px;
  border-bottom: 1px solid darkgray;
  .headleft {
    line-height: 80px;
    font-size: 14px;
  }
  .headright {
    display: flex;
    width: 80px;
    height: 60px;
    margin: auto 0;
    .headicon {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .headrighticon {
      line-height: 70px;
      i {
        font-size: 20px;
      }
    }
  }
}
// 用户名
.username {
  height: 40px;
  .headleft {
    width: 60px;
    line-height: 44px;
  }
}
// 昵称
.nickname {
}
// 性别
.sex {
  display: flex;
  justify-content: flex-start;
  .van-radio-group {
    display: flex;
    margin-left: 6px;
    .vradio {
      margin-left: 10px;
    }
  }
}
// 邮箱
.email {
}
// 出生日期
.born {
  .borns {
    width: 70px;
  }
}
// 按钮公共样式
.buttons {
  width: 50%;
  height: 30px;
  margin: 10px auto;
  padding: 10px 80px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-weight: 700;
}
// 保存按钮
.save {
  background-color: green;
  color: white;
}
// 取消按钮
.cancel {
  background-color: white;
  color: rgb(80, 77, 77);
  border: 1px solid darkgrey;
}
</style>