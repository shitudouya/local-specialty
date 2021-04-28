const Router = require("koa-router");
let QINIU_UPLOAD = require("../config/qiniu");
let router = new Router();


router.post("/upload", async (ctx) => {

  let url = await QINIU_UPLOAD.uploadFileToQiniu(ctx);
  ctx.body = {
    code: 200,
    msg: "success upload",
    img: url,
  };
});

module.exports = router.routes();