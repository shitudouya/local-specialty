<template>
  <div class="product-add">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="商品名称" prop="title" style="width:42%">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" :required="true">
        <el-upload
          action="#"
          :limit="3"
          :on-exceed="handleExceed"
          list-type="picture-card"
          :file-list="fileList"
          :http-request="uploadFile"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="cover" />
            <span class="el-upload-list__item-actions">
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品类别" prop="classify" style="width:42%">
        <el-select v-model="form.classify" placeholder="请选择商品类别">
          <el-option label="特色小吃" value="特色小吃"></el-option>
          <el-option label="水果干果" value="水果干果"></el-option>
          <el-option label="时令蔬菜" value="时令蔬菜"></el-option>
          <el-option label="罐头腌菜" value="罐头腌菜"></el-option>
          <el-option label="茶水饮品" value="茶水饮品"></el-option>
          <el-option label="家禽海鲜" value="家禽海鲜"></el-option>
          <el-option label="地方特产" value="地方特产"></el-option>
          <el-option label="山珍海味" value="山珍海味"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原产地址" prop="area" style="width:42%">
        <el-select v-model="form.area" placeholder="请选择原产地址">
          <el-option label="河北省" value="河北省"></el-option>
          <el-option label="山西省" value="山西省"></el-option>
          <el-option label="辽宁省" value="辽宁省"></el-option>
          <el-option label="吉林省" value="吉林省"></el-option>
          <el-option label="江苏省" value="江苏省"></el-option>
          <el-option label="浙江省" value="浙江省"></el-option>
          <el-option label="安徽省" value="安徽省"></el-option>
          <el-option label="福建省" value="福建省"></el-option>
          <el-option label="江西省" value="江西省"></el-option>
          <el-option label="山东省" value="山东省"></el-option>
          <el-option label="河南省" value="河南省"></el-option>
          <el-option label="湖北省" value="湖北省"></el-option>
          <el-option label="湖南省" value="湖南省"></el-option>
          <el-option label="广东省" value="广东省"></el-option>
          <el-option label="海南省" value="海南省"></el-option>
          <el-option label="四川省" value="四川省"></el-option>
          <el-option label="贵州省" value="贵州省"></el-option>
          <el-option label="云南省" value="云南省"></el-option>
          <el-option label="陕西省" value="陕西省"></el-option>
          <el-option label="甘肃省" value="甘肃省"></el-option>
          <el-option label="青海省" value="青海省"></el-option>
          <el-option label="北京市" value="北京市"></el-option>
          <el-option label="天津市" value="天津市"></el-option>
          <el-option label="上海市" value="上海市"></el-option>
          <el-option label="重庆市" value="重庆市"></el-option>
          <el-option label="新疆" value="新疆"></el-option>
          <el-option label="宁夏" value="宁夏"></el-option>
          <el-option label="广西" value="广西"></el-option>
          <el-option label="内蒙古" value="内蒙古"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品标签" prop="tags">
        <el-select v-model="form.tags" multiple placeholder="请选择商品标签">
          <el-option label="顺丰包邮" value="顺丰包邮"></el-option>
          <el-option label="新品上架" value="新品上架"></el-option>
          <el-option label="本地特色" value="本地特色"></el-option>
          <el-option label="坏品包赔" value="坏品包赔"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="销售价格" prop="price">
        <el-input-number v-model="form.price" :min="1" :precision="2" :max="99999"></el-input-number>
      </el-form-item>

      <el-form-item label="货品库存" prop="stock">
        <el-input-number v-model="form.stock" :min="1" :precision="0" :max="99999"></el-input-number>
      </el-form-item>

      <el-form-item label="商品简述" prop="short_desc" style="width:70%">
        <el-input v-model="form.short_desc"></el-input>
      </el-form-item>

      <el-form-item label="商品详情" :required="true" style="width:70%">
        <quill-editor v-model="detail" ref="QuillEditor" :options="editorOption" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即添加</el-button>
        <el-button @click="resetForm('form')">重置内容</el-button>
      </el-form-item>
    </el-form>
    <el-upload action="" style="display:none" :show-file-list="false" :http-request="QuillUploadFile">
      <el-button id="quillUpload" size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { addProductApi, handleUploadImage } from "../../api";
export default {
  data() {
    return {
      detail: "",
      fileList: [],
      disabled: false,
      form: {
        title: "",
        area: "",
        classify: "",
        tags: [],
        short_desc: "",
        price: 1,
        stock: 1,
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        area: [{ required: true, message: "请选择原产地", trigger: "blur" }],
        classify: [{ required: true, message: "请选择类别", trigger: "blur" }],
        tags: [{ required: true, message: "请选择商品标签", trigger: "blur" }],
        short_desc: [{ required: true, message: "请输入商品简述", trigger: "blur" }],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
        stock: [{ required: true, message: "库存不能为空", trigger: "blur" }],
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
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.fileList.length === 0 || this.detail.trim().length === 0) {
            this.$msg.warning("存在字段为空");
          } else {
            this.$msg.loading("数据提交中...");
            addProductApi({ ...this.form, detail: this.detail, cover: this.fileList }).then((res) => {
              if (res.code === 200) {
                this.$msg.closeAll();
                this.$msg.success("提交成功，请等待后台管理员审核");
                this.resetForm("form");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    handleExceed() {
      this.$msg.warning("图片数量不能超过3张");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
      this.detail = "";
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
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
      let uid = params.file.uid;
      let that = this;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        if (fileSize / 1024 / 1024 < 2) {
          handleUploadImage(params.file).then((res) => {
            if (res.code === 200) {
              that.fileList.push({ key: uid, url: res.img });
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
.product-add {
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
