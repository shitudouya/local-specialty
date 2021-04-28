const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let CommentsSchma = new Schema({
  buyer_uid: {
    type: String,
    require: true,
  },
  seller_uid: {
    type: String,
    require: true,
  },
  order_id: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  picList: {
    type: Array,
    default: [],
  },
  pid: {
    type: String,
    require: true,
  },
  cid: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
let CommentsModel = mongoose.model("Comments", CommentsSchma);
module.exports = CommentsModel;
