<template>
  <div>
    <mytop class="backto">
      <div slot="left">
        <van-icon name="arrow-left" @click="$goto()" />
      </div>
      <div slot="center">评价详情</div>
    </mytop>
    <!-- 评价详情 -->
    <div class="donetop">
      <div class="dtops">
        <!-- 用户头像 -->
        <div class="headimg">
          <img src="../../assets/images/tx.jpg" alt />
        </div>
        <!-- 用户名+评分 -->
        <div class="namerate">
          <div class="name">{{user.nickname}}</div>
          <van-rate v-model="good.rate" readonly color="red" />
        </div>
        <!-- 评价发布时间 -->
        <div class="dates">{{good.comment_time}}</div>
      </div>
    </div>
    <!-- 评价内容 -->
    <div class="contents">
      <van-field
        class="vfield"
        v-model="good.content"
        rows="2"
        autosize
        label="评价内容："
        type="textarea"
        :readonly="true"
      />
    </div>
    <!-- 商品详情 -->
    <div class="goodsdetail">
      <!-- 商品图片 -->
      <div class="goodsimg">
        <img :src="goodsdetails.image" alt />
      </div>
      <!-- 商品名称 -->
      <div class="goodsname">{{goodsdetails.name}}</div>
      <!-- 加入购物车 -->
      <div class="addshop" @click="addTocarts(goodsdetails)">
        <van-icon name="shopping-cart-o" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  接收从已评价传过来的评价对象
      good: {},
      // 接收商品详情的对象
      goodsdetails: {},
      user: ""
    };
  },
  components: {},
  methods: {
    // 加入购物车
    addTocarts(item) {
      this.$api
        .addShop({id:item.id})
        .then(res => {
          if (res.code === 200) {
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // 获取从已评价页面传过来的值
    this.good = JSON.parse(this.$route.query.goods);
    this.good.goods.map(item => {
      this.goodsdetails = item;
    });
    // 获取用户名
    if (sessionStorage.getItem("user")) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }
    // console.log(this.good);
    // console.log(this.goodsdetails);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 评价详情
.donetop {
  width: 95%;
  // height: 130px;
  margin: 0 auto;
  border-bottom: 1px solid darkgrey;
  .dtops {
    display: flex;
    width: 100%;
    height: 70px;
    // 头像
    .headimg {
      width: 55px;
      height: 55px;
      margin: auto 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid darkgrey;
      }
    }
    // 用户名+评分
    .namerate {
      width: 150px;
      padding-top: 15px;
      margin-left: 30px;
      .name {
        margin-bottom: 10px;
      }
    }
    // 评价发布时间
    .dates {
      line-height: 70px;
      font-size: 12px;
    }
  }
}
.contents {
  width: 95%;
  margin: 15px auto;
  .vfield {
    background-color: #ececec !important;
  }
}
.goodsdetail {
  display: flex;
  width: 95%;
  height: 80px;
  margin: 0 auto;
  // 商品图片
  .goodsimg {
    width: 50px;
    height: 50px;
    margin: auto 0;
    img {
      width: 100%;
      height: 100%;
      border: 1px solid darkgrey;
    }
  }
  // 商品名称
  .goodsname {
    width: 230px;
    padding-top: 17px;
    margin-left: 10px;
    font-size: 13px;
  }
  // 加入购物车
  .addshop {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #ffe6e2;
    margin-left: 20px;
    margin-top: 20px;
    i {
      color: red;
      font-size: 24px !important;
      margin-left: 11px;
      margin-top: 11px;
    }
  }
}
</style>