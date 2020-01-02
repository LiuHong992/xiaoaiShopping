<template>
  <div class="homes">
    <!-- 头部导航 -->
    <mytop class="hometop">
      <div class="citys" slot="left" @click="goTocity($store.state.citys)">
        <span v-if="$store.state.citys">
          <span class="citysp">{{$store.state.citys}}</span>
          <van-icon name="arrow-down" />
        </span>
        <span class="citysp" v-else>定位中...</span>
      </div>
      <div class="cserch" slot="center">
        <van-search shape="round" placeholder="请输入搜索关键词" v-model="value" />
      </div>
      <div class="serchtxt" slot="right" @click="onSearch">搜索</div>
    </mytop>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <better class="wrapper">
        <!-- 轮播图 -->
        <Wheel :wheels="list.slides"></Wheel>
        <!-- 分类 -->
        <Recommend :recommends="list.category"></Recommend>
        <!-- 配送图 -->
        <div class="delivery">
          <img :src="this.psimg.PICTURE_ADDRESS" alt />
        </div>
        <!-- 商品推荐 -->
        <Goodstj :goodstj="list.recommend"></Goodstj>
        <!-- 食品 -->
        <div v-if="list.floor1">
          <!-- 1F 休闲食品 -->
          <Foodsmodel :foodsmodel="list.floor1" index="1F" :floorname="floornames.floor1"></Foodsmodel>
          <!-- 2F 新鲜水果 -->
          <Foodsmodel :foodsmodel="list.floor2" index="2F" :floorname="floornames.floor2"></Foodsmodel>
          <!-- 3F 营养奶品 -->
          <Foodsmodel :foodsmodel="list.floor3" index="3F" :floorname="floornames.floor3"></Foodsmodel>
        </div>
        <!-- 热销商品 -->
        <Hotgoods :hotgoods="list.hotGoods"></Hotgoods>
      </better>
    </van-pull-refresh>
  </div>
</template>

<script>
import Wheel from "../../components/Homepages/Wheels/Wheels";
import Recommend from "../../components/Homepages/Recommend/Recommend";
import Goodstj from "../../components/Homepages/Goodstj/Goodstj";
import Foodsmodel from "../../components/Homepages/Leisuregoods/Leisuregoods";
import Hotgoods from "../../components/Homepages/Hotgoods/Hotgoods";
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
      value: "",
      // 接收数据的对象
      list: {},
      psimg: {},
      // 接收食品名字的对象
      floornames: {}
    };
  },
  components: {
    Wheel,
    Recommend,
    Goodstj,
    Foodsmodel,
    Hotgoods
  },
  methods: {
    // 跳转城市页面
    goTocity(val) {
      if (val) {
        this.$router.push({ name: "city", params: { city: val } });
      } else {
        this.$toast("定位中，请稍后...");
      }
    },
    // 刷新操作
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    onSearch() {},
    // 获取首页数据
    getRecommend() {
      this.$api
        .recommend()
        .then(res => {
          this.list = res.data;
          this.psimg = res.data.advertesPicture;
          this.floornames = res.data.floorName;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {
    // 获取定位
    let _this = this;
    console.log(_this.$store.state.citys);
    var map = new AMap.Map("container", {
      resizeEnable: true
    });
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：5s
        buttonPosition: "RB", //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "err", onError);
    });
    //解析定位结果
    function onComplete(data) {
      _this.$store.state.citys = data.addressComponent.city;
    }
    //解析定位错误信息
    function onError(data) {
      document.getElementById("status").innerHTML = "定位失败";
      document.getElementById("result").innerHTML =
        "失败原因排查信息:" + data.message;
    }
    // 进入首页获取数据
    this.getRecommend();
  },
  watch: {},
  computed: {
    // city() {
    //   return this.$store.state.citys;
    // }
  }
};
</script>

<style scoped lang='scss'>
.homes {
  height: 100%;
  background-color: #ececec;
  .hometop {
    height: 7.8vh;
    .citys {
      height: 100%;
      display: flex;
      font-size: 14px;
      .citysp {
        height: 100%;
        display: inline-block;
        text-indent: 20px;
      }
      i {
        line-height: 40px;
      }
    }
  }

  .serchtxt {
    height: 100%;
    font-size: 14px;
    margin-right: 10px;
  }
  .delivery {
    width: 100vw;
    height: 35px;
    margin-top: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.wrapper {
  height: 85.2vh;
}
</style>