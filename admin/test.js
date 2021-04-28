let getBeforetime = function(d, n) {
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
};

console.log(getBeforetime("2021/4/26",7))
