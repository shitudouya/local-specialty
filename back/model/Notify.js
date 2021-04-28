const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let NotifySchma = new Schema({
  uid: {
    type: String,
    require: true,
  },
  product_title: {
    type: String,
    require: true,
  },
  status: {
    type: Number,
    require: 0,
  },
  reason: {
    type: String,
    default: "",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

let NotifysModel = mongoose.model("Notifys", NotifySchma);
module.exports = NotifysModel;
