<template>
  <div class="product-box">
    <div class="header-search">
      <el-input class="search-input" placeholder="请输入商品标题关键字查找..." v-model="keyword" clearable> </el-input>
      <el-button type="primary" @click="handleSearchValue">搜索</el-button>
    </div>
    <!-- 查看详情弹框 -->
    <el-dialog title="查看详情" :visible.sync="viewVisible">
      <el-form label-width="120px">
        <el-form-item label="商品ID">
          {{ viewForm.pid }}
        </el-form-item>
        <el-form-item label="商品名称">
          {{ viewForm.title }}
        </el-form-item>
        <el-form-item label="商品图片">
          <img
            v-for="(item, index) in viewForm.cover"
            :key="index"
            :src="item.url"
            v-viewer
            style="float:left;width:80px;height:80px;margin-right:10px"
          />
        </el-form-item>
        <el-form-item label="原产地">
          {{ viewForm.area }}
        </el-form-item>
        <el-form-item label="商品类型">
          {{ viewForm.classify }}
        </el-form-item>
        <el-form-item label="商品标签"> {{ viewForm.tags && viewForm.tags.join("、") }} </el-form-item>
        <el-form-item label="商品价格">
          {{ viewForm.price }}
        </el-form-item>
        <el-form-item label="商品库存">{{ viewForm.stock }}</el-form-item>
        <el-form-item label="商品简述">{{ viewForm.short_desc }}</el-form-item>
        <el-form-item label="商品详情">
          <quill-editor v-model="viewForm.detail" :options="viewOption" @focus="focus($event)" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="viewVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" empty-text="暂无商品">
      <el-table-column label="商品名称" align="center" :show-overflow-tooltip="true" prop="title" width="200">
      </el-table-column>
      <el-table-column label="商品图片" align="center" width="320">
        <template slot-scope="scope">
          <img
            v-for="(item, index) in scope.row.cover"
            :key="index"
            :src="item.url"
            v-viewer
            style="float:left;width:80px;height:80px;margin-right:10px"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品类别" align="center" prop="classify"> </el-table-column>
      <el-table-column label="价格" align="center" prop="price"> </el-table-column>
      <el-table-column label="销量" align="center">
        <template slot-scope="scope"> {{ scope.row.sales }}件</template>
      </el-table-column>
      <el-table-column label="上架时间" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope"> {{ timeFormat(scope.row.created) }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleView(scope.row)" style="margin-right:10px">查看详情</el-button>
          <el-popconfirm title="确定下架商品吗？" @confirm="handleDel(scope.row)">
            <el-button size="mini" slot="reference" type="danger">下架商品</el-button>
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
import { getAllProductListApi  } from "../../api";
import { timeFormatAll } from "../../utils/handler";

export default {
  computed: {
    timeFormat() {
      return function(date) {
        return timeFormatAll(date);
      };
    },
  },
  data() {
    return {
      total: 0,
      tableData: [],
      pageSize: 5,
      pageNum: 1,
      keyword: "",
      viewVisible: false,
      viewForm: {},
      viewOption: {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ header: [1, 2, 3, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
            ],
          },
        },
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleSearchValue() {
      this.getList();
    },
    getList() {
      this.$msg.loading("拼命加载中...");
      getAllProductListApi({ pageSize: this.pageSize, pageNum: this.pageNum, keyword: this.keyword }).then((res) => {
        this.$msg.closeAll();
        this.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    handleDel(row) {

    },
    handleView(row) {
      this.viewForm = row;
      this.viewVisible = true;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
  margin: 30px 0;
}
.header-search {
  width: 38%;
  margin: 0 auto 40px;
  .search-input {
    float: left;
    width: 80%;
    margin-right: 10px;
  }
}
</style>
