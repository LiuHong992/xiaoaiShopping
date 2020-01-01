<template>
  <div>
    <!-- 商品详情轮播图 -->
    <goodswheel :imagebig="details.image" :imagesmall="details.image_path"></goodswheel>
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
          <van-icon @click="cancel" color="red" name="like" />
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
    <!-- <img :src="details.image" alt="">
    <img :src="details.image_path" alt="">
    <div v-html="details.detail"></div>-->
  </div>
</template>

<script>
import goodswheel from "../../components/Goodsdetails/goodswheel";
export default {
  data() {
    return {
      //  整个商品详情对象,
      goods: {},
      //  接收详情页(收藏)的对象,
      details: {},
      // 收藏按钮状态
      flag: false
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
            // console.log(this.goods);
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
        .cancelCollection(this.details.id)
        .then(res => {
          this.flag = false;
          this.$toast(res.msg);
          console.log(res);
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
            this.collect();
          } else if (res.code === -1) {
            this.$toast(res.msg);
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getDetails();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
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
  padding:7px 10px;
  border-top: 1px solid rgb(243, 241, 241);
  border-bottom: 1px solid rgb(243, 241, 241);
  .shopleft {
    display: flex;
    // line-height: 20px;
    .vshop {
      display: block;
      margin-right: 5px;
    }
    .spshop{
      font-size: 14px;
      margin-top: 1px;
      margin-right: 5px;
    }
    .vtag {
      border-radius: 4px;
      margin-top: -1px;
    }
  }
  .shopright{
    display: flex;
    font-size: 14px;
    margin-top: 1px;
    i{
      display: block;
    }
  }
}
</style>