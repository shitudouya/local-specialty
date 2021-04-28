const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let StoreSchma = new Schema({
  pid: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

let StoresModel = mongoose.model("Stores", StoreSchma);
module.exports = StoresModel;
