<template>
 <div>
   <mytop>
     <div class="backto" slot="left">
       <van-icon name="arrow-left" @click="$goto()"/>
     </div>
     <div slot="center">订单结算</div>
   </mytop>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {

   },
   mounted() {
     console.log(this.$route.params.paylist);
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>