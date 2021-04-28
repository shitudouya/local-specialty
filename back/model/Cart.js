const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let CartSchma = new Schema({
  cart_id: {
    type: String,
    require: true,
  },
  pid: {
    type: String,
    require: true,
  },
  seller_uid: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
  count: {
    type: Number,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
  selected: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
let CartsModel = mongoose.model("Carts", CartSchma);
module.exports = CartsModel;
