<template>
  <div>
    <!-- 头部 -->
    <mytop>
      <div class="back" slot="left">
        <van-icon @click="$goto()" size="20px" name="arrow-left" />
      </div>
      <div class="collect" slot="center">历史记录</div>
    </mytop>
    <!-- 历史记录 -->
    <collectmodel :list="this.histories" name="记录" @del="del" v-if="this.histories"></collectmodel>
  </div>
</template>

<script>
import collectmodel from "../../components/My/Collectmodel";
export default {
  data() {
    return {
      histories: []
    };
  },
  components: {
    collectmodel
  },
  methods: {
    // 子组件分发的事件
    del(data) {
      if (data) {
        let Userhistories = JSON.parse(localStorage.getItem("Userhistory"));
        let userp = JSON.parse(localStorage.getItem("user"));
        Userhistories.map(item => {
          if (item.usesnames === userp.nickname) {
            this.histories = item.goods;
          }
        });
      }
    }
  },
  mounted() {
    let Userhistories = JSON.parse(localStorage.getItem("Userhistory"));
    let userp = JSON.parse(localStorage.getItem("user"));
    Userhistories.map(item => {
      if (item.usesnames === userp.nickname) {
        item.goods.map(item0 => {
          this.histories.push(item0);
        });
      }
    });
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
i {
  display: block;
  margin-top: 12px;
}
</style>