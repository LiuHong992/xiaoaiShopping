<template>
  <div class="collec">
    <!-- 头部 -->
    <mytop>
      <div class="back" slot="left">
        <van-icon @click="$goto()" size="20px" name="arrow-left" />
      </div>
      <div class="collect" slot="center">我的收藏</div>
    </mytop>
    <!-- 收藏数据 -->
    <collectmodel :list="collectlist" name="收藏" @del="del" v-if="collectlist"></collectmodel>
  </div>
</template>

<script>
import collectmodel from "../../components/My/Collectmodel";
export default {
  data() {
    return {
      //  接收收藏夹数据的数组
      collectlist: [],
      name: "收藏"
    };
  },
  components: {
    collectmodel
  },
  methods: {
    // 获取收藏数据
    getCollectlist() {
      this.$api.getCollection().then(res => {
        this.collectlist = res.data.list;
      });
    },
    del(data) {
      if (data) {
        this.getCollectlist();
      }
    }
  },
  mounted() {
    this.getCollectlist();

  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.collec {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(245, 237, 237);
}
i {
  display: block;
  margin-top: 12px;
}
</style>