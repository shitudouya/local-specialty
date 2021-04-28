<template>
  <div>
    <el-popconfirm title="确定要清空消息吗？" @confirm="handleClearNotify" v-if="list.length>0">
      <el-button type="text" slot="reference">清空消息</el-button>
    </el-popconfirm>
    <span v-else>暂无消息</span>
    <div v-for="item in list" :key="item._id">
      <el-alert
        :closable="false"
        v-if="item.status === 1"
        :title="'您于 ' + timerFormat(item.created) + ' 提交的商品：' + item.product_title + '，审核通过'"
        type="success"
        effect="dark"
      >
      </el-alert>
      <el-alert
        :closable="false"
        v-else
        :title="
          '您于 ' +
            timerFormat(item.created) +
            ' 提交的商品：' +
            item.product_title +
            '，审核未通过，原因：' +
            item.reason
        "
        type="warning"
        effect="dark"
      >
      </el-alert>
    </div>
  </div>
</template>

<script>
import { clearAllNotifyApi, getNotifyApi } from "../../api";
import { timeFormatAll } from "../../utils/handler";
import ee from "../../utils/events";
export default {
  computed: {
    timerFormat() {
      return function(date) {
        return timeFormatAll(date);
      };
    },
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getNotifyApi().then((res) => {
        this.list = res.data;
      });
    },
    handleClearNotify() {
      this.$msg.loading("请求处理中...")
      clearAllNotifyApi().then((res) => {
        if (res.code === 200) {
          this.$msg.closeAll();
          this.$msg.success("操作成功");
          this.getList();
          ee.emit("getNotify");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-alert {
  margin-bottom: 14px;
}
</style>
