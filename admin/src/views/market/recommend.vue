<template>
  <div>
    <div class="header-add">
      <el-button type="primary" @click="addRecommend" size="mini">添加推荐</el-button>
    </div>

    <!-- 添加推荐 -->
    <el-dialog
      title="添加推荐"
      :visible.sync="addVisible"
      width="540px"
      :close-on-click-modal="false"
      @close="handleCancelAdd"
    >
      <el-form label-width="100px">
        <el-form-item label="商品ID">
          <el-input placeholder="请输入商品ID" v-model="addForm.pid" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="推荐理由">
          <el-input
            type="textarea"
            placeholder="请输入推荐理由"
            v-model="addForm.reason"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitForm">确认添加</el-button>
          <el-button @click="handleCancelAdd">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑推荐 -->
    <el-dialog
      title="编辑推荐"
      :visible.sync="editVisible"
      width="540px"
      :close-on-click-modal="false"
      @close="handleCancelEdit"
    >
      <el-form label-width="100px">
        <el-form-item label="商品ID">
          <el-input placeholder="请输入商品ID" v-model="editForm.pid" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item label="推荐理由">
          <el-input
            type="textarea"
            placeholder="请输入推荐理由"
            v-model="editForm.reason"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitEdit">确认修改</el-button>
          <el-button @click="handleCancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" empty-text="暂无推荐">
      <el-table-column label="商品ID" align="center" prop="pid"> </el-table-column>
      <el-table-column label="商品封面" align="center">
        <template slot-scope="scope">
          <img
            :src="scope.row._product && scope.row._product[0].cover[0].url"
            v-viewer
            style="width:70px;height:70px"
          />
        </template>
      </el-table-column>

      <el-table-column label="商品名称" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          {{ scope.row._product && scope.row._product[0].title }}
        </template>
      </el-table-column>
      <el-table-column label="推荐原因" :show-overflow-tooltip="true" align="center" prop="reason"> </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          {{ timeFormat(scope.row.created) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            slot="reference"
            @click="handleOpenEdit(scope.$index, scope.row)"
            style="margin-right:10px"
            >编辑</el-button
          >
          <el-popconfirm title="确定删除该条推荐？" @confirm="handleDelete(scope.$index, scope.row)">
            <el-button size="mini" slot="reference" type="warning">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { addWeekRecommendApi, delWeekRecommendApi, getWeekRecommendApi, modifyWeekRecommendApi } from "../../api";
import { timeFormatAll } from "../../utils/handler";
export default {
  data() {
    return {
      tableData: [],
      addForm: {
        pid: "",
        reason: "",
      },
      addVisible: false,
      editVisible: false,
      editForm: {},
    };
  },
  computed: {
    timeFormat() {
      return function(date) {
        return timeFormatAll(date);
      };
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleDelete(index, row) {
      delWeekRecommendApi({_id:row._id}).then(res=>{
        if(res.code === 200) {
          this.$msg.success("删除成功");
          this.getList();
        } else {
          this.$msg.warning(res.msg);
        }
      })
    },
    getList() {
      getWeekRecommendApi().then((res) => {
        this.tableData = res.data;
      });
    },
    addRecommend() {
      this.addVisible = true;
    },
    handleOpenEdit(index, row) {
      this.editForm = cloneDeep(row);
      this.editVisible = true;
    },
    handleSubmitForm() {
      const { pid, reason } = this.addForm;
      if (pid.trim() !== "") {
        if (reason.trim() !== "") {
          addWeekRecommendApi({ pid, reason }).then((res) => {
            if (res.code === 200) {
              this.$msg.success("添加成功");
              this.handleCancelAdd();
              this.getList();
            } else {
              this.$msg.warning(res.msg);
            }
          });
        } else {
          this.$msg.warning("推荐理由不能为空");
        }
      } else {
        this.$msg.warning("商品ID不为空");
      }
    },
    handleSubmitEdit() {
      const { _id, pid, reason } = this.editForm;
      if (pid.trim() !== "") {
        if (reason.trim() !== "") {
          modifyWeekRecommendApi({_id,pid,reason}).then(res=>{
            if(res.code === 200) {
              this.$msg.success("修改成功");
              this.getList();
              this.handleCancelEdit();
            } else {
              this.$msg.warning(res.msg);
            }
          })
        } else {
          this.$msg.warning("推荐理由不能为空");
        }
      } else {
        this.$msg.warning("商品ID不为空");
      }
    },
    handleCancelEdit() {
      this.editForm = {};
      this.editVisible = false;
    },
    handleCancelAdd() {
      this.addForm = {
        pid: "",
        reason: "",
      };
      this.addVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-add {
  margin-bottom: 30px;
}
</style>
