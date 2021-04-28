const Router = require("koa-router");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("koa-passport");
const svgCaptcha = require("svg-captcha");
let router = new Router();
let User = require("../model/User");
let Addresses = require("../model/Address");
const { randomNum } = require("../utils/handler");
const { transporter } = require("../utils/email");
const uuid = require("uuid");

/**
 * @router POST api/user/register
 * @desc 注册接口
 * @access  public
 */
router.post("/register", async (ctx) => {
  const { nickname, email, password, code } = ctx.request.body;
  if (!nickname || !password || !email || !code) {
    ctx.body = {
      code: 400,
      msg: "确保参数不为空",
    };
    return;
  }
  let findResult = await User.findOne({ email });
  if (findResult) {
    ctx.body = {
      code: 400,
      msg: "该邮箱已被注册",
    };
    return;
  }

  if (ctx.session.user_email === email && code == ctx.session.user_code) {
    let uid = uuid.v4().substr(0, 8);
    const newUser = new User({
      nickname,
      email,
      uid,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    await newUser.save();
    ctx.body = {
      code: 200,
      msg: "注册成功",
    };
  } else {
    ctx.body = {
      code: 400,
      msg: "验证失败，请检查邮箱和验证码是否匹配",
    };
  }
});

/**
 * @router POST api/user/captcha
 * @desc 获取图像验证码
 * @access public
 */
router.post("/captcha", async (ctx) => {
  const { width, height } = ctx.request.body;
  console.log(width, height);
  if (!width || !height) {
    ctx.body = {
      code: 400,
      msg: "缺少必要参数",
    };
  } else {
    let code = svgCaptcha.create({
      width, //验证码图片宽度
      height, //验证码图片高度
      size: 4, //验证码字符长度
      noise: 2, //干扰线
      color: true, //验证码字体是否颜色
      background: "#0E4A92", ////验证码背景颜色
    });
    ctx.session.captchaCode = code.text.toLowerCase();
    ctx.body = {
      code: 200,
      msg: "success",
      data: code.data,
    };
  }
});

/**
 * @router POST api/user/login
 * @desc 登录接口
 * @access public
 */
router.post("/login", async (ctx) => {
  const { email, password, code } = ctx.request.body;
  if (!email || !password || !code) {
    ctx.body = {
      code: 400,
      msg: "参数不能为空",
    };
    return;
  }
  let verifycode = code.toLowerCase();
  if (verifycode !== ctx.session.captchaCode) {
    ctx.body = {
      code: 400,
      msg: "验证码错误",
    };
    return;
  }
  const findResult = await User.findOne({ email });
  if (!findResult) {
    ctx.body = { code: 400, msg: "用户不存在！" };
  } else {
    let result = bcrypt.compareSync(password, findResult.password);
    if (result) {
      const payload = {
        id: findResult._id,
        nickname: findResult.nickname,
        email: findResult.email,
        avatar: findResult.avatar,
        roles: findResult.roles,
        uid: findResult.uid,
        permission: findResult.permission,
      };
      const token = jwt.sign(payload, "secret", { expiresIn: 12 * 3600 });
      ctx.body = { code: 200, msg: "success", token: "Bearer " + token };
    } else {
      ctx.body = { code: 400, msg: "密码错误" };
    }
  }
});

/**
 * @router POST api/user/register_mail
 * @desc 注册时发送邮箱
 * @access public
 */
router.post("/register_mail", async (ctx) => {
  const { email } = ctx.request.body;
  if (!email) {
    ctx.body = {
      code: 400,
      msg: "邮箱参数不能为空",
    };
    return;
  }

  let result = await User.findOne({ email });
  if (result) {
    ctx.body = {
      code: 400,
      msg: "邮箱已被绑定",
    };
    return;
  }

  let codeNum = randomNum(1000, 9999);

  ctx.session.user_email = email;
  ctx.session.user_code = codeNum;

  //设置收件人信息
  let mailOptions = {
    from: "<1208042726@qq.com>",
    to: `${email}`,
    subject: "我爱土特产账号注册",
    html: `<b>你的验证码为${codeNum},有效期30分钟</b>`,
  };
  console.log(codeNum);
  //发送邮件
  let res = await transporter.sendMail(mailOptions);
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

/**
 * @router POST api/user/avatar
 * @desc 修改用户头像
 * @access private
 */
router.post("/avatar", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  const { avatar } = ctx.request.body;
  if (!avatar) {
    ctx.body = {
      code: 400,
      msg: "参数不能为空",
    };
    return;
  }
  await User.updateOne(
    {
      uid,
    },
    {
      $set: {
        avatar,
      },
    }
  );
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

/**
 * @router POST api/user/modify_mail
 * @desc 发送邮箱用于修改密码
 * @access private
 */
router.post("/modify_mail", async (ctx) => {
  const { email } = ctx.request.body;
  if (!email) {
    ctx.body = {
      code: 400,
      msg: "参数为空",
    };
    return;
  }

  let result = await User.findOne({ email });
  if (!result) {
    ctx.body = {
      code: 400,
      msg: "该邮箱不存在",
    };
    return;
  }

  let codeNum = randomNum(1000, 9999);

  ctx.session.modifyUserEmail = email;
  ctx.session.modifyUserCode = codeNum;

  // 设置收件人信息

  let mailOptions = {
    from: "<1208042726@qq.com>",
    to: `${email}`,
    subject: "我爱土特产密码修改验证",
    html: `<b>你的验证码为${codeNum},有效期30分钟</b>`,
  };
  //发送邮件
  let res = await transporter.sendMail(mailOptions);
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

/**
 * @router POST api/modify/pwd
 * @desc 发送邮箱用于修改密码
 * @access private
 */
router.post("/modify/pwd", async (ctx) => {
  const { code, password } = ctx.request.body;
  console.log(code, password);
  if (!code || !password) {
    return;
  }
  if (password.trim().length < 6 || password.trim().length > 18) {
    ctx.body = {
      code: 400,
      msg: "密码长度在6-18位之间",
    };
    return
  }

  if (code == ctx.session.modifyUserCode) {
    await User.updateOne(
      {
        email: ctx.session.modifyUserEmail,
      },
      {
        $set: {
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        },
      }
    );

    ctx.body = {
      code: 200,
      msg: "success",
    };
    ctx.session.modifyUserEmail = "";
    ctx.session.modifyUserCode = "";
  } else {
    ctx.body = {
      code: 400,
      msg: "验证码错误",
    };
  }
});

/**
 * @router GET api/user/current
 * @desc 获取用户信息
 * @access private
 */
router.get("/current", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { nickname, email, avatar, permission, uid, roles } = ctx.state.user;
  let userInfo = {
    nickname,
    email,
    uid,
    avatar,
    permission,
    roles,
  };
  ctx.body = { code: 200, msg: "success", data: userInfo };
});

//获取用户的收货地址
router.get("/address/get", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  let res = await Addresses.find({ uid });
  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});

//增加收货地址
router.post("/address/add", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  const { address_base, address_detail, phone, realname } = ctx.request.body;
  let aid = uuid.v4();
  let newAddress = new Addresses({ address_base, address_detail, phone, realname, aid, uid });
  await newAddress.save();
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

//修改收货地址
router.post("/address/modify", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { address_base, address_detail, phone, realname, aid } = ctx.request.body;
  await Addresses.updateOne(
    {
      aid,
    },
    {
      $set: {
        address_base,
        address_detail,
        phone,
        realname,
      },
    }
  );
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

//删除收货地址
router.post("/address/del", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { aid } = ctx.request.body;
  await Addresses.deleteOne({ aid });
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

module.exports = router.routes();
