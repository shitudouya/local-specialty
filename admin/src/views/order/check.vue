<template>
  <div>
    <!-- 查看收货地址 -->
    <el-dialog title="收货地址" :visible.sync="viewAddressVisible" width="600px">
      <el-form label-width="100px">
        <el-form-item label="发货地址">
          {{ viewAddress.address }}
        </el-form-item>
        <el-form-item label="收货人姓名">
          {{ viewAddress.realname }}
        </el-form-item>
        <el-form-item label="联系方式">
          {{ viewAddress.phone }}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCloseViewAddress">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" empty-text="暂无商品">
      <el-table-column label="商品ID" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope"> {{ scope.row.product.pid }}</template>
      </el-table-column>
      <el-table-column label="商品名称" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope"> {{ scope.row.product.title }}</template>
      </el-table-column>
      <el-table-column label="商品图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.product.cover" v-viewer style="width:70px;height:70px;" />
        </template>
      </el-table-column>
      <el-table-column label="商品单价" align="center">
        <template slot-scope="scope"> {{ scope.row.product.price }} 元 </template>
      </el-table-column>
      <el-table-column label="购买数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.product.count }}
        </template>
      </el-table-column>

      <el-table-column label="已付金额" align="center">
        <template slot-scope="scope"> {{ scope.row.money }} 元 </template>
      </el-table-column>
      <el-table-column label="订单创建时间" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope"> {{ timeFormat(scope.row.created) }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleViewAddress(scope.row)" style="margin-right:10px">买家收货地址</el-button>
          <el-popconfirm title="确认发货吗" @confirm="handleConfirm(scope.row)">
            <el-button size="mini" slot="reference" type="primary">确认发货</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="5"
      :total="total"
      v-if="tableData.length > 0"
    >
    </el-pagination>
  </div>
</template>

<script>
import { confirmSendApi, getAllWaitOrderApi } from "../../api";
import { timeFormatAll } from "../../utils/handler";
export default {
  data() {
    return {
      total: 0,
      tableData: [],
      pageSize: 5,
      pageNum: 1,
      viewAddressVisible: false,
      viewAddress: {
        address: "",
        phone: "",
        realname: "",
      },
    };
  },
  computed: {
    timeFormat() {
      return function(date) {
        return timeFormatAll(date);
      };
    },
  },
  created() {
    this.getList();
  },
  methods: {
    handleConfirm(row) {
      confirmSendApi({order_id:row.order_id}).then(res=>{
        if(res.code === 200) {
          this.$msg.success("操作成功");
          this.getList();
        } else {
          this.$msg.warning(res.msg)
        }
      })
    },
    handleViewAddress(row) {
      let address = row.address_base.join("") + row.address_detail;
      this.viewAddress = {
        address,
        phone: row.phone,
        realname: row.realname,
      };
      this.viewAddressVisible = true;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    handleCloseViewAddress() {
      this.viewAddress = {
        address: "",
        phone: "",
        realname: "",
      };
      this.viewAddressVisible = false;
    },
    getList() {
      getAllWaitOrderApi({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
  margin: 30px 0;
}
</style>
