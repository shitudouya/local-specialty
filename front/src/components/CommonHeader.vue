<template>
  <div class="t-header">
    <a class="header-logo" href="/"></a>
    <div class="header-menu">
      <a-space size="large">
        <a-input-search placeholder="输入搜索的关键字" style="width: 200px" @search="onSearchKey" />
        <router-link to="/" exact>首页</router-link>
        <router-link to="/news" exact>快报</router-link>
        <router-link to="/all">全部分类</router-link>
        <div class="auth" @click="handleAuth" v-if="!info.nickname">登录&注册</div>
        <div class="islogin" v-else>
          <a-space size="large">
            <router-link to="/cart" exact>
              <a-badge :count="cart_count"> <i class="iconfont icon-gouwuche2"></i> 购物车 </a-badge>
            </router-link>
            <a-dropdown>
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                {{ $store.state.info.nickname }}<a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="handleGoMine">个人中心</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="handleLogout">退出登录</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-space>
        </div>
      </a-space>
    </div>

    <a-modal v-model="AuthVisible" title="" width="420px" :footer="null" :maskClosable="false" @cancel="handleClose">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="登录">
          <Login @handleClose="handleClose" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <Register ref="register" />
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCartApi } from "../api";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import ee from "../utils/events";
export default {
  computed: {
    ...mapState({
      info: "info",
    }),
  },
  data() {
    return {
      AuthVisible: false,
      cart_count: 0,
    };
  },

  created() {
    this.$store.dispatch("GET_INFO");
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.getCartCount();
    }
    ee.on("refresh_cart", () => {
      this.getCartCount();
    });
  },
  components: {
    Login,
    Register,
  },
  methods: {
    getCartCount() {
      getCartApi().then((res) => {
        this.cart_count = res.data.length;
      });
    },
    onSearchKey(value) {
      this.$router.push(`/search?keyword=${value}&sort=0`);
    },
    handleAuth() {
      this.AuthVisible = true;
    },
    handleClose() {
      this.AuthVisible = false;
    },
    handleLogout() {
      localStorage.removeItem("token");
      this.$msg.success("退出成功");
      this.islogin = false;
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    },
    handleGoMine() {
      this.$router.push("/mine");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.ant-badge-count {
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  line-height: 16px;
}

.t-header {
  overflow: hidden;
  .header-logo {
    width: 160px;
    float: left;
    height: 54px;
    display: block;
    background: url("../assets/images/logo.png") no-repeat;
    background-size: contain;
  }
  .header-menu {
    margin-top: 10px;
    float: right;
    .auth {
      color: #444;
      cursor: pointer;
      &:hover {
        color: #fc4646;
      }
    }
    a {
      color: #444;
      &:hover {
        color: #fc4646;
      }
      &.router-link-active {
        color: #fc4646;
      }
    }
    /deep/input {
      border-radius: 24px;
    }
  }
  .ant-menu-horizontal,
  .ant-menu-horizontal > .ant-menu-item:hover,
  .ant-menu-horizontal > .ant-menu-item {
    border: none;
  }
}
</style>
