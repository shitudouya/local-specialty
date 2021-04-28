const mongoose = require("../db/index");
const Schema = mongoose.Schema;

let CarouselSchma = new Schema({
  cover: {
    type: String,
    require: true,
  },
  target_id: {
    type: String,
    require: true,
  },
  target_title:{
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
let CarouselModel = mongoose.model("Carousels", CarouselSchma);
module.exports = CarouselModel;
