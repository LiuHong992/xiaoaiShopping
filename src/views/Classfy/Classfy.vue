<template>
  <div>
    <mytop>
      <div slot="center">商品分类</div>
    </mytop>
    <div class="classes">
      <!-- 侧边栏 -->
      <van-sidebar
        v-model="activeKey"
        @change="onChange(classfys[activeKey].bxMallSubDto[active].mallSubId)"
      >
        <van-sidebar-item
          :title="item.mallCategoryName"
          v-for="(item,index) in classfys"
          :key="index"
        />
      </van-sidebar>
      <!-- 头部标签栏 -->
      <div class="rightcont">
        <van-tabs
          v-model="active"
          v-if="classfys[activeKey]"
          :ellipsis="false"
          @click="getCategory(classfys[activeKey].bxMallSubDto[active].mallSubId)"
        >
          <van-tab
            :title="item0.mallSubName"
            v-for="(item0,index0) in classfys[activeKey].bxMallSubDto"
            :key="index0"
            
          ></van-tab>
        </van-tabs>
        <!-- 下方显示内容 -->
        <better class="wrapper">
          <div class="goodsdv">
            <div class="classgoods" v-for="(item1,index1) in classfylist" :key="index1">
              <div class="gdsimg">
                <img :src="item1.image" alt />
              </div>
              <div class="maincont">
                <p class="pname">{{item1.name}}</p>
                <p class="pprice">
                  <span class="preprice">￥{{item1.present_price}}</span>
                  <span class="orlprice">￥{{item1.orl_price}}</span>
                </p>
              </div>
            </div>
          </div>
        </better>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      active: 0,
      // 接收分类页数据的数组
      classfys: [],
      // 接收分类页标签详细数据的数组
      classfylist: [],
      // 进入分类页面默认显示的数据ID
      defalutId: ""
    };
  },
  components: {},
  methods: {
    // 获取分类页数据
    getClassfy() {
      this.$api
        .recommend()
        .then(res => {
          this.classfys = res.data.category;
          // 判断条件为Vuex中存储的值,如果是从首页的分类栏点击跳转过来时将
          // category中对应的mallCategoryId存进Vuex中store下的state中的classId
          // 如果有classId，则将（classId-1）的值赋给当前的activeKey值,这样侧边栏
          // 就可以对应显示出相应的栏目,updateClassfy方法则是通过计算后的activeKey
          // 值对右边标签页数据进行循环，然后渲染出内容。
          if (!this.$store.state.classId) {
            this.activeKey = 0;
            this.updateClassfy();
          } else {
            this.activeKey = this.$store.state.classId - 1;
            this.updateClassfy();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取标签页数据
    getCategory(id) {
      this.$api
        .category(id)
        .then(res => {
          this.classfylist = res.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 更新分类数据方法
    updateClassfy() {
      this.defalutId = this.classfys[this.activeKey].bxMallSubDto[
        this.active
      ].mallSubId;
      this.getCategory(this.defalutId);
    },
    // 改变侧边栏名字时调用的方法
    onChange(ids) {
      this.active = 0;
      this.getCategory(ids);
    }
  },
  mounted() {
    this.getClassfy();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.classes {
  display: flex;
  width: 100%;
  /deep/.van-sideba {
    height: 85.2vh;
    width: 25vw;
  }
  .rightcont {
    height: 85.2vh;
    /deep/.van-tabs {
      height: 6.7vh;
      width: 75vw;
    }
    // 下方分类商品详情
    .wrapper {
      height: 78.3vh !important;
      overflow: hidden;
      .goodsdv {
        width: 100%;
        height: auto;
        .classgoods {
          display: flex;
          width: 100%;
          height: 100px;
          &:last-child {
            margin-bottom: 50px;
          }
          .gdsimg {
            width: 60px;
            height: 60px;
            margin: 20px;
            border: 1px solid darkgray;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .maincont {
            height: 65px;
            width: 192px;
            margin-top: 20px;
            .pname {
              width: 100%;
              font-size: 14px;
              color: crimson;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .pprice {
              margin-top: 33px;
              .preprice {
                color: red;
                font-weight: 700;
                font-size: 16px;
              }
              .orlprice {
                text-decoration: line-through;
                color: rgb(148, 144, 144);
                font-size: 14px;
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>