import dayjs from "dayjs";
import { mathjs } from "./math";

function timeFormatAll(date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

function timeFormatShort() {
  return dayjs().format("YYYY/MM/DD");
}

function isTimerBeforeNow(date) {
  return dayjs().isBefore(dayjs(date));
}

const statusMapping = {
  2: "已发货，待确认",
  3: "交易完成",
  9: "交易完成，买家已删除该订单",
};
function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function(n, prec) {
      let k = Math.pow(10, prec);
      return "" + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  let re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

function computedTotalMoney(list) {
  let total = 0;
  if (list.length === 0) {
    return total;
  } else {
    list.forEach((item) => {
      total += mathjs.add(total, item.income);
    });
    return total;
  }
}

function getBeforetime(d, n) {
  d = new Date(d);
  let timearray = [];
  for (let i = 0; i < n; i++) {
    let dd = d;
    dd = +dd - 1000 * 60 * 60 * 24 * i;
    dd = new Date(dd);
    let year = dd.getFullYear();
    let mon = dd.getMonth() + 1;
    let day = dd.getDate();
    let s = year + "/" + (mon < 10 ? "0" + mon : mon) + "/" + (day < 10 ? "0" + day : day);
    timearray.push(s);
  }
  return timearray.reverse();
}

export { timeFormatAll, isTimerBeforeNow, computedTotalMoney, number_format, getBeforetime, timeFormatShort,statusMapping };
