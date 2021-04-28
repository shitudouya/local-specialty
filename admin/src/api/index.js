import request from "@/utils/request";

const handleBackLogin = (data) => {
  return request.post("/admin/login", data);
};

const getUserInfo = () => {
  return request.get("/admin/current");
};

//通用图片上传
const handleUploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return request.post("/img/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
//添加文章
const addNewsApi = (data) => {
  return request.post("/admin/news/add", data);
};
//获取所有文章
const getNewsList = (data) => {
  return request.post("/admin/news/all", data);
};
//修改指定文章
const modifyNews = (data) => {
  return request.post("/admin/news/edit", data);
};
//删除指定文章
const delTargetNews = (data) => {
  return request.post("/admin/news/del", data);
};
//添加商品
const addProductApi = (data) => {
  return request.post("/admin/product/add", data);
};

//获取待审核的商品
const getNeedCheckProject = (data) => {
  return request.post("/admin/product/check", data);
};
//商品审核通过
const setProductCheckPass = (data) => {
  return request.post("/admin/product/check/pass", data);
};

//商品审核拒绝
const setProductRefuse = (data) => {
  return request.post("/admin/product/check/refuse", data);
};
//获取系统消息
const getNotifyApi = () => {
  return request.get("/admin/seller/notify");
};
//清除所有系统
const clearAllNotifyApi = () => {
  return request.post("/admin/seller/notify/clear");
};
//获取商品（卖家）
const getSellerProductApi = (data) => {
  return request.post("/admin/product/self", data);
};
//编辑商品
const editProductApi = (data) => {
  return request.post("/admin/product/edit", data);
};
//获取轮播图
const getCarouselApi = () => {
  return request.get("/admin/home/carousel");
};
//添加轮播图
const addCarouselApi = (data) => {
  return request.post("/admin/home/carousel/add", data);
};
//删除轮播图
const delTargetCarouselApi = (data) => {
  return request.post("/admin/home/carousel/del", data);
};
//获取所有商品
const getAllProductListApi = (data) => {
  return request.post("/admin/product/all", data);
};
//获取周推荐
const getWeekRecommendApi = () => {
  return request.get("/admin/week/recommend")
}
//增加周推荐
const addWeekRecommendApi = (data) => {
  return request.post("/admin/week/recommend",data)
}
//删除周推荐
const delWeekRecommendApi = (data) => {
  return request.post("/admin/week/recommend/del",data)
}
//编辑周推荐
const modifyWeekRecommendApi = (data) => {
  return request.post("/admin/week/recommend/modfiy",data)
}
//获取所有卖家
const getAllSellerApi = (data) => {
  return request.post("/admin/seller/all",data)
}
//获取近七日销售额
const getSevenDaysSellApi = (data) => {
  return request.post("/admin/seller/amount",data)
}
//获取首页数据统计
const getHomeStatisticsApi = () => {
  return request.get("/admin/seller/statistics")
}
//获取所有待处理订单
const getAllWaitOrderApi = (data) => {
  return request.post("/admin/order/wait",data)
}
//确认发货
const confirmSendApi = (data) => {
  return request.post("/admin/order/confirm_send",data)
}
//查询历史订单
const getHistoryOrderApi = (data) => {
  return request.post("/admin/order/seller",data)
}
//删除订单
const delTargetOrderApi = (data) => {
  return request.post("/admin/order/del",data)
}
export {
  handleBackLogin,
  getUserInfo,
  handleUploadImage,
  addNewsApi,
  getNewsList,
  modifyNews,
  delTargetNews,
  addProductApi,
  getNeedCheckProject,
  setProductCheckPass,
  setProductRefuse,
  getNotifyApi,
  clearAllNotifyApi,
  getSellerProductApi,
  editProductApi,
  getCarouselApi,
  addCarouselApi,
  delTargetCarouselApi,
  getAllProductListApi,
  getWeekRecommendApi,
  addWeekRecommendApi,
  delWeekRecommendApi,
  modifyWeekRecommendApi,
  getAllSellerApi,
  getSevenDaysSellApi,
  getHomeStatisticsApi,
  getAllWaitOrderApi,
  confirmSendApi,
  getHistoryOrderApi,
  delTargetOrderApi
};
