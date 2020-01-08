<template>
  <div>
    <mytop class="cartstop">
      <div slot="center">购物车</div>
    </mytop>
    <!-- 已登录且购物车里有数据 -->
    <div class="cartscontent" v-if="user&&cartslist.length>0">
      <div class="cartstop">
        <div class="ctopleft">
          <van-checkbox v-model="checked" @click="chooseAll">
            <span v-if="checked">取消全选</span>
            <span v-else>全选</span>
          </van-checkbox>
        </div>
        <div class="ctopright">
          <p>
            合计：
            <span class="sprice">￥{{changeprice.toFixed(2)}}</span>
          </p>
          <div class="opright">
            <div class="dele" @click="deletecarts">删除</div>
            <div class="gotopay" @click="goTopay">去结算</div>
          </div>
        </div>
      </div>
      <div class="cartsmodel" v-for="item in cartslist" :key="item.id">
        <div class="cartsmleft">
          <van-checkbox v-model="item.check" @change="chooseOne"></van-checkbox>
        </div>
        <div class="cartsmcenter">
          <img :src="item.image_path" alt />
        </div>
        <div class="cartsmright">
          <p>{{item.name}}</p>
          <div class="counts">
            <span>￥{{item.mallPrice}}</span>
            <van-stepper
              @change="changeNum(item.count,item.cid,item.mallPrice)"
              v-model="item.count"
              integer
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 已登录但购物车里没有数据 -->
    <div class="cartscontents" v-else-if="user">
      <div class="cartsicon">
        <img src="../../assets/images/shop.png" alt />
      </div>
      <p>您的购物车里还没有商品哟~</p>
      <div class="gologin" @click="goTohome">去购物</div>
    </div>
    <!-- 未登录状态购物车显示内容 -->
    <div class="cartscontents" v-else>
      <div class="cartsicon">
        <img src="../../assets/images/shop.png" alt />
      </div>
      <p>请先登录哦~~~</p>
      <div class="gologin" @click="goTologin">去登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 判断登录状态的数据
      user: "",
      // 接收购物车数据的数组
      cartslist: [],
      checked: false,
      // 被选中状态的商品数组
      truelist: []
    };
  },
  components: {},
  methods: {
    // 未登录时跳转去登录
    goTologin() {
      this.$router.push("/login");
    },
    // 购物车里没数据跳转去首页
    goTohome() {
      this.$router.push("/");
    },
    // 购物车获取购物车详情数据
    getCarts() {
      this.$api
        .getCard()
        .then(res => {
          if (res.code === 200) {
            this.cartslist = res.shopList;
            this.$store.state.cartsum = 0;
            this.cartslist.map(item => {
              this.$store.state.cartsum += Number(item.count);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 对商品数量进行加减操作
    changeNum(num, ids, prices) {
      this.$api
        .editCart({ count: num, id: ids, mallPrice: prices })
        .then(res => {
          if (res.code === 200) {
            this.$toast(res.msg);
            this.$store.state.cartsum = 0;
            this.cartslist.map(item => {
              this.$store.state.cartsum += Number(item.count);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 全选
    chooseAll() {
      this.cartslist.map(item => {
        item.check = !this.checked;
      });
    },
    // 单选
    chooseOne() {
      this.checked = this.cartslist.every(item => {
        return item.check === true;
      });
    },
    // 删除按钮
    deletecarts() {
      this.truelist = this.cartslist.filter(item => {
        return item.check === true;
      });
      if (this.truelist.length > 0) {
        let arr = [];
        this.truelist.map(item => arr.push(item.cid));
        // console.log(arr);
        this.$dialog
          .confirm({
            title: "删除商品",
            message: "您确认要删除您所选中的商品吗？"
          })
          .then(() => {
            this.$api
              .deleteShop(arr)
              .then(res => {
                if (res.code === 200) {
                  this.$toast(res.msg);
                  this.getCarts();
                  this.$store.state.cartsum = "";
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {});
      } else {
        this.$toast("您未选中任何商品哟~");
      }
    },
    // 结算按钮
    goTopay() {
      this.truelist = this.cartslist.filter(item => {
        return item.check === true;
      });
      if (this.truelist.length > 0) {
        this.$router.push("/payment");
        this.$store.state.paylist = this.truelist;
      } else {
        this.$toast("请您选择您要购买的商品哟~");
      }
    }
  },
  mounted() {
    this.user = sessionStorage.getItem("user");
    this.getCarts();
  },
  watch: {},
  computed: {
    changeprice() {
      let sum = 0;
      this.cartslist.map(item => {
        if (item.check === true) {
          sum += item.mallPrice * item.count;
        }
      });
      return sum;
    }
  }
};
</script>

<style scoped lang='scss'>
.cartstop {
  height: 8vh;
  background-color: white;
}
// 已登录
.cartscontent {
  height: 85vh;
  .cartstop {
    position: sticky;
    top: 54px;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    width: 90%;
    height: 60px;
    padding: 0 25px 0 5px;
    margin: 0 auto;
    background-color: white;
    border-bottom: 1px solid darkgray;
    .ctopleft {
      width: 35%;
      height: 20px;
      margin: auto 0;
      font-size: 14px;
    }
    .ctopright {
      padding: 10px 0;
      font-size: 14px;
      .sprice {
        font-size: 12px;
        font-weight: 700;
        color: crimson;
      }
      .opright {
        display: flex;
        margin-top: 5px;
        div {
          padding: 5px 8px;
          background-color: #e6057f;
          color: white;
        }
        .gotopay {
          margin-left: 8px;
        }
      }
    }
  }

  // 购物车商品模板
  .cartsmodel {
    display: flex;
    width: 95%;
    height: 70px;
    margin: 0 auto;
    padding: 10px 0;
    border-bottom: 1px solid darkgray;
    &:last-child {
      margin-bottom: 50px;
      border-bottom: none;
    }
    .cartsmleft {
      height: 20px;
      margin: auto 0;
    }
    .cartsmcenter {
      width: 50px;
      height: 50px;
      padding: 10px 15px;
      img {
        width: 100%;
        height: 100%;
        border: 1px solid darkgray;
      }
    }
    .cartsmright {
      width: 60%;
      padding: 10px 0;
      font-size: 14px;
      color: crimson;
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .counts {
        display: flex;
        justify-content: space-between;
        width: 85%;
        margin-top: 12px;
        line-height: 30px;
      }
    }
  }
}
// 已登录但购物车内并无商品
.usercarts {
  p {
    text-align: center;
    margin-top: 20px;
  }
}
// 未登录
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
  .gologin {
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