const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let OrderSchma = new Schema({
  //订单id
  order_id: {
    type: String,
    require: true,
  },
  //买家id
  buyer_uid: {
    type: String,
    require: true,
  },
  //卖家id
  seller_uid: {
    type: String,
    require: true,
  },
  //相互关联的id
  relative_order_id: {
    type: String,
    require: true,
  },
  //基本收货地址
  address_base: {
    type: Array,
    require: true,
  },
  //详情收货地址
  address_detail: {
    type: String,
    require: true,
  },
  //真实姓名
  realname: {
    type: String,
    require: true,
  },
  //电话
  phone: {
    type: String,
    require: true,
  },
  product: {
    type: Object,
    require: true,
  },
  //需付金额
  money: {
    type: Number,
    require: true,
  },
  //状态 0：待付款    1：已付款，待发货   2：已发货待确认   3：交易完成
  status: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

let OrdersModel = mongoose.model("Orders", OrderSchma);
module.exports = OrdersModel;
