const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let ProductSchma = new Schema({
  pid: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  cover: {
    type: Array,
    require: true,
  },
  area: {
    type: String,
    require: true,
  },
  classify: {
    type: String,
    require: true,
  },
  tags: {
    type: Array,
    require: true,
  },
  short_desc: {
    type: String,
    require: true,
  },
  store_count:{
    type:Number,
    default:0
  },
  detail: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    default: 0,
  },
});
let ProductModel = mongoose.model("Products", ProductSchma);
module.exports = ProductModel;
