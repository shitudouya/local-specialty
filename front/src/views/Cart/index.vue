<template>
  <div>
    <div v-if="info.email">
      <div class="cart-box" style="box-shadow:0px 1px 6px 0px #c9c9c9">
        <a-row class="headers">
          <a-col :span="2">
            <a-checkbox :checked="checkedAll" @change="onChangeAll">
              全选
            </a-checkbox>
          </a-col>
          <a-col :span="10">
            商品名称
          </a-col>
          <a-col :span="3">
            单价
          </a-col>
          <a-col :span="3">
            数量
          </a-col>
          <a-col :span="3">
            总价
          </a-col>
          <a-col :span="3">
            操作
          </a-col>
        </a-row>
        <div class="cart-body" v-if="list.length > 0">
          <a-row class="cart-item" v-for="item in list" :key="item.cart_id">
            <a-col :span="2">
              <a-checkbox style="margin-left:-52px" :checked="item.selected" @change="(e) => onSelect(e, item.cart_id)">
              </a-checkbox>
            </a-col>
            <a-col :span="10" class="product-title">
              <img :src="item.cover" alt="cover" />
              <router-link :to="'/product/' + item.pid" class="clip-two">{{ item.title }}</router-link>
            </a-col>
            <a-col :span="3">
              {{ item.price }}
            </a-col>
            <a-col :span="3">
              <a-input-number
                style="margin-left:14px"
                v-model="item.count"
                :min="1"
                :max="100"
                @change="(val) => onCountChange(val, item.cart_id)"
              />
            </a-col>
            <a-col :span="3" style="margin-left:4px"> {{ item.total }}元 </a-col>
            <a-col :span="3">
              <a-popconfirm
                title="确定要删除该商品吗"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onConfirmDel(item.cart_id)"
              >
                <span class="delete" style="margin-left:8px">移出</span>
              </a-popconfirm>
            </a-col>
          </a-row>
        </div>
        <div v-else class="empty-cart">购物车为空</div>
      </div>
      <div class="total-box clearfix">
        <div class="left">
          共<span>{{ list.length }}</span
          >件商品，已选<span>{{ selectedCount }}</span
          >件
        </div>
        <div class="right">
          <div class="total">
            <span>合计：</span>
            {{ totalMoney }} <span>元</span>
          </div>
          <div class="submit-order" @click="handleSumbitOrder">
            提交订单
          </div>
        </div>
      </div>
    </div>
    <div v-else style="margin-top:20px">请先登录</div>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import { math } from "../../utils/math";
import ee from "../../utils/events";
import { mapState } from "vuex";
import { deleteTargetCart, getCartApi } from "../../api";
export default {
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapState({
      info: "info",
    }),
    checkedAll() {
      if (this.list.length > 0) {
        return this.list.every((item) => item.selected);
      } else {
        return false;
      }
    },
    selectedCount() {
      let total = 0;
      if (this.list.length > 0) {
        this.list.forEach((item) => {
          if (item.selected) {
            total++;
          }
        });
      }
      return total;
    },
    totalMoney() {
      let money = 0;
      if (this.list.length > 0) {
        this.list.forEach((item) => {
          if (item.selected) {
            money = math.add(money, item.total);
          }
        });
      }
      return money;
    },
  },
  mounted() {
    if(localStorage.getItem("token")) {
      this.getList();
    }
  },
  methods: {
    getList() {
      getCartApi().then((res) => {
        this.list = res.data;
      });
    },
    onChangeAll(e) {
      let newProducts = cloneDeep(this.list);
      newProducts.forEach((item) => {
        item.selected = e.target.checked;
      });
      this.list = newProducts;
    },
    handleSumbitOrder() {
      if(this.list.length===0) {
        this.$msg.warning("购物车为空")
      } else {
        this.$store.commit("SET_ORDER_LIST",this.list);
        this.$router.push("/order/confirm")
      }
    },
    onSelect(e, id) {
      let newProducts = cloneDeep(this.list);
      newProducts.forEach((item) => {
        if (item.cart_id === id) {
          item.selected = e.target.checked;
        }
      });
      this.list = newProducts;
    },
    onCountChange(value, id) {
      let newProducts = cloneDeep(this.list);
      newProducts.forEach((item) => {
        if (item.cart_id === id) {
          if (value === "" || value === null) {
            item.count = 1;
            item.total = math.multiply(item.count, item.price);
          } else if (Number.isNaN(Number(value))) {
            item.count = 1;
            item.total = math.multiply(item.count, item.price);
          } else if (value.toString().indexOf(".") !== -1) {
            item.count = parseInt(value);
            item.total = math.multiply(item.count, item.price);
          } else {
            item.count = value;
            item.total = math.multiply(value, item.price);
          }
        }
      });
      this.list = newProducts;
    },
    onConfirmDel(id) {
      deleteTargetCart({ cart_id: id }).then((res) => {
        if (res.code === 200) {
          ee.emit("refresh_cart");
          this.$msg.success("删除成功");
          this.getList();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart-box {
  width: 100%;
  min-height: calc(100vh - 160px);
  margin-top: 30px;
  border-radius: 2px;
}
.headers {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  .ant-col {
    text-align: center;
  }
}
.items {
  padding: 10px;
  width: 100%;
  .ant-col {
    text-align: center;
  }
}
.empty-cart {
  text-align: center;
  margin-top: 40px;
  color: #aaa;
}
.cart-item {
  padding: 14px;
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
}
.cart-item img {
  width: 66px;
  margin-right: 20px;
  float: left;
}

.cart-item .checked {
  margin-left: 8px;
}
.cart-item .product-title {
  display: flex;
  align-items: center;
  a {
    color: #444;
    &:hover {
      color: #ff4d4f;
    }
  }
}
.cart-item .title {
  word-break: break-all;
  display: flex;
  align-items: center;
}
.cart-item .title span {
  margin-left: 10px;
}
.cart-item .delete {
  font-size: 14px;
  width: 80px;
  line-height: 26px;
  display: inline-block;
  height: 28px;
  background-color: #fff;
  border: 1px solid #ff4d4f;
  border-radius: 2px;
  color: #444;
  cursor: pointer;
}
.cart-item .delete:hover {
  background-color: #ff4d4f;
  color: #fff;
}
.total-box {
  font-size: 20px;
  color: #444444;
  background-color: #fff;
  margin-top: 10px;
  height: 42px;
}
.total-box .left {
  font-size: 16px;
  float: left;
  line-height: 42px;
  margin-left: 10px;
}
.total-box .left span {
  color: #ff4d4f;
}
.total-box .right {
  float: right;
  font-size: 24px;
  color: #444;
  font-weight: 600;
  color: #ff4d4f;
}
.total-box .right .total {
  float: left;
  line-height: 40px;
  margin-right: 20px;
}
.total-box .right .total span {
  font-size: 12px;
  font-weight: normal;
}
.total-box .right .submit-order {
  float: left;
  font-size: 16px;
  color: #fff;
  background-color: #ff4d4f;
  width: 110px;
  height: 42px;
  cursor: pointer;
  text-align: center;
  line-height: 42px;
  font-weight: 500;
}
</style>
