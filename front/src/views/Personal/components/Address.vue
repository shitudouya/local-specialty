<template>
  <div class="address clearfix">
    <div class="address-item animate__animated animate__zoomIn" v-for="item in list" :key="item.aid">
      <div class="name">{{ item.realname }}</div>
      <div class="tel">{{ phoneFormat(item.phone) }}</div>
      <div class="address-base">{{ item.address_base.join("") }}</div>
      <div class="address-detail">{{ item.address_detail }}</div>
      <div class="footer">
        <span class="edit" @click="handleEdit(item)">编辑</span>
        <a-popconfirm title="确定要删除该地址码" ok-text="确定" cancel-text="取消" @confirm="handleDel(item.aid)">
          <span class="del">删除</span>
        </a-popconfirm>
      </div>
    </div>

    <div class="address-item add animate__animated animate__zoomIn" @click="handleAddNewAddress">
      <div class="add-box">
        <i class="iconfont icon-tianjiajiahaowubiankuang"></i>
        <div class="address-new">添加新地址</div>
      </div>
    </div>
    <!-- 修改地址 -->
    <a-modal
      v-model="modifyVisible"
      width="460px"
      title="修改地址"
      okText="确认修改"
      cancelText="取消"
      @ok="handleModifyOk"
      @cancel="handleModifyCancel"
    >
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="基本地址">
          <AreaCascader
            expandTrigger="click"
            :fieldNames="{ label: 'name', value: 'name', children: 'children' }"
            v-model="modifyForm.base"
          />
        </a-form-item>
        <a-form-item label="详细地址">
          <a-input v-model="modifyForm.detail" />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model="modifyForm.name" />
        </a-form-item>
        <a-form-item label="手机号">
          <a-input v-model="modifyForm.phone" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 添加新地址 -->
    <a-modal
      v-model="addVisible"
      width="460px"
      title="添加地址"
      okText="添加"
      cancelText="取消"
      @ok="handleAddOk"
      @cancel="handleAddCancel"
    >
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="基本地址">
          <AreaCascader
            expandTrigger="click"
            :fieldNames="{ label: 'name', value: 'name', children: 'children' }"
            v-model="addForm.base"
          />
        </a-form-item>
        <a-form-item label="详细地址">
          <a-input v-model="addForm.detail" />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model="addForm.name" />
        </a-form-item>
        <a-form-item label="手机号">
          <a-input v-model="addForm.phone" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { handlePhoneHidden } from "../../../utils/handler";
import { AreaCascader } from "vue-area-cascader";
import { validatePhone } from "../../../utils/validate";
import { addUserAddressApi, delUserAddressApi, getUserAddressApi, modifyUserAddressApi } from "../../../api";
export default {
  data() {
    return {
      modifyVisible: false,
      addVisible: false,
      list: [],
      modifyForm: {
        aid: "",
        base: [],
        detail: "",
        name: "",
        phone: "",
      },
      addForm: {
        base: [],
        detail: "",
        name: "",
        phone: "",
      },
    };
  },
  components: {
    AreaCascader,
  },
  computed: {
    phoneFormat() {
      return function(phone) {
        return handlePhoneHidden(phone);
      };
    },
  },
  created() {
    this.getAddress();
  },
  methods: {
    getAddress() {
      getUserAddressApi().then((res) => {
        this.list = res.data;
      });
    },
    handleEdit(item) {
      const { address_base, address_detail, phone, realname, aid } = item;
      this.modifyForm = {
        aid,
        base: address_base,
        detail: address_detail,
        name: realname,
        phone,
      };
      this.modifyVisible = true;
    },
    handleDel(aid) {
      delUserAddressApi({ aid }).then((res) => {
        if (res.code === 200) {
          this.$msg.success("删除成功");
          this.getAddress();
        }
      });
    },
    handleAddNewAddress() {
      this.addVisible = true;
    },
    handleModifyCancel() {
      this.modifyForm = {
        aid: "",
        base: [],
        detail: "",
        name: "",
        phone: "",
      };
      this.modifyVisible = false;
    },
    handleModifyOk() {
      const { base, detail, name, phone, aid } = this.modifyForm;
      if (base.length > 0) {
        if (detail.trim().length === 0) {
          this.$msg.warning("请输入详细地址");
        } else {
          if (name.trim().length === 0) {
            this.$msg.warning("请输入姓名");
          } else {
            console.log(phone);
            if (validatePhone(phone)) {
              modifyUserAddressApi({ address_base: base, address_detail: detail, phone, realname: name, aid }).then(
                (res) => {
                  if (res.code === 200) {
                    this.$msg.success("修改成功");
                    this.handleModifyCancel();
                    this.getAddress();
                  }
                }
              );
            } else {
              this.$msg.warning("手机号码格式不正确");
            }
          }
        }
      } else {
        this.$msg.warning("请选择基本地址");
      }
    },
    handleAddOk() {
      const { base, detail, name, phone } = this.addForm;
      if (base.length > 0) {
        if (detail.trim().length === 0) {
          this.$msg.warning("请输入详细地址");
        } else {
          if (name.trim().length === 0) {
            this.$msg.warning("请输入姓名");
          } else {
            console.log(phone);
            if (validatePhone(phone)) {
              addUserAddressApi({ address_base: base, address_detail: detail, phone, realname: name }).then((res) => {
                if (res.code === 200) {
                  this.$msg.success("添加成功");
                  this.getAddress();
                }
              });
              this.addForm = {
                base: [],
                detail: "",
                name: "",
                phone: "",
              };
              this.addVisible = false;
            } else {
              this.$msg.warning("手机号码格式不正确");
            }
          }
        }
      } else {
        this.$msg.warning("请选择基本地址");
      }
    },
    handleAddCancel() {
      this.addForm = {
        base: [],
        detail: "",
        name: "",
        phone: "",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.address-item {
  width: 268px;
  height: 178px;
  float: left;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin-right: 14px;
  position: relative;
  margin-bottom: 14px;
}
.address-item .name {
  font-size: 18px;
  margin-bottom: 10px;
}
.address-item .footer {
  position: absolute;
  bottom: 14px;
  right: 14px;
  font-size: 13px;
  .edit {
    color: #ff9900;
    margin-right: 10px;
    cursor: pointer;
  }
  .del {
    color: #ff4d4f;
    cursor: pointer;
  }
}
.address-item .tel,
.address-base,
.address-detail {
  line-height: 22px;
  color: #757575;
  font-size: 14px;
}
.address-item .add-box {
  font-size: 18px;
  color: #999;
  cursor: pointer;
}
.address-item.add {
  display: flex;
  padding: 0;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
