<template>
  <div>
    <div class="model" v-for="(item,index) in list" :key="index">
      <div class="modelimg" @click="$goto(item.id||item.cid)">
        <img :src="item.image_path" alt />
      </div>
      <div class="maincont" @click="$goto(item.id||item.cid)">
        <p class="pnames">{{item.name}}</p>
        <p class="pprices">
          <span class="preprice">￥{{item.present_price}}</span>
          <span class="orlprice" v-if="item.orl_price">￥{{item.orl_price}}</span>
        </p>
      </div>
      <div class="right" name="del">
        <van-icon @click="del(item)" name="close" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ""
    }
  },
  components: {},
  methods: {
    // 删除操作
    del(item) {
      // 收藏页操作 历史记录页操作
      if (this.name === "收藏") {
        this.$dialog
          .confirm({
            title: "取消收藏",
            message: "您确认要取消收藏该商品吗？"
          })
          .then(() => {
            this.$api
              .cancelCollection({ id: item.cid })
              .then(res => {
                if (res.code === 200) {
                  this.$toast(res.msg);
                  this.flag = true;
                  this.$emit("del", this.flag);
                } else {
                  this.$toast(res.msg);
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {});
      } else {
        this.$dialog
          .confirm({
            title: "消除历史记录",
            message: "您确认要删除该条历史记录吗？"
          })
          .then(() => {
            this.flag = true;
            let Userhistories = JSON.parse(localStorage.getItem("Userhistory"));
            let userp = JSON.parse(localStorage.getItem("user"));
            Userhistories.map(item0 => {
              if (item0.usesnames === userp.nickname) {
                item0.goods = this.list.filter(desc => {
                  return desc !== item;
                });
              }
            });
            localStorage.setItem("Userhistory", JSON.stringify(Userhistories));
            this.$emit("del", this.flag);
          })
          .catch(() => {});
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.model {
  position: relative;
  display: flex;
  height: 70px;
  padding: 10px;
  .modelimg {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 中间显示内容
  .maincont {
    width: 200px;
    margin-left: 20px;
    .pnames {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .pprices {
      font-size: 12px;
      .preprice {
        color: red;
        font-weight: 700;
      }
      .orlprice {
        margin-left: 5px;
        text-decoration: line-through;
      }
    }
  }
  // 删除记录
  .right {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>