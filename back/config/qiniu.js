let qiniu = require("qiniu");
let uuid = require("uuid");
let fs = require("fs");
const QINIU_CONFIG = {
  accessKey: "_PU8BAur-gmR8_sKHv72hbOwlUKeTNpAHRYzjel2",
  secretKey: "1h7OvBPwZNmToZTxsB0MTFWkPrlIgIji5sP7jBLN",
  bucket: "tudoublog",
  url: "https://fast.tudoublog.com",
};

const uploadToQiniu = (file, key) => {
  const accessKey = QINIU_CONFIG.accessKey;
  const secretKey = QINIU_CONFIG.secretKey;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

  const options = {
    scope: QINIU_CONFIG.bucket,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);

  const uploadToken = putPolicy.uploadToken(mac);
  const config = new qiniu.conf.Config();

  config.zone = qiniu.zone.Zone_z0;

  const localFile = file;

  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  return new Promise((resolved, reject) => {
    formUploader.putStream(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        reject(respErr);
      } else {
        resolved(respBody);
      }
    });
  });
};

class GetAlbumController {
  async uploadFileToQiniu(ctx) {
    const file = ctx.request.files.file;
    if (file) {
      const fileName = uuid.v4().substring(24);
      const reader = fs.createReadStream(file.path);
      const ext = file.name.split(".").pop();
      const fileUrl = `${fileName}.${ext}`;
      const result = await uploadToQiniu(reader, fileUrl);
      if (result) {
        let url = QINIU_CONFIG.url + "/" + result.key;
        return url;
      } else {
        return "error";
      }
    }
  }
}

module.exports = new GetAlbumController();
