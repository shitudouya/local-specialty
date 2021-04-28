const Router = require("koa-router");
const passport = require("koa-passport");
let router = new Router();
let Store = require("../model/Store");
let User = require("../model/User");
let News = require("../model/News");
let InviteCode = require("../model/InviteCode");
let Product = require("../model/Product");
let WeekRecommend = require("../model/WeekRecommend");
let SellRecord = require("../model/SellRecord");
let Cart = require("../model/Cart");
let Carousel = require("../model/Carousel");
let Order = require("../model/Order");
let Comments = require("../model/Comment");
let axios = require("axios");
let { AlipayFormData, alipaySdk } = require("../utils/aplipay");
const { classifyMap, formatTimeShort } = require("../utils/handler");
const { math } = require("../utils/math");
const uuid = require("uuid");

//获取首页轮播
router.get("/carousel", async (ctx) => {
  let res = await Carousel.find();
  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});

//获取分类以及分类下的商品
router.get("/classify/product", async (ctx) => {
  let tsxc = await Product.find({ classify: "特色小吃" }).sort({ sales: -1, status: 1 }).limit(12);
  let sggg = await Product.find({ classify: "水果干果" }).sort({ sales: -1, status: 1 }).limit(12);
  let slsc = await Product.find({ classify: "时令蔬菜" }).sort({ sales: -1, status: 1 }).limit(12);
  let gtyj = await Product.find({ classify: "罐头腌菜" }).sort({ sales: -1, status: 1 }).limit(12);
  let csyp = await Product.find({ classify: "茶水饮品" }).sort({ sales: -1, status: 1 }).limit(12);
  let jqhx = await Product.find({ classify: "家禽海鲜" }).sort({ sales: -1, status: 1 }).limit(12);
  let dftc = await Product.find({ classify: "地方特产" }).sort({ sales: -1, status: 1 }).limit(12);
  let szhw = await Product.find({ classify: "山珍海味" }).sort({ sales: -1, status: 1 }).limit(12);

  ctx.body = {
    code: 200,
    msg: "success",
    data: [
      { classify: "特色小吃", children: tsxc },
      { classify: "水果干果", children: sggg },
      { classify: "时令蔬菜", children: slsc },
      { classify: "罐头腌菜", children: gtyj },
      { classify: "茶水饮品", children: csyp },
      { classify: "家禽海鲜", children: jqhx },
      { classify: "地方特产", children: dftc },
      { classify: "山珍海味", children: szhw },
    ],
  };
});

//获取热销单品
router.get("/product/hotsingle", async (ctx) => {
  let hot = await Product.find({ status: 1 }).sort({ sales: -1 }).limit(1);
  ctx.body = {
    code: 200,
    msg: "success",
    data: hot[0],
  };
});

//获取最多收藏
router.get("/product/hotstore", async (ctx) => {
  let more = await Product.find({ status: 1 }).sort({ store_count: -1 }).limit(1);
  ctx.body = {
    code: 200,
    msg: "success",
    data: more[0],
  };
});

//获取18个猜你喜欢
router.get("/product/random", async (ctx) => {
  let res = await Product.aggregate([{ $sample: { size: 18 } }, { $match: { status: 1 } }]);
  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});

//获取指定省份下的土特产
router.post("/product/province", async (ctx) => {
  const { province } = ctx.request.body;
  let res = await Product.find({ status: 1, area: province }).sort({ sales: -1 }).limit(12);
  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});
//获取首页前4条资讯
router.get("/news/home", async (ctx) => {
  let res = await News.find().sort({ created: -1 }).limit(4);
  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});

router.post("/news/list", async (ctx) => {
  let { pageSize, pageNum } = ctx.request.body;
  pageSize = parseInt(pageSize);
  pageNum = parseInt(pageNum);
  let res = await News.find()
    .sort({ created: -1 })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);
  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});

//获取商品详情
router.post("/product/detail", async (ctx) => {
  const { pid } = ctx.request.body;
  let res = await Product.findOne({ pid, status: 1 });
  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});

