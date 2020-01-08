<template>
  <div>
    <mytop class="backto">
      <div slot="left">
        <van-icon size="20px" name="arrow-left" @click="$goto()" />
      </div>
      <div slot="center">地址列表</div>
    </mytop>
    <div class="addresslist" v-if="this.addresslist.length>0">
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </div>
    <div class="addresslist addressheight" v-else>
      <p class="pnone">暂无地址数据，快点击下方添加一个地址吧~</p>
      <div class="addaddress" @click="onAdd">
        <span>新增地址</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenAddressId: "1",
      // 接收地址列表的数组
      addresslist: []
    };
  },
  components: {},
  methods: {
    // 获取地址列表
    getAddress() {
      this.$api
        .getAddress()
        .then(res => {
          if (res.code === 200) {
            this.addresslist = res.address;
            if (this.addresslist.length > 0) {
              this.judgeDefault();
            }
            if ((this.$store.state.selecaddress = {})) {
              this.$store.state.selecaddress = this.addresslist[0];
              // 调整默认地址时需要重新将Vuex中的id赋空，要不然修改默认之后，返回订单结算页面
              // 地址还是默认选中的是地址列表的第一个
              this.$store.state.addressId = "";
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 新增地址
    onAdd() {
      this.$router.push("/editaddress");
    },
    // 编辑地址
    onEdit(item) {
      this.$router.push({ name: "editaddress", params: { item: item } });
    },
    // 选中地址时将其存入Vuex中
    onSelect(item) {
      this.$store.state.selecaddress = item;
      this.$store.state.addressId = item._id;
    },
    // 判断默认地址
    judgeDefault() {
      let b = 1;
      let count = 0;
      this.addresslist.map(item => {
        if (item.isDefault) {
          count++, (item.id = "1");
        } else {
          b++;
          item.id = b;
        }
      });
      // 如果没有默认地址，默认数组第一项选中
      if (count === 0) {
        this.addresslist[0].id = "1";
      }
    }
  },
  mounted() {
    this.getAddress();
    console.log(this.$store.state.selecaddress);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.addresslist {
  position: relative;
  .pnone {
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
  }
  .addaddress {
    position: absolute;
    left: 20px;
    bottom: 0;
    height: 20px;
    width: 90%;
    padding: 8px 0;
    border-radius: 20px;
    background-color: #ee0a24;
    color: white;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
  }
}
.addressheight {
  height: 90vh;
}
</style>