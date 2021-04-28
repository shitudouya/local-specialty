<template>
  <div class="check-box">
    <!-- 查看详情弹框 -->
    <el-dialog title="查看详情" :visible.sync="viewVisible">
      <el-form label-width="120px">
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
        <el-form-item label="添加来源">
          {{ viewForm._user && viewForm._user[0].email }}
        </el-form-item>
        <el-form-item label="商品简述">{{ viewForm.short_desc }}</el-form-item>
        <el-form-item label="商品详情">
          <quill-editor v-model="viewForm.detail" :options="viewOption" @focus="focus($event)" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="viewVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 拒绝原因弹框 -->
    <el-dialog title="提示" :visible.sync="refuseVisible" width="34%" :close="handleClose">
      <el-form label-width="70px">
        <el-form-item label="拒绝原因">
          <el-input type="textarea" placeholder="请输入内容" v-model="reason" maxlength="50" show-word-limit>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmitRefuse">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" empty-text="暂无待审核商品">
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
      <el-table-column label="原产地" align="center" prop="area"> </el-table-column>
      <el-table-column label="商品类别" align="center" prop="classify"> </el-table-column>
      <el-table-column label="价格" align="center" prop="price"> </el-table-column>
      <el-table-column label="添加来源" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope"> {{ scope.row._user[0].email }}</template>
      </el-table-column>
      <el-table-column label="提交日期" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope"> {{ timeFormat(scope.row.created) }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" style="margin-right:10px" @click="handleView(scope.row)"
            >查看详情</el-button
          >
          <el-popconfirm title="确定通过吗？" @confirm="handlePass(scope.row)">
            <el-button size="mini" slot="reference" style="margin-right:10px" type="success">审核通过</el-button>
          </el-popconfirm>
          <el-popconfirm title="确定拒绝吗？" @confirm="handleRefuse(scope.row)">
            <el-button size="mini" slot="reference" type="warning">拒绝通过</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="10"
      :total="total"
      v-if="tableData.length > 0"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getNeedCheckProject, setProductCheckPass, setProductRefuse } from "../../api";
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
      reason: "",
      tableData: [],
      viewVisible: false,
      refuseVisible: false,
      viewForm: {},
      refuseForm: {},
      pageSize: 10,
      pageNum: 1,
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
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getNeedCheckProject({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    handlePass(row) {
      this.$msg.loading("请求处理中...");
      setProductCheckPass({ uid: row.uid, pid: row.pid, product_title: row.title }).then((res) => {
        if (res.code === 200) {
          this.$msg.closeAll();
          this.$msg.success("操作成功");
          this.getList();
        }
      });
    },
    handleRefuse(row) {
      this.refuseForm = row;
      this.refuseVisible = true;
    },
    handleSubmitRefuse() {
      if (this.reason.trim().length === 0) {
        this.$msg.warning("原因不能为空");
      } else {
        const { uid, pid, title } = this.refuseForm;
        this.$msg.loading("请求处理中...");
        setProductRefuse({ uid, pid, product_title: title, reason: this.reason }).then((res) => {
          if (res.code === 200) {
            this.$msg.closeAll();
            this.$msg.success("操作成功");
            this.handleClose();
            this.getList();
          }
        });
      }
    },
    handleClose() {
      this.refuseForm = {};
      this.refuseVisible = false;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    handleView(row) {
      this.viewForm = row;
      this.viewVisible = true;
    },
    focus(event) {
      event.enable(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
  margin: 30px 0;
}
/deep/.el-dialog__body {
  padding: 30px 20px 10px;
}
</style>
