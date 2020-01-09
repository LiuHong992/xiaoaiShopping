export default {
    // 加载效果
    loading: false,
    user: '',
    phone: 0,
    // 首页跳转到分类页所带参数
    classId: '',
    // 首页商品推荐点击购物车按钮时同步更新底部导航栏徽标
    cartsum: '',
    citys: '',
    // 浏览历史记录数组
    historys: [],
    // 搜索历史数组
    serchistorys: [],
    //  购物车结算数组
    paylist: [],
    // 存从地址列表选中的地址对象
    selecaddress: {},
    // 存从地址列表选中的地址的ID
    addressId: '',
    // 购物车购买一种商品时会和与立即购买冲突
    cartsId: 0
}