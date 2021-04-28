const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const body = require("koa-body");
const passport = require("koa-passport");
const session = require("koa-session");

let app = new Koa();
let router = new Router();

let user = require("./routes/user");
let upload = require("./routes/upload");
let admin = require("./routes/admin");
let front = require("./routes/front")
app.keys = ["captcha secret"];

const CONFIG = {
  key: "captchaSecret",
  maxAge: 30 * 60 * 1000,
  httpOnly: true,
  signed: true,
};

app.use(
  cors({
    origin: function (ctx) {
      return ctx.header.origin;
    },
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
  })
);

app.use(
  body({
    multipart: true,
    formidable: {
      maxFileSize: 10 * 1024 * 1024,
      keepExtensions: true,
    },
  })
);
app.use(bodyParser({ jsonLimit: "10mb", textLimit: "10mb", formLimit: "10mb" }));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

router.use("/api/img", upload);
router.use("/api/user", user);
router.use("/api/admin", admin);
router.use("/api/front",front);
app.use(session(CONFIG, app));
app.use(router.routes());

app.listen(4044, () => {
  console.log("server is running at http://localhost:4044");
});
