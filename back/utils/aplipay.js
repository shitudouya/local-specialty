const fs = require("fs");
const path = require("path");

const AlipaySDK = require("alipay-sdk").default;
const AlipayFormData = require("alipay-sdk/lib/form").default;

const alipaySdk = new AlipaySDK({
  appId: "2016102400751867", // 你自己的沙箱环境的appId
  privateKey: fs.readFileSync(path.join(__dirname, "../config/private-key.pem"), "ascii"), // 私钥
  signType: "RSA2", // 签名类型
  alipayPublicKey: fs.readFileSync(path.join(__dirname, "../config/public-key.pem"), "ascii"), // 支付宝公钥（不是应用公钥）
  gateway: "https://openapi.alipaydev.com/gateway.do", // 网关地址
  timeout: 5000,
  camelcase: true,
});

module.exports = {
  alipaySdk,
  AlipayFormData,
};
