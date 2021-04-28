<template>
  <div class="news-view-container">
    <div class="header-search">
      <el-input class="search-input" placeholder="请输入新闻标题关键字查找..." v-model="searchVal" clearable>
      </el-input>
      <el-button type="primary" @click="handleSearchValue">搜索</el-button>
    </div>

    <!-- 查看弹框 -->
    <el-dialog title="查看详情" :visible.sync="viewVisible">
      <el-form :model="viewForm" label-width="100px">
        <el-form-item label="新闻标题">
          <el-input v-model="viewForm.title" readonly="" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label="新闻封面">
          <img :src="viewForm.mainPic" style="width:180px;height:100px" />
        </el-form-item>
        <el-form-item label="新闻内容">
          <quill-editor v-model="viewForm.content" :options="viewOption" @focus="focus($event)" />
        </el-form-item>
        <el-form-item label="发布时间">
          {{ timeFormat(viewForm.created) }}
        </el-form-item>
        <el-form-item label="点赞次数">
          {{ viewForm.goods&& viewForm.goods.length }}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="viewVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="editForm.title" style="width:60%"></el-input>
        </el-form-item>

        <el-form-item label="新闻封面" :required="true">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadFile">
            <img v-if="editForm.mainPic" :src="editForm.mainPic" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="新闻内容" :required="true">
          <quill-editor v-model="editForm.content" ref="QuillEditor" :options="editOption" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitForm('editForm')">确认修改</el-button>
          <el-button @click="handleCancelModify">取消</el-button>
        </el-form-item>
      </el-form>
      <el-upload action="" style="display:none" :show-file-list="false" :http-request="QuillUploadFile">
        <el-button id="quillUpload" size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-dialog>

    <div class="body-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="新闻标题" align="center" width="320px"> </el-table-column>
        <el-table-column label="新闻封面" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.mainPic" v-viewer style="width:44%;height:60px" />
          </template>
        </el-table-column>
        <el-table-column label="点赞次数" width="100px" align="center">
          <template slot-scope="scope">
            {{ scope.row.goods&&scope.row.goods.length }}
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center">
          <template slot-scope="scope">
            {{ timeFormat(scope.row.created) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除该条新闻吗？" @confirm="handleDelete(scope.$index, scope.row)">
              <el-button size="mini" slot="reference" style="margin-left:10px" type="danger">删除</el-button>
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
  </div>
</template>

<script>
import { getNewsList, handleUploadImage, modifyNews, delTargetNews } from "../../api";
import { timeFormatAll } from "../../utils/handler";
export default {
  name: "news-view",
  data() {
    return {
      searchVal: "",
      editVisible: false,
      pageSize: 5,
      pageNum: 1,
      total: 0,
      tableData: [],
      viewVisible: false,
      viewForm: {},
      editForm: {},
      rules: {
        title: [
          { required: true, message: "请输入新闻标题", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" },
        ],
      },
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
      editOption: {
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
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector("#quillUpload").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
      },
    };
  },

  created() {
    this.handleGetNewsList();
  },
  computed: {
    timeFormat() {
      return function(date) {
        return timeFormatAll(date);
      };
    },
  },
  methods: {
    handleSearchValue() {
      this.handleGetNewsList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.handleGetNewsList();
    },
    handleCancelModify() {
      this.editVisible = false;
      this.editForm = {};
    },
    QuillUploadFile(params) {
      let fileType = params.file.type;
      let fileSize = params.file.size;
      let that = this;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        if (fileSize / 1024 / 1024 < 2) {
          handleUploadImage(params.file).then((res) => {
            if (res.code === 200) {
              let quill = that.$refs.QuillEditor.quill;
              let length = quill.getSelection().index;
              quill.insertEmbed(length, "image", res.img);
              quill.setSelection(length + 1);
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
    uploadFile(params) {
      let fileType = params.file.type;
      let fileSize = params.file.size;
      let that = this;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        if (fileSize / 1024 / 1024 < 2) {
          handleUploadImage(params.file).then((res) => {
            if (res.code === 200) {
              that.editForm.mainPic = res.img;
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
    handleSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.editForm.mainPic || this.editForm.content.trim().length === 0) {
            this.$msg.warning("存在字段为空");
          } else {
            modifyNews(this.editForm).then((res) => {
              if (res.code === 200) {
                this.$msg.success("修改成功");
                this.handleGetNewsList();
                this.handleCancelModify();
              } else {
                this.$msg.error("修改成功");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    handleGetNewsList() {
      getNewsList({ pageSize: this.pageSize, pageNum: this.pageNum, keyword: this.searchVal }).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    focus(event) {
      event.enable(false); //设置富文本编辑器不可编辑
    },
    handleEdit(index, row) {
      this.editVisible = true;
      const { content, mainPic, title, nid } = row;
      let newForm = { content, mainPic, title, nid };
      this.editForm = newForm;
    },
    handleDelete(index, row) {
      const { nid } = row;
      delTargetNews({ nid }).then((res) => {
        if (res.code === 200) {
          this.$msg.success("删除成功");
          this.handleGetNewsList();
        }
      });
    },
    handleView(index, row) {
      this.viewVisible = true;
      this.viewForm = row;
    },
  },
};
</script>

<style lang="scss" scoped>
.news-view-container {
  .header-search {
    width: 38%;
    margin: auto;
    .search-input {
      float: left;
      width: 80%;
      margin-right: 10px;
    }
  }
  .body-table {
    width: 94%;
    margin: 20px auto;
  }
  .avatar-uploader /deep/.el-upload {
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-pagination {
    text-align: center;
    margin: 30px 0;
  }
}
</style>
