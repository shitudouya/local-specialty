const Router = require("koa-router");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("koa-passport");
let router = new Router();
let User = require("../model/User");
let News = require("../model/News");
let Product = require("../model/Product");
let Notify = require("../model/Notify");
let Carousel = require("../model/Carousel");
let Comments = require("../model/Comment");
let { math } = require("../utils/math");
let SellRecord = require("../model/SellRecord");
let Order = require("../model/Order");
let WeekRecommend = require("../model/WeekRecommend");
let InviteCode = require("../model/InviteCode");
const uuid = require("uuid");
const { formatTimeShort } = require("../utils/handler");

router.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body;
  const findResult = await User.findOne({ email });
  if (!findResult) {
    ctx.body = { code: 400, msg: "用户不存在！" };
  } else {
    if (findResult.permission === 0) {
      ctx.body = {
        code: 400,
        msg: "请使用专属账号登录",
      };
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
//添加文章
router.post("/news/add", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { title, mainPic, content } = ctx.request.body;
  let nid = uuid.v4().substr(0, 8);
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    let newArticle = new News({ title, mainPic, content, nid });
    await newArticle.save();
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});
//获取所有文章
router.post("/news/all", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  let { pageSize, pageNum, keyword } = ctx.request.body;
  pageSize = parseInt(pageSize);
  pageNum = parseInt(pageNum);

  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    if (keyword.trim() === "") {
      let listLength = await News.find();
      let list = await News.find()
        .sort({ created: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize);
      ctx.body = {
        code: 200,
        msg: "success",
        data: {
          total: listLength.length,
          list,
        },
      };
    } else {
      const reg = new RegExp(keyword, "i");
      let listLength = await News.find({ $or: [{ title: { $regex: reg } }] });
      let list = await News.find({ $or: [{ title: { $regex: reg } }] })
        .sort({ created: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize);
      ctx.body = {
        code: 200,
        msg: "success",
        data: {
          total: listLength.length,
          list,
        },
      };
    }
  }
});
//修改文章
router.post("/news/edit", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { nid, title, mainPic, content } = ctx.request.body;
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    await News.updateOne({ nid }, { $set: { title, mainPic, content } });
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});
//删除文章
router.post("/news/del", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { nid } = ctx.request.body;
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    await News.deleteOne({ nid });
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});

//添加商品
router.post("/product/add", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission, uid } = ctx.state.user;
  let pid = uuid.v4().substr(0, 8);
  const { title, cover, area, classify, tags, short_desc, detail, price, stock } = ctx.request.body;
  if (permission === 0) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    let newData = new Product({
      uid,
      pid,
      title,
      cover,
      area,
      classify,
      tags,
      short_desc,
      detail,
      price,
      stock,
    });
    await newData.save();
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});

//获得商品(管理员)
router.post("/product/all", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  let { pageSize, pageNum, keyword } = ctx.request.body;
  pageSize = parseInt(pageSize);
  pageNum = parseInt(pageNum);

  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    if (keyword.trim() === "") {
      let listLength = await Product.find({ status: 1 });
      let list = await Product.find({ status: 1 })
        .sort({ created: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize);
      ctx.body = {
        code: 200,
        msg: "success",
        data: {
          total: listLength.length,
          list,
        },
      };
    } else {
      const reg = new RegExp(keyword, "i");
      let listLength = await Product.find({ $or: [{ title: { $regex: reg } }], status: 1 });
      let list = await Product.find({ $or: [{ title: { $regex: reg } }], status: 1 })
        .sort({ created: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize);
      ctx.body = {
        code: 200,
        msg: "success",
        data: {
          total: listLength.length,
          list,
        },
      };
    }
  }
});
//获得商品(卖家)
router.post("/product/self", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission, uid } = ctx.state.user;
  let { pageSize, pageNum, keyword } = ctx.request.body;
  pageSize = parseInt(pageSize);
  pageNum = parseInt(pageNum);

  if (permission !== 1) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    if (keyword.trim() === "") {
      let listLength = await Product.find({ uid, status: 1 });
      let list = await Product.find({ uid, status: 1 })
        .sort({ created: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize);
      ctx.body = {
        code: 200,
        msg: "success",
        data: {
          total: listLength.length,
          list,
        },
      };
    } else {
      const reg = new RegExp(keyword, "i");
      let listLength = await Product.find({ uid, $or: [{ title: { $regex: reg } }], status: 1 });
      let list = await Product.find({ uid, $or: [{ title: { $regex: reg } }], status: 1 })
        .sort({ created: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize);
      ctx.body = {
        code: 200,
        msg: "success",
        data: {
          total: listLength.length,
          list,
        },
      };
    }
  }
});

