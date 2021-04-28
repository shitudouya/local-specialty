const nodemailer = require("nodemailer");

//设置邮箱配置
let transporter = nodemailer.createTransport({
  //通过lib/well-known/services.json获取
  host: "smtp.qq.com", //邮箱服务的主机，如smtp.qq.com
  port: "465", //对应的端口号
  secure: true,
  auth: {
    user: "1208042726@qq.com",
    pass: "kgugtiszfimcjbcj", //密码到qq邮箱中的设置中开启pop3/smtp后获取
  },
});

module.exports = {
  transporter,
};
