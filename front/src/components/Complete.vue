<template>
  <div>
    <!-- 商品评论 -->
    <a-modal
      v-model="commentVisible"
      :maskClosable="false"
      :footer="null"
      title="订单评价"
      @cancel="handleCancelComment"
    >
      <a-form :form="commentForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" @submit="handleComments">
        <a-form-item label="评价等级">
          <a-select
            placeholder="请选择评价等级"
            v-decorator="['type', { rules: [{ required: true, message: '请选择评论等级' }] }]"
          >
            <a-select-option value="好评">
              好评
            </a-select-option>
            <a-select-option value="中评">
              中评
            </a-select-option>
            <a-select-option value="差评">
              差评
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="评价内容">
          <a-textarea
            placeholder="请输入评价内容"
            v-decorator="[
              'content',
              {
                rules: [
                  { required: true, message: '请输入评论内容' },
                  { min: 10, max: 100, message: '长度在10-100之间' },
                ],
              },
            ]"
            :rows="4"
          />
        </a-form-item>
        <a-form-item label="添加图片(可选)">
          <a-upload
            :file-list="fileList"
            :customRequest="uploadImage"
            :beforeUpload="beforeUpload"
            :multiple="false"
            @preview="handlePreview"
            :remove="handleRemove"
            list-type="picture-card"
            accept="image/jpeg,image/jpg,image/png"
          >
            <div v-if="fileList.length < 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                上传图片
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 5, offset: 6 }">
          <a-button type="primary" block html-type="submit">
            提交评论
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>

    <div v-if="completeList.length > 0">
      <div class="order-detail" v-for="item in completeList" :key="item.order_id">
        <div class="top">
          <p class="status">{{ statusFormat(item.status) }}</p>
          <div class="info clearfix">
            <p class="left">{{ timeFormat(item.created) }} | 订单号：{{ item.order_id }} | 在线支付</p>
            <p class="address">
              {{ item.realname }} | {{ item.address_base.join("") + item.address_detail }} | {{ item.phone }}
            </p>
            <p class="right" v-if="item.status === 0">
              待付金额：<span class="money">{{ item.money }}</span
              >元
            </p>
            <p class="right" v-else>
              已付金额：<span class="money">{{ item.money }}</span
              >元
            </p>
          </div>
        </div>
        <div class="bottom clearfix">
          <div class="left">
            <img :src="item.product.cover" alt="cover" />
            <div class="product-info">
              <router-link :to="'/product/' + item.product.pid" class="product-name">
                {{ item.product.title }}
              </router-link>
              <p class="price">{{ item.product.price }}元 x {{ item.product.count }}</p>
            </div>
          </div>
          <div class="right">
            <div
              class="order-operate del now"
              style="margin-top:16px"
              v-if="item._comments.length === 0"
              @click="handleComment(item)"
            >
              立即评价
            </div>
            <a-popconfirm
              title="确定要删除此订单吗"
              ok-text="确定"
              cancel-text="不了"
              @confirm="handleDelOrder(item.order_id)"
            >
              <div class="order-operate del del-two" style="margin-top:10px">
                删除订单
              </div>
            </a-popconfirm>
          </div>
        </div>
      </div>
    </div>
    <div v-else>暂时没有相关订单</div>
  </div>
</template>

<script>
import {
  cancelOrderApi,
  handleContinueOrder,
  handleFakeDelOrderApi,
  handleSubmitComments,
  handleUploadImage,
} from "../api";
import { statusMapping } from "../utils/datamap";
import { formatTimeAll } from "../utils/handler";

