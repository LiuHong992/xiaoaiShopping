<template>
  <div class="bg">
    <mytop class="white sticky">
      <div class="lftarrow" slot="left">
        <van-icon class="backi" @click="$goto()" size="20px" name="arrow-left" />
      </div>
      <div slot="center">
        <span>城市列表</span>
      </div>
    </mytop>
    <div class="serch">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </div>
    <!-- 当前城市 -->
    <div class="nowcity">
      <p class="pcity">当前城市</p>
      <div class="now">
        <div class="nctiy">{{this.$store.state.citys}}</div>
      </div>
    </div>
    <!-- 热门城市 -->
    <div class="hotcity">
      <p class="pcity">热门城市</p>
      <div class="hot">
        <div class="hotcitymodel" v-for="item in city.data.hotCities" :key="item.id">{{item.name}}</div>
      </div>
    </div>
    <van-index-bar>
      <van-index-anchor index="A" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="B" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>

<script>
import cities from "../../assets/js/city";
export default {
  data() {
    return {
      city: cities,
      value: ""
    };
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bg {
  height: 100vh;
  background-color: #ececec !important;
  .lftarrow {
    .backi {
      display: block;
      margin-top: 12px;
      margin-left: 7px;
    }
  }
  .white {
    background-color: white;
  }
  // 搜索框
  .serch {
    position: sticky;
    top: 45px;
    // z-index: 99;
    height: 40px;
    width: 94%;
    padding: 10px;
    background-color: #ececec;
  }
  // 当前城市
  .pcity {
    font-size: 14px;
    padding: 10px;
  }
  .nowcity {
    .now {
      width: 100%;
      height: 60px;
      background-color: white;
      overflow: hidden;
      .nctiy {
        width: 60px;
        height: 20px;
        padding: 5px 10px;
        margin-left: 10px;
        margin-top: 15px;
        border: 1px solid darkgray;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  // 热门城市
  .hotcity {
    .hot {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;
      margin-bottom: 10px;
      background-color: white;
      text-align: center;
      line-height: 20px;
      .hotcitymodel {
        width: 80px;
        height: 20px;
        padding: 5px 10px;
        margin: 10px 0;
        border: 1px solid darkgray;
      }
    }
  }
}
</style>