//编辑商品
router.post("/product/edit", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { pid, title, cover, area, classify, tags, short_desc, detail, price, stock } = ctx.request.body;
  if (permission === 0) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    await Product.updateOne(
      { pid },
      { $set: { cover, title, area, classify, tags, short_desc, detail, price, stock, created: Date.now(), status: 0 } }
    );
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});

//下架商品
router.post("/product/del", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { pid } = ctx.request.body;
  if (permission === 0) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    await Product.deleteOne({ pid });
    await Comments.deleteMany({ pid });
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});

//商品审核通过
router.post("/product/check/pass", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { pid, uid, product_title } = ctx.request.body;
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    await Product.updateOne({ pid }, { $set: { status: 1, created: Date.now() } });
    let newData = new Notify({ uid, product_title, status: 1 });
    newData.save();
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});

//商品审核拒绝
router.post("/product/check/refuse", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { pid, uid, product_title, reason } = ctx.request.body;
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    await Product.deleteOne({ pid });
    let newData = new Notify({ uid, product_title, status: 0, reason });
    newData.save();
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});

//获取待审核的商品
router.post("/product/check", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  let { pageSize, pageNum } = ctx.request.body;
  pageSize = parseInt(pageSize);
  pageNum = parseInt(pageNum);
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    let listLength = await Product.find({ status: 0 });
    let list = await Product.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "uid",
          as: "_user",
        },
      },
      {
        $match: { status: 0 },
      },
      {
        $sort: { created: -1 },
      },
      {
        $skip: (pageNum - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ]);
    ctx.body = {
      code: 200,
      msg: "success",
      data: {
        list,
        total: listLength.length,
      },
    };
  }
});

//获取系统消息
router.get("/seller/notify", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission, uid } = ctx.state.user;
  if (permission !== 1) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    let res = await Notify.find({ uid }).sort({ created: -1 });
    ctx.body = {
      code: 200,
      msg: "success",
      data: res,
    };
  }
});
//清除所有消息
router.post("/seller/notify/clear", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission, uid } = ctx.state.user;
  if (permission !== 1) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    await Notify.deleteMany({ uid });
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});

//获取首页轮播
router.get("/home/carousel", async (ctx) => {
  let res = await Carousel.find();
  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});

//删除首页轮播
router.post("/home/carousel/del", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { _id } = ctx.request.body;
  const { permission } = ctx.state.user;
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    let res = await Carousel.deleteOne({ _id });
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});

router.post("/home/carousel/add", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { cover, target_id } = ctx.request.body;
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    let isMax = await Carousel.find();
    if (isMax.length === 8) {
      ctx.body = {
        code: 400,
        msg: "轮播图数量不能超过8张",
      };
    } else {
      let findRes = await Product.findOne({ pid: target_id });
      if (findRes) {
        if (findRes.status === 1) {
          let newData = new Carousel({ cover, target_id, target_title: findRes.title });
          await newData.save();
          ctx.body = {
            code: 200,
            msg: "success",
          };
        } else {
          ctx.body = {
            code: 400,
            msg: "该商品处于待审核中，无法添加",
          };
        }
      } else {
        ctx.body = {
          code: 400,
          msg: "指定的商品不存在",
        };
      }
    }
  }
});

