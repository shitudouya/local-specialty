<template>
  <div class="order-container animate__animated animate__fadeInUp" id="order">
    <div v-if="list.length > 0">
      <div class="headers">确认订单</div>
      <div class="order-box">
        <div class="address clearfix">
          <div class="address-title">收货地址</div>
          <div
            :class="currentIndex === index ? 'address-item current' : 'address-item'"
            v-for="(item, index) in addressList"
            :key="item.aid"
            @click="handleChooseAddress(index)"
          >
            <div class="name">{{ item.realname }}</div>
            <div class="tel">{{ phoneFormat(item.phone) }}</div>
            <div class="address-base">{{ item.address_base.join("") }}</div>
            <div class="address-detail">{{ item.address_detail }}</div>
            <div class="footer">
              <span class="edit" @click="handleEdit(item)">编辑</span>
            </div>
          </div>

          <div class="address-item add" @click="handleAddNewAddress">
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
                  v-model="modifyForm.address_base"
                />
              </a-form-item>
              <a-form-item label="详细地址">
                <a-input v-model="modifyForm.address_detail" />
              </a-form-item>
              <a-form-item label="姓名">
                <a-input v-model="modifyForm.realname" />
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
                  v-model="addForm.address_base"
                />
              </a-form-item>
              <a-form-item label="详细地址">
                <a-input v-model="addForm.address_detail" />
              </a-form-item>
              <a-form-item label="姓名">
                <a-input v-model="addForm.realname" />
              </a-form-item>
              <a-form-item label="手机号">
                <a-input v-model="addForm.phone" />
              </a-form-item>
            </a-form>
          </a-modal>
        </div>
        <div class="product-title">商品详情</div>
        <a-row class="product-list" v-for="item in list" :key="item.cart_id">
          <a-col :span="16" class="product-name">
            <img :src="item.cover" alt="cover" />
            <span class="clip-one">{{ item.title }}</span>
          </a-col>
          <a-col :span="4"> {{ item.price }}元 x {{ item.count }} </a-col>
          <a-col :span="4"> {{ item.total }} 元 </a-col>
        </a-row>

        <div class="send-way">
          配送方式
          <span>包邮</span>
        </div>
        <div class="pay-way clearfix">
          <p>支付方式</p>
          <div class="alipay">
            <img src="../../../src/assets/images/alipay.jpg" alt="alipay" />
          </div>
        </div>
        <div class="statistics clearfix">
          <div class="right-box">
            <p>
              商品件数：<span>{{ list.length }}件</span>
            </p>
            <p>
              商品总价：<span>{{ getTotal(list) }}元</span>
            </p>
            <p>运费：<span>0元</span></p>
            <p class="total">
              应付总额：<span>{{ getTotal(list) }}</span>
              <em>元</em>
            </p>
          </div>
        </div>
      </div>
      <div class="pay-operate clearfix">
        <div class="right">
          <div class="back btn" @click="handleBackCart">
            返回购物车
          </div>
          <div class="pay btn" @click="handlePayNow">
            立即付款
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>没有找到有关订单或订单已被提交</p>
      <router-link style="color:#ff4d4f" to="/mine/order">返回我的订单</router-link>
    </div>
  </div>
</template>

