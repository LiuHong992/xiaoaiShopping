<template>
  <div>
    <!-- 头部组件 -->
    <mytop>
      <div slot="center">会员中心</div>
    </mytop>
    <!-- 个人信息组件 -->
    <myinfo></myinfo>
  </div>
</template>

<script>
import myinfo from '../../components/My/Mytopp'
export default {
  data() {
    return {
      username:''
    };
  },
  components: {
    myinfo
  },
  methods: {},
  mounted() {
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>