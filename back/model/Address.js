const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let AddressSchma = new Schema({
  uid: {
    type: String,
    require: true,
  },
  aid: {
    type: String,
    require: true,
  },
  address_base: {
    type: Array,
    require: true,
  },
  address_detail: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  realname: {
    type: String,
    require: true,
  },
});
let Addresses = mongoose.model("Addresses", AddressSchma);
module.exports = Addresses;
