<template>
  <div>
    <!-- <Backtop> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!-- <van-overlay class="loading" :show="this.$isLoading">
      <div class="wrapperss">
        <div class="block">
          <van-loading class="vloding" color="#1989fa" />
        </div>
      </div>
    </van-overlay> -->
    <!-- </Backtop> -->
  </div>
</template>
<script>
import Backtop from "../src/components/Backtop";
export default {
  components: {
    Backtop
  }
};
</script>

<style lang="scss">
@import "../src/styles/common";
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
body {
  margin: 0;
  padding: 0;
}
.fade-enter-active,
.fade-leave-avtive {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.loading {
  // position: relative;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  .wrapperss {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    position: relative;
    width: 120px;
    height: 120px;
    background-color: rgba($color: #000000, $alpha: 0.01);
    .vloding {
      position: absolute;
      top: 50px;
      left: 50px;
    }
  }
}
</style>