<script>
import { handlePhoneHidden, totalMoney } from "../../utils/handler";
import { AreaCascader } from "vue-area-cascader";
import { validatePhone } from "../../utils/validate";
import { mapState } from "vuex";
import { addUserAddressApi, createOrderApi, getUserAddressApi, modifyUserAddressApi } from "../../api";
import cloneDeep from "lodash/cloneDeep";
export default {
  computed: {
    ...mapState({
      list: "orderList",
    }),
    getTotal() {
      return function(list) {
        return totalMoney(list);
      };
    },
    phoneFormat() {
      return function(phone) {
        return handlePhoneHidden(phone);
      };
    },
  },
  components: {
    AreaCascader,
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getAddress();
    }
  },
  data() {
    return {
      currentIndex: 0,
      modifyVisible: false,
      addVisible: false,
      modifyForm: {},
      addressList: [],
      addForm: {
        address_base: [],
        address_detail: "",
        realname: "",
        phone: "",
      },
    };
  },
  methods: {
    handleEdit(item) {
      let newItem = cloneDeep(item);
      this.modifyForm = newItem;
      this.modifyVisible = true;
    },
    getAddress() {
      getUserAddressApi().then((res) => {
        this.addressList = res.data;
      });
    },
    handleAddNewAddress() {
      this.addVisible = true;
    },
    handleModifyOk() {
      const { aid, address_base, address_detail, realname, phone } = this.modifyForm;
      if (address_base.length > 0) {
        if (address_detail.trim().length === 0) {
          this.$msg.warning("请输入详细地址");
        } else {
          if (realname.trim().length === 0) {
            this.$msg.warning("请输入姓名");
          } else {
            if (validatePhone(phone)) {
              modifyUserAddressApi({ aid, address_base, address_detail, realname, phone }).then((res) => {
                if (res.code === 200) {
                  this.$msg.success("修改成功");
                  this.handleModifyCancel();
                  this.getAddress();
                }
              });
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
      const { address_base, address_detail, realname, phone } = this.addForm;
      if (address_base.length > 0) {
        if (address_detail.trim().length === 0) {
          this.$msg.warning("请输入详细地址");
        } else {
          if (realname.trim().length === 0) {
            this.$msg.warning("请输入姓名");
          } else {
            if (validatePhone(phone)) {
              addUserAddressApi(this.addForm).then((res) => {
                if (res.code === 200) {
                  this.$msg.success("添加成功");
                  this.handleAddCancel();
                  this.getAddress();
                }
              });
            } else {
              this.$msg.warning("手机号码格式不正确");
            }
          }
        }
      } else {
        this.$msg.warning("请选择基本地址");
      }
    },
    handlePayNow() {
      if (this.list.length > 0) {
        let chooseAddress = this.addressList[this.currentIndex];
        createOrderApi({
          address_base: chooseAddress.address_base,
          address_detail: chooseAddress.address_detail,
          realname: chooseAddress.realname,
          phone: chooseAddress.phone,
          list: this.list,
          money: this.getTotal(this.list),
        }).then((res) => {
          this.$store.commit("SET_ORDER_LIST",[]);
          window.open(res.data);
        });
      } else {
        this.$msg.warning("该订单已被提交，请到我的订单中查看结果");
        setTimeout(() => {
          this.$router.push("/mine/order");
        }, 300);
      }
    },
    handleAddCancel() {
      this.addForm = {
        address_base: [],
        address_detail: "",
        realname: "",
        phone: "",
      };
      this.addVisible = false;
    },
    handleBackCart() {
      this.$router.push("/cart");
    },
    handleModifyCancel() {
      this.modifyForm = {};
      this.modifyVisible = false;
    },
    handleChooseAddress(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.order-container {
  margin-top: 20px;
  .headers {
    font-size: 18px;
    color: #484848;
    background-color: #fff;
  }
}
.address-title,
.product-title {
  margin: 20px 0;
  font-size: 16px;
  position: relative;
  padding-left: 10px;
  &::before {
    content: "";
    position: absolute;
    height: 20px;
    left: 0px;
    top: 2px;
    width: 4px;
    background-color: #ff4d4f;
  }
}
.address-item {
  width: 268px;
  height: 178px;
  float: left;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  padding: 15px 24px 0;
  margin-right: 14px;
  position: relative;
  margin-bottom: 14px;
  &.current {
    border: 1px solid #ff4d4f;
  }
}
.address-item.current {
  border: 1px solid #ff4d4f;
}
.address-item:hover {
  border: 1px solid #ff4d4f;
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
}
.address-item.add {
  display: flex;
  padding: 0;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.product-list {
  margin: 20px 0;
  display: flex;
  align-items: center;
}
.product-list .product-name img {
  width: 40px;
  display: block;
  float: left;
  margin-right: 20px;
}
.product-list .product-name span {
  font-size: 14px;
  display: block;
  margin-top: 10px;
}
.send-way {
  padding: 30px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.send-way span {
  color: #ff4d4f;
  font-size: 14px;
  margin-left: 100px;
}
.pay-way {
  display: flex;
  align-items: center;
  padding: 13px 0;
  border-bottom: 1px solid #e0e0e0;
}
.pay-way p {
  margin: 0;
}
.pay-way .alipay {
  margin-left: 20px;
}
.statistics {
  padding: 20px;
}
.statistics p {
  margin: 0;
  line-height: 24px;
}
.statistics .right-box {
  float: right;
  font-size: 14px;
  color: #666;
}
.statistics .right-box .total span {
  font-size: 28px;
  margin: 0;
}
.statistics .right-box .total em {
  font-size: 14px;
  color: #ff4d4f;
  font-style: normal;
}
.statistics .right-box span {
  color: #ff4d4f;
  margin-left: 20px;
}
.pay-operate {
  font-size: 20px;
  color: #444444;
  background-color: #fff;
  padding: 20px;
  margin: 10px 0 20px 0;
  width: 100%;
  float: right;
}
.pay-operate .right {
  float: right;
  display: flex;
}
.pay-operate .back {
  border: 1px solid #e0e0e0;
  border-radius: 0px;
  font-size: 14px;
  cursor: pointer;
  color: #888;
  padding: 10px 20px;
}
.pay-operate .pay {
  font-size: 14px;
  color: #fff;
  background-color: #ff4d4f;
  padding: 10px 20px;
  border-radius: 0px;
  cursor: pointer;
  margin-left: 20px;
  &:hover {
    opacity: 0.86;
  }
}
</style>
