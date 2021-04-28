<template>
  <div class="seller-container">
    <div class="no-seller" v-if="info.permission === 0">
      <p class="no-text"><a-icon type="exclamation-circle" /> 您当前暂时没有卖家权限资格</p>
      <p>你可以填写官方专属邀请码，升级成为卖家（获取邀请码请致电官方：0316-4492-0444）</p>
      <a-input-search placeholder="请输入邀请码" enter-button="激活权限" style="width:400px" @search="onSearch" />
    </div>
    <div class="seller" v-if="info.permission === 1">
      您已拥有卖家权限，进入卖家管理，请移步到：<a href="http://localhost:8010" target="_blank">卖家管理中心</a>
    </div>
    <div class="seller" v-if="info.permission === 2">
      当前身份为管理员
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { registerSellerApi } from "../../../api";
export default {
  computed: {
    ...mapState({
      info: "info",
    }),
  },
  data() {
    return {
      isSell: false,
    };
  },
  methods: {
    onSearch(val) {
      if (val.trim().length === 0) {
        this.$msg.warning("邀请码不能为空");
      } else {
        registerSellerApi({ code: val }).then((res) => {
          if (res.code === 200) {
            this.$msg.success("恭喜你注册成为卖家");
            this.$store.dispatch("GET_INFO");
          } else {
            this.$msg.warning(res.msg)
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.seller-container {
  .no-text {
    color: #ff9900;
  }
  /deep/.ant-btn-primary {
    color: #fff;
    border-color: #ff4d4f;
    background-color: #ff4d4f;
  }
}
.seller {
  a {
    color: #19be6b;
  }
}
</style>
