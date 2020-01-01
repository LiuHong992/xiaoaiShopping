<template>
  <div>
    <div class="recom">
      <div
        class="recomodel"
        @click="goToclassfy(item.mallCategoryId)"
        v-for="(item,index) in recommends"
        :key="index"
      >
        <img :src="item.image" alt />
        <span>{{item.mallCategoryName}}</span>
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
    recommends: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    goToclassfy(goid) {
      this.$store.state.classId = goid
      this.$router.push('/classfy')
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.recom {
  display: flex;
  justify-content: space-around;
  width: 95vw;
  height: 80px;
  margin: 10px auto 0;
  border-radius: 20px;
  background-color: white;
  box-shadow: 1px 1px 10px rgb(194, 192, 192);
  .recomodel {
    width: 60px;
    height: 70px;
    margin-top: 5px;
    text-align: center;
    img {
      display: block;
      width: 50px;
      height: 50px;
      margin-left: 5px;
    }
    span {
      font-size: 12px;
    }
  }
}
</style>