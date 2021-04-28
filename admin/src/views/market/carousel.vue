<template>
  <div>
    <div class="header">
      <el-button type="primary" size="mini" style="margin-bottom:30px" @click="handleOpenAdd">添加轮播图</el-button>
    </div>

    <!-- 添加轮播图弹框 -->
    <el-dialog
      title="添加轮播图"
      :visible.sync="addVisible"
      width="540px"
      :close-on-click-modal="false"
      @close="handleCancelAdd"
    >
      <el-form label-width="100px">
        <el-form-item label="封面">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadFile">
            <img v-if="addForm.cover" :src="addForm.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品ID">
          <el-input v-model="addForm.target_id" style="width:65%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitForm">确认添加</el-button>
          <el-button @click="handleCancelAdd">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="carousel-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="cover" label="轮播图封面" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.cover" v-viewer style="width:70%;height:70px" />
          </template>
        </el-table-column>
        <el-table-column label="商品ID" align="center" prop="target_id"> </el-table-column>
        <el-table-column prop="target_title" label="商品名称" :show-overflow-tooltip="true" align="center"> </el-table-column>
        <el-table-column label="添加时间" align="center">
          <template slot-scope="scope">
            {{ timeFormat(scope.row.created) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popconfirm title="确定删除该条轮播图？" @confirm="handleDelete(scope.$index, scope.row)">
              <el-button size="mini" slot="reference" type="warning">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { addCarouselApi, delTargetCarouselApi, getCarouselApi, handleUploadImage } from "../../api";
import { timeFormatAll } from '../../utils/handler';
export default {
  data() {
    return {
      addVisible: false,
      addForm: {
        cover: "",
        target_id: "",
      },
      tableData: [],
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
    getList() {
      getCarouselApi().then((res) => {
        this.tableData = res.data
      });
    },
    uploadFile(params) {
      this.$msg.loading("数据提交中...");
      let fileType = params.file.type;
      let fileSize = params.file.size;
      let that = this;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        if (fileSize / 1024 / 1024 < 2) {
          handleUploadImage(params.file).then((res) => {
            if (res.code === 200) {
              this.$msg.closeAll();
              this.$msg.success("上传成功");
              that.addForm.cover = res.img;
            } else {
              that.$msg.error("图片上传异常！");
            }
          });
        } else {
          this.$msg.error("上传图片大小不能超过2MB!");
        }
      } else {
        this.$msg.error("上传的图片只能是JPG或PNG格式!");
      }
    },
    handleDelete(index,row) {
      delTargetCarouselApi({_id:row._id}).then(res=>{
        if(res.code === 200) {
          this.$msg.success("操作成功");
          this.getList();
        }
      })
    },
    handleSubmitForm() {
      if (this.addForm.target_id.trim() === "" && this.addForm.cover === "") {
        this.$msg.warning("存在字段为空");
      } else {
        addCarouselApi(this.addForm).then((res) => {
          if (res.code === 200) {
            this.handleCancelAdd();
            this.$msg.success("添加成功");
            this.getList();
          } else {
            this.$msg.warning(res.msg);
          }
        });
      }
      console.log(this.addForm);
    },
    handleCancelAdd() {
      this.addForm = {
        cover: "",
        target_id: "",
      };
      this.addVisible = false;
    },
    handleOpenAdd() {
      this.addVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 260px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.avatar {
  width: 260px;
  height: 160px;
  display: block;
}
</style>
