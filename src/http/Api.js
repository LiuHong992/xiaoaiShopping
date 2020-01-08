import service from './index'
// 所有接口的api封装
export default {
    /**
     * 首页(Home)所有接口
     * recommend            首页的默认数据
     * search               搜索 参数： value：搜索关键词
     * keeplogin            保持登录
     */
    recommend() {
        return service.req('/recommend')
    },

    search({
        value,
        page = 1
    }) {
        return service.req('/search', {
            value,
            page
        })
    },
    // ===============================================================================================================
    /**
     * 分类页面(Category)所有接口
     * category 分类查询  参数id：默认分类的id
     */
    category(id) {
        return service.req(`/classification?mallSubId=${id}`)
    },

    // ===============================================================================================================
    /**
     * 购物车(ShoppingCart)所有接口
     * getCard      查询获取购物车数据
     * editCart     购物车加减商品      参数 ： 数量  商品id 价格
     * deleteShop   购物车商品删除      参数 id：需要删除的商品cid
     */
    getCard() {
        return service.post('/getCard')
    },

    editCart({
        count,
        id,
        mallPrice
    }) {
        return service.req('/editCart', {
            count,
            id,
            mallPrice
        })
    },

    deleteShop(
        id
    ) {
        return service.post('/deleteShop', id)
    },

    // ===============================================================================================================
    /**
     * 购物车支付页面(ShoppingPayMent)所有接口
     * placeOrder 提交订单 参数：address:收货地址,tel:电话，orderId：所有商品的id，totalPrice：总价格,idDirect:用来判断是购物车结算还是直接购买,count:商品数量
     */
    placeOrder({
        ...args
    }) {
        return service.post('/order', args)
    },

    // ===============================================================================================================
    /**
     * 商品详情页面(Details)所有接口
     * goodOne          请求单个商品详情,        参数   ： id:商品的id,page: 商品评论的页码
     * collection       收藏单个商品            参数：  goods:商品的详情信息
     * cancelCollection 取消收藏单个商品        参数：  id:商品的cid
     * isCollection     查询商品是否已收藏      参数：  id:商品的id
     * addShop          加入购物车             参数：  id:商品的id
     */
    goodOne(id, page = 1) {
        return service.req(`/goods/one?id=${id}&page=1`)
    },

    collection(goods) {
        return service.req('/collection', goods)
    },

    cancelCollection({
        id
    }) {
        return service.req('/cancelCollection', {
            id
        })
    },

    isCollection({
        id
    }) {
        return service.req('/isCollection', {
            id
        })
    },

    addShop({
        id
    }) {
        return service.req('/addShop', {
            id
        })
    },
    // ===============================================================================================================

    /**
     * 会员中心(My)所有接口
     * loginOut 退出登录
     * user     获取用户信息
     * saveUser 修改保存用户信息(gender,email,year,month,day,id,nickname,avatar)
     * getOrderNum 查询用户订单数量
     * comment  商品评论(id,rate,content, anonymous(是否匿名), _id, order_id, image=[])
     */
    loginOut() {
        return service.post('/loginOut')
    },

    user() {
        return service.post('/queryUser')
    },

    saveUser({
        ...args
    }) {
        return service.req('/saveUser', args)
    },

    getOrderNum() {
        return service.req('/myOrder/orderNum')
    },

    comment({
        ...args
    }) {
        return service.post('/goodsOne/comment', args)
    },
    // ===============================================================================================================
    /**
     * 用户相关(user文件夹下)所有接口
     * getAverify           获取登录注册默认验证码
     * replaceVerify        更换验证码
     * getAddress           查询用户收货地址 
     * getDefaultAddress    查询默认收货地址
     * setDefaultAddress    设置默认收货地址    参数：id：地址id
     * postAddress          增加收货地址        参数：name:用户名,tel:电话，address:(省+市+区+详情地址)，isDefault：是否默认
     *                                province：省，city：市，county：区，addressDetail：详情地址，
     *                                areaCode：地区代码，id：修改地址时候要传id
     * deleteAddress        删除地址            参数： id：地址_id
     * getCollection        查询我的收藏    参数：page，页码，默认第一页
     * register             注册            参数：nickname，用户名 password：密码，verify:验证码
     * login                登录
     * codeMsg              短信验证码      参数： sms 4位验证码
     * getMyOrder           订单查询        参数：evaluate：用来判断是不是查询订单，默认false
     * alreadyEvaluated     查询已评价      参数： page：页面
     * tobeEvaluated        查询待评价      参数： page：页面
     * evaluateOne          查询单条评论    参数： id：商品id，_id：数据库的那条id
     */
    getAverify() {
        return process.env.NODE_ENV === 'production' ? '/v1/verify?mt=${Math.random()}' : '/api/v1/verify?mt=${Math.random()}'
    },

    getAddress() {
        return service.req('/getAddress')
    },

    getDefaultAddress() {
        return service.req('/getDefaultAddress')
    },

    setDefaultAddress({
        id
    }) {
        return service.req('/setDefaultAddress', {
            id
        })
    },

    postAddress({
        ...args
    }) {
        return service.post('/address', args)
    },

    deleteAddress({
        id
    }) {
        return service.req('/deleteAddress', {
            id
        })
    },

    getCollection() {
        return service.req(`/collection/list?page=1`)
    },

    register({
        nickname,
        password,
        verify,
        sms
    }) {
        return service.req('/register', {
            nickname,
            password,
            verify,
            sms
        })
    },

    login({
        nickname,
        password,
        verify
    }) {
        return service.req('/login', {
            nickname,
            password,
            verify
        })
    },

    codeMsg(phone) {
        return service.req('/sendCodeMsg', {
            phone
        })
    },

    getMyOrder() {
        return service.req('/myOrder')
    },

    alreadyEvaluated(page = 1) {
        return service.req(`/alreadyEvaluated?page=1`)
    },

    tobeEvaluated(page = 1) {
        return service.req(`/tobeEvaluated?page=1`)
    },

    evaluateOne({
        _id
    }) {
        return service.req('/evaluateOne', {
            _id
        })
    }
}