//添加收藏
router.post("/product/store", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  const { pid } = ctx.request.body;
  let findRes = await Store.findOne({ uid, pid });
  if (findRes) {
    await Store.deleteOne({ uid, pid });
    await Product.updateOne({ pid }, { $inc: { store_count: -1 } });
    ctx.body = {
      code: 200,
      msg: "取消成功",
    };
  } else {
    let newData = new Store({ uid, pid });
    await newData.save();
    await Product.updateOne({ pid }, { $inc: { store_count: 1 } });
    ctx.body = {
      code: 200,
      msg: "添加成功，你可以到个人中心查看收藏的商品",
    };
  }
});
//查看该商品是否被当前用户收藏

router.post("/product/is_store", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  const { pid } = ctx.request.body;
  let findRes = await Store.findOne({ uid, pid });
  if (findRes) {
    ctx.body = {
      code: 200,
      msg: "success",
      data: true,
    };
  } else {
    ctx.body = {
      code: 200,
      msg: "success",
      data: false,
    };
  }
});

//获取收藏的商品
router.get("/product/store", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  let res = await Store.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "pid",
        foreignField: "pid",
        as: "_product",
      },
    },
    {
      $match: { uid },
    },
    {
      $sort: { created: -1 },
    },
  ]);
  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});
//取消收藏
router.post("/product/store/del", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  const { pid } = ctx.request.body;
  await Store.deleteOne({ uid, pid });
  await Product.updateOne({ pid }, { $inc: { store_count: -1 } });
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

//加入购物车
router.post("/cart/add", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  let { pid, count, seller_uid } = ctx.request.body;
  count = parseInt(count);
  //添加前查看有没有这个商品了
  let findRes = await Product.findOne({ pid });
  if (findRes) {
    //查看有没有超过库存
    if (findRes.stock < count) {
      ctx.body = {
        code: 400,
        msg: "添加的数量超过库存",
      };
    } else {
      //看看购物中是否已经添加过了
      let isExist = await Cart.findOne({ uid, pid });
      if (isExist) {
        //判断商品有没有超过100个
        let exist_count = count + isExist.count;
        if (exist_count > 100) {
          ctx.body = {
            code: 400,
            msg: "购物车中数量超过了最大限制",
          };
        } else {
          await Cart.updateOne(
            { uid, pid },
            { $set: { count: exist_count, total: math.multiply(findRes.price, exist_count) } }
          );
          ctx.body = {
            code: 200,
            msg: "success",
          };
        }
      } else {
        let newData = new Cart({
          uid,
          pid,
          count,
          seller_uid,
          cart_id: uuid.v4().substr(0, 8),
          total: math.multiply(findRes.price, count),
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
      msg: "未找到该商品，请刷新后重试",
    };
  }
});

//获取购物车
router.get("/cart", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  let res = await Cart.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "pid",
        foreignField: "pid",
        as: "_product",
      },
    },
    {
      $match: { uid },
    },
  ]);

  if (res.length > 0) {
    res.forEach((item) => {
      item.cover = item._product[0].cover[0].url;
      item.price = item._product[0].price;
      item.title = item._product[0].title;
      item.seller_uid = item._product[0].uid;
      delete item._product;
    });
  }

  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});

//删除购物车
router.post("/cart/del", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  let { cart_id } = ctx.request.body;
  await Cart.deleteOne({ cart_id, uid });
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

//创建订单
router.post("/order/create", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  let order_id = uuid.v4().replace(/-/g, "").substr(0, 16);
  let { money, address_base, address_detail, realname, phone, list } = ctx.request.body;
  const formData = new AlipayFormData();
  formData.setMethod("get");
  formData.addField("appId", "2016102400751867");
  formData.addField("charset", "utf-8");
  formData.addField("signType", "RSA2");
  formData.addField("returnUrl", "http://localhost:5500/checkout/result");
  formData.addField("bizContent", {
    outTradeNo: order_id, // 【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
    productCode: "FAST_INSTANT_TRADE_PAY", // 【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
    totalAmount: money.toString(), // 【必选】订单总金额，精确到小数点后两位
    subject: "商品支付", // 【必选】 订单标题
  });

  for (let i = 0; i < list.length; i++) {
    let newData = new Order({
      order_id: uuid.v4().replace(/-/g, "").substr(0, 16),
      seller_uid: list[i].seller_uid,
      buyer_uid: uid,
      address_base,
      address_detail,
      realname,
      phone,
      relative_order_id: order_id,
      product: {
        cover: list[i].cover,
        price: list[i].price,
        title: list[i].title,
        pid: list[i].pid,
        count: list[i].count,
      },
      money: list[i].total,
    });
    await newData.save();
    await Cart.deleteOne({ uid, cart_id: list[i].cart_id });
  }

  const result = await alipaySdk.exec("alipay.trade.page.pay", {}, { formData });
  ctx.body = {
    code: 200,
    msg: "success",
    data: result,
  };
});

