const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let WeekRecommendSchma = new Schema({
  pid: {
    type: String,
    require: true,
  },
  reason: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

let WeekRecommendModel = mongoose.model("WeekRecommend", WeekRecommendSchma);
module.exports = WeekRecommendModel;
