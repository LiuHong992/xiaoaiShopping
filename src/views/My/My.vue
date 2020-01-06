<template>
  <div>
    <!-- 修改个人信息弹出层 -->
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%' ,width:'100%' }"
      :overlay="false"
    >
      <eject @changes="changes"></eject>
    </van-popup>
    <!-- 头部组件 -->
    <mytop>
      <div slot="center">会员中心</div>
    </mytop>
    <!-- 个人信息组件 -->
    <myinfo></myinfo>
    <!-- 我的订单 -->
    <orderlist></orderlist>
    <!-- 全部订单 -->
    <div class="allorder orders" @click="goTorouter('/myorder')">
      <div class="allleft">
        <van-icon name="records" />
        <span>全部订单</span>
      </div>
      <div class="allright">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 收藏商品 -->
    <div class="collectgoods orders" @click="goTorouter('/collection')">
      <div class="allleft">
        <van-icon name="points" />
        <span>收藏商品</span>
      </div>
      <div class="allright">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 地址管理 -->
    <div class="addressmag orders" @click="goTorouter('/addresslist')">
      <div class="allleft">
        <van-icon name="location-o" />
        <span>地址管理</span>
      </div>
      <div class="allright">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 最近浏览 -->
    <div class="history orders" @click="goTohistory">
      <div class="allleft">
        <van-icon name="clock-o" />
        <span>最近浏览</span>
      </div>
      <div class="allright">
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import myinfo from "../../components/My/Mytopp";
import orderlist from "../../components/My/Orderlist";
import eject from "../../components/My/Eject";
export default {
  data() {
    return {
      users: "",
      show: false,
    };
  },
  components: {
    myinfo,
    orderlist,
    eject
  },
  methods: {
    // 导航栏跳转
    goTorouter(path) {
      if (sessionStorage.getItem("user")) {
        this.users = JSON.parse(sessionStorage.getItem("user"));
      }
      if (this.users) {
        this.$router.push(path);
      } else {
        this.$toast("请先登录哦!");
      }
    },
    // 历史记录
    goTohistory() {
      this.$router.push("/history");
    },
    changes(data) {
      this.show = data;
    },
    
  },
  mounted() {
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 以下类名为公共样式
.orders {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 20px;
  border-top: 1px solid rgb(233, 232, 232);
}
i {
  display: block;
  font-size: 20px;
}
.allleft {
  display: flex;
}
// 全部订单
.allorder {
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(233, 232, 232);
}
.history {
  border-bottom: 1px solid rgb(233, 232, 232);
}
</style>