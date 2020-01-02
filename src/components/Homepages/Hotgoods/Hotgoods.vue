<template>
  <div>
    <h3 class="hoth">热销商品</h3>
    <div class="hotgoods">
      <div
        class="hotgoodmodel"
        @click="$goto(item.goodsId)"
        v-for="(item,index) in hotgoods"
        :key="index"
      >
        <div class="goodsimg">
          <img :src="item.image" alt />
        </div>
        <p class="goodsp">{{item.name}}</p>
        <div class="price">
          <span class="mallprice">￥{{item.mallPrice}}</span>
          <span class="prices">￥{{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    hotgoods: {
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
.hoth {
  font-size: 18px;
  color: crimson;
  text-align: center;
  padding-bottom: 20px;
}
.hotgoods {
  display: flex;
  flex-wrap: wrap;
  .hotgoodmodel {
    width: 49.69%;
    height: 280px;
    background-color: white;
    border-right: 1px solid rgb(233, 232, 232);
    border-bottom: 1px solid rgb(233, 232, 232);
    .goodsimg {
      width: 95%;
      height: 207px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goodsp {
      width: 95%;
      margin: 0 auto;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: crimson;
    }
    .price {
      display: flex;
      width: 39%;
      margin: 10px auto;
      .mallprice {
        font-size: 18px;
      }
      .prices {
        margin-left: 5px;
        font-size: 14px;
        line-height: 20px;
        color: red;
        text-decoration: line-through;
      }
    }
  }
}
</style>