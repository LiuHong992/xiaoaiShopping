<template>
  <div>
    <!-- 弹出层头部 -->
    <mytop class="backto">
      <div slot="left">
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
      <van-field v-model="userInfo.username" placeholder="请输入用户名" disabled />
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
      <van-field v-model="userInfo.email" placeholder="请输入邮箱" />
    </div>
    <!-- 出生年月 -->
    <div class="born username headimg">
      <div class="headleft borns">
        <span>出生年月</span>
      </div>
      <div
        class="bornss"
        @click="changeFlags"
      >{{userInfo.year}}年{{userInfo.month}}月{{userInfo.day}}日</div>
    </div>
    <div class="datepicker">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        v-if="flags"
        @cancel="cancels"
        @confirm="confirms(currentDate)"
      />
    </div>
    <!-- 保存按钮 -->
    <div class="save buttons" @click="saveUsers">保存</div>
    <!-- 取消按钮 -->
    <div class="buttons cancel" @click="changes">取消</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 接收用户信息的对象
      userInfo: {},
      flag: false,
      flags: false,
      // 出生年月
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2050, 10, 1),
      currentDate: ""
    };
  },
  props: {},
  components: {},
  methods: {
    // 修改信息弹出层消失
    changes() {
      this.$emit("changes", this.flag);
    },
    // 修改保存用户信息(gender,email,year,month,day,id,nickname,avatar)
    saveUsers() {
      let obj = {
        gender: this.userInfo.gender,
        year: this.userInfo.year,
        month: this.userInfo.month,
        day: this.userInfo.day,
        id: this.userInfo._id,
        nickname: this.userInfo.nickname.trim(),
        email: "992049747@qq.com"
      };
      if (this.userInfo.nickname.trim() !== "") {
        this.$api
          .saveUser(obj)
          .then(res => {
            if (res.code === 200) {
              sessionStorage.setItem("user", JSON.stringify(obj));
              this.$store.state.user = obj.nickname;
              this.$toast(res.msg);
              this.changes();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$toast("昵称不能为空~");
      }
    },
    // 获取用户信息
    getUser() {
      this.$api
        .user()
        .then(res => {
          if (res.code === 200) {
            this.userInfo = res.userInfo;
            this.currentDate = new Date(
              this.userInfo.year,
              this.userInfo.month - 1,
              this.userInfo.day
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeFlags() {
      this.flags = true;
    },
    // 时间选择器确认按钮
    confirms(val) {
      this.userInfo.year = this.$dayjs(val).format("YYYY");
      this.userInfo.month = this.$dayjs(val).format("MM");
      this.userInfo.day = this.$dayjs(val).format("DD");
      this.flags = false;
    },
    // 时间选择器取消按钮
    cancels() {}
  },
  mounted() {
    this.getUser();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
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
  font-size: 14px;
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
  justify-content: flex-start;
  line-height: 44px;
  .borns {
    width: 70px;
  }
  .bornss {
    width: 120px;
  }
}
// 时间选择器
.datepicker {
  width: 100%;
  position: absolute;
  bottom: 8vh;
  z-index: 99;
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