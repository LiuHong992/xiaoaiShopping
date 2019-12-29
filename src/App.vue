<template>
  <div>
    <!-- <Backtop> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
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
.fade-enter-active, .fade-leave-avtive {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}
</style>
