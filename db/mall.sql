/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MongoDB
 Source Server Version : 40208
 Source Host           : localhost:27017
 Source Schema         : mall

 Target Server Type    : MongoDB
 Target Server Version : 40208
 File Encoding         : 65001

 Date: 28/04/2021 14:01:48
*/


// ----------------------------
// Collection structure for addresses
// ----------------------------
db.getCollection("addresses").drop();
db.createCollection("addresses");

// ----------------------------
// Documents of addresses
// ----------------------------
db.getCollection("addresses").insert([ {
    _id: ObjectId("607c3ea221086556b401c132"),
    "address_base": [
        "河南省",
        "郑州市",
        "新郑市"
    ],
    "address_detail": "xxxx",
    phone: "13456789000",
    realname: "xxx",
    aid: "202f7538-676b-4338-8efb-fa6b44d6e53f",
    uid: "16eae502",
    __v: NumberInt("0")
} ]);
db.getCollection("addresses").insert([ {
    _id: ObjectId("60826dede2890d4f346dca8d"),
    "address_base": [
        "河南省",
        "信阳市",
        "固始县"
    ],
    "address_detail": "xxx",
    phone: "13456789000",
    realname: "小明",
    aid: "418b104b-5caf-40ca-a6f7-9ed8706d3939",
    uid: "16eae502",
    __v: NumberInt("0")
} ]);
db.getCollection("addresses").insert([ {
    _id: ObjectId("60855f58f63f35249463f6a1"),
    "address_base": [
        "河南省",
        "郑州市",
        "新郑市"
    ],
    "address_detail": "xxx",
    phone: "13456789000",
    realname: "xxx",
    aid: "eacf6d0b-78e5-40d3-b17c-bb9dff724d42",
    uid: "258d978f",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for carousels
// ----------------------------
db.getCollection("carousels").drop();
db.createCollection("carousels");

// ----------------------------
// Documents of carousels
// ----------------------------
db.getCollection("carousels").insert([ {
    _id: ObjectId("608115f198f72d1480677034"),
    cover: "https://fast.tudoublog.com/50bd583282b4.jpg",
    "target_id": "504eca50",
    "target_title": "安岳馆 雷蒙四川安岳水果柠檬1斤装 单果130-260g",
    created: ISODate("2021-04-22T06:21:37.363Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("carousels").insert([ {
    _id: ObjectId("6081185798f72d1480677037"),
    cover: "https://fast.tudoublog.com/20a7fd5fd83a.jpg",
    "target_id": "0594a4ba",
    "target_title": "信阳原产毛尖 绿茶 浓香型新茶一级明前春茶嫩芽送礼盒装茗愿茶叶",
    created: ISODate("2021-04-22T06:31:51.44Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("carousels").insert([ {
    _id: ObjectId("608119ae98f72d1480677038"),
    cover: "https://fast.tudoublog.com/aa74f1f30c12.jpg",
    "target_id": "4ca1a6dc",
    "target_title": "黑桃皇后 海南三亚新鲜贵妃芒果精选3斤装大果（单个150g+）",
    created: ISODate("2021-04-22T06:37:34.955Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("carousels").insert([ {
    _id: ObjectId("60811b1498f72d1480677039"),
    cover: "https://fast.tudoublog.com/5834e0e91b60.jpg",
    "target_id": "2d092928",
    "target_title": "从化馆 新鲜荔枝 冷链空运 小核 肉脆多汁 新鲜水果1斤礼盒装 ",
    created: ISODate("2021-04-22T06:43:32.723Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for carts
// ----------------------------
db.getCollection("carts").drop();
db.createCollection("carts");

// ----------------------------
// Documents of carts
// ----------------------------

// ----------------------------
// Collection structure for comments
// ----------------------------
db.getCollection("comments").drop();
db.createCollection("comments");

// ----------------------------
// Documents of comments
// ----------------------------
db.getCollection("comments").insert([ {
    _id: ObjectId("608792d7924388402433fa5b"),
    picList: [
        {
            url: "https://fast.tudoublog.com/074d24da7b47.jfif",
            uid: NumberInt("1")
        }
    ],
    "seller_uid": "16eae502",
    "order_id": "251b7a1a012e47ce",
    "buyer_uid": "258d978f",
    type: "好评",
    pid: "8f505a22",
    cid: "01ea1d48-7",
    content: "感觉不错，非常好吃，赞！",
    created: ISODate("2021-04-27T04:28:07.831Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("comments").insert([ {
    _id: ObjectId("60879344924388402433fa5d"),
    picList: [ ],
    "seller_uid": "16eae502",
    "order_id": "fcf89c2125b14356",
    "buyer_uid": "258d978f",
    type: "差评",
    pid: "597e089b",
    cid: "2a0872d0-5",
    content: "味道有点不太对劲，非常恶心\n<script>alert(1)</script>",
    created: ISODate("2021-04-27T04:29:56.354Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("comments").insert([ {
    _id: ObjectId("6087b4e12d51b93a3c2faa57"),
    picList: [
        {
            url: "https://fast.tudoublog.com/27c56a94508d.jfif",
            uid: NumberInt("1")
        },
        {
            url: "https://fast.tudoublog.com/270483e8274d.jfif",
            uid: NumberInt("2")
        },
        {
            url: "https://fast.tudoublog.com/7760eeb7940c.jpg",
            uid: NumberInt("3")
        }
    ],
    "seller_uid": "16eae502",
    "order_id": "a2f1ce61b35a4d43",
    "buyer_uid": "258d978f",
    type: "好评",
    pid: "bd5e3d12",
    cid: "0cb1dd97-a",
    content: "好吃啊，推荐推荐，强烈推荐！！！",
    created: ISODate("2021-04-27T06:53:21.012Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("comments").insert([ {
    _id: ObjectId("6087b5702d51b93a3c2faa5a"),
    picList: [ ],
    "seller_uid": "16eae502",
    "order_id": "7f84cbf4e1af4dea",
    "buyer_uid": "258d978f",
    type: "差评",
    pid: "bd5e3d12",
    cid: "870df4ea-4",
    content: "第二次购买了，味道居然没要原来那个好吃了，咋回事？？差评",
    created: ISODate("2021-04-27T06:55:44.125Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("comments").insert([ {
    _id: ObjectId("6087bb4c2d51b93a3c2faa5b"),
    picList: [ ],
    "seller_uid": "16eae502",
    "order_id": "8bb36b4efc974546",
    "buyer_uid": "258d978f",
    type: "好评",
    pid: "5d72c392",
    cid: "a998a53a-f",
    content: "还行吧，味道也就那样，希望改善一下",
    created: ISODate("2021-04-27T07:20:44.427Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for invitecodes
// ----------------------------
db.getCollection("invitecodes").drop();
db.createCollection("invitecodes");

// ----------------------------
// Documents of invitecodes
// ----------------------------
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9994aaeb64b0052467d"),
    code: "5f9cc1fcccab4a50",
    created: ISODate("2021-04-27T09:30:01.606Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9ad4aaeb64b0052467e"),
    code: "cc3ed6ea3afc479f",
    created: ISODate("2021-04-27T09:30:21.318Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9ae4aaeb64b0052467f"),
    code: "878accad9cc94b8a",
    created: ISODate("2021-04-27T09:30:22.002Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9ae4aaeb64b00524680"),
    code: "7130054514694a10",
    created: ISODate("2021-04-27T09:30:22.574Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9af4aaeb64b00524681"),
    code: "e2198cd3bd2c4a2c",
    created: ISODate("2021-04-27T09:30:23.163Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9af4aaeb64b00524682"),
    code: "bf4a23216eab48d1",
    created: ISODate("2021-04-27T09:30:23.759Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9b04aaeb64b00524683"),
    code: "b3bfa2ac555a42cb",
    created: ISODate("2021-04-27T09:30:24.448Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9b14aaeb64b00524685"),
    code: "11660fecc0fa49b0",
    created: ISODate("2021-04-27T09:30:25.774Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9b24aaeb64b00524686"),
    code: "4521df12a0ef49b4",
    created: ISODate("2021-04-27T09:30:26.318Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9b24aaeb64b00524687"),
    code: "6b0b1e95f6c54fd9",
    created: ISODate("2021-04-27T09:30:26.93Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9b34aaeb64b00524688"),
    code: "508b4bf31b0c4da0",
    created: ISODate("2021-04-27T09:30:27.525Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9b44aaeb64b00524689"),
    code: "9fc38bb76f734ffb",
    created: ISODate("2021-04-27T09:30:28.181Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9b44aaeb64b0052468a"),
    code: "98bdab6633974d81",
    created: ISODate("2021-04-27T09:30:28.799Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9b54aaeb64b0052468b"),
    code: "79795cf9a3104003",
    created: ISODate("2021-04-27T09:30:29.446Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("invitecodes").insert([ {
    _id: ObjectId("6087d9bb4aaeb64b0052468c"),
    code: "2f493b80e4184ee7",
    created: ISODate("2021-04-27T09:30:35.079Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for news
// ----------------------------
db.getCollection("news").drop();
db.createCollection("news");

// ----------------------------
// Documents of news
// ----------------------------
db.getCollection("news").insert([ {
    _id: ObjectId("607d20d3a422ce6aac753bb4"),
    title: "健康以水为先，各类饮品如何让你身体美滋滋？",
    mainPic: "https://fast.tudoublog.com/85ed3f570091.jpg",
    content: "<p>在地球上，哪里有水，哪里就有生命。没有水，食物中的养料不能被吸收、废物不能排出体外、药物不能到达起作用的部位，所以人体一旦缺水，顶多活不过一周。因此，我们无时无刻都在饮水，随着时代进步，水的品类开始越来越多样化，凉茶、苏打水、果汁等尤为盛行，他们除了味道有差异外，对人体健康也起着不同的作用。</p><p><br></p><p><strong>农夫山泉饮用天然水</strong></p><p><br></p><p>不论饮食结构丰富与否，人体必需从饮用水中摄取一定比例的矿物质和微量元素，而普通纯净水由于净化得太过完全，将一些微量元素，比如钾、铁等一并排除在外，所以长期饮用对健康并没有什么好处，因此天然的饮用水成为了人们追求的新目标。而在这方面颇有造诣的非“农夫山泉”莫属了，它几乎是首个提出天然水饮品的一位饮料巨头。</p><p><br></p><p>天然水生产对水源的要求很高，它必须是符合一定标准的地表水、泉水或者矿泉水等，因此水源地的储备对生产企业来说至关重要。农夫山泉如今拥有四个主要水源基地，除了广为大众所知的浙江千岛湖以外，还有南水北调基地湖北丹江口，广东万绿湖以及吉林省白山市靖宇县错草泉。前三者均为地表水库水水源，第四个为天然矿泉水水源，因此农夫山泉的饮用水中含有人体所需的全面、均衡、天然的矿物元素，是最符合人体需求，任何人工水都难以比拟的。</p><p><br></p><p>点评：“农夫山泉有点甜”的广告语已经耳熟能详，主要在于山泉的品牌和服务以及优良的质地物美价廉，这着实是吸引不少的回头客的重头戏。</p><p><br></p><p><strong>屈臣氏苏打水</strong></p><p><br></p><p>我们每天都会吃很多肉类、鱼类等酸性食物，而人的身体环境是弱碱性，所以为了人体健康，我们必须得用碱性饮料或者食物来平衡，而苏打水就能帮你这个忙。这类水也称之为弱碱性水，内含的的碳酸氢钠能中和胃酸、强化肠胃吸收、健胃，有助于缓解消化不良和便秘症状。</p><p><br></p><p>而天然苏打水富含硼、锌、硒、铬等离子矿物和微量元素，这些微量元素呈离子状态，更易被人体吸收，还含有多种微量元素成分，此外，苏打水含有理想的PH值，天然苏打水的酸碱性值呈弱碱性，对传输氧气，调节新陈代谢，排除酸性废物和预防疾病是非常必要的，因此是上好的饮品。</p><p><br></p><p>点评：除了以上好处外，苏打水由于有抗氧化作用，如果在喝的时候配上柠檬，还能起到增进食欲、预防皮肤老化、美容养颜的作用呢！</p><p><br></p><p><strong>王老吉凉茶</strong></p><p><br></p><p>随着人们生活水平的提高，很多人开始喜欢吃火锅、干锅、烧烤等麻辣类食物，吃完后时不时会“引火上身”，因此凉茶成为了吃这些美食时的必备饮料，而王老吉就是凉茶类饮品中的佼佼者。</p><p><br></p><p>王老吉凉茶采用菊花、甘草、仙草、金银花、夏枯草等7种上等草本材料配制而成，现代科学研究表明，饮料中含有植物黄酮类等天然成分，具有清热解毒，预防上火的功效，从王老吉的配方可以看出，主要是中药制剂，王老吉可谓是真正的“凉茶”。其实一般来说，王老吉的功效并没有那么单一，日常保健常喝王老吉清凉茶，可及时改善口舌生疮、咽喉肿痛、肺燥、食欲欠佳、口苦等症状。</p><p><br></p><p>点评：为了减少过多的喝碳酸饮料保持好身材，在聚餐时，选择王老吉凉茶来代替碳酸饮料也是一个很好的选择。由于加入了甘草材料，也使得口感甘甜，更接近饮料的味道，满足了全国各地不同消费者的口感要求，在口感上得到了大众的喜爱。</p>",
    nid: "5570cbab",
    created: ISODate("2021-04-19T06:18:59.16Z"),
    __v: NumberInt("0"),
    goods: [
        "258d978f"
    ]
} ]);
db.getCollection("news").insert([ {
    _id: ObjectId("60851121d7560d2bb0ee3489"),
    goods: [ ],
    title: "小小罐头知我意，留住枇杷满树风情",
    mainPic: "https://fast.tudoublog.com/8021a144199b.png",
    content: "<p>秋意浓，被子之外的世界仿佛一天凉比一天，可我喜爱秋天，因为在这个无比浪漫的季节，我能看到枫叶红得耀眼，看到枇杷树挤成堆地开花，想来，秋日凉薄，倒也真是个适合吃枇杷的季节。</p><p><br></p><p>学过归有光的《项脊轩志》，书中最后一句：“庭有枇杷树，吾妻死之年所手植也，今已亭亭如盖矣。” 短短数字，表出一番对妻子的一往情深。南风满树枇杷，回看桃李无色。枇杷树在古人心中不仅是区区果树，更是吉祥树的象征，而枇杷也确实对人体大有裨益，为人们带来吉祥安康。</p><p><br></p><p>众所周知，水果的生产有季节性和地区性，而人们对水果的需求却是经常性的，为了满足人们对水果的需求，也为了保留住水果的口感，人们开始探索怎么以安全健康的方式留住水果的美好，于是水果罐头应运而生。为了身体健康，选择一款好的水果罐头很重要。</p><p><br></p><p>枇杷因果实形似琵琶而得名枇杷，清香鲜甜，略带酸味，成熟的枇杷味道甜美，含有丰富的维生素、有机酸、糖类物质，具有润肺、止咳、止渴、和胃等效果。而枇杷罐头经过再次处理加工，口味较水果来说更要甘甜，林家铺子枇杷罐头一直秉持“好罐头好口感”的理念，受到了很多大人和小孩的喜爱。</p><p><br></p><p>林家铺子枇杷罐头精选大颗饱满枇杷，无虫蚀，无伤疤，无软烂，六小时锁鲜，颗颗肥厚多汁，清甜鲜嫩。咬一口，让你瞬间爱上这份独特的甜蜜。而且，林家铺子一直坚持食用纯白砂糖制作罐头，不添加人工甜蜜素，虽然成本高，但林家铺子只想带给你更自然的口感，更健康的体验。如果小孩子出现轻微的咳嗽或者多痰，可以很好的食用罐头来进行食疗，这样一来，也避免了孩子吃药时的痛苦。</p><p><br></p><p>枇杷还有止渴解暑的作用，在炎热的夏天打开罐头，吃上一口，甜而不腻，软糯爽口，让你瞬间有种置身空调房的感觉；而且最近秋冬换季，流感多发，罐头中的枇杷果实及叶有抑制流感病毒作用，常吃还可以预防感冒，增强身体的抵抗力。作为致力于老人小孩都可以吃的枇杷罐头品牌，林家铺子应该是家庭必备之首选，尽最大的努力，带给你美味和健康。</p><p><br></p><p>世界之大，林家铺子枇杷罐头跨越千山万水，穿过茫茫人海，只为你。</p>",
    nid: "7b1ae5fa",
    created: ISODate("2021-04-25T06:50:09.195Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("news").insert([ {
    _id: ObjectId("6085117ed7560d2bb0ee348a"),
    goods: [
        "16eae502"
    ],
    title: "喜欢脱脂牛奶，营养健康你不爱？",
    mainPic: "https://fast.tudoublog.com/39d8160a83f2.jpg",
    content: "<p>最近迷恋上了脱脂牛奶，具体原因还不是因为能更好的避免肉肉的生长，作为一个非常热爱牛奶的妹子，脱脂牛奶的出现拯救了我爱喝牛奶还怕长肉肉，有人说脱脂牛奶的口感并不是很香醇？错，脱脂牛奶的清香我想只有尝过才知道。</p><p><br></p><p>伊纯牛奶250ml*24盒/箱（元宵好礼礼盒装）0脂肪含量 健身瑜伽必备 林书豪同款</p><p><br></p><p>第一次发现脱脂牛奶的时候，是看到了这款上质牛奶，当时一眼就看到了脱脂这两个字，就瞬间入手了，本以为会没有全脂牛奶合口味，但是没想到入口清甜让我瞬间爱上，自从有了这款牛奶后，我便喝牛奶没有了一天一袋的限制，简约大气的包装随身携带也会非常好看，早晚一瓶的我后来神奇的发现肌肤变白了不少，真的是让我这个吃货有了非常意外的惊喜</p><p><br></p><p>德亚牛奶很早之前就接触过，牛奶是德国的，很多人都知道，德国气候条件优良，牧草鲜美；奶牛的生活环境优美无污染，生产出的牛奶香醇可口，而且更加健康，牛奶中的各类添加剂含量少，保留的营养成分高。用德亚牛奶当作早餐，简直就是满分“帝王餐”啊！德亚优选全球黄金奶源带—德国莱茵河畔的牧场，适宜的气候和充足的光照造就了完美的天然草场；牧场从不使用除虫剂，坚持物理除虫，保证了草源的安全健康，产出的牛奶味道浓醇营养好。</p><p><br></p><p>选择脱脂牛奶一定是个明智的选择，青少年和老人的身体都急需营养补充，而全脂高钙奶又担心营养过剩；脱脂牛奶喝起来奶味香浓，并没有其他不一样的口感和味道，而且还超级健康，怎样，心动了没</p>",
    nid: "d60f0fad",
    created: ISODate("2021-04-25T06:51:42.146Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("news").insert([ {
    _id: ObjectId("608511e4d7560d2bb0ee348b"),
    goods: [
        "16eae502",
        "258d978f"
    ],
    title: "变瘦道路且有长，坚果零食不能少！",
    mainPic: "https://fast.tudoublog.com/6a30aa2110c3.jpg",
    content: "<p>最近已经减重有十几天，节食也已经坚持了很多天，但是，对于我这个吃货来说，身边没有零食这真的很难熬，每当想要吃零食的时候，就会一直望着肚子上的肉肉，不断警告自己不要再吃了。</p><p><br></p><p>但是减重的日子实在太艰辛了，尤其是没有零食饿肚子的日子更加难熬，最终我还是经不住饥饿的诱惑，选择入手坚果，很久没接触坚果，这次瞬间被混合果仁吸引，一次就可以吃到多种坚果，丰富又营养，重要的是了解后发现，原来摄入适当坚果是可以帮助减重的哦！</p><p><br></p><p>精选8种坚果进行搭配，而且坚果来自世界各地，坚果只是经过简单处理，非常天然安全健康，慢火烘焙，只为保留最原始的香味，原料的设计也是非常赞的，在未加工前都是选择低温冷藏，保证最大的新鲜度，创意分袋设计，干湿果分离，吃的时候只要扯开中缝混合均匀就可享用咯！别看这小小的8种坚果，富含丰富的蛋白质、膳食纤维、各种维生素、铁镁等等。食用方式也非常多变，直接吃或者是拌酸奶都是非常不错的选择，用来当作烘焙时的点缀也时非常不错的。</p><p><br></p><p>新边界的这款混合坚果性价比很高，这款共含有30袋，一个月的量，简约小袋包装，非常好携带，7种合理搭配，有酥脆的口感，也有酸酸甜甜的口感，这款混合坚果也是非常让人放心的，源地直采，自然晾晒，保证质量的同时也保证了高品质味道，每日来上一袋，营养及时补充，携带也是非常方便的哦！</p><p><br></p><p>有了这两款的坚果帮助，一是不需要始终饿着肚子了，二也满足了吃货的嘴馋，不仅能过足嘴瘾，还能在一方面帮助减重哦，怎么样，想要变美变瘦，你准备好了吗？</p>",
    nid: "02132266",
    created: ISODate("2021-04-25T06:53:24.393Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for notifys
// ----------------------------
db.getCollection("notifys").drop();
db.createCollection("notifys");

// ----------------------------
// Documents of notifys
// ----------------------------

// ----------------------------
// Collection structure for orders
// ----------------------------
db.getCollection("orders").drop();
db.createCollection("orders");

// ----------------------------
// Documents of orders
// ----------------------------
db.getCollection("orders").insert([ {
    _id: ObjectId("6087b35a2d51b93a3c2faa54"),
    "address_base": [
        "河南省",
        "郑州市",
        "新郑市"
    ],
    status: NumberInt("2"),
    "order_id": "8bb36b4efc974546",
    "seller_uid": "16eae502",
    "buyer_uid": "258d978f",
    "address_detail": "河南工程学院西区",
    realname: "毛吉亮",
    phone: "13939070224",
    "relative_order_id": "ad5145c337d04a55",
    product: {
        cover: "https://fast.tudoublog.com/c087f886abdf.jpg",
        price: 23.8,
        title: "汇尔康(HR) 松花蛋20枚装 松花蛋皮蛋 工艺溏心松花鸭皮蛋 ",
        pid: "5d72c392",
        count: NumberInt("1")
    },
    money: 23.8,
    created: ISODate("2021-04-27T06:46:50.469Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("orders").insert([ {
    _id: ObjectId("6087b35a2d51b93a3c2faa55"),
    "address_base": [
        "河南省",
        "郑州市",
        "新郑市"
    ],
    status: NumberInt("9"),
    "order_id": "a2f1ce61b35a4d43",
    "seller_uid": "16eae502",
    "buyer_uid": "258d978f",
    "address_detail": "xxxxxx",
    realname: "xxx",
    phone: "13456789000",
    "relative_order_id": "ad5145c337d04a55",
    product: {
        cover: "https://fast.tudoublog.com/cdc54f03d086.jpg",
        price: 25.9,
        title: "徐闻香水菠萝 送刀国产凤梨超甜新鲜水果整箱现摘8斤装",
        pid: "bd5e3d12",
        count: NumberInt("1")
    },
    money: 25.9,
    created: ISODate("2021-04-27T06:46:50.475Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("orders").insert([ {
    _id: ObjectId("6087b5042d51b93a3c2faa59"),
    "address_base": [
        "河南省",
        "郑州市",
        "新郑市"
    ],
    status: NumberInt("9"),
    "order_id": "7f84cbf4e1af4dea",
    "seller_uid": "16eae502",
    "buyer_uid": "258d978f",
    "address_detail": "xxxx",
    realname: "xxx",
    phone: "13456789000",
    "relative_order_id": "73d03bbd1cb84ef4",
    product: {
        cover: "https://fast.tudoublog.com/cdc54f03d086.jpg",
        price: 25.9,
        title: "徐闻香水菠萝 送刀国产凤梨超甜新鲜水果整箱现摘8斤装",
        pid: "bd5e3d12",
        count: NumberInt("1")
    },
    money: 25.9,
    created: ISODate("2021-04-27T06:53:56.593Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for products
// ----------------------------
db.getCollection("products").drop();
db.createCollection("products");

// ----------------------------
// Documents of products
// ----------------------------
db.getCollection("products").insert([ {
    _id: ObjectId("607e5f2aded11a5d0450eb8c"),
    cover: [
        {
            key: 1618894437068,
            url: "https://fast.tudoublog.com/05ef4dd71c64.jpg",
            uid: 1618894438686,
            status: "success"
        },
        {
            key: 1618894461725,
            url: "https://fast.tudoublog.com/42bec0323953.jpg",
            uid: 1618894468468,
            status: "success"
        },
        {
            key: 1618894485796,
            url: "https://fast.tudoublog.com/9d3261ac1460.png",
            uid: 1618894498733,
            status: "success"
        }
    ],
    tags: [
        "本地特色",
        "顺丰包邮"
    ],
    sales: NumberInt("6"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "3a130108",
    title: "【2021新茶 】 茶叶礼盒 信阳毛尖 新茶 绿茶礼盒500克 蓼益佳明前特级茶礼盒",
    area: "河南省",
    classify: "茶水饮品",
    "short_desc": "明前嫩芽、浓香耐泡、品质毛尖、多白毫、品质高外形细秀匀直",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/334W-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">蓼益佳(Liao Yi Jia)</a></li><li>类别：信阳毛尖</li><li>国产/进口：国产</li><li>采摘时间：其它</li><li>采摘要求：一芽一叶,单叶片,一芽两叶,一芽二三叶</li><li>发酵程度：不发酵</li><li>干茶形状：条形</li><li>等级：一级</li><li>工艺：炒青绿茶</li><li>包装：盒装</li><li>净含量：125克</li></ul>",
    price: 588.9,
    stock: NumberInt("95"),
    created: ISODate("2021-04-21T09:52:33.93Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("607e829462ccf65b3492e376"),
    cover: [
        {
            key: 1618903598549,
            url: "https://fast.tudoublog.com/4291f4de47bf.jpg",
            uid: 1618903598878,
            status: "success"
        },
        {
            key: 1618903630549,
            url: "https://fast.tudoublog.com/8c37525861e4.jpg",
            uid: 1618903630780,
            status: "success"
        },
        {
            key: 1618903655328,
            url: "https://fast.tudoublog.com/fbe63760bf11.jpg",
            uid: 1618903655543,
            status: "success"
        }
    ],
    tags: [
        "本地特色",
        "坏品包赔",
        "顺丰包邮"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "8e695520",
    title: "强于 焦作温县垆土铁棍山药礼盒装2500g/提 铁杆怀山药生鲜蔬菜",
    area: "河南省",
    classify: "地方特产",
    "short_desc": "温县产地直发丨根根手选丨甘面粉糯  ",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/O354-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">强于(qiangyu)</a></li><li>类别：山药</li><li>国产/进口：国产</li><li>产地：中国河南焦作市</li><li>是否有机：非有机</li><li>烹饪建议：烧烤,火锅,煎炸,炒菜,炖菜,蒸菜</li><li>包装：礼盒装</li><li>净含量：2500克</li><li>保质期：90天</li><li>贮存条件：常温</li></ul><p><br></p>",
    price: 59.9,
    stock: NumberInt("689"),
    created: ISODate("2021-04-21T09:51:51.105Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("607ff6fda2ef2e611c6b3adb"),
    cover: [
        {
            key: 1618998926431,
            url: "https://fast.tudoublog.com/a1bdc7cdc70d.jpg",
            uid: 1618998927659,
            status: "success"
        },
        {
            key: 1618998951599,
            url: "https://fast.tudoublog.com/1db874e7b6f6.jpg",
            uid: 1618998952286,
            status: "success"
        },
        {
            key: 1618998971908,
            url: "https://fast.tudoublog.com/fde0e78c5030.jpg",
            uid: 1618998972842,
            status: "success"
        }
    ],
    tags: [
        "新品上架",
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "ed96caae",
    title: "菌益 姬松茸250g 云南土特产 干货无熏硫巴西菇（非500g）",
    area: "云南省",
    classify: "地方特产",
    "short_desc": "云南2020新货，天然本色，无染色无硫熏。  ",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/09LJ-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">菌益(junyi)</a></li><li>类别：香菇</li><li>国产/进口：国产</li><li>产地：中国云南昆明市</li><li>等级：特级</li><li>包装：袋装</li><li>是否有机：否</li><li>净含量：250克</li></ul><p><br></p>",
    price: 59.8,
    stock: NumberInt("290"),
    created: ISODate("2021-04-21T09:57:32.656Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("607ff82da2ef2e611c6b3add"),
    cover: [
        {
            key: 1618999154505,
            url: "https://fast.tudoublog.com/fd98f8461418.jpg",
            uid: 1618999155049,
            status: "success"
        },
        {
            key: 1618999161570,
            url: "https://fast.tudoublog.com/4f0ca51f90fd.jpg",
            uid: 1618999161998,
            status: "success"
        },
        {
            key: 1618999186607,
            url: "https://fast.tudoublog.com/96bb726f67b3.jpg",
            uid: 1618999187654,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "9446fd35",
    title: "八荒 长豆角干200g 干豆角山东农家自制干货土特产",
    area: "山东省",
    classify: "时令蔬菜",
    "short_desc": "自然生长原滋原味、无添加干而不枯",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/0MJJ-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">八荒</a></li><li>类别：干豆角</li><li>国产/进口：国产</li><li>包装：袋装</li><li>净含量：200克</li><li>保质期：12月</li></ul><p><br></p>",
    price: 23.5,
    stock: NumberInt("699"),
    created: ISODate("2021-04-21T10:02:31.564Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("607ff936a2ef2e611c6b3adf"),
    cover: [
        {
            key: 1618999500283,
            url: "https://fast.tudoublog.com/a84608511d79.jpg",
            uid: 1618999500866,
            status: "success"
        },
        {
            key: 1618999523059,
            url: "https://fast.tudoublog.com/0b17da269f84.jpg",
            uid: 1618999523773,
            status: "success"
        },
        {
            key: 1618999550200,
            url: "https://fast.tudoublog.com/b9068ff4adc4.jpg",
            uid: 1618999550952,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "65dc0077",
    title: "盛耳莴笋干150g 莴苣干片农家干货干菜土特产脱水蔬菜",
    area: "福建省",
    classify: "时令蔬菜",
    "short_desc": "精心挑选、口感脆嫩、味道鲜美、营养丰富",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/V035-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">盛耳(shenger)</a></li><li>类别：海带/干菜</li><li>国产/进口：国产</li><li>适宜人群：一般人群</li><li>国产产地：福建</li></ul><p><br></p>",
    price: NumberInt("25"),
    stock: NumberInt("889"),
    created: ISODate("2021-04-21T10:06:51.734Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("607ffa9aa2ef2e611c6b3ae1"),
    cover: [
        {
            key: 1618999831955,
            url: "https://fast.tudoublog.com/18c698642765.png",
            uid: 1618999833990,
            status: "success"
        },
        {
            key: 1618999842211,
            url: "https://fast.tudoublog.com/b406a023bd44.jpg",
            uid: 1618999845395,
            status: "success"
        },
        {
            key: 1618999847490,
            url: "https://fast.tudoublog.com/3df5bcef5b51.jpg",
            uid: 1618999847945,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色",
        "坏品包赔"
    ],
    sales: NumberInt("1"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "e9dbae36",
    title: "金字腊肠香肠500g广式广味腊肠 浙江特产带咸甜味粗腊肠香肠",
    area: "广东省",
    classify: "地方特产",
    "short_desc": "把瘦怡好、鲜咸适中、带有甜酒香风味、适合做煲仔饭的地道腊肠。",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/O850-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">金字</a></li><li>类别：香肠</li><li>国产/进口：国产</li><li>产地：中国广东省</li><li>口味：原味</li><li>净含量：500克</li></ul><p><br></p>",
    price: 45.9,
    stock: NumberInt("139"),
    created: ISODate("2021-04-21T11:11:16.658Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608004ada2ef2e611c6b3ae3"),
    cover: [
        {
            key: 1619002441478,
            url: "https://fast.tudoublog.com/465f52b0779a.jpg",
            uid: 1619002449588,
            status: "success"
        },
        {
            key: 1619002468741,
            url: "https://fast.tudoublog.com/3a2f5b611f95.jpg",
            uid: 1619002480763,
            status: "success"
        },
        {
            key: 1619002492428,
            url: "https://fast.tudoublog.com/b8dcfc80fd68.jpg",
            uid: 1619002500260,
            status: "success"
        }
    ],
    tags: [
        "本地特色",
        "顺丰包邮"
    ],
    sales: NumberInt("1"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "b981842a",
    title: "湖南特产臭豆腐正宗红方香辣无油霉豆腐大坛腐乳下饭菜佐菜",
    area: "湖南省",
    classify: "地方特产",
    "short_desc": "香辣可口，开胃下饭，坛装发货  ",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/K888-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">厨师</a></li><li>类别：红腐乳</li><li>国产/进口：国产</li><li>净含量：500克</li><li>包装：罐装</li><li>保质期：18月</li></ul><p><br></p>",
    price: NumberInt("68"),
    stock: NumberInt("188"),
    created: ISODate("2021-04-21T10:56:50.159Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60800628a2ef2e611c6b3ae5"),
    cover: [
        {
            key: 1619002898276,
            url: "https://fast.tudoublog.com/7fe9162b98f3.jpg",
            uid: 1619002904883,
            status: "success"
        },
        {
            key: 1619002908999,
            url: "https://fast.tudoublog.com/a172f127c2f1.jpg",
            uid: 1619002914158,
            status: "success"
        },
        {
            key: 1619002916981,
            url: "https://fast.tudoublog.com/8844ec45c468.jpg",
            uid: 1619002919651,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "坏品包赔",
        "本地特色"
    ],
    sales: NumberInt("1"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "39ab6981",
    title: "湖南麻阳冰糖橙 5斤 60mm大果 新鲜橙子 香甜可口 仙一清",
    area: "湖南省",
    classify: "水果干果",
    "short_desc": "天生小麻点小身材大能量、美味多、 甜蜜可口 ",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/20VW-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">仙一清</a></li><li>品种：脐橙</li><li>国产/进口：国产</li><li>产地：中国湖南怀化市</li><li>包装：箱装</li><li>净含量：2400g</li><li>保质期：7</li><li>贮存条件：冷藏0-4℃</li></ul>",
    price: 18.8,
    stock: NumberInt("875"),
    created: ISODate("2021-04-21T11:08:16.199Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("1")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60800ca0a2ef2e611c6b3ae9"),
    cover: [
        {
            key: 1619004537996,
            url: "https://fast.tudoublog.com/cdc54f03d086.jpg",
            uid: 1619004541438,
            status: "success"
        },
        {
            key: 1619004543002,
            url: "https://fast.tudoublog.com/1194cc513347.jpg",
            uid: 1619004547818,
            status: "success"
        },
        {
            key: 1619004548922,
            url: "https://fast.tudoublog.com/17f39060b49f.jpg",
            uid: 1619004552894,
            status: "success"
        }
    ],
    tags: [
        "本地特色",
        "坏品包赔",
        "顺丰包邮"
    ],
    sales: NumberInt("2"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "bd5e3d12",
    title: "徐闻香水菠萝 送刀国产凤梨超甜新鲜水果整箱现摘8斤装",
    area: "广东省",
    classify: "水果干果",
    "short_desc": "头戴凤尾、身披龙鳞、肉中带金， 一口吃下，果肉饱满、爽口多汁",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/2FEX-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">五个农民</a></li><li>品种：菠萝</li><li>国产/进口：国产</li><li>产地：中国广东湛江市</li><li>包装：箱装</li><li>净含量：2.25kg</li><li>保质期：999天</li><li>贮存条件：常温</li></ul><p><br></p>",
    price: 25.9,
    stock: NumberInt("776"),
    created: ISODate("2021-04-21T11:30:11.123Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60800de2a2ef2e611c6b3aeb"),
    cover: [
        {
            key: 1619004858888,
            url: "https://fast.tudoublog.com/2b1cdc2280e1.png",
            uid: 1619004868736,
            status: "success"
        },
        {
            key: 1619004872537,
            url: "https://fast.tudoublog.com/2c507a448025.jpg",
            uid: 1619004876920,
            status: "success"
        },
        {
            key: 1619004881336,
            url: "https://fast.tudoublog.com/a74ea1d20d41.jpg",
            uid: 1619004883148,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色",
        "坏品包赔"
    ],
    sales: NumberInt("2"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "2d092928",
    title: "从化馆 新鲜荔枝 冷链空运 小核 肉脆多汁 新鲜水果1斤礼盒装 ",
    area: "广东省",
    classify: "水果干果",
    "short_desc": "淡淡桂花香，核小肉厚，爽脆多汁，咬一口如初恋般甜蜜",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/1U5I-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">黎夫人</a></li><li>品种：荔枝</li><li>国产/进口：国产</li><li>产地：中国广东广州市</li><li>包装：礼盒装</li><li>净含量：1斤</li><li>保质期：5天</li><li>贮存条件：冷藏0-4℃</li></ul><p><br></p>",
    price: NumberInt("199"),
    stock: NumberInt("797"),
    created: ISODate("2021-04-21T11:35:35.461Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60800f62a2ef2e611c6b3aed"),
    cover: [
        {
            key: 1619005270208,
            url: "https://fast.tudoublog.com/0dba66d08c03.jpg",
            uid: 1619005273485,
            status: "success"
        },
        {
            key: 1619005275752,
            url: "https://fast.tudoublog.com/2e0762c5f812.jpg",
            uid: 1619005281675,
            status: "success"
        },
        {
            key: 1619005307406,
            url: "https://fast.tudoublog.com/790c5d0519b8.jpg",
            uid: 1619005312979,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("10"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "4ca1a6dc",
    title: "黑桃皇后 海南三亚新鲜贵妃芒果精选3斤装大果（单个150g+）",
    area: "海南省",
    classify: "水果干果",
    "short_desc": "香甜多汁，肉厚核薄，果实艳丽，果肉细腻，美味与颜值并存",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/1NZT-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">黑桃皇后</a></li><li>品种：芒果</li><li>国产/进口：国产</li><li>产地：中国海南三亚市</li><li>包装：箱装</li><li>净含量：1000g</li><li>保质期：10天</li><li>贮存条件：常温</li></ul><p><br></p>",
    price: 19.9,
    stock: NumberInt("456"),
    created: ISODate("2021-04-21T11:42:55.163Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("1")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608010eda2ef2e611c6b3af1"),
    cover: [
        {
            key: 1619005650942,
            url: "https://fast.tudoublog.com/59f87264221e.jpg",
            uid: 1619005652122,
            status: "success"
        },
        {
            key: 1619005658235,
            url: "https://fast.tudoublog.com/36351d5c16a7.jpg",
            uid: 1619005659270,
            status: "success"
        },
        {
            key: 1619005667098,
            url: "https://fast.tudoublog.com/5b1a8b908573.jpg",
            uid: 1619005670629,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "832ea9df",
    title: "浓香型精选铁观音茶叶新茶乌龙茶木桶罐装礼盒装500g",
    area: "安徽省",
    classify: "茶水饮品",
    "short_desc": "坚持传统手工技法、拒绝任何添加、只取正季嫩芽精制",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/147T-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">福岗</a></li><li>类别：铁观音</li><li>国产/进口：国产</li><li>产地：中国福建泉州市</li><li>干茶形状：蜻蜓头</li><li>采摘时间：明后</li><li>等级：特级</li><li>包装：礼盒装</li><li>净含量：500克</li><li>生产日期：2021/02/21</li></ul><p><br></p>",
    price: NumberInt("168"),
    stock: NumberInt("89"),
    created: ISODate("2021-04-21T11:48:08.831Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60801356a2ef2e611c6b3af3"),
    cover: [
        {
            key: 1619006277127,
            url: "https://fast.tudoublog.com/b45a07a69aa0.jpg",
            uid: 1619006279681,
            status: "success"
        },
        {
            key: 1619006281063,
            url: "https://fast.tudoublog.com/afaa9751ca9b.jpg",
            uid: 1619006281838,
            status: "success"
        },
        {
            key: 1619006285915,
            url: "https://fast.tudoublog.com/d38a611346bc.jpg",
            uid: 1619006288653,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "eebb59c5",
    title: "农谣 林间养殖一年麻鸭 土鸭子鸭肉生鲜 整鸭带脚净重2.4-2.7斤/只",
    area: "安徽省",
    classify: "家禽海鲜",
    "short_desc": "肉质香、多重保鲜、原粮喂养、独立包装、净堂处理",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/597S-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">农谣</a></li><li>类别：冰鲜禽肉</li><li>品种：麻鸭</li><li>禽肉分类：鸭肉</li><li>国产/进口：国产</li><li>产地：中国安徽合肥市</li><li>包装：袋装</li><li>净含量：1200克</li><li>贮存条件：冷冻-18℃</li><li>饲养方式：散养</li><li>加工方式：净膛</li><li>烹饪建议：炖菜,火锅,炒菜,烧烤</li></ul><p><br></p>",
    price: NumberInt("99"),
    stock: NumberInt("995"),
    created: ISODate("2021-04-21T11:58:21.21Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608014e0a2ef2e611c6b3af5"),
    cover: [
        {
            key: 1619006658386,
            url: "https://fast.tudoublog.com/c087f886abdf.jpg",
            uid: 1619006664082,
            status: "success"
        },
        {
            key: 1619006664992,
            url: "https://fast.tudoublog.com/e1acdafaebb2.jpg",
            uid: 1619006667815,
            status: "success"
        },
        {
            key: 1619006668961,
            url: "https://fast.tudoublog.com/9dac4b2562dd.jpg",
            uid: 1619006672311,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "坏品包赔"
    ],
    sales: NumberInt("3"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "5d72c392",
    title: "汇尔康(HR) 松花蛋20枚装 松花蛋皮蛋 工艺溏心松花鸭皮蛋 ",
    area: "江苏省",
    classify: "家禽海鲜",
    "short_desc": "溏心蛋黄 晶莹剔透  口感嫩滑 蛋黄香在口腔回传",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/67J3-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">汇尔康(HR)</a></li><li>类别：皮蛋</li><li>分类：鸭蛋</li><li>国产/进口：国产</li><li>产地：中国江苏徐州市</li><li>枚数：10枚</li><li>包装：箱装</li><li>净含量：200克</li><li>储存方法：冷藏</li></ul><p><br></p>",
    price: 23.8,
    stock: NumberInt("1042"),
    created: ISODate("2021-04-21T12:04:54.399Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("6080175ca2ef2e611c6b3af7"),
    cover: [
        {
            key: 1619007251997,
            url: "https://fast.tudoublog.com/cd8464a6e58a.jpg",
            uid: 1619007257589,
            status: "success"
        },
        {
            key: 1619007262567,
            url: "https://fast.tudoublog.com/0a88a209fcc4.jpg",
            uid: 1619007269274,
            status: "success"
        },
        {
            key: 1619007303454,
            url: "https://fast.tudoublog.com/58615962b4b7.jpg",
            uid: 1619007309827,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色",
        "坏品包赔"
    ],
    sales: NumberInt("10"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "27dd95b8",
    title: "农家小紫薯2.5斤装 新鲜蔬菜现挖番薯地瓜香薯紫薯 ",
    area: "山东省",
    classify: "时令蔬菜",
    "short_desc": "粉糯香甜  营养美味  口感细腻粉糯  丝丝香甜萦绕舌尖  每一口都是享受",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/76N6-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">桃又淘(tao you tao)</a></li><li>类别：红薯</li><li>国产/进口：国产</li><li>产地：中国山东临沂市</li><li>是否有机：非有机</li><li>烹饪建议：蒸菜,火锅</li><li>包装：箱装</li><li>净含量：2500克</li><li>保质期：15天</li><li>贮存条件：冷藏0-4℃</li></ul><p><br></p>",
    price: 22.8,
    stock: NumberInt("4778"),
    created: ISODate("2021-04-21T12:15:30.912Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608018d4a2ef2e611c6b3af9"),
    cover: [
        {
            key: 1619007669522,
            url: "https://fast.tudoublog.com/9b060a118715.jpg",
            uid: 1619007671273,
            status: "success"
        },
        {
            key: 1619007673569,
            url: "https://fast.tudoublog.com/dd65b6b228e0.jpg",
            uid: 1619007676028,
            status: "success"
        },
        {
            key: 1619007677729,
            url: "https://fast.tudoublog.com/4911ab0772ee.jpg",
            uid: 1619007681436,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "新品上架"
    ],
    sales: NumberInt("10"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "597e089b",
    title: "西湖藕粉 桂花莲子西湖藕粉杭州特产 莲藕粉桂花藕粉羹300g",
    area: "浙江省",
    classify: "特色小吃",
    "short_desc": "西湖特产 软糯丝滑 佳藕养人 营养代餐 呵护健康",
    detail: "<ul><li>类别：藕粉</li><li>国产/进口：国产</li><li>产地：中国浙江杭州市</li><li>包装：盒装</li><li>净含量：300克</li><li>是否添加糖：添加糖</li></ul><p><br></p>",
    price: 24.9,
    stock: NumberInt("2167"),
    created: ISODate("2021-04-21T12:21:46.367Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60801a22a2ef2e611c6b3afb"),
    cover: [
        {
            key: 1619007920795,
            url: "https://fast.tudoublog.com/c593d430739b.jpg",
            uid: 1619007922626,
            status: "success"
        },
        {
            key: 1619007924488,
            url: "https://fast.tudoublog.com/f87b8bab735f.jpg",
            uid: 1619007926993,
            status: "success"
        },
        {
            key: 1619007927708,
            url: "https://fast.tudoublog.com/a87e9428ca29.jpg",
            uid: 1619007933237,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "坏品包赔"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "f526d4f5",
    title: "集香草天津风味麻花500g 大散装糕类零食小吃 混合口味",
    area: "四川省",
    classify: "特色小吃",
    "short_desc": "天津风味麻花，3味混装，甜度适中，老少皆宜。 ",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/749J-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">集香草</a></li><li>类别：麻花</li><li>蛋糕糕点分类：中式糕点</li><li>产地：中国四川省</li><li>口味：原味</li><li>是否添加糖：添加糖</li><li>净含量：500克</li><li>包装：盒装</li></ul><p><br></p>",
    price: 9.9,
    stock: NumberInt("1299"),
    created: ISODate("2021-04-21T12:27:21.463Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60802b31a2ef2e611c6b3afd"),
    cover: [
        {
            key: 1619012098744,
            url: "https://fast.tudoublog.com/e99b5ff9e2ca.jpg",
            uid: 1619012110931,
            status: "success"
        },
        {
            key: 1619012102011,
            url: "https://fast.tudoublog.com/964ab06c5a9b.jpg",
            uid: 1619012111842,
            status: "success"
        },
        {
            key: 1619012107325,
            url: "https://fast.tudoublog.com/e698a1cc5525.jpg",
            uid: 1619012123857,
            status: "success"
        }
    ],
    tags: [
        "本地特色",
        "新品上架"
    ],
    sales: NumberInt("41"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "a655a242",
    title: "正宗安徽特产黄山烧饼梅干菜扣肉酥饼网红美食",
    area: "安徽省",
    classify: "特色小吃",
    "short_desc": "黄山烧饼那一口鲜香酥脆，入口酥脆品后陈香，令人垂涎三尺",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/270L-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">佰味葫芦</a></li><li>类别：饼类</li><li>蛋糕糕点分类：中式糕点</li><li>产地：中国安徽芜湖市</li><li>口味：辣味</li><li>是否添加糖：添加糖</li><li>净含量：160克</li><li>包装：袋装</li></ul><p><br></p>",
    price: NumberInt("5"),
    stock: NumberInt("1004"),
    created: ISODate("2021-04-21T13:40:10.455Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60802ff2a2ef2e611c6b3b00"),
    cover: [
        {
            key: 1619013405741,
            url: "https://fast.tudoublog.com/3eb51d58cc7a.jpg",
            uid: 1619013408686,
            status: "success"
        },
        {
            key: 1619013431287,
            url: "https://fast.tudoublog.com/84e4f06dbe1d.jpg",
            uid: 1619013441098,
            status: "success"
        },
        {
            key: 1619013450822,
            url: "https://fast.tudoublog.com/10d3a3781008.jpg",
            uid: 1619013455602,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色",
        "坏品包赔"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "eed13cc5",
    pid: "f0b31666",
    title: "楼兰蜜语薄皮核桃500g/袋 新疆阿克苏核桃 壳薄如纸皮 孕妇坚果 休闲零食",
    area: "新疆",
    classify: "水果干果",
    "short_desc": "新疆薄皮大核桃，纯自然无漂白，壳饱如纸、好吃的很",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/P692-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">楼兰蜜语</a></li><li>类别：核桃</li><li>口味：原味</li><li>是否带壳：带壳</li><li>净含量：500克</li><li>包装：袋装</li></ul><p><br></p>",
    price: 38.2,
    stock: NumberInt("577"),
    created: ISODate("2021-04-21T14:00:44.211Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("1")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("6080337aa2ef2e611c6b3b02"),
    cover: [
        {
            key: 1619014365553,
            url: "https://fast.tudoublog.com/dd5541830b88.jpg",
            uid: 1619014372974,
            status: "success"
        },
        {
            key: 1619014382033,
            url: "https://fast.tudoublog.com/5556c59ca6e7.jpg",
            uid: 1619014392250,
            status: "success"
        },
        {
            key: 1619014390763,
            url: "https://fast.tudoublog.com/d873dfbb0eb7.jpg",
            uid: 1619014409189,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "eed13cc5",
    pid: "c2f542b4",
    title: "楼兰蜜语无核白葡萄干225g 果干蜜饯 新疆吐鲁番特产 休闲零食果干果脯",
    area: "新疆",
    classify: "水果干果",
    "short_desc": "营养健康美味看得见 甘甜不腻口感酥滑自然美味",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/P692-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">楼兰蜜语</a></li><li>类别：葡萄干</li><li>是否有核：无核</li><li>加工工艺：果脯类</li><li>净含量：225克</li><li>保质期：240天</li></ul><p><br></p>",
    price: 19.9,
    stock: NumberInt("500"),
    created: ISODate("2021-04-21T14:15:28.648Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608035e2a2ef2e611c6b3b06"),
    cover: [
        {
            key: 1619015040568,
            url: "https://fast.tudoublog.com/56ee8f67d6c0.jpg",
            uid: 1619015051469,
            status: "success"
        },
        {
            key: 1619015059006,
            url: "https://fast.tudoublog.com/6d7a2d9f4dab.jpg",
            uid: 1619015067340,
            status: "success"
        },
        {
            key: 1619015076405,
            url: "https://fast.tudoublog.com/b24c0b714b56.jpg",
            uid: 1619015079627,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "eed13cc5",
    pid: "b09823a2",
    title: "乐享版卤鸭脖140g*3湖北特产真空肉类卤味零食小吃",
    area: "湖北省",
    classify: "特色小吃",
    "short_desc": "真空包装 食用方便 随时嗨吃",
    detail: "<ul><li>类别：鸭肉类</li><li>口味：原味</li><li>净含量：420克</li><li>包装：袋装</li></ul><p><br></p>",
    price: 38.9,
    stock: NumberInt("300"),
    created: ISODate("2021-04-21T14:26:48.047Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608035f9a2ef2e611c6b3b07"),
    cover: [
        {
            key: 1619015082319,
            url: "https://fast.tudoublog.com/0544254306b9.png",
            uid: 1619015099864,
            status: "success"
        },
        {
            key: 1619015086670,
            url: "https://fast.tudoublog.com/5d24bb6f777a.jpg",
            uid: 1619015101313,
            status: "success"
        },
        {
            key: 1619015092483,
            url: "https://fast.tudoublog.com/811b7206114d.jpg",
            uid: 1619015106476,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("50"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "8f505a22",
    title: "甘栗仁80g 即食迁西板栗仁 零食坚果炒货 河北唐山特产",
    area: "河北省",
    classify: "水果干果",
    "short_desc": "软糯香甜回味绵绵，正宗迁西板栗，传统蒸煮工艺，甜而不腻 。",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/904S-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">农交汇(Nut Joy)</a></li><li>类别：板栗</li><li>口味：原味</li><li>净含量：80克</li><li>包装：袋装</li></ul><p><br></p>",
    price: 9.9,
    stock: NumberInt("1117"),
    created: ISODate("2021-04-21T14:26:45.659Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("1")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608036e3a2ef2e611c6b3b0a"),
    cover: [
        {
            key: 1619015318359,
            url: "https://fast.tudoublog.com/e201061306aa.jpg",
            uid: 1619015320674,
            status: "success"
        },
        {
            key: 1619015329545,
            url: "https://fast.tudoublog.com/b81b5e3c5a35.jpg",
            uid: 1619015332723,
            status: "success"
        },
        {
            key: 1619015339428,
            url: "https://fast.tudoublog.com/f9e714e5c749.jpg",
            uid: 1619015342716,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("4"),
    status: NumberInt("1"),
    uid: "eed13cc5",
    pid: "5608d63a",
    title: "城东王白豌豆粉500g*2袋装 四川白凉粉原料",
    area: "湖南省",
    classify: "地方特产",
    "short_desc": "凉粉原料",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/M091-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">城东王</a></li><li>类别：豌豆生粉</li><li>国产/进口：国产</li><li>净含量：1000克</li><li>包装：袋装</li><li>保质期：18月</li></ul><p><br></p>",
    price: 16.8,
    stock: NumberInt("496"),
    created: ISODate("2021-04-21T14:34:38.08Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608037e1a2ef2e611c6b3b0b"),
    cover: [
        {
            key: 1619015584950,
            url: "https://fast.tudoublog.com/866250c774b2.jpg",
            uid: 1619015593991,
            status: "success"
        },
        {
            key: 1619015588612,
            url: "https://fast.tudoublog.com/28d2fa078c94.jpg",
            uid: 1619015595877,
            status: "success"
        },
        {
            key: 1619015599346,
            url: "https://fast.tudoublog.com/4c550c35cc87.jpg",
            uid: 1619015612064,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "19bbac3c",
    title: "长白山鲜人参 带土鲜参1支装（29元共10支） 泡酒煲汤炖鸡 ",
    area: "吉林省",
    classify: "山珍海味",
    "short_desc": "长白山一手货源，顺风空运，保温箱包装，现摘现发货  ",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/0DU4-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">娇河</a></li><li>产品名称：鲜人参</li><li>类别：人参</li><li>国产/进口：国产</li><li>参形状：整支</li><li>参年份：3-5年</li><li>参产地：中国</li><li>包装：散装</li><li>净含量：10克</li><li>生产批号：000</li><li>适宜人群：中老年</li><li>厂家名称：吉林省农特电子商务有限公司</li></ul><p><br></p>",
    price: NumberInt("29"),
    stock: NumberInt("624"),
    created: ISODate("2021-04-21T14:34:35.518Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60803820a2ef2e611c6b3b0e"),
    cover: [
        {
            key: 1619015600222,
            url: "https://fast.tudoublog.com/5618a457a72e.jpg",
            uid: 1619015609485,
            status: "success"
        },
        {
            key: 1619015611481,
            url: "https://fast.tudoublog.com/3dd9a01cdcff.jpg",
            uid: 1619015619164,
            status: "success"
        },
        {
            key: 1619015617734,
            url: "https://fast.tudoublog.com/c6ec18ccf45e.jpg",
            uid: 1619015624314,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("2"),
    status: NumberInt("1"),
    uid: "eed13cc5",
    pid: "10e457b9",
    title: "半山农 山楂干 精选无核山楂 干制圈山楂干泡茶水 120克",
    area: "河北省",
    classify: "地方特产",
    "short_desc": "只取中间部位，个大肉厚",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/1H31-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">半山农(BAN SHAN NONG)</a></li><li>类别：山楂</li><li>产地：中国山东莱芜市</li><li>适宜人群：成年人</li><li>包装：瓶装</li><li>规格：130g</li><li>生产企业：安徽盛农生物科技有限公司</li><li>注意事项：详见瓶身</li></ul><p><br></p>",
    price: NumberInt("48"),
    stock: NumberInt("798"),
    created: ISODate("2021-04-21T14:36:35.647Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608039c7a2ef2e611c6b3b10"),
    cover: [
        {
            key: 1619016025000,
            url: "https://fast.tudoublog.com/09808e6797c9.jpg",
            uid: 1619016033312,
            status: "success"
        },
        {
            key: 1619016031620,
            url: "https://fast.tudoublog.com/1987cc02a091.jpg",
            uid: 1619016042625,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色",
        "新品上架"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "eed13cc5",
    pid: "a0e770f5",
    title: "正山小种 茶叶红茶2021新茶 桐木关浓香型木桶礼盒装500g ",
    area: "江西省",
    classify: "地方特产",
    "short_desc": "正宗，品质保证！  ",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/M036-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">亿龙源</a></li><li>类别：祁门红茶</li><li>国产/进口：国产</li><li>产地：中国江西九江市</li><li>等级：一级</li><li>包装：盒装</li><li>净含量：500克</li><li>储存方法：干燥</li><li>保质期：1.5年</li><li>生产日期：20</li></ul><p><br></p>",
    price: NumberInt("248"),
    stock: NumberInt("200"),
    created: ISODate("2021-04-21T14:44:55.258Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60803aa3a2ef2e611c6b3b12"),
    cover: [
        {
            key: 1619016303148,
            url: "https://fast.tudoublog.com/5f425386cc47.jpg",
            uid: 1619016305502,
            status: "success"
        },
        {
            key: 1619016318427,
            url: "https://fast.tudoublog.com/6195d01da396.jpg",
            uid: 1619016321298,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("1"),
    status: NumberInt("1"),
    uid: "eed13cc5",
    pid: "1bed2af2",
    title: "江苏馆 扬州特产 美食大麒麟阁糕点扬州小吃糕点美食菊花饼 160g盒装 华东",
    area: "江苏省",
    classify: "特色小吃",
    "short_desc": "百年老店 扬州特产 零食必备 ",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/6L03-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">大麒麟阁</a></li><li>类别：糕类</li><li>净含量：160克</li><li>包装：盒装</li></ul><p><br></p>",
    price: 14.8,
    stock: NumberInt("999"),
    created: ISODate("2021-04-21T14:48:08.491Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("60810db598f72d148067702b"),
    cover: [
        {
            key: 1619070369976,
            url: "https://fast.tudoublog.com/a95c8cc4428b.jpg",
            uid: 1619070371627,
            status: "success"
        },
        {
            key: 1619070373633,
            url: "https://fast.tudoublog.com/30c6fe9c4e2b.jpg",
            uid: 1619070375083,
            status: "success"
        },
        {
            key: 1619070379879,
            url: "https://fast.tudoublog.com/013aa46e8cd3.jpg",
            uid: 1619070384400,
            status: "success"
        }
    ],
    tags: [
        "本地特色",
        "坏品包赔",
        "顺丰包邮"
    ],
    sales: NumberInt("1"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "b03ffceb",
    title: "高邮馆 友乾牌高邮咸鸭蛋盐蛋65克20只家庭装 咸蛋 盐蛋",
    area: "江苏省",
    classify: "地方特产",
    "short_desc": "原产地发货，红沙流油，鲜香嫩白  ",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/303Y-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">友乾(YOUQIAN)</a></li><li>国产/进口：国产</li><li>枚数：20枚</li><li>包装：盒装</li><li>重量：1300克</li><li>保质期：180天</li><li>养殖方式：散养</li></ul><p><br></p>",
    price: 33.8,
    stock: NumberInt("5754"),
    created: ISODate("2021-04-22T05:46:36.697Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608112ce98f72d148067702e"),
    cover: [
        {
            key: 1619071677475,
            url: "https://fast.tudoublog.com/e7db4784e732.jpg",
            uid: 1619071677813,
            status: "success"
        },
        {
            key: 1619071682993,
            url: "https://fast.tudoublog.com/ef8b3fc83f8d.jpg",
            uid: 1619071683343,
            status: "success"
        },
        {
            key: 1619071688504,
            url: "https://fast.tudoublog.com/5c9275779cbd.jpg",
            uid: 1619071688922,
            status: "success"
        }
    ],
    tags: [
        "本地特色",
        "坏品包赔"
    ],
    sales: NumberInt("0"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "e28031bc",
    title: "山东烟薯 流心蜜薯 黄心糖心红薯 烤地瓜烤红薯  软糯香甜",
    area: "山东省",
    classify: "特色小吃",
    "short_desc": "精品流油蜜薯，新鲜现挖，软糯香甜，营养丰富，蜜油四溢，烤着吃更好吃",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/933P-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">星优选</a></li><li>类别：红薯</li><li>国产/进口：国产</li><li>产地：中国山东泰安市</li><li>是否有机：非有机</li><li>烹饪建议：炖菜,烧烤,蒸菜</li><li>包装：简装</li><li>净含量：2500克</li><li>保质期：7天</li><li>贮存条件：常温</li></ul><p><br></p>",
    price: 20.9,
    stock: NumberInt("865"),
    created: ISODate("2021-04-22T06:08:22.004Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("608115bd98f72d1480677032"),
    cover: [
        {
            key: 1619072429812,
            url: "https://fast.tudoublog.com/957b0bdb0199.jpg",
            uid: 1619072430719,
            status: "success"
        },
        {
            key: 1619072434902,
            url: "https://fast.tudoublog.com/1993a902c0a7.jpg",
            uid: 1619072435279,
            status: "success"
        },
        {
            key: 1619072438725,
            url: "https://fast.tudoublog.com/277218325201.jpg",
            uid: 1619072440207,
            status: "success"
        }
    ],
    tags: [
        "坏品包赔",
        "本地特色"
    ],
    sales: NumberInt("1"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "504eca50",
    title: "安岳馆 雷蒙四川安岳水果柠檬1斤装 单果130-260g",
    area: "四川省",
    classify: "水果干果",
    "short_desc": "产地直发 坏果包赔  浓浓清香味道 果肉诱人",
    detail: "<ul><li>品种：其他</li><li>国产/进口：国产</li><li>包装：散装</li><li>净含量：500g</li><li>保质期：10天</li><li>贮存条件：冷藏0-4℃</li></ul><p><br></p>",
    price: 9.8,
    stock: NumberInt("7574"),
    created: ISODate("2021-04-22T06:20:55.501Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("1")
} ]);
db.getCollection("products").insert([ {
    _id: ObjectId("6081183098f72d1480677035"),
    cover: [
        {
            key: 1619073055294,
            url: "https://fast.tudoublog.com/180cbe7e2b1e.jpg",
            uid: 1619073055973,
            status: "success"
        },
        {
            key: 1619073059501,
            url: "https://fast.tudoublog.com/e57ab046af72.jpg",
            uid: 1619073060933,
            status: "success"
        },
        {
            key: 1619073063351,
            url: "https://fast.tudoublog.com/df79daff12bd.jpg",
            uid: 1619073064356,
            status: "success"
        }
    ],
    tags: [
        "顺丰包邮",
        "本地特色"
    ],
    sales: NumberInt("40"),
    status: NumberInt("1"),
    uid: "16eae502",
    pid: "0594a4ba",
    title: "信阳原产毛尖 绿茶 浓香型新茶一级明前春茶嫩芽送礼盒装茗愿茶叶",
    area: "河南省",
    classify: "茶水饮品",
    "short_desc": "源头直供  正品保证  闪电发货  明前绿茶  送礼佳品",
    detail: "<ul><li>品牌：<a href=\"https://www.suning.com/pinpai/0X6X-0-0.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(102, 102, 102);\">茗愿(MINGYUAN)</a></li><li>类别：毛尖</li><li>国产/进口：国产</li><li>采摘时间：明前</li><li>采摘要求：单芽,一芽一叶,一芽二三叶</li><li>发酵程度：不发酵</li><li>干茶形状：尖形</li><li>等级：一级</li><li>工艺：炒青绿茶</li><li>包装：罐装</li><li>净含量：250克</li></ul><p><br></p>",
    price: NumberInt("99"),
    stock: NumberInt("95"),
    created: ISODate("2021-04-22T06:31:18.272Z"),
    __v: NumberInt("0"),
    "store_count": NumberInt("0")
} ]);

// ----------------------------
// Collection structure for sellrecords
// ----------------------------
db.getCollection("sellrecords").drop();
db.createCollection("sellrecords");

// ----------------------------
// Documents of sellrecords
// ----------------------------
db.getCollection("sellrecords").insert([ {
    _id: ObjectId("6086b0b192e85a117c197f2c"),
    "seller_uid": "16eae502",
    today: "2021/04/26",
    income: 233.7,
    __v: NumberInt("0")
} ]);
db.getCollection("sellrecords").insert([ {
    _id: ObjectId("6086b0b292e85a117c197f2d"),
    "seller_uid": "eed13cc5",
    today: "2021/04/26",
    income: 33.6,
    __v: NumberInt("0")
} ]);
db.getCollection("sellrecords").insert([ {
    _id: ObjectId("6087b3722d51b93a3c2faa56"),
    "seller_uid": "16eae502",
    today: "2021/04/27",
    income: 75.6,
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for stores
// ----------------------------
db.getCollection("stores").drop();
db.createCollection("stores");

// ----------------------------
// Documents of stores
// ----------------------------
db.getCollection("stores").insert([ {
    _id: ObjectId("608249bd5b5ad60f44c0c2f9"),
    uid: "16eae502",
    pid: "39ab6981",
    created: ISODate("2021-04-23T04:14:53.733Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("stores").insert([ {
    _id: ObjectId("60824ac1921b9b0f1ceffae3"),
    uid: "16eae502",
    pid: "8f505a22",
    created: ISODate("2021-04-23T04:19:13.604Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("stores").insert([ {
    _id: ObjectId("6082db5bb391c12194dbe403"),
    uid: "16eae502",
    pid: "504eca50",
    created: ISODate("2021-04-23T14:36:11.046Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("stores").insert([ {
    _id: ObjectId("608417e996c2ef0b5cd079bd"),
    uid: "16eae502",
    pid: "f0b31666",
    created: ISODate("2021-04-24T13:06:49.78Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("607c26683fdd064f78896b28"),
    email: "xtd18339197689@163.com",
    avatar: "https://fast.tudoublog.com/5314892e3205.jpg",
    roles: [
        "seller"
    ],
    permission: NumberInt("1"),
    nickname: "xtd",
    uid: "16eae502",
    password: "$2a$10$4fv5bazeS3V6I8NoB18pFejB8Lz5jWqk4Z3DGHBXP8nzZmt6BPBFS",
    created: ISODate("2021-04-18T12:30:32.722Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("607d14613a3dc15bb80c7fdc"),
    email: "1822258846@qq.com",
    avatar: "https://fast.tudoublog.com/33f47817160c.jpeg",
    roles: [
        "admin"
    ],
    permission: NumberInt("2"),
    nickname: "super",
    uid: "ea8f6c2f",
    password: "$2a$10$hQlwb07P3hdxwIPSFm6CDexQVYcFm2j0muZsUG0IMNl9BWyppS9ha",
    created: ISODate("2021-04-19T05:25:53.958Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("60802ceda2ef2e611c6b3aff"),
    email: "468493229@qq.com",
    avatar: "https://fast.tudoublog.com/33f47817160c.jpeg",
    roles: [
        "seller"
    ],
    permission: NumberInt("1"),
    nickname: "myy",
    uid: "eed13cc5",
    password: "$2a$10$h7etWyO1rrccdHH6Xjj5BuWibOBWYpCijTZmNc2X0f1RjslAl3L36",
    created: ISODate("2021-04-21T13:47:25.068Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("60855ebdf63f35249463f69f"),
    email: "2066623430@qq.com",
    avatar: "https://fast.tudoublog.com/9b90d9783675.jpg",
    roles: [
        "user"
    ],
    permission: NumberInt("0"),
    nickname: "mjl",
    uid: "258d978f",
    password: "$2a$10$cqIqbXinZhemKADXfIX/OeUlbKVnWDfKy2JG7bwxSHt/Q2qb3sCpe",
    created: ISODate("2021-04-25T12:21:17.53Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for weekrecommends
// ----------------------------
db.getCollection("weekrecommends").drop();
db.createCollection("weekrecommends");

// ----------------------------
// Documents of weekrecommends
// ----------------------------
db.getCollection("weekrecommends").insert([ {
    _id: ObjectId("60850905ebe8cc5e1cf021eb"),
    pid: "bd5e3d12",
    reason: "头戴凤尾、肉中带金， 一口吃下，果肉饱满，很是诱人",
    created: ISODate("2021-04-25T06:16:14.24Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("weekrecommends").insert([ {
    _id: ObjectId("60850965ebe8cc5e1cf021ec"),
    pid: "597e089b",
    reason: "李佳琪强烈推荐，西湖藕粉，迷人的味道",
    created: ISODate("2021-04-25T06:17:09.565Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("weekrecommends").insert([ {
    _id: ObjectId("608509a8ebe8cc5e1cf021ed"),
    pid: "8f505a22",
    reason: "闲时小零食，官方最强销量，进站必买！",
    created: ISODate("2021-04-25T06:18:16.001Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("weekrecommends").insert([ {
    _id: ObjectId("608509c9ebe8cc5e1cf021ee"),
    pid: "5d72c392",
    reason: "溏心蛋黄 晶莹剔透 口感嫩滑 蛋黄香在口腔回传",
    created: ISODate("2021-04-25T06:18:49.897Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("weekrecommends").insert([ {
    _id: ObjectId("60850a01ebe8cc5e1cf021ef"),
    pid: "b981842a",
    reason: "正宗湖北臭豆腐，香辣可口，开胃下饭",
    created: ISODate("2021-04-25T06:19:45.881Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("weekrecommends").insert([ {
    _id: ObjectId("60850bafc55997703c1926d1"),
    pid: "b03ffceb",
    reason: "红沙流油，鲜香嫩白，小编一口气吃了5个！",
    created: ISODate("2021-04-25T06:26:55.226Z"),
    __v: NumberInt("0")
} ]);
