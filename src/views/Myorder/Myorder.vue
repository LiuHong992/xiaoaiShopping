<template>
  <div class="bg">
    <mytop class="backto">
      <div slot="left">
        <van-icon name="arrow-left" @click="$goto()" />
      </div>
      <div slot="center">我的订单</div>
    </mytop>
    <van-tabs v-model="active" class="vtabs">
      <van-tab :title="item.title" v-for="item in none" :key="item.id">
        <p class="pnone">该功能暂未开发</p>
      </van-tab>
      <van-tab title="已完成">
        <!-- 订单内容层 -->
        <div class="content">
          <!-- 订单模板 -->
          <div class="ordermodel" v-for="item in orderlists" :key="item.id">
            <!-- 订单编号 -->
            <div class="ordernumber all">
              <div class="number">
                订单编号：
                <span>{{item.order_id}}</span>
              </div>
              <div class="txts">交易完成</div>
            </div>
            <!-- 订单商品详情 -->
            <div class="orderdetails all">
              <!-- 商品详情单个模板 -->
              <div class="goodsmodel" v-for="item0 in item.order_list" :key="item0.id">
                <div class="goodsimage">
                  <img :src="item0.image_path" alt />
                </div>
                <!-- 商品名称 -->
                <div class="goodsname">{{item0.name}}</div>
                <!-- 单价和件数 -->
                <div class="pricount">
                  <div>￥{{item0.present_price}}</div>
                  <div class="gdscount">x{{item0.count}}</div>
                </div>
              </div>
            </div>
            <!-- 创建时间/收货地址/总价 -->
            <div class="moreinfo all">
              <div class="date">创建时间：{{item.add_time}}</div>
              <div class="address">收货地址：{{item.address}}</div>
              <div class="totalprice">共{{item.count}}件商品 合计：￥{{item.mallPrice.toFixed(2)}}</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 标签页循环数据
      none: [
        {
          title: "全部"
        },
        {
          title: "待支付"
        },
        {
          title: "待发货"
        },
        {
          title: "待收货"
        }
      ],
      active: 4,
      // 接收订单数据的数组
      orderlists: [],
      // 商品件数
      totalcount: 0
    };
  },
  components: {},
  methods: {
    // 获取订单数据
    getOrder() {
      this.$api
        .getMyOrder()
        .then(res => {
          if (res.code === 200) {
            this.orderlists = res.list;
            // console.log(this.orderlists);
            this.orderlists.map(item => {
              this.totalcount = 0;
              item.order_list.map(item0 => {
                this.totalcount += item0.count;
              });
              item.count = this.totalcount;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getOrder();
  },
  watch: {},
  computed: {
    // all() {
    //   let total = 0;
    //   this.orderlists = this.orderlists.filter(item => {
    //     return item.order_list;
    //   });
    //   return total;
    // }
  }
};
</script>

<style scoped lang='scss'>
.vtabs {
  .pnone {
    margin-top: 20px;
    text-align: center;
    font-size: 15px;
  }
  .content {
    width: 100%;
    height: auto;
    overflow: hidden;
    background-color: #ececec;
    .ordermodel {
      width: 92%;
      margin: 20px auto;
      border-radius: 10px;
      background-color: white;
      // 公共样式
      .all {
        width: 95%;
        margin: 0 auto;
        font-size: 14px;
      }
      // 订单号
      .ordernumber {
        display: flex;
        justify-content: space-between;
        height: 20px;
        padding: 11px 0 0 0;
        border-bottom: 1px solid darkgray;
        .txts {
          color: #d2591b;
        }
      }
      // 商品详情
      .orderdetails {
        width: 95%;
        margin: 0 auto;
        border-bottom: 1px solid darkgray;
        .goodsmodel {
          display: flex;
          margin: 10px auto;
          // 商品图片
          .goodsimage {
            width: 80px;
            height: 80px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 10px;
              border: 1px solid darkgray;
            }
          }
          // 商品名称
          .goodsname {
            width: 200px;
            margin-left: 15px;
            padding-top: 3px;
          }
          // 单价和件数
          .pricount {
            padding-top: 3px;
            text-align: end;
            .gdscount {
              margin-top: 8px;
              color: darkgray;
            }
          }
        }
      }
      // 创建时间/收货地址/总价
      .moreinfo {
        text-align: end;
        overflow: hidden;
        div {
          margin-top: 10px;
          &:last-child {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>