export default {
  props: {
    completeList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      commentVisible: false,
      currentItem: {},
      fileList: [],
      previewVisible: false,
      previewImage: "",
      commentForm: this.$form.createForm(this, { name: "xtd" }),
    };
  },
  computed: {
    timeFormat() {
      return function(time) {
        return formatTimeAll(time);
      };
    },
    statusFormat() {
      return function(status) {
        return statusMapping[status];
      };
    },
  },
  methods: {
    handleCancelOrder(order_id) {
      cancelOrderApi({ order_id }).then((res) => {
        if (res.code === 200) {
          this.$msg.success("操作成功");
          this.$emit("getAllList");
        }
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handleCancelComment() {
      this.currentItem = {};
      this.commentForm.resetFields();
      this.fileList = [];
      this.commentVisible = false;
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    handlePreview(file) {
      this.previewImage = file.url;
      this.previewVisible = true;
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$msg.warning("只能上传jpg/png格式的图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$msg.warning("图片不得大于2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    uploadImage(file) {
      this.$msg.loading("正在上传中...");
      handleUploadImage(file.file).then((res) => {
        this.$msg.closeAll();
        this.$msg.success("添加成功");
        this.fileList.push({ url: res.img, uid: this.fileList.length + 1 });
      });
    },
    handleComment(item) {
      this.currentItem = item;
      this.commentVisible = true;
    },
    handleComments(e) {
      e.preventDefault();
      this.commentForm.validateFields((err, values) => {
        if (!err) {
          const { seller_uid, product, order_id } = this.currentItem;
          handleSubmitComments({
            seller_uid,
            picList: this.fileList,
            pid: product.pid,
            order_id,
            content: values.content,
            type: values.type,
          }).then((res) => {
            if (res.code === 200) {
              this.$msg.success("评价成功");
              this.$emit("getAllList");
              this.handleCancelComment();
            } else {
              this.$msg.warning(res.msg);
            }
          });
        }
      });
    },
    handleDelOrder(order_id) {
      handleFakeDelOrderApi({ order_id }).then((res) => {
        if (res.code === 200) {
          this.$msg.success("操作成功");
          this.$emit("getAllList");
        } else {
          this.$msg.warning(res.msg);
        }
      });
    },
    handlePayOrder(order_id) {
      handleContinueOrder({ order_id }).then((res) => {
        if (res.code === 200) {
          window.open(res.data);
        } else {
          this.$msg.warning(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.order-detail {
  width: 100%;
  border: 1px solid #ff4d4f;
  margin: 0 0 14px 0;
}
.address {
  font-size: 14px;
  color: #747474;
}
.order-detail .top {
  padding: 10px 20px;
  border-bottom: 1px solid #ff4d4f;
}
.order-detail .top .status {
  font-size: 18px;
  margin-bottom: 10px;
  color: #ff4d4f;
}
.order-detail .top .info p {
  margin: 0;
}
.order-detail .top .info .left {
  color: #747474;
  font-size: 14px;
}
.order-detail .top .right {
  color: #747474;
  font-size: 14px;
  float: right;
}
.order-detail .top .right .money {
  color: #333;
  margin-right: 5px;
  font-size: 28px;
}
.order-detail .bottom {
  padding: 0px 10px;
}
.order-detail .bottom .left {
  float: left;
  margin: 10px;
}
.order-detail .bottom .left .product-info {
  width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
  margin-top: 14px;
  margin-left: 20px;
}
.product-info .product-name {
  font-size: 14px;
  color: #333;
}
.product-info .product-name:hover {
  color: #ff4d4f;
}
.product-info .price {
  margin: 0;
  font-size: 14px;
}
.order-detail .bottom .left img {
  width: 80px;
  display: block;
  float: left;
}
.order-detail .bottom .right {
  float: right;
}
.order-detail .bottom .right .order-operate {
  width: 118px;
  height: 28px;
  display: block;
  font-size: 12px;
  line-height: 24px;
  margin-bottom: 6px;
  border: 1px solid #b0b0b0;
  text-align: center;
  cursor: pointer;
  color: #666;
}
.order-detail .bottom .right .del {
  margin-top: 40px;
  background-color: #3e3f54;
  color: #fff;
  border-color: #3e3f54;
  &.now {
    margin-top: 0;
    background-color: #3e3f54;
    border-color: #3e3f54;
  }
  &.del-two {
    background-color: #f07c37;
    border-color: #f07c37;
  }
  &:hover {
    opacity: 0.86;
  }
}
</style>
