<template>
  <div>
    <div class="header-search">
      <el-input class="search-input" placeholder="请输入订单ID查找..." v-model="order_id" clearable>
      </el-input>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
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

    <el-table :data="tableData" style="width: 100%" empty-text="暂无历史订单">
      <el-table-column label="订单ID" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope"> {{ scope.row.order_id }}</template>
      </el-table-column>
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
      <el-table-column label="订单状态" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope"> {{ statusFormat(scope.row.status) }} </template>
      </el-table-column>
      <el-table-column label="订单创建时间" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope"> {{ timeFormat(scope.row.created) }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleViewAddress(scope.row)" style="margin-right:10px"
            >买家收货地址</el-button
          >
          <el-popconfirm title="确认删除订单吗" @confirm="handleDel(scope.row)">
            <el-button size="mini" slot="reference" type="danger">删除订单</el-button>
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
import { delTargetOrderApi, getHistoryOrderApi } from "../../api";
import { statusMapping, timeFormatAll } from "../../utils/handler";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 5,
      pageNum: 1,
      order_id: "",
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
    statusFormat() {
      return function(type) {
        return statusMapping[type]
      }
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleSearch() {
      this.getList();
    },
    getList() {
      getHistoryOrderApi({ pageSize: this.pageSize, pageNum: this.pageNum, order_id: this.order_id }).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    handleCloseViewAddress() {
      this.viewAddress = {
        address: "",
        phone: "",
        realname: "",
      };
      this.viewAddressVisible = false;
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
    handleDel(row) {
      delTargetOrderApi({order_id:row.order_id}).then(res=>{
        if(res.code === 200) {
          this.$msg.success("删除成功");
          this.getList();
        }
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.header-search {
    width: 38%;
    margin: auto;
    margin-bottom: 30px;
    .search-input {
      float: left;
      width: 80%;
      margin-right: 10px;
    }
  }
.el-pagination {
  text-align: center;
  margin: 30px 0;
}
</style>
