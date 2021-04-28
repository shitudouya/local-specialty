const mongoose = require("mongoose");
const { BASE_URL } = require("../config/db");

mongoose
  .connect(BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected...");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
