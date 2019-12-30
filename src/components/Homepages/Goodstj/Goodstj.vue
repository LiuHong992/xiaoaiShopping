<template>
  <div class="goodstj">
    <h3 class="recomh">商品推荐</h3>
    <betterx>
      <div class="recommd">
        <div class="goodsmodel" v-for="(item,index) in goodstj" :key="index">
          <img :src="item.image" alt />
          <p class="pname">{{item.goodsName}}</p>
          <div class="price">
            <span class="oprice">￥{{item.mallPrice}}</span>
            <span class="nprice">￥{{item.price}}</span>
          </div>
          <div class="main">
            <div class="spcarts">
              <van-icon color="white" size="20px" name="shopping-cart-o" />
            </div>
            <div class="contents">查看详情</div>
          </div>
        </div>
      </div>
    </betterx>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    goodstj: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.goodstj {
  width: 100vw;
  height: 197px;
  background-color: white;
  margin: 10px auto;
  .recomh {
    padding: 11px;
    font-size: 14px;
  }
  .recommd {
    display: flex;
    width: 2135px;
    height: 166px;
    overflow: hidden;
    flex-wrap: nowrap;
    // 商品详情卡片模板
    .goodsmodel {
      width: 125px;
      height: 166px !important;
      border-right: 1px solid rgb(233, 232, 232);
      border-top: 1px solid rgb(233, 232, 232);
      &:last-child{
        border-right: none;
      }
      img {
        display: block;
        width: 70%;
        height: 86px;
        margin: 0 auto;
      }
      .pname {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        margin-top: 3px;
        text-align: center;
      }
      // 价格
      .price {
        display: flex;
        margin-top: 5px;
        .oprice {
          font-size: 14px;
          text-indent: 5px;
        }
        .nprice {
          font-size: 12px;
          text-decoration: line-through;
          margin-left: 5px;
          color: rgb(175, 174, 174);
          line-height: 17px;
        }
      }
      // 购物车图标和查看商品详情
      .main {
        display: flex;
        width: 90%;
        margin: 2px auto 0;
        height: 20px;
        .spcarts {
          width: 20px;
          padding: 0 5px 5px 5px;
          background-color: orange;
          border-bottom-left-radius: 5px;
          border-top-left-radius: 5px;
        }
        .contents {
          width: 103px;
          padding: 0 5px 5px 5px;
          background-color: crimson;
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
          color: white;
          line-height: 20px;
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
}
</style>