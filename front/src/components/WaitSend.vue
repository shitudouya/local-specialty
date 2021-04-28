<template>
  <div>
    <div v-if="waitsendList.length > 0">
      <div class="order-detail" v-for="item in waitsendList" :key="item.order_id">
        <div class="top">
          <p class="status">已付款，待发货</p>
          <div class="info clearfix">
            <p class="left">{{ timeFormat(item.created) }} | 订单号：{{ item.order_id }} | 在线支付</p>
            <p class="address">
              {{ item.realname }} | {{ item.address_base.join("") + item.address_detail }} | {{ item.phone }}
            </p>
            <p class="right" v-if="item.status === 0">
              待付金额：<span class="money">{{ item.money }}</span
              >元
            </p>
            <p class="right" v-else>
              已付金额：<span class="money">{{ item.money }}</span
              >元
            </p>
          </div>
        </div>
        <div class="bottom clearfix">
          <div class="left" >
            <img :src="item.product.cover" alt="cover" />
            <div class="product-info">
              <router-link :to="'/product/' + item.product.pid" class="product-name">
                {{ item.product.title }}
              </router-link>
              <p class="price">{{ item.product.price }}元 x {{ item.product.count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>暂时没有相关订单</div>
  </div>
</template>

<script>
import { statusMapping } from "../utils/datamap";
import { formatTimeAll } from "../utils/handler";

export default {
  props: {
    waitsendList: {
      type: Array,
      default: [],
    },
  },
  computed: {
    timeFormat() {
      return function(time) {
        return formatTimeAll(time);
      };
    },
    statusFormat() {
      return function(status) {
        return statusMapping[status];
      };
    },
  },
};
</script>

<style lang="less" scoped>
.order-detail {
  width: 100%;
  border: 1px solid #ff4d4f;
  margin: 0 0 14px 0;
}
.address {
  font-size: 14px;
  color: #747474;
}
.order-detail .top {
  padding: 10px 20px;
  border-bottom: 1px solid #ff4d4f;
}
.order-detail .top .status {
  font-size: 18px;
  margin-bottom: 10px;
  color: #ff4d4f;
}
.order-detail .top .info p {
  margin: 0;
}
.order-detail .top .info .left {
  color: #747474;
  font-size: 14px;
}
.order-detail .top .right {
  color: #747474;
  font-size: 14px;
  float: right;
}
.order-detail .top .right .money {
  color: #333;
  margin-right: 5px;
  font-size: 28px;
}
.order-detail .bottom {
  padding: 0px 10px;
}
.order-detail .bottom .left {
  float: left;
  margin: 10px;
}
.order-detail .bottom .left .product-info {
  width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
  margin-top: 14px;
  margin-left: 20px;
}
.product-info .product-name {
  font-size: 14px;
  color: #333;
}
.product-info .product-name:hover {
  color: #ff4d4f;
}
.product-info .price {
  margin: 0;
  font-size: 14px;
}
.order-detail .bottom .left img {
  width: 80px;
  display: block;
  float: left;
}
.order-detail .bottom .right {
  float: right;
}
</style>
