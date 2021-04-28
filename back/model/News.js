const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let NewsSchma = new Schema({
  nid: {
    type: String,
    require: true,
  },
  mainPic: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  goods: {
    type: Array,
    default: [],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

let NewsModel = mongoose.model("News", NewsSchma);
module.exports = NewsModel;
