const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let UserSchma = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://fast.tudoublog.com/33f47817160c.jpeg",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  roles: {
    type: Array,
    default: ["user"],
  },
  permission: {
    type: Number,
    default: 0,
  },
});
let UserModel = mongoose.model("Users", UserSchma);
module.exports = UserModel;
