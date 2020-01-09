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
    <div v-if="value ===''">
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
          <div
            @click="select(item.name)"
            class="hotcitymodel"
            v-for="item in hotcity"
            :key="item.id"
          >{{item.name}}</div>
        </div>
      </div>
      <van-index-bar :sticky-offset-top="110">
        <div v-for="item in Object.keys(city)" :key="item.id">
          <van-index-anchor :index="item" />
          <van-cell
            @click="select(item0.name)"
            :title="item0.name"
            v-for="(item0,index) in city[item]"
            :key="index"
          />
        </div>
      </van-index-bar>
    </div>
    <!-- 搜索后展示内容 -->
    <div class="serchs" v-else>
      <div
        class="serchcity"
        v-for="item in cityes"
        :key="item.id"
        @click="select(item.name)"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import cityss from "../../assets/js/city";
export default {
  data() {
    return {
      cits: cityss,
      hotcity: [],
      city: {},
      value: "",
      // 接收带有A、B、C一类数据的数组
      cityname: []
    };
  },
  components: {},
  methods: {
    getCity() {
      this.city = this.cits.data.cities;
      this.hotcity = this.cits.data.hotCities;
      Object.keys(this.city).map(item => {
        this.cityname.push(...this.city[item]);
      });
    },
    // 搜索
    select(name) {
      this.$store.state.citys = name;
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getCity();
  },
  watch: {},
  computed: {
    cityes() {
      return this.cityname.filter(item => {
        return JSON.stringify(item).includes(this.value);
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.bg {
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
    top: 40px;
    z-index: 99;
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
    font-size: 14px;
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
  .serchs {
    width: 94%;
    height: 100%;
    background-color: #ececec;
    font-size: 14px;
    .serchcity {
      width: 100%;
      height: 20px;
      padding: 10px;
      line-height: 20px;
      background-color: white;
    }
  }
}
</style>