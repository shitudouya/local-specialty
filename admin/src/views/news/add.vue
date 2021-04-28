<template>
  <div class="form-body">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="资讯标题：" prop="title">
        <el-input v-model="form.title" style="width:60%"></el-input>
      </el-form-item>

      <el-form-item label="资讯封面：" :required="true">
        <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadFile">
          <img v-if="mainPic" :src="mainPic" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="资讯内容：" :required="true">
        <quill-editor v-model="content" ref="QuillEditor" :options="editorOption" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即发布</el-button>
        <el-button @click="resetForm('form')">重置内容</el-button>
      </el-form-item>
    </el-form>
    <el-upload action="" style="display:none" :show-file-list="false" :http-request="QuillUploadFile">
      <el-button id="quillUpload" size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { handleUploadImage, addNewsApi } from "../../api/index";
export default {
  name: "news-add",
  data() {
    return {
      mainPic: "",
      content: "",
      form: {
        title: "",
      },
      editorOption: {
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
      rules: {
        title: [
          { required: true, message: "请输入新闻标题", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.mainPic || this.content.trim().length === 0) {
            this.$msg.warning("存在字段为空");
          } else {
            this.$msg.loading("请求处理中...");
            addNewsApi({ content: this.content, mainPic: this.mainPic, title: this.form.title }).then((res) => {
              if (res.code === 200) {
                this.$msg.closeAll();
                this.$msg.success("添加成功");
                this.resetForm("form");
              } else {
                this.$msg.closeAll();
                this.$msg.error("添加异常");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.mainPic = "";
      this.content = "";
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
              that.mainPic = res.img;
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
  },
};
</script>

<style lang="scss" scoped>
.form-body {
  width: 72%;
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
  /deep/.ql-container {
    height: 170px;
  }
}
</style>
