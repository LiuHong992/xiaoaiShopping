<template>
  <div>
    <mytop class="backto">
      <div slot="left">
        <van-icon name="arrow-left" @click="$goto()" />
      </div>
      <div slot="center">评价中心</div>
    </mytop>
    <!-- 背景图片 -->
    <div class="backimage">
      <img src="../../assets/images/evaluate.jpg" alt />
    </div>
    <!-- 评价标签页 -->
    <van-tabs class="van__tabs" v-model="active">
      <van-tab title="待评价" name="1">
        <div class="waitevalutions" v-if="orderevalution.length>0">
          <better v-if="active==='1'" class="wrapper">
            <!-- 待评价模板 -->
            <div class="waitmodel" v-for="item in orderevalution" :key="item.id">
              <!-- 待评价商品图片 -->
              <div class="goodsimg">
                <img :src="item.image_path" alt />
              </div>
              <!-- 商品名和评价操作 -->
              <div class="goodsnames">
                <div class="godsname">
                  <span>{{item.name}}</span>
                </div>
                <div class="sunorder" @click="goTopost(item)">
                  <van-icon name="chat" color="red" />
                  <span>评价晒单</span>
                </div>
              </div>
            </div>
          </better>
        </div>
        <div class="waitevalutions" v-else>
          <div class="nones">暂无商品需要评价哟~</div>
        </div>
      </van-tab>
      <van-tab title="已评价" name="2">
        <div class="waitevalutions" v-if="doneevalution.length>0">
          <better v-if="active==='2'" class="wrapper">
            <!-- 已评价模板 -->
            <div class="waitmodel" v-for="item in doneevalution" :key="item.id">
              <!-- 已评价商品图片 -->
              <div class="goodsimg">
                <img :src="item.goods[0].image_path" alt />
              </div>
              <!-- 商品名和评价操作 -->
              <div class="goodsnames">
                <div class="godsname">
                  <span>{{item.goods[0].name}}</span>
                </div>
                <div class="sunorder look" @click="goTodetails(item)">
                  <van-icon name="eye-o" color="darkgray" />
                  <span>查看评价</span>
                </div>
              </div>
            </div>
          </better>
        </div>
        <div class="waitevalutions" v-else>
          <div class="nones">暂无商品评价哟~</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "evalutioncenter",
  data() {
    return {
      active: "1",
      // 接收待评价的数组
      orderevalution: [],
      // 接收已评价的数组
      doneevalution: []
      // 接收已评价商品详情数组
      // donegoods:[]
    };
  },
  components: {},
  methods: {
    // 获取待评价的数组
    getOrder() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          if (res.code === 200) {
            // console.log(res);
            this.orderevalution = res.data.list;
            // console.log(this.orderevalution);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取已评价
    getDone() {
      this.$api
        .alreadyEvaluated()
        .then(res => {
          if (res.code === 200) {
            this.doneevalution = res.data.list;
            // console.log(this.doneevalution);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转发布评价页面
    goTopost(item) {
      this.$router.push({
        name: "postevaluation",
        query: { eva: JSON.stringify(item) }
      });
    },
    // 跳转评价详情页面
    goTodetails(item) {
      this.$router.push({
        name: "evaluationdetails",
        query: { goods: JSON.stringify(item) }
      });
    }
  },
  mounted() {
    this.getOrder();
    this.getDone();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.backimage {
  width: 100%;
  height: 180px;
  img {
    width: 100%;
    height: 100%;
  }
}
.van__tabs {
  .waitevalutions {
    padding-top: 30px;
    overflow: hidden;
    .wrapper {
      height: 61.2vh;
      .waitmodel {
        display: flex;
        width: 95%;
        height: 65px;
        padding: 0 10px 20px;
        margin: 0 auto;
        border-bottom: 1px solid darkgray;
        &:last-child {
          border: none;
        }
        // 待评价商品图片
        .goodsimg {
          width: 60px;
          height: 60px;
          padding: 10px;
          img {
            width: 100%;
            height: 100%;
            border: 1px solid darkgray;
            border-radius: 5px;
          }
        }
        // 商品名和评价操作
        .goodsnames {
          width: 60vw;
          height: 100%;
          padding-top: 10px;
          .godsname {
            height: 60%;
            font-size: 14px;
          }
          // 评价晒单按钮
          .sunorder {
            display: flex;
            width: 80px;
            height: 20px;
            margin-left: 200px;
            border: 1px solid crimson;
            border-radius: 10px;
            text-align: center;
            line-height: 20px;
            i {
              font-size: 13px !important;
              margin-top: 4px;
              margin-left: 7px;
            }
            span {
              font-size: 12px;
              margin-left: 3px;
              color: crimson;
            }
          }
          // 查看评价
          .look {
            border-radius: 0;
            border: 1px solid darkgrey;
            span {
              color: rgb(139, 139, 139);
            }
          }
        }
      }
    }
    // 无待评价数据
    .nones {
      text-align: center;
      margin-top: 30px;
      font-size: 15px;
      font-weight: 700;
    }
  }
}
</style>