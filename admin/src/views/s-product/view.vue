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

    <!-- 编辑商品弹框 -->
    <el-dialog title="编辑商品" :visible.sync="editVisible" @close="handleEditClose">
      <el-form :model="EditForm" :rules="rules" ref="EditForm" label-width="120px">
        <el-form-item label="商品名称" prop="title" style="width:80%">
          <el-input v-model="EditForm.title"></el-input>
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
          <el-select v-model="EditForm.classify" placeholder="请选择商品类别">
            <el-option label="特色小吃" value="特色小吃"></el-option>
            <el-option label="水果干果" value="水果干果"></el-option>
            <el-option label="时令蔬菜" value="时令蔬菜"></el-option>
            <el-option label="罐头腌菜" value="罐头腌菜"></el-option>
            <el-option label="茶水饮品" value="茶水饮品"></el-option>
            <el-option label="地方特产" value="地方特产"></el-option>
            <el-option label="山珍海味" value="山珍海味"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原产地址" prop="area" style="width:42%">
          <el-select v-model="EditForm.area" placeholder="请选择原产地址">
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
          </el-select>
        </el-form-item>
        <el-form-item label="商品标签" prop="tags">
          <el-select v-model="EditForm.tags" multiple placeholder="请选择商品标签">
            <el-option label="顺丰包邮" value="顺丰包邮"></el-option>
            <el-option label="新品上架" value="新品上架"></el-option>
            <el-option label="本地特色" value="本地特色"></el-option>
            <el-option label="坏品包赔" value="坏品包赔"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="销售价格" prop="price">
          <el-input-number v-model="EditForm.price" :min="1" :precision="2" :max="99999"></el-input-number>
        </el-form-item>

        <el-form-item label="货品库存" prop="stock">
          <el-input-number v-model="EditForm.stock" :min="1" :precision="0" :max="99999"></el-input-number>
        </el-form-item>

        <el-form-item label="商品简述" prop="short_desc" style="width:90%">
          <el-input v-model="EditForm.short_desc"></el-input>
        </el-form-item>

        <el-form-item label="商品详情" :required="true" style="width:90%">
          <quill-editor v-model="detail" ref="QuillEditor" :options="editorOption" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('EditForm')">立即修改</el-button>
          <el-button @click="handleEditClose">取消修改</el-button>
        </el-form-item>
      </el-form>
      <el-upload action="" style="display:none" :show-file-list="false" :http-request="QuillUploadFile">
        <el-button id="quillUpload" size="small" type="primary">点击上传</el-button>
      </el-upload>
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
          <el-button size="mini" type="primary" @click="handleView(scope.row)">查看详情</el-button>
          <el-button size="mini" style="margin-right:10px" type="warning" @click="handleEdit(scope.row)"
            >编辑商品</el-button
          >
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
import { editProductApi, getSellerProductApi, handleUploadImage } from "../../api";
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
      disabled: false,
      keyword: "",
      viewVisible: false,
      viewForm: {},
      editVisible: false,
      detail: "",
      fileList: [],
      currentEdit: "",
      EditForm: {
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
  mounted() {
    this.getList();
  },
  methods: {
    handleSearchValue() {
      this.getList();
    },
    handleEditClose() {
      this.$refs["EditForm"].resetFields();
      this.fileList = [];
      this.detail = "";
      this.currentEdit = "";
      this.editVisible = false;
    },
    getList() {
      this.$msg.loading("拼命加载中...");
      getSellerProductApi({ pageSize: this.pageSize, pageNum: this.pageNum, keyword: this.keyword }).then((res) => {
        this.$msg.closeAll();
        this.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    handleDel(row) {},
    handleView(row) {
      this.viewForm = row;
      this.viewVisible = true;
    },
    focus(event) {
      event.enable(false); //设置富文本编辑器不可编辑
    },
    handleEdit(row) {
      const { title, area, classify, tags, short_desc, price, stock, detail, cover } = row;
      this.EditForm = {
        title,
        area,
        classify,
        tags,
        short_desc,
        price,
        stock,
      };
      this.currentEdit = row.pid;
      this.detail = detail;
      this.fileList = cover;
      this.editVisible = true;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.fileList.length === 0 || this.detail.trim().length === 0) {
            this.$msg.warning("存在字段为空");
          } else {
            this.$msg.loading("数据提交中...");
            editProductApi({ ...this.EditForm, pid: this.currentEdit, detail: this.detail, cover: this.fileList }).then(
              (res) => {
                if (res.code === 200) {
                  this.$msg.closeAll();
                  this.$msg.success("提交成功，等待后台管理员审核");
                  this.handleEditClose();
                  this.getList();
                }
              }
            );
          }
        } else {
          return false;
        }
      });
    },
    handleExceed() {
      this.$msg.warning("图片数量不能超过3张");
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
