<template>
  <a-tabs default-active-key="1">
    <a-tab-pane key="1" tab="全部订单">
      <AllOrder :allList="allList" @getAllList="getAllList" />
    </a-tab-pane>
    <a-tab-pane key="2" tab="待支付">
      <WaitPay :waitpayList="waitpayList" @getAllList="getAllList" />
    </a-tab-pane>
    <a-tab-pane key="3" tab="待发货">
      <WaitSend :waitsendList="waitsendList" @getAllList="getAllList" />
    </a-tab-pane>
    <a-tab-pane key="4" tab="待收货">
      <WaitReceive :waitreceiveList="waitreceiveList" @getAllList="getAllList" />
    </a-tab-pane>
    <a-tab-pane key="5" tab="已完成">
      <Complete :completeList="completeList" @getAllList="getAllList"/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import AllOrder from "../../../components/AllOrder";
import WaitReceive from "../../../components/WaitReceive";
import WaitSend from "../../../components/WaitSend";
import Complete from "../../../components/Complete";
import WaitPay from "../../../components/WaitPay";
import { getOwnOrderApi } from "../../../api";
export default {
  components: {
    AllOrder,
    WaitReceive,
    WaitSend,
    Complete,
    WaitPay,
  },
  data() {
    return {
      allList: [],
      waitpayList: [],
      waitsendList: [],
      waitreceiveList: [],
      completeList: [],
    };
  },
  mounted() {
    this.getAllList();
  },
  methods: {
    getAllList() {
      getOwnOrderApi().then((res) => {
        this.allList = res.data.filter((item) => item.status !== 9);
        this.waitreceiveList = res.data.filter((item) => item.status === 2);
        this.waitpayList = res.data.filter((item) => item.status === 0);
        this.waitsendList = res.data.filter((item) => item.status === 1);
        this.completeList = res.data.filter((item) => item.status === 3);
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