//查询订单是否支付成功
router.post("/order/status", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { out_trade_no } = ctx.request.body;
  const formData = new AlipayFormData();
  formData.setMethod("get");
  formData.addField("bizContent", {
    out_trade_no: out_trade_no,
  });
  const result = await alipaySdk.exec("alipay.trade.query", {}, { formData });
  let currentState = await axios.get(result);

  let r = currentState.data.alipay_trade_query_response;
  if (r.code === "10000") {
    switch (r.trade_status) {
      case "WAIT_BUYER_PAY":
        ctx.body = {
          code: 200,
          timestamp: new Date().getTime(),
          result: {
            status: 0,
            massage: "交易创建，等待买家付款",
          },
        };
        break;
      case "TRADE_CLOSED":
        ctx.body = {
          code: 200,
          timestamp: new Date().getTime(),
          result: {
            status: 1,
            massage: "未付款交易超时关闭，或支付完成后全额退款",
          },
        };
        break;
      case "TRADE_SUCCESS":
        let findRes = await Order.find({ relative_order_id: out_trade_no, status: 0 });
        if (findRes.length > 0) {
          for (let i = 0; i < findRes.length; i++) {
            let seller_uid = findRes[i].seller_uid;
            let total = findRes[i].money;
            let isExist = await SellRecord.findOne({ seller_uid, today: formatTimeShort() });
            if (isExist) {
              let newTotal = math.add(isExist.income, total);
              await SellRecord.updateOne({ seller_uid, today: formatTimeShort() }, { $set: { income: newTotal } });
              ctx.body = {
                code: 200,
                timestamp: new Date().getTime(),
                result: {
                  status: 2,
                  massage: "交易支付成功",
                },
              };
            } else {
              let newData = new SellRecord({ seller_uid, today: formatTimeShort(), income: total });
              await newData.save();
              ctx.body = {
                code: 200,
                timestamp: new Date().getTime(),
                result: {
                  status: 2,
                  massage: "交易支付成功",
                },
              };
            }
          }
        } else {
          let oneRes = await Order.findOne({ order_id: out_trade_no, status: 0 });
          if (oneRes) {
            let seller_uid = oneRes.seller_uid;
            let total = oneRes.money;
            let isExist = await SellRecord.findOne({ seller_uid, today: formatTimeShort() });
            if (isExist) {
              let newTotal = math.add(isExist.income, total);
              await SellRecord.updateOne({ seller_uid, today: formatTimeShort() }, { $set: { income: newTotal } });
              ctx.body = {
                code: 200,
                timestamp: new Date().getTime(),
                result: {
                  status: 2,
                  massage: "交易支付成功",
                },
              };
            } else {
              let newData = new SellRecord({ seller_uid, today: formatTimeShort(), income: total });
              await newData.save();
              ctx.body = {
                code: 200,
                timestamp: new Date().getTime(),
                result: {
                  status: 2,
                  massage: "交易支付成功",
                },
              };
            }
          } else {
            ctx.body = {
              code: 200,
              timestamp: new Date().getTime(),
              result: {
                status: 2,
                massage: "交易支付成功",
              },
            };
          }
        }
        break;
      case "TRADE_FINISHED":
        ctx.body = {
          code: 200,
          timestamp: new Date().getTime(),
          result: {
            status: 3,
            massage: "交易结束，不可退款",
          },
        };
        break;
    }
  } else if (r.code === "40004") {
    ctx.body = {
      code: 400,
      msg: "交易不存在",
    };
  }
});