router.post("/week/recommend", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { pid, reason } = ctx.request.body;
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    let findRes = await Product.findOne({ pid, status: 1 });
    if (findRes) {
      let isMax = await WeekRecommend.find();
      if (isMax.length === 6) {
        ctx.body = {
          code: 400,
          msg: "最多只能添加6个推荐",
        };
      } else {
        let isExist = await WeekRecommend.findOne({ pid });
        if (isExist) {
          ctx.body = {
            code: 400,
            msg: "添加的商品已存在推荐中",
          };
        } else {
          let newData = new WeekRecommend({
            pid,
            reason,
          });
          await newData.save();
          ctx.body = {
            code: 200,
            msg: "success",
          };
        }
      }
    } else {
      ctx.body = {
        code: 400,
        msg: "指定的商品不存在或在审核中",
      };
    }
  }
});

router.post("/week/recommend/modfiy", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { _id, pid, reason } = ctx.request.body;
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    let findRes = await Product.findOne({ pid, status: 1 });
    if (findRes) {
      await WeekRecommend.updateOne({ _id }, { $set: { pid, reason, created: Date.now() } });
      ctx.body = {
        code: 200,
        msg: "success",
      };
    } else {
      ctx.body = {
        code: 400,
        msg: "指定的商品不存在或在审核中",
      };
    }
  }
});

router.get("/week/recommend", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    let list = await WeekRecommend.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "pid",
          foreignField: "pid",
          as: "_product",
        },
      },
    ]);
    ctx.body = {
      code: 200,
      msg: "success",
      data: list,
    };
  }
});

router.post("/week/recommend/del", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  const { _id } = ctx.request.body;
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    await WeekRecommend.deleteOne({ _id });
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});

//获取所有卖家
router.post("/seller/all", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission } = ctx.state.user;
  let { pageSize, pageNum, email } = ctx.request.body;
  pageSize = parseInt(pageSize);
  pageNum = parseInt(pageNum);
  if (permission !== 2) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    if (email.trim() === "") {
      let total = await User.find({ permission: 1 });
      let list = await User.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "uid",
            foreignField: "uid",
            as: "_product",
          },
        },
        {
          $lookup: {
            from: "sellrecords",
            localField: "uid",
            foreignField: "sell_uid",
            as: "_record",
          },
        },
        {
          $match: {
            permission: 1,
          },
        },
        {
          $sort: {
            created: -1,
          },
        },
        {
          $skip: (pageNum - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ]);
      ctx.body = {
        code: 200,
        msg: "success",
        data: {
          list,
          total: total.length,
        },
      };
    } else {
      let total = await User.find({ permission: 1, email });
      let list = await User.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "uid",
            foreignField: "uid",
            as: "_product",
          },
        },
        {
          $lookup: {
            from: "sellrecords",
            localField: "uid",
            foreignField: "sell_uid",
            as: "_record",
          },
        },
        {
          $match: {
            permission: 1,
            email,
          },
        },
        {
          $sort: {
            created: -1,
          },
        },
        {
          $skip: (pageNum - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ]);
      ctx.body = {
        code: 200,
        msg: "success",
        data: {
          list,
          total: total.length,
        },
      };
    }
  }
});

//获取近7日销售额
router.post("/seller/amount", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission, uid } = ctx.state.user;

  let { dateList } = ctx.request.body;
  if (permission === 0) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    let resList = [];
    for (let i = 0; i < dateList.length; i++) {
      let findRes = await SellRecord.findOne({ seller_uid: uid, today: dateList[i] });
      if (findRes) {
        resList.push(findRes.income);
      } else {
        resList.push(0);
      }
    }
    ctx.body = {
      code: 200,
      msg: "success",
      data: resList,
    };
  }
});

//获取首页数据统计

