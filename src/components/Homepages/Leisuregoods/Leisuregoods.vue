<template>
  <div class="foodsm">
    <!-- 标题 -->
    <div class="title">
      <div class="floor">{{index}}</div>
      <span>{{floorname}}</span>
    </div>
    <div class="foodscontent">
      <div class="fdsleft">
        <div class="fdsleftop">
          <img :src="foodsmodel[0].image" alt />
        </div>
        <div class="fdsleftbottom">
          <img :src="foodsmodel[3].image" alt />
        </div>
      </div>
      <div class="fdsright">
        <div class="rightimg">
          <img :src="foodsmodel[1].image" alt />
        </div>
        <div class="rightimg">
          <img :src="foodsmodel[2].image" alt />
        </div>
        <div class="rightimg">
          <img :src="foodsmodel[4].image" alt />
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
    foodsmodel: {
      type: Array,
      default: () => []
    },
    index: {
      type: String,
      default: ""
    },
    floorname: {
      type: String,
      default: ""
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
.foodsm {
  width: 100%;
  height: 340px;
  background-color: white;
  margin: 15px 0;
  .title {
    display: flex;
    padding: 0 10px 12px 10px;
    text-align: center;
    background-color: #ececec;
    line-height: 20px;
    .floor {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: crimson;
      color: white;
      margin: 0 5px 0 140px;
    }
    span{
      font-size: 16px;
    }
  }
  .foodscontent {
    width: 100%;
    height: 310px;
    display: flex;
    .fdsleft {
      width: 190px;
      height: 100%;
      .fdsleftop {
        border-right: 1px solid rgb(233, 232, 232);
        border-bottom: 1px solid rgb(233, 232, 232);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .fdsleftbottom {
        height: 109px;
        border-right: 1px solid rgb(233, 232, 232);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .fdsright {
      width: 186px;
      .rightimg {
        width: 100%;
        height: 98.4px;
        border-bottom: 1px solid rgb(233, 232, 232);
        &:last-child {
          border-bottom: none;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>