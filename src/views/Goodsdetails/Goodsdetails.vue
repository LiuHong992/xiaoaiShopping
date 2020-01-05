<template>
  <div>
    <!-- 返回按钮 -->
    <div class="leftarrow" @click="$goto()">
      <van-icon color="white" class="lefticon" name="arrow-left" />
    </div>
    <div class="goods" v-if="details">
      <div class="goodscont">
        <!-- 商品详情轮播图 -->
        <goodswheel :imagebig="images"></goodswheel>
        <!-- 商品名称与商品价格 -->
        <div class="nameprice">
          <p class="pname">{{details.name}}</p>
          <p class="pprice">￥{{details.present_price}}</p>
        </div>
        <!-- 运费库存收藏按钮 -->
        <div class="collection">
          <div class="freight">
            <span>运费：{{details.__v}}</span>
          </div>
          <div class="surplus">
            <span>库存：{{details.amount}}</span>
          </div>
          <!-- 收藏按钮 -->
          <div class="collections" v-if="flag">
            <span>
              取消收藏
              <van-icon @click="inspect" color="red" name="like" />
            </span>
          </div>
          <div class="collections" v-else>
            <span>
              收藏
              <van-icon @click="inspect" name="like-o" />
            </span>
          </div>
        </div>
        <!-- 店铺信息 -->
        <div class="shopinfo">
          <div class="shopleft">
            <van-icon class="vshop" size="18px" name="shop-o" />
            <span class="spshop">有赞的店</span>
            <van-tag class="vtag" type="danger">官方</van-tag>
          </div>
          <div class="shopright">
            <span>进入店铺</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <!-- 商品详情/商品评论 -->
        <van-tabs class="vgoodstabs">
          <!-- 商品详情 -->
          <van-tab title="商品详情">
            <div class="details" v-html="details.detail" v-if="this.details"></div>
            <div class="details" v-else>数据加载中...</div>
          </van-tab>
          <van-tab title="商品评论">
            <div class="comment ta" v-if="this.goods.comment = []">暂无评论</div>
            <div class="comment" v-else></div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 底部商品导航 -->
    <van-goods-action class="vgoodsaction">
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="goTocarts"
        :info="this.$store.state.cartsum"
      />
      <van-goods-action-button type="warning" text="加入购物车" @click="addTocarts" />
      <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
    </van-goods-action>
  </div>
</template>

<script>
import goodswheel from "../../components/Goodsdetails/goodswheel";
export default {
  data() {
    return {
      // 整个商品详情的数据
      goods: {},
      //  接收详情页(收藏)的对象,
      details: {},
      // 收藏按钮状态
      flag: false,
      // 接收轮播图图片数据的数组
      images: [],
    };
  },
  components: {
    goodswheel
  },
  methods: {
    // 请求详情页数据方法
    getDetails() {
      this.$api
        .goodOne(this.$route.query.id, 1)
        .then(res => {
          if (res.code === 200) {
            this.goods = res.goods;
            this.details = this.goods.goodsOne;
            this.images.push(this.details.image);
            this.judge();
          } else {
            this.$toast("请求数据失败");
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 收藏
    collect() {
      this.$api
        .collection(this.details)
        .then(res => {
          if (res.code === 200) {
            this.flag = true;
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消收藏
    cancel() {
      this.$api
        .cancelCollection({ id: this.details.id })
        .then(res => {
          this.flag = false;
          this.$toast(res.msg);
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 检查是否已收藏
    inspect() {
      this.$api
        .isCollection({ id: this.details.id })
        .then(res => {
          if (res.code === 200) {
            if (res.isCollection === 0) {
              this.collect();
            } else if (res.isCollection === 1) {
              this.cancel();
            }
          } else if (res.code === -1) {
            this.$toast(res.msg);
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 一进详情页就判断是否收藏
    judge() {
      if (this.details) {
        this.$api.isCollection({ id: this.details.id }).then(res => {
          if (res.code === 200) {
            if (res.isCollection === 1) {
              this.flag = true;
            } else {
              this.flag = false;
            }
          }
        });
      }
    },
    // 每次进详情页就对购物车数据进行请求，通过购物车数据数组长度来对购物车按钮
    // 徽标数字进行动态变化
    // getCarts() {
    //   this.$api
    //     .getCard()
    //     .then(res => {
    //       this.lengths = res.shopList.length;
    //       if (this.lengths === 0) {
    //         this.lengths = "";
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // 跳转到购物车页面
    goTocarts() {
      this.$router.push("/carts");
    },
    // 加入购物车
    addTocarts() {
      if (sessionStorage.getItem("user")) {
        this.$api
          .addShop({ id: this.details.id })
          .then(res => {
            this.$toast(res.msg);
            this.$store.state.cartsum++
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$toast("请先登录哦~");
      }
    },
    onClickButton() {
      this.$toast("点击按钮");
    },
    onClickIcon() {
      this.$toast("该功能还在开发中哦~");
    }
  },
  mounted() {
    this.getDetails();
    // this.getCarts();
  },
  watch: {},
  computed: {},
  // 跳转详情页路由前将详情页的信息存入Vuex中和sessionStorage中
  beforeRouteLeave(to, from, next) {
    if (!this.$store.state.historys.some(item => item.id === this.details.id)) {
      this.$store.state.historys.push(this.details);
      sessionStorage.setItem("historyy", JSON.stringify(this.details));
    }
    next();
  }
};
</script>

<style scoped lang='scss'>
// 返回按钮
.leftarrow {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
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
.goods {
  height: 92vh;
  // overflow: hidden;
  // 商品名称和价格
  .nameprice {
    height: 50px;
    padding: 10px;
    border-top: 1px solid rgb(243, 241, 241);
    .pname {
      font-size: 15px;
    }
    .pprice {
      font-size: 14px;
      color: rgb(255, 68, 110);
      margin-top: 15px;
    }
  }
  // 收藏
  .collection {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    margin-bottom: 15px;
    border-top: 1px solid rgb(243, 241, 241);
    border-bottom: 1px solid rgb(243, 241, 241);
    color: rgb(139, 138, 138);
    font-size: 14px;
    .collections {
      width: 82px;
      text-align: center;
    }
  }
  // 店铺信息
  .shopinfo {
    display: flex;
    justify-content: space-between;
    padding: 7px 10px;
    margin-bottom: 15px;
    border-top: 1px solid rgb(243, 241, 241);
    border-bottom: 1px solid rgb(243, 241, 241);
    .shopleft {
      display: flex;
      // line-height: 20px;
      .vshop {
        display: block;
        margin-right: 5px;
      }
      .spshop {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 5px;
      }
      .vtag {
        border-radius: 4px;
        margin-top: -1px;
      }
    }
    .shopright {
      display: flex;
      font-size: 14px;
      margin-top: 1px;
      i {
        display: block;
      }
    }
  }
  .vgoodstabs {
    margin-bottom: 57px;
    .ta {
      text-align: center;
    }
  }
}
.vgoodsaction {
  z-index: 99;
  height: 7.7vh;
}
</style>