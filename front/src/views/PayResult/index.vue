<template>
  <div>
    <div class="result-box" v-if="isSuccess">
      <img src="../../assets/images/success.png" alt="success" />
      <p>付款成功</p>
      <a-button type="primary" @click="handleGoOrder">
        查看订单
      </a-button>
    </div>
    <div v-else class="loading">
      <a-spin>
        <a-icon slot="indicator" type="loading" style="font-size: 20px;margin-right:10px" spin />
      </a-spin>
      <span>{{ errorText }}</span>
    </div>
  </div>
</template>

<script>
import { getOrderStatusApi, modifyOrderStatusApi } from "../../api";
export default {
  data() {
    return {
      isSuccess: false,
      errorText: "正在查询订单结果...",
    };
  },
  mounted() {
    let query = this.$route.query;
    if (localStorage.getItem("token") && query.out_trade_no) {
      this.getStatus(query.out_trade_no);
    }
  },
  methods: {
    handleGoOrder() {
      this.$router.push("/mine/order");
    },
    getStatus(out_trade_no) {
      getOrderStatusApi({ out_trade_no }).then((res) => {
        if (res.code === 200 && res.result.status === 2) {
          this.isSuccess = true;
          modifyOrderStatusApi({ order_id: out_trade_no, status: 1 }).then((res) => {});
        } else {
          this.errorText = "未找到有关订单或该订单尚未支付";
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.result-box {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 120px;
  }
  p {
    font-size: 24px;
    margin: 20px 0 30px 0;
  }
}
.loading {
  text-align: center;
  margin-top: 100px;
  span {
    font-weight: bold;
    color: #555;
    font-size: 15px;
  }
}
</style>