//支付完成修改订单状态
router.post("/order/status/modify", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { status, order_id } = ctx.request.body;
  let res = await Order.find({ relative_order_id: order_id, status: 0 });
  if (res.length > 0) {
    for (let i = 0; i < res.length; i++) {
      let product = res[i].product;
      await Product.updateOne({ pid: product.pid }, { $inc: { sales: product.count, stock: -product.count } });
    }
    await Order.updateMany({ relative_order_id: order_id }, { $set: { status } });
    ctx.body = {
      code: 200,
      msg: "success",
    };
  } else {
    let oneRes = await Order.findOne({ order_id, status: 0 });
    if (oneRes) {
      await Product.updateOne(
        { pid: oneRes.product.pid },
        { $inc: { sales: oneRes.product.count, stock: -oneRes.product.count } }
      );
      await Order.updateOne({ order_id }, { $set: { status } });
      ctx.body = {
        code: 200,
        msg: "success",
      };
    } else {
      ctx.body = {
        code: 200,
        msg: "success",
      };
    }
  }
});

//获取全部订单
router.get("/user/order", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  let list = await Order.aggregate([
    {
      $lookup: {
        from: "comments",
        localField: "order_id",
        foreignField: "order_id",
        as: "_comments",
      },
    },
    {
      $match: {
        buyer_uid: uid,
      },
    },
    {
      $sort: {
        created: -1,
      },
    },
  ]);
  ctx.body = {
    code: 200,
    msg: "success",
    data: list,
  };
});
//取消订单
router.post("/user/order/cancel", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  const { order_id } = ctx.request.body;
  await Order.deleteOne({ buyer_uid: uid, order_id });
  ctx.body = {
    code: 200,
    msg: "success",
  };
});

//继续支付订单
router.post("/user/order/continue", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  const { order_id } = ctx.request.body;
  let findRes = await Order.findOne({ buyer_uid: uid, order_id });
  if (findRes) {
    if (findRes.status !== 0) {
      ctx.body = {
        code: 400,
        msg: "该订单已支付",
      };
    } else {
      const formData = new AlipayFormData();
      formData.setMethod("get");
      formData.addField("appId", "2016102400751867");
      formData.addField("charset", "utf-8");
      formData.addField("signType", "RSA2");
      formData.addField("returnUrl", "http://localhost:5500/checkout/result");
      formData.addField("bizContent", {
        outTradeNo: order_id, // 【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
        productCode: "FAST_INSTANT_TRADE_PAY", // 【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
        totalAmount: findRes.money.toString(), // 【必选】订单总金额，精确到小数点后两位
        subject: "商品支付", // 【必选】 订单标题
      });
      const result = await alipaySdk.exec("alipay.trade.page.pay", {}, { formData });
      ctx.body = {
        code: 200,
        msg: "success",
        data: result,
      };
    }
  } else {
    ctx.body = {
      code: 400,
      msg: "未找到相关订单",
    };
  }
});