router.get("/seller/statistics", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission, uid } = ctx.state.user;
  if (permission === 0) {
    ctx.body = {
      code: 400,
      msg: "没有相关权限",
    };
  } else {
    //获取今日销售额
    let todayAmount = 0;
    let findTodayAmount = await SellRecord.findOne({ today: formatTimeShort(), seller_uid: uid });
    if (findTodayAmount) {
      todayAmount = findTodayAmount.income;
    }
    //获取总销售额
    let totalAmount = 0;
    let findTotalAmount = await SellRecord.find({ seller_uid: uid });
    if (findTotalAmount.length > 0) {
      findTotalAmount.forEach((item) => {
        totalAmount = math.add(totalAmount, item.income);
      });
    }
    //获取上架商品
    let totalSellProduct = await Product.find({ uid, status: 1 });

    //获取待处理订单数
    let allOrder = await Order.find({ status: 1, seller_uid: uid });

    ctx.body = {
      code: 200,
      msg: "success",
      data: {
        totalAmount,
        todayAmount,
        totalSellProduct: totalSellProduct.length,
        handleOrderCount: allOrder.length,
      },
    };
  }
});

//获取所有待处理订单
router.post("/order/wait", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission, uid } = ctx.state.user;
  let { pageSize, pageNum } = ctx.request.body;
  pageSize = parseInt(pageSize);
  pageNum = parseInt(pageNum);

  if (permission === 0) {
    ctx.body = {
      code: 400,
      msg: "沒有相关权限",
    };
  } else {
    let total = await Order.find({ status: 1, seller_uid: uid });
    let res = await Order.find({ status: 1, seller_uid: uid })
      .sort({ created: -1 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);

    ctx.body = {
      code: 200,
      msg: "success",
      data: {
        total: total.length,
        list: res,
      },
    };
  }
});

//确认发货
router.post("/order/confirm_send", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission, uid } = ctx.state.user;
  const { order_id } = ctx.request.body;
  if (permission === 0) {
    ctx.body = {
      code: 400,
      msg: "沒有相关权限",
    };
  } else {
    let findRes = await Order.findOne({ seller_uid: uid, order_id, status: 1 });
    if (findRes) {
      await Order.updateOne({ seller_uid: uid, order_id, status: 1 }, { $set: { status: 2 } });
      ctx.body = {
        code: 200,
        msg: "success",
      };
    } else {
      ctx.body = {
        code: 400,
        msg: "未找到相应订单或订单不满足发货条件",
      };
    }
  }
});

//获取所有订单（卖家）
router.post("/order/seller", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission, uid } = ctx.state.user;
  let { pageSize, pageNum, order_id } = ctx.request.body;
  pageSize = parseInt(pageSize);
  pageNum = parseInt(pageNum);
  if (permission === 0) {
    ctx.body = {
      code: 400,
      msg: "沒有相关权限",
    };
  } else {
    if (order_id.trim().length === 0) {
      let total = await Order.find({ seller_uid: uid, status: { $gte: 2 } });
      let res = await Order.find({ seller_uid: uid, status: { $gte: 2 } })
        .sort({ created: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize);
      ctx.body = {
        code: 200,
        msg: "success",
        data: {
          total: total.length,
          list: res,
        },
      };
    } else {
      let res = await Order.findOne({ seller_uid: uid, status: { $gte: 2 }, order_id });
      if (res === null) {
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            total: 0,
            list: [],
          },
        };
      } else {
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            total: 1,
            list: [res],
          },
        };
      }
    }
  }
});
//卖家删除订单
router.post("/order/del", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { permission, uid } = ctx.state.user;
  let { order_id } = ctx.request.body;
  if (permission === 0) {
    ctx.body = {
      code: 400,
      msg: "沒有相关权限",
    };
  } else {
    await Order.deleteOne({ seller_uid: uid, order_id });
    ctx.body = {
      code: 200,
      msg: "success",
    };
  }
});

//创建邀请码
// router.post("/invite/create",  async (ctx) => {
//   let code =uuid.v4().substr(0,18).replace(/-/g,"");
//   let newData = new InviteCode({code});
//   await newData.save();
//   ctx.body = {
//     code:200,
//     msg:"success"
//   }
// })

module.exports = router.routes();
