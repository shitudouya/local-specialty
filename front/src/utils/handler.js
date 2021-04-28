import { math } from "./math";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

function handlePhoneHidden(phone) {
  let reg = /^(\d{3})\d{4}(\d{4})$/;
  return phone.replace(reg, "$1****$2");
}

function totalMoney(list) {
  let totalmoney = 0;
  list.forEach((item) => {
    totalmoney = math.add(totalmoney, item.total);
  });
  return totalmoney;
}

function replaceHtmlTag(html) {
  return html.replace(/<.*?>/g, "").replace(/#/g, "");
}

function formatTimeAll(date) {
  return dayjs(date).format("YYYY/MM/DD HH:mm:ss");
}

function computedRelativeTime(date) {
  return dayjs(date).fromNow();
}

export { handlePhoneHidden, totalMoney, formatTimeAll, replaceHtmlTag, computedRelativeTime };
