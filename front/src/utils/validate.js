//验证邮箱
function validateEmail(val) {
  return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val);
}

//验证手机号
function validatePhone(phone) {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone);
}

export { validateEmail, validatePhone };
