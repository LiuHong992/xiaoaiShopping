<template>
  <div>
    <mytop class="backto">
      <div slot="left">
        <van-icon name="arrow-left" @click="$goto()" />
      </div>
      <div slot="center">订单结算</div>
    </mytop>
    <!-- 地址列表有数据时 -->
    <div class="payaddress" v-if="addressdefault.name" @click="goToaddress">
      <div class="paddressleft">
        <van-icon name="location-o" />
      </div>
      <div class="paddresscenter">
        <!-- 收货人和电话 -->
        <div class="consignee">
          <span>收货人：{{this.addressdefault.name}}</span>
          <span>{{this.addressdefault.tel}}</span>
        </div>
        <!-- 收货地址 -->
        <div class="receiving">
          <span>收货地址：{{this.addressdefault.address}}</span>
          <van-icon name="arrow" />
        </div>
        <!-- 提示信息 -->
        <div class="prompt">
          <span>(收货不便时.可选择免费待收货服务)</span>
        </div>
      </div>
    </div>
    <!-- 订单地址栏 -->
    <div class="payaddress" v-else @click="goToaddress">
      <p class="padd">点击添加地址</p>
    </div>
    <!-- 分割线 -->
    <div class="divider">
      <img src="../../assets/images/caitiao.jpg" alt />
    </div>
    <div class="goodslists">
      <div class="goods">
        <van-card
          :num="item.count"
          :price="item.mallPrice.toFixed(2)"
          :title="item.name"
          :thumb="item.image_path"
          v-for="item in orderlist"
          :key="item.id"
          @click="$goto(item.cid&&item.id)"
        />
      </div>
    </div>
    <van-submit-bar :price="prices" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 接收默认地址的对象
      addressdefault: {},
      // 接收传过来的订单数组
      orderlist: [],
      // 接收订单数组中的id的数组
      orderid: [],
      // 判断是立即购买还是购物车购买,空字符串代表购物车购买，true为立即购买
      flag: "",
      // 总件数
      countss: 0
    };
  },
  components: {},
  methods: {
    // 获取默认地址
    getDefault() {
      this.$api
        .getDefaultAddress()
        .then(res => {
          if (res.code === 200) {
            if (res.defaultAdd !== null && this.$store.state.addressId === "") {
              this.addressdefault = res.defaultAdd;
            } else {
              this.addressdefault = this.$store.state.selecaddress;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转到地址列表添加地址
    goToaddress() {
      this.$router.push("/addresslist");
    },
    // 提交订单
    onSubmit() {
      let obj = {
        address: this.addressdefault.address,
        tel: this.addressdefault.tel,
        orderId: this.orderid,
        totalPrice: this.prices,
        idDirect: this.flag,
        count: this.countss
      };
      this.$dialog
        .confirm({
          title: "确认订单",
          message: "您是否确认购买这些商品呢？"
        })
        .then(() => {
          // 此处的判断为如果有地址（address）再进行调接口操作
          if (this.addressdefault.address) {
            this.$api
              .placeOrder(obj)
              .then(res => {
                if (res.code === 200) {
                  this.$store.state.cartsId = 0;
                  this.$toast(res.msg);
                  this.$router.go(-1);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.$toast("请选择收货地址哟~");
          }
        })
        .catch(() => {});
    }
  },
  mounted() {
    if (
      this.$store.state.paylist.length === 1 &&
      this.$store.state.cartsId !== 1
    ) {
      this.orderlist = this.$store.state.paylist;
      this.flag = true;
    } else {
      this.orderlist = this.$store.state.paylist;
    }
    this.getDefault();
    // 循环购物车数组将cid存入数组中并且将商品总件数计算出来
    this.orderlist.map(item => {
      this.orderid.push(item.cid);
      this.countss += item.count;
    });
  },
  watch: {},
  computed: {
    prices() {
      let sum = 0;
      this.orderlist.map(item => {
        sum += item.count * item.mallPrice;
      });
      return sum * 100;
    }
  }
};
</script>

<style scoped lang='scss'>
// 订单地址栏
.payaddress {
  display: flex;
  height: 12vh;
  padding: 20px 5px 10px;
  overflow: hidden;
  .padd {
    width: 100%;
    font-size: 14px;
    line-height: 80px;
    text-align: center;
  }
  .paddressleft {
    width: 11vw;
    height: 100%;
    i {
      font-size: 24px !important;
      margin-top: 30px;
      margin-left: 5px;
    }
  }
  .paddresscenter {
    width: 89vw;
    height: 100%;
    // 公共样式
    div {
      display: flex;
      justify-content: space-between;
      height: 20px;
      line-height: 20px;
      margin-bottom: 15px;
    }
    // 收货人和电话
    .consignee {
      width: 90%;
      font-size: 15px;
    }
    // 收货地址
    .receiving {
      width: 100%;
      font-size: 12px;
      margin-bottom: 10px;
      span {
        display: block;
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    // 提示信息
    .prompt {
      span {
        font-size: 12px;
        color: rgb(252, 206, 164);
      }
    }
  }
}
// 分割线
.divider {
  width: 100%;
  height: 1vh;
  margin-bottom: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}
// 商品列表
.goodslists {
  width: 100%;
  height: 74vh;
  .goods {
    width: 100%;
  }
}
</style>