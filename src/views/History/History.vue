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
    <collectmodel
      :list="this.histories"
      :ids="this.histories.id"
      name="记录"
      @del="del"
      v-if="this.histories"
    ></collectmodel>
  </div>
</template>

<script>
import collectmodel from "../../components/My/Collectmodel";
export default {
  data() {
    return {
      histories: [],
    };
  },
  components: {
    collectmodel
  },
  methods: {
    // 子组件分发的事件
    del(data) {
      if (data) {
        this.histories = this.$store.state.historys;
      }
    }
  },
  mounted() {
    this.$store.state.historys.map(item => {
      this.histories.push(item);
    });
    // this.histories.push(JSON.parse(sessionStorage.getItem("historyy")));
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