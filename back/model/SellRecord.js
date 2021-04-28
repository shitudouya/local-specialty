const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let SellRecordSchma = new Schema({
  seller_uid: {
    type: String,
    require: true,
  },
  today: {
    type: String,
    require: true,
  },
  income: {
    type: Number,
    require: true,
  },
});

let SellRecordModel = mongoose.model("SellRecord", SellRecordSchma);
module.exports = SellRecordModel;
