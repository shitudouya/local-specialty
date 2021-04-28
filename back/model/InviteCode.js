const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let InviteCodeSchma = new Schema({
  code: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

let InviteCodeModel = mongoose.model("InviteCode", InviteCodeSchma);
module.exports = InviteCodeModel;
