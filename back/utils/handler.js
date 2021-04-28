let dayjs = require("dayjs");

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function formatTimeShort() {
  return dayjs().format("YYYY/MM/DD");
}

const classifyMap = {
  1: "特色小吃",
  2: "水果干果",
  3: "时令蔬菜",
  4: "罐头腌菜",
  5: "茶水饮品",
  6: "地方特产",
  7: "山珍海味",
  8: "家禽海鲜",
};

module.exports = { randomNum, classifyMap, formatTimeShort };
