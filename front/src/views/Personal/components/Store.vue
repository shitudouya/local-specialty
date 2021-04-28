<template>
  <div>
    <div v-if="list.length>0">
      <a-row class="store-box" :gutter="26">
        <a-col :span="5" v-for="item in list" :key="item.pid" class="store-item animate__animated animate__zoomIn">
          <img :src="item._product[0] && item._product[0].cover[0].url" alt="cover" />
          <div class="info">
            <a-tooltip>
              <template slot="title">
                {{ item._product[0] && item._product[0].title }}
              </template>
              <p class="product-name clip-one">
                {{ item._product[0] && item._product[0].title }}
              </p>
            </a-tooltip>

            <p class="price">{{ item._product[0] && item._product[0].price }}元</p>
          </div>
          <div class="operate">
            <div class="detail o-btn" @click="handleView(item.pid)">
              查看
            </div>
            <div class="del o-btn" @click="handleDel(item.pid)">
              删除
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div v-else>暂无收藏</div>
  </div>
</template>

<script>
import { cancelStoreProductApi, getUserStoreProduct } from "../../../api";
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getUserStoreProduct().then((res) => {
        this.list = res.data;
      });
    },
    handleView(pid) {
      this.$router.push("/product/" + pid);
    },
    handleDel(pid) {
      cancelStoreProductApi({ pid }).then((res) => {
        if (res.code === 200) {
          this.$msg.success("取消成功");
          this.getList();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.store-item {
  margin-bottom: 14px;
}
.store-box .store-item img {
  width: 140px;
  display: block;
  margin: auto;
}
.store-box .store-item .product-name {
  text-align: center;
  font-size: 14px;
  margin: 0;
}
.store-item .price {
  text-align: center;
  font-size: 14px;
  color: #ff4d4f;
}
.store-item .operate {
  display: flex;
  justify-content: space-between;
}
.store-item .operate .detail {
  background-color: #ff4d4f;
  color: #fff;
  border: 1px solid #ff4d4f !important;
  &:hover {
    opacity: 0.86;
  }
}
.store-item .operate .o-btn {
  width: 45%;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  border: 1px solid #ccc;
}
.store-item .operate .del {
  color: #888;
}
</style>
