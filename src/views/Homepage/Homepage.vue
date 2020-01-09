<template>
  <div class="homes">
    <!-- 头部导航 -->
    <mytop class="hometop">
      <div class="citys" slot="left" @click="goTocity($store.state.citys)">
        <div v-if="$store.state.citys">
          <span class="citysp">{{$store.state.citys}}</span>
          <van-icon name="arrow-down" />
        </div>
        <span class="citysp" v-else>定位中...</span>
      </div>
      <div class="cserch" slot="center">
        <van-search @focus="changeShow" shape="round" placeholder="请输入搜索关键词" v-model="value" />
      </div>
      <div class="serchtxt" slot="right">
        <span v-if="show" @click="changeShows">取消</span>
      </div>
    </mytop>
    <!-- 搜索框弹出层 -->
    <div class="pop">
      <van-popup
        :overlay="false"
        v-model="show"
        position="bottom"
        :style="{ height: '92.5%' }"
        v-if="serchlist"
      >
        <div class="clearhis" v-if="this.$store.state.serchistorys.length>0" @click="delhistory">
          <span>清除历史记录</span>
        </div>
        <div>
          <div class="serchistory" v-if="this.$store.state.serchistorys.length>0">
            <div
              class="shmodel"
              v-for="item in this.$store.state.serchistorys"
              :key="item.id"
              @click="changeValue(item)"
            >
              <span>{{item}}</span>
            </div>
          </div>
          <div class="serchistory" v-else-if="this.value.trim() ==='' &&this.serchlist.length===0">
            <p>暂无搜索记录</p>
          </div>
        </div>
        <div class="serchmodel" v-for="item in serchlist" :key="item.id" @click="$goto(item.id)">
          <div class="sgimg">
            <img :src="item.image" alt />
          </div>
          <div class="rtcont">
            <p v-html="item.name"></p>
            <p class="pprice">￥{{item.present_price}}</p>
          </div>
        </div>
      </van-popup>
    </div>
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
    <loading></loading>
  </div>
</template>

<script>
import Wheel from "../../components/Homepages/Wheels/Wheels";
import Recommend from "../../components/Homepages/Recommend/Recommend";
import Goodstj from "../../components/Homepages/Goodstj/Goodstj";
import Foodsmodel from "../../components/Homepages/Leisuregoods/Leisuregoods";
import Hotgoods from "../../components/Homepages/Hotgoods/Hotgoods";
export default {
  name: "home",
  data() {
    return {
      count: 0,
      isLoading: false,
      value: "",
      // 接收数据的对象
      list: {},
      psimg: {},
      // 接收食品名字的对象
      floornames: {},
      show: false,
      // 搜索框接收的数组
      serchlist: [],
      page: ""
    };
  },
  props: {},
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
        // this.getRecommend();
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
    },
    // 显示搜索弹出层（显示）
    changeShow() {
      this.show = true;
    },
    // 显示搜索弹出层（消失）
    changeShows() {
      this.value = "";
      this.serchlist = [];
      this.show = false;
    },
    // 清除历史记录
    delhistory() {
      this.$dialog
        .confirm({
          title: "删除历史搜索记录",
          message: "您确认删除所有搜索记录吗？"
        })
        .then(() => {
          this.$store.state.serchistorys = [];
        })
        .catch(() => {});
    },
    // 将历史记录中的值加入到搜索框值
    changeValue(name) {
      this.value = name;
    },
    // 搜索框获取展示数据
    getShow() {}
  },

  mounted() {
    if (this.$store.state.citys === "") {
      // 获取定位
      let _this = this;
      // console.log(_this.$store.state.citys);
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
    }

    // 进入首页获取数据
    this.getRecommend();
    // 函数节流解决搜索框内value值变化过快时请求异常状态
    this.$watch(
      "value",
      this.$utils.throttle(() => {
        if (this.value === "") {
          this.serchlist = [];
        } else {
          this.$api
            .search({ value: this.value.trim(), page: 1 })
            .then(res => {
              this.serchlist = res.data.list;
              this.serchlist.map(item => {
                item.name = this.$utils.keyWord(item.name, this.value.trim());
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, 200)
    );
  },
  watch: {},
  computed: {},
  beforeRouteLeave(to, from, next) {
    if (
      !this.$store.state.serchistorys.some(item => item === this.value) &&
      this.value !== ""
    ) {
      this.$store.state.serchistorys.push(this.value);
      
    }
    next();
  }
};
</script>

<style scoped lang='scss'>
.homes {
  height: 100%;
  background-color: #ececec;
  .hometop {
    height: 7.8vh;
    z-index: 1000 !important;
    .citys {
      height: 100%;
      display: flex;
      font-size: 14px;
      div {
        display: flex;
        i {
          margin-left: 2px;
          margin-top: 14px;
        }
      }
      .citysp {
        height: 100%;
        display: inline-block;
        text-indent: 20px;
      }
      i {
        margin-top: 10px !important;
      }
    }
    .cserch {
      width: 223px;
      height: 100%;
    }
  }

  .serchtxt {
    width: 32px;
    height: 100%;
    font-size: 14px;
    margin-right: 10px;
  }
  // 搜索框显示层
  .pop {
    // position: relative;
    .serchmodel {
      display: flex;
      width: 100%;
      height: 80px;
      .sgimg {
        width: 60px;
        height: 60px;
        padding: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rtcont {
        height: 100%;
        padding: 10px 0;
        p {
          padding: 10px 0;
        }
        .pprice {
          color: crimson;
          font-size: 14px;
        }
      }
    }
    // 清除历史记录按键
    .clearhis {
      width: 80px;
      height: 25px;
      padding: 5px 10px;
      margin-top: 10px;
      margin-left: 260px;
      background-color: #ececec;
      text-align: center;
      span {
        font-size: 12px;
        line-height: 25px;
      }
    }
    // 搜索历史记录显示
    .serchistory {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      font-size: 14px;
      text-align: center;
      p {
        width: 100%;
      }
      .shmodel {
        width: 80px;
        height: 20px;
        padding: 5px 10px;
        background-color: #ececec;
        margin-left: 10px;
        margin-top: 5px;
        line-height: 20px;
      }
    }
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