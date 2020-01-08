<template>
  <div>
    <mytop class="backto">
      <div slot="left">
        <van-icon name="arrow-left" @click="$goto()" />
      </div>
      <div slot="center">发布评价</div>
    </mytop>
    <!-- 商品图片+商品评分 -->
    <div class="posttop">
      <!-- 商品图片 -->
      <div class="postimg">
        <img :src="evagoods.image_path" alt />
      </div>
      <!-- 商品评分 -->
      <div class="rates">
        <div class="ratetxt">商品评分</div>
        <van-rate v-model="value" color="red" />
      </div>
    </div>
    <!-- 评论框 -->
    <van-field
      class="conts"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="150"
      placeholder="说说你的购买评价吧~"
      show-word-limit
    />
    <!-- 匿名评价 -->
    <div class="anonymous">
      <van-checkbox v-model="checked">匿名评价</van-checkbox>
    </div>
    <!-- 提交按钮 -->
    <van-button type="primary" size="large" @click="onSubmit">提交</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 待评价的商品信息(对象)
      evagoods: {},
      value: 5,
      message: "",
      checked: false
    };
  },
  components: {},
  methods: {
    // 提交评论
    onSubmit() {
      let obj = {
        id: this.evagoods.cid,
        rate: this.value,
        content: this.message,
        anonymous: this.checked,
        _id: this.evagoods._id,
        order_id: this.evagoods.order_id,
        image: []
      };
      if (obj.content === "") {
        this.$toast("评论不能为空哟~");
      } else {
        this.$api
          .comment(obj)
          .then(res => {
            if (res.code === 200) {
              this.$toast(res.msg)
              this.$router.go(-1)
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.evagoods = JSON.parse(this.$route.query.eva);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 评价头部
.posttop {
  display: flex;
  width: 100%;
  height: 105px;
  margin-bottom: 5px;
  // 商品图片
  .postimg {
    width: 26.5vw;
    height: 80px;
    padding: 25px 30px 0 30px;
    img {
      width: 100%;
      height: 100%;
      border: 1px solid darkgray;
    }
  }
  // 商品评分
  .rates {
    width: 72.8vw;
    padding-top: 25px;
    margin-left: 15px;
    font-size: 15px;
    font-weight: 700;
    .ratetxt {
      margin-bottom: 30px;
    }
  }
}
// 商品评价框
.conts {
  width: 100%;
  height: 250px !important;
  background-color: #ececec;
}
// 匿名评价
.anonymous {
  width: 100%;
  height: 35px;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>