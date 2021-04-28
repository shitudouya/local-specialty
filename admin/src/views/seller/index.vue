<template>
  <div>
    <div class="header-search">
      <el-input class="search-input" placeholder="输入商家邮箱地址" v-model="email" clearable> </el-input>
      <el-button type="primary" @click="handleSearchValue">搜索</el-button>
    </div>

    <el-table :data="list" style="width: 100%" empty-text="暂时没有商家入驻">
      <el-table-column label="商家昵称" align="center" :show-overflow-tooltip="true" prop="nickname"> </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" v-viewer style="width:60px;height:60px;" />
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center" :show-overflow-tooltip="true" prop="email"> </el-table-column>
      <el-table-column label="上架商品数量" align="center">
        <template slot-scope="scope">
          {{ scope.row._product&&scope.row._product.length }}
        </template>
      </el-table-column>
      <el-table-column label="总销售额" align="center">
        <template slot-scope="scope"> {{ totalSell(scope.row._record) }} 元</template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="10"
      :total="total"
      v-if="list.length > 0"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getAllSellerApi } from "../../api";
import { computedTotalMoney } from "../../utils/handler";

export default {
  data() {
    return {
      list: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      email: "",
    };
  },
  computed: {
    totalSell() {
      return function(list) {
        return computedTotalMoney(list);
      };
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getAllSellerApi({ pageSize: this.pageSize, pageNum: this.pageNum, email: this.email }).then((res) => {
        this.list = res.data.list;
        this.total = res.data.total;
      });
    },
    handleSearchValue() {
      this.getList();
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
