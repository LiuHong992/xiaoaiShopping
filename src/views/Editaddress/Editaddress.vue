<template>
  <div class="editaddresses">
    <mytop>
      <div class="backto" slot="left">
        <van-icon size="20px" name="arrow-left" @click="$goto()" />
      </div>
      <div slot="center">编辑地址</div>
    </mytop>
    <van-address-edit
      :area-list="areaList"
      :address-info="editlist"
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import arealist from "../../assets/js/area";
export default {
  data() {
    return {
      areaList: arealist,
      // 接收修改地址传过来的对象
      editlist: {},
    };
  },
  components: {},
  methods: {
    // 增加收货地址参数：name:用户名,tel:电话，address:(省+市+区+详情地址)，
    // isDefault：是否默认,province：省，city：市，county：区，addressDetail：详情地址，
    // areaCode：地区代码，id：修改地址时候要传id
    onSave(val) {
      let obj = {
        name: val.name,
        tel: val.tel,
        address: val.province + val.city + val.county + val.addressDetail,
        addressDetail: val.addressDetail,
        isDefault: val.isDefault,
        areaCode: val.areaCode,
        id: this.editlist ? this.editlist._id : ""
      };
      this.$api
        .postAddress(obj)
        .then(res => {
          if (res.code === 200) {
            this.$toast(res.msg);
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除按钮
    onDelete() {
      if (this.editlist) {
        this.$api
          .deleteAddress({ id: this.editlist._id })
          .then(res => {
            if (res.code === 200) {
              this.$router.go(-1);
              this.$toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.editlist = this.$route.params.item;
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
i {
  font-size: 20px;
}
</style>