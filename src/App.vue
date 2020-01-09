<template>
  <div>
    <!-- <Backtop> -->
    <transition name="fade">
      <!-- <keep-alive include=""> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
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
.backto {
  background-color: white;
  i {
    font-size: 20px;
  }
}
i {
  font-size: 20px !important;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.sticky {
  position: fixed;
  top: 0;
  z-index: 99;
}
body,
html,
#app {
  margin: 0;
  padding: 0;
}
.fade-enter-active,
.fade-leave-avtive {
  transition: opacity 0.7s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