//根据指定条件筛选商品
router.post("/product/all/sort", async (ctx) => {
  let { area, classify, sort, pageSize, pageNum } = ctx.request.body;
  classify = parseInt(classify);
  sort = parseInt(sort);
  pageSize = parseInt(pageSize);
  pageNum = parseInt(pageNum);
  let classifyText = classifyMap[classify];
  if (area === "全部") {
    if (classify === 0) {
      if (sort === 1) {
        let total = await Product.find().sort({ sales: -1 });
        let res = await Product.find()
          .sort({ sales: -1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 2) {
        let total = await Product.find().sort({ price: -1 });
        let res = await Product.find()
          .sort({ price: -1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 3) {
        let total = await Product.find().sort({ price: 1 });
        let res = await Product.find()
          .sort({ price: 1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 4) {
        let total = await Product.find().sort({ sales: 1 });
        let res = await Product.find()
          .sort({ sales: 1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else {
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: [],
            total: 0,
          },
        };
      }
    } else {
      if (sort === 1) {
        let total = await Product.find({ classify: classifyText }).sort({ sales: -1 });
        let res = await Product.find({ classify: classifyText })
          .sort({ sales: -1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 2) {
        let total = await Product.find({ classify: classifyText }).sort({ price: -1 });
        let res = await Product.find({ classify: classifyText })
          .sort({ price: -1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 3) {
        let total = await Product.find({ classify: classifyText }).sort({ price: 1 });
        let res = await Product.find({ classify: classifyText })
          .sort({ price: 1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 4) {
        let total = await Product.find({ classify: classifyText }).sort({ sales: 1 });
        let res = await Product.find({ classify: classifyText })
          .sort({ sales: 1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else {
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: [],
            total: 0,
          },
        };
      }
    }
  } else {
    if (classify === 0) {
      if (sort === 1) {
        let total = await Product.find({ area }).sort({ sales: -1 });
        let res = await Product.find({ area })
          .sort({ sales: -1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 2) {
        let total = await Product.find({ area }).sort({ price: -1 });
        let res = await Product.find({ area })
          .sort({ price: -1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 3) {
        let total = await Product.find({ area }).sort({ price: 1 });
        let res = await Product.find({ area })
          .sort({ price: 1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 4) {
        let total = await Product.find({ area }).sort({ sales: 1 });
        let res = await Product.find({ area })
          .sort({ sales: 1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else {
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: [],
            total: 0,
          },
        };
      }
    } else {
      if (sort === 1) {
        let total = await Product.find({ area, classify: classifyText }).sort({ sales: -1 });
        let res = await Product.find({ area, classify: classifyText })
          .sort({ sales: -1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 2) {
        let total = await Product.find({ area, classify: classifyText }).sort({ price: -1 });
        let res = await Product.find({ area, classify: classifyText })
          .sort({ price: -1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 3) {
        let total = await Product.find({ area, classify: classifyText }).sort({ price: 1 });
        let res = await Product.find({ area, classify: classifyText })
          .sort({ price: 1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else if (sort === 4) {
        let total = await Product.find({ area, classify: classifyText }).sort({ sales: 1 });
        let res = await Product.find({ area, classify: classifyText })
          .sort({ sales: 1 })
          .skip((pageNum - 1) * pageSize)
          .limit(pageSize);
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: res,
            total: total.length,
          },
        };
      } else {
        ctx.body = {
          code: 200,
          msg: "success",
          data: {
            list: [],
            total: 0,
          },
        };
      }
    }
  }
});

router.post("/product/search", async (ctx) => {
  let { keyword, sort } = ctx.request.body;
  sort = parseInt(sort);
  const reg = new RegExp(keyword, "i");
  if (sort === 0) {
    let res = await Product.find({ $or: [{ title: { $regex: reg } }] }).sort({ sales: -1 });
    ctx.body = {
      code: 200,
      msg: "success",
      data: res,
    };
  } else if (sort === 1) {
    let res = await Product.find({ $or: [{ title: { $regex: reg } }] }).sort({ price: 1 });
    ctx.body = {
      code: 200,
      msg: "success",
      data: res,
    };
  } else if (sort === 2) {
    let res = await Product.find({ $or: [{ title: { $regex: reg } }] }).sort({ price: -1 });
    ctx.body = {
      code: 200,
      msg: "success",
      data: res,
    };
  } else {
    ctx.body = {
      code: 200,
      msg: "success",
      data: [],
    };
  }
});

//获取官方推荐
router.get("/week/recommend", async (ctx) => {
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
});

//获取文章详情
router.post("/news/detail", async (ctx) => {
  const { nid } = ctx.request.body;
  let findRes = await News.findOne({ nid });
  ctx.body = {
    code: 200,
    msg: "success",
    data: findRes,
  };
});
//随机获取三篇文章
router.get("/news/random", async (ctx) => {
  let res = await News.aggregate([{ $sample: { size: 3 } }]);
  ctx.body = {
    code: 200,
    msg: "success",
    data: res,
  };
});

//文章点赞
router.post("/news/goods", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { nid } = ctx.request.body;
  const { uid } = ctx.state.user;
  let findRes = await News.findOne({ nid });
  if (findRes) {
    if (findRes.goods.includes(uid)) {
      ctx.body = {
        code: 400,
        msg: "已点过赞",
      };
    } else {
      await News.updateOne(
        {
          nid,
        },
        {
          $push: { goods: uid },
        }
      );
      ctx.body = {
        code: 200,
        msg: "success",
      };
    }
  } else {
    ctx.body = {
      code: 400,
      msg: "未找到指定文章",
    };
  }
});
//确认收货
router.post("/order/confirm_receive", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  const { order_id } = ctx.request.body;
  let findRes = await Order.findOne({ buyer_uid: uid, order_id, status: 2 });
  if (findRes) {
    await Order.updateOne({ buyer_uid: uid, order_id, status: 2 }, { $set: { status: 3 } });
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
});

//前台订单假删除
router.post("/order/fake_del", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  const { order_id } = ctx.request.body;
  let findRes = await Order.findOne({ buyer_uid: uid, order_id, status: 3 });
  if (findRes) {
    await Order.updateOne({ buyer_uid: uid, order_id, status: 3 }, { $set: { status: 9 } });
    ctx.body = {
      code: 200,
      msg: "success",
    };
  } else {
    ctx.body = {
      code: 400,
      msg: "不满足删除条件",
    };
  }
});

//发布评论
router.post("/product/comments", passport.authenticate("jwt", { session: false }), async (ctx) => {
  const { uid } = ctx.state.user;
  const { seller_uid, picList, pid, content, type, order_id } = ctx.request.body;
  let findRes = Order.findOne({ buyer_uid: uid, order_id, status: 3 });
  if (findRes) {
    let isExist = await Comments.findOne({ order_id, buyer_uid: uid });
    if (isExist) {
      ctx.body = {
        code: 400,
        msg: "已经评论过了",
      };
    } else {
      let newData = new Comments({
        seller_uid,
        order_id,
        buyer_uid: uid,
        type,
        picList,
        pid,
        cid: uuid.v4().substr(0, 10),
        content,
      });
      await newData.save();
      ctx.body = {
        code: 200,
        msg: "success",
      };
    }
  } else {
    ctx.body = {
      code: 400,
      msg: "评价检测异常",
    };
  }
});

//获取商品评论
router.post("/product/comments/get", async (ctx) => {
  const { pid } = ctx.request.body;
  let findRes = await Comments.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "buyer_uid",
        foreignField: "uid",
        as: "_buyer",
      },
    },
    {
      $match: {
        pid,
      },
    },
    {
      $sort: {
        created: -1,
      },
    },
  ]);
  if (findRes.length > 0) {
    //全部评论
    let total = findRes.length;
    //好评数
    let goodList = await Comments.find({ pid, type: "好评" });
    //好评率
    let goodRate = ((goodList.length / total) * 100).toFixed(0);
    //差评数
    let badList = await Comments.find({ pid, type: "差评" });
    //中评数
    let midList = await Comments.find({ pid, type: "中评" });
    //带图评价数
    let hasPic = await Comments.find({ pid, picList: { $exists: true, $ne: [] } });
    ctx.body = {
      code: 200,
      msg: "success",
      data: {
        total,
        goodNum: goodList.length,
        badNum: badList.length,
        midNum: midList.length,
        goodRate,
        hasPicNum: hasPic.length,
        list: findRes,
      },
    };
  } else {
    ctx.body = {
      code: 200,
      msg: "success",
      data: {},
    };
  }
});
//填写邀请码成为卖家身份
router.post("/register/seller", passport.authenticate("jwt", { session: false }), async (ctx) => {
  let { code } = ctx.request.body;
  const { uid } = ctx.state.user;
  if (code.trim().length === 0) {
    ctx.body = {
      code: 400,
      msg: "邀请码不能为空",
    };
  } else {
    let findRes = await InviteCode.findOne({ code });
    if (findRes) {
      await User.updateOne({ uid }, { $set: { permission: 1, roles: ["seller"] } });
      await InviteCode.deleteOne({ code });
      ctx.body = {
        code: 200,
        msg: "success",
      };
    } else {
      ctx.body = {
        code: 400,
        msg: "邀请码不正确",
      };
    }
  }
});
module.exports = router.routes();
