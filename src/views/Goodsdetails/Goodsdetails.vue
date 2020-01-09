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
            <div class="comment" v-if="goodevalution.length > 0">
              <!-- 评价模板 -->
              <div class="evamodel" v-for="item in goodevalution" :key="item.id">
                <!-- 评价用户信息 -->
                <div class="commentinfo">
                  <!-- 用户头像 -->
                  <div class="infoimage">
                    <img :src="item.comment_avatar" alt v-if="item.anonymous" />
                    <img src="../../assets/images/tx.jpg" alt v-else />
                  </div>
                  <!-- 用户名+评分 -->
                  <div class="namerate">
                    <!-- 用户名 -->
                    <div class="name" v-if="item.anonymous">{{item.comment_nickname}}</div>
                    <div class="name" v-else>{{item.user[0].nickname}}</div>
                    <!-- 评分 -->
                    <div class="rate">
                      <van-rate v-model="item.rate" readonly color="red" />
                    </div>
                  </div>
                  <!-- 评价时间 -->
                  <div class="date">发布时间：{{item.comment_time}}</div>
                </div>
                <!-- 评价内容 -->
                <div class="evacontent">
                  <span>评价内容：{{item.content}}</span>
                </div>
              </div>
            </div>
            <div class="comment ta" v-else>暂无评论</div>
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
    <!-- 点击购买弹出框 -->
    <div class="buypop">
      <van-popup
        v-model="show"
        round
        closeable
        close-icon="close"
        position="bottom"
        :style="{ height: '35%' }"
      >
        <!-- 商品名+商品图片+单价 -->
        <div class="vpopuptop">
          <div class="goodsimgs">
            <img :src="details.image" alt />
          </div>
          <div class="goodsdetails">
            <p>{{details.name}}</p>
            <p class="pprice">￥{{details.present_price}}</p>
          </div>
        </div>
        <!-- 商品购买提示 -->
        <div class="vpopupcenter">
          <div class="vpopleft">
            <p>购买数量：</p>
            <div class="pcount">
              <span class="spamount">剩余{{details.amount}}件</span>
              <span class="splimit">每人限购5件</span>
            </div>
          </div>
          <div class="vpopright">
            <van-stepper
              class="vstepper"
              v-model="value"
              integer
              min="1"
              max="5"
              @overlimit="toast"
            />
          </div>
        </div>
        <!-- 购买按钮 -->
        <div class="vpopupbottom" @click="onBuyClicked">立即购买</div>
      </van-popup>
    </div>
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
      show: false,
      // 步进器数据
      value: 1,
      // 接收查询出来的评价数组
      goodevalution: []
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
            this.goodevalution = this.goods.comment;
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
    // 跳转到购物车页面
    goTocarts() {
      this.$router.push("/carts");
    },
    // 加入购物车
    addTocarts() {
      if (localStorage.getItem("user")) {
        this.$api
          .addShop({ id: this.details.id })
          .then(res => {
            this.$toast(res.msg);
            this.$store.state.cartsum++;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$toast("请先登录哦~");
      }
    },
    // 立即购买
    onClickButton() {
      this.show = true;
    },
    // 立即购买按钮,点击后先清空存在Vuex中的paylist数组，再进行下一步操作
    onBuyClicked() {
      this.$store.state.paylist = [];
      this.details.count = this.value;
      this.details.mallPrice = this.details.present_price;
      this.details.cid = this.details.id;
      this.$store.state.paylist.push(this.details);
      this.$router.push("/payment");
    },
    // 当选择件数超过5件时吐司
    toast() {
      if (this.value === 5) {
        this.$toast("每人限购5件哦~");
      } else {
        this.$toast("最少选择1件哦~");
      }
    },
    onClickIcon() {
      this.$toast("该功能还在开发中哦~");
    }
  },
  mounted() {
    this.getDetails();
  },
  watch: {},
  computed: {},
  // 跳转详情页路由前将详情页的信息存入Vuex中和localStorage中
  // 历史浏览记录
  beforeRouteLeave(to, from, next) {
    if (JSON.parse(localStorage.getItem("user"))) {
      let Userhistories = JSON.parse(localStorage.getItem("Userhistory"));
      let userp = JSON.parse(localStorage.getItem("user"));
      Userhistories.map(item => {
        if (item.usesnames === userp.nickname) {
          if (!item.goods.some(item0 => item0.id === this.details.id)) {
            item.goods.push(this.details);
          }
        }
      });
      localStorage.setItem("Userhistory", JSON.stringify(Userhistories));
    } else {
      console.log("你没有登录~");
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
  // 商品详情/商品评论
  .vgoodstabs {
    margin-bottom: 57px;
    .ta {
      text-align: center;
    }
    .comment {
      width: 95%;
      margin: 0 auto;

      // 评价模板
      .evamodel {
        width: 100%;
        border-bottom: 1px solid darkgrey;
        // 用户信息
        .commentinfo {
          display: flex;
          width: 100%;
          height: 60px;
          // 用户头像
          .infoimage {
            width: 40px;
            height: 40px;
            margin: 11px 15px 11px 0;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          // 用户名+评分
          .namerate {
            width: 100px;
            padding-top: 11px;
            font-size: 14px;
            .rate {
              margin-top: 5px;
            }
          }
          // 评价时间
          .date {
            padding: 11px;
            font-size: 12px;
          }
        }
        // 评价内容
        .evacontent {
          margin-top: 8px;
          margin-bottom: 10px;
          font-size: 13px;
        }
      }
    }
  }
}
// 底部商品导航
.vgoodsaction {
  z-index: 99;
  height: 7.7vh;
}
// 购买弹出层
.buypop {
  // 商品名+商品图片+单价
  .vpopuptop {
    display: flex;
    height: 90px;
    padding: 15px 10px 0;
    border-bottom: 1px solid rgb(199, 198, 198);
    .goodsimgs {
      width: 80px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
        border: 1px solid darkgray;
      }
    }
    .goodsdetails {
      p {
        padding: 0 0 0 10px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .pprice {
        margin-top: 30px;
        color: crimson;
      }
    }
  }
  .vpopupcenter {
    display: flex;
    height: 80px;
    border-bottom: 1px solid rgb(199, 198, 198);
    .vpopleft {
      width: 60%;
      height: 100%;
      padding: 10px 30px 10px 10px;
      p {
        font-size: 14px;
      }
      .pcount {
        display: flex;
        font-size: 12px;
        margin-top: 20px;
        .spamount {
          color: darkgray;
        }
        .splimit {
          color: crimson;
          margin-left: 20px;
        }
      }
    }
    .vpopright {
      .vstepper {
        margin-top: 20px;
      }
    }
  }
  .vpopupbottom {
    width: 100%;
    height: 46px;
    background-color: #ff4444;
    text-align: center;
    line-height: 46px;
    color: white;
    font-size: 16px;
  }
}
</style>