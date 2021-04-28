const labelMapping = {
  本地特色: "#f50",
  顺丰包邮: "#2db7f5",
  坏品包赔: "#108ee9",
  新品上架: "#f58823",
};

const statusMapping = {
  0: "待付款",
  1: "已付款，待发货",
  2: "已发货，待确认",
  3: "交易完成",
};

let classifyMapping = {
  特色小吃: 1,
  水果干果: 2,
  时令蔬菜: 3,
  罐头腌菜: 4,
  茶水饮品: 5,
  地方特产: 6,
  山珍海味: 7,
  家禽海鲜: 8,
};

export { statusMapping, labelMapping,classifyMapping };
