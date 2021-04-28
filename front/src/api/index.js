import request from "../utils/request";

//获取图像验证码
const getCaptchaApi = () => {
  return request.post("/user/captcha", { width: 134, height: 40 });
};
//注册发送邮箱
const sendEmailApi = (data) => {
  return request.post("/user/register_mail", data);
};
//注册用户
const handleRegisterApi = (data) => {
  return request.post("/user/register", data);
};
//用户登录
const handleLoginApi = (data) => {
  return request.post("/user/login", data);
};

//图片上传插件
const handleUploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return request.post("/img/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
//获取用户当前的个人信息
const getUserCurrentApi = () => {
  return request.get("/user/current");
};

//修改用户头像
const changeUserAvatarApi = (data) => {
  return request.post("/user/avatar", data);
};

//获取用户的收货地址
const getUserAddressApi = () => {
  return request.get("/user/address/get");
};
//增加收货地址
const addUserAddressApi = (data) => {
  return request.post("/user/address/add", data);
};
//修改收货地址
const modifyUserAddressApi = (data) => {
  return request.post("/user/address/modify", data);
};
//删除收货地址
const delUserAddressApi = (data) => {
  return request.post("/user/address/del", data);
};

//修改密码发送邮箱
const sendMailCanModify = (data) => {
  return request.post("/user/modify_mail", data);
};
//发送邮箱修改密码
const ModifyPwdApi = (data) => {
  return request.post("/user/modify/pwd", data);
};
//获取首页轮播图
const getHomeCarouselApi = () => {
  return request.get("/front/carousel");
};
//获取分类以及分类下的商品
const getClassifyProduct = () => {
  return request.get("/front/classify/product");
};
//获取销售最多的商品
const getHotSingleApi = () => {
  return request.get("/front/product/hotsingle");
};
//获取收藏最多的商品
const getHotStoreApi = () => {
  return request.get("/front/product/hotstore");
};
//随机猜你喜欢
const randomProductApi = () => {
  return request.get("/front/product/random");
};
//获取首页新闻
const getHomeNewsApi = () => {
  return request.get("/front/news/home");
};
//获取本地热销
const getLocalHotProductApi = (data) => {
  return request.post("/front/product/province", data);
};
//获取指定商品详情
const getProductDetailApi = (data) => {
  return request.post("/front/product/detail", data);
};
//添加商品收藏
const addProductStore = (data) => {
  return request.post("/front/product/store", data);
};
//查看该商品是否被当前用户收藏
const viewCurrentIsStore = (data) => {
  return request.post("/front/product/is_store", data);
};
//获取用户的收藏夹
const getUserStoreProduct = () => {
  return request.get("/front/product/store");
};
//取消收藏
const cancelStoreProductApi = (data) => {
  return request.post("/front/product/store/del", data);
};
//加入购物车
const addCartApi = (data) => {
  return request.post("/front/cart/add", data);
};
//获取购物车内容
const getCartApi = () => {
  return request.get("/front/cart");
};
//删除购物车
const deleteTargetCart = (data) => {
  return request.post("/front/cart/del", data);
};
//创建订单
const createOrderApi = (data) => {
  return request.post("/front/order/create", data);
};
//获取订单状态
const getOrderStatusApi = (data) => {
  return request.post("/front/order/status", data);
};
//修改订单状态
const modifyOrderStatusApi = (data) => {
  return request.post("/front/order/status/modify", data);
};
//获取订单
const getOwnOrderApi = () => {
  return request.get("/front/user/order");
};
//取消订单
const cancelOrderApi = (data) => {
  return request.post("/front/user/order/cancel", data);
};
//继续支付订单
const handleContinueOrder = (data) => {
  return request.post("/front/user/order/continue", data);
};
//分类筛选
const handleClassifySortApi = (data) => {
  return request.post("/front/product/all/sort", data);
};
//商品搜索
const handleSearchProduct = (data) => {
  return request.post("/front/product/search", data);
};
//获取本周推荐
const getWeekRecommendApi = () => {
  return request.get("/front/week/recommend");
};
//获取新闻列表
const getNewsListApi = (data) => {
  return request.post("/front/news/list", data);
};
//获取文章详情
const getNewsDetailApi = (data) => {
  return request.post("/front/news/detail", data);
};
//随机获取三篇文章
const randomGetThreeNewsApi = () => {
  return request.get("/front/news/random");
};
//文章点赞
const handleNewsGoodApi = (data) => {
  return request.post("/front/news/goods", data);
};
//确认收货
const confirmReceiveProductApi = (data) => {
  return request.post("/front/order/confirm_receive", data);
};
//前台假删除
const handleFakeDelOrderApi = (data) => {
  return request.post("/front/order/fake_del", data);
};
//发表评论
const handleSubmitComments = (data) => {
  return request.post("/front/product/comments", data);
};
//获取评论列表
const getCommentsListApi = (data) => {
  return request.post("/front/product/comments/get", data);
};
//注册成为卖家身份
const registerSellerApi = (data) => {
  return request.post("/front/register/seller",data)
}
export {
  handleUploadImage,
  handleLoginApi,
  handleRegisterApi,
  getCaptchaApi,
  sendEmailApi,
  getUserCurrentApi,
  changeUserAvatarApi,
  getUserAddressApi,
  addUserAddressApi,
  modifyUserAddressApi,
  delUserAddressApi,
  sendMailCanModify,
  ModifyPwdApi,
  getHomeCarouselApi,
  getClassifyProduct,
  getHotSingleApi,
  getHotStoreApi,
  randomProductApi,
  getHomeNewsApi,
  getLocalHotProductApi,
  getProductDetailApi,
  addProductStore,
  viewCurrentIsStore,
  getUserStoreProduct,
  cancelStoreProductApi,
  addCartApi,
  getCartApi,
  deleteTargetCart,
  createOrderApi,
  getOrderStatusApi,
  modifyOrderStatusApi,
  getOwnOrderApi,
  cancelOrderApi,
  handleContinueOrder,
  handleClassifySortApi,
  handleSearchProduct,
  getWeekRecommendApi,
  getNewsListApi,
  getNewsDetailApi,
  randomGetThreeNewsApi,
  handleNewsGoodApi,
  confirmReceiveProductApi,
  handleFakeDelOrderApi,
  handleSubmitComments,
  getCommentsListApi,
  registerSellerApi
};
