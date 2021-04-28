<template>
  <a-row class="container" :gutter="3">
    <a-col :span="4">
      <div class="menu-box" style="box-shadow:0px 1px 6px 0px #c9c9c9">
        <h3>个人中心</h3>
        <ul class="list">
          <li v-for="(item, index) in navLinks" :key="index">
            <router-link :to="item.path">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </a-col>
    <a-col :span="20" class="right-box" style="box-shadow:0px 1px 6px 0px #c9c9c9">
      <router-view v-if="info.nickname"></router-view>
      <p v-else>请先登录</p>
    </a-col>
  </a-row>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      info: "info",
    }),
  },
  data() {
    return {
      navLinks: [
        { path: "/mine/order", title: "我的订单" },
        { path: "/mine/store", title: "我的收藏" },
        { path: "/mine/address", title: "收货地址" },
        { path: "/mine/seller", title: "卖家中心" },
        { path: "/mine/private", title: "隐私设置" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  margin-top: 40px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu-box {
  height: calc(100vh - 180px);
  padding: 20px 60px;
  background-color: #fff;
}
.right-box {
  padding: 20px 30px !important;
  min-height: calc(100vh - 180px);
}
.menu-box h3 {
  font-size: 18px;
  font-weight: 400;
  color: #333;
  margin: 0 0 40px 0;
  padding: 0;
}
.menu-box li a {
  font-size: 14px;
  color: #868686;
  display: inline-block;
  line-height: 30px;
}
.menu-box li a.router-link-active {
  color: #ff4d4f;
}
.menu-box li a:hover {
  color: #ff4d4f;
}
</style>
