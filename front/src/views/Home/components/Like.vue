<template>
  <div class="like-container">
    <div class="like-title">
      <h2>随便看看</h2>
    </div>
    <div class="product-list">
      <a-row :gutter="16" v-if="list.length === 0">
        <a-col :span="4" v-for="(item, index) in 6" :key="index">
          <div class="space-box">
            <a-skeleton active :title="{ width: '100%' }" :paragraph="{ rows: 2 }" />
          </div>
        </a-col>
      </a-row>
      <a-row v-else :gutter="12">
        <a-col :span="4" v-for="cur in list" :key="cur.pid">
          <router-link class="product-item" :to="'/product/' + cur.pid">
            <img :src="cur.cover && cur.cover[0].url" alt="cover" />
            <p class="product-title clip-two">{{cur.title}}</p>
            <div class="product-detail">
              <p class="product-price">￥<span>{{cur.price}}元</span></p>
              <p class="product-count">销量{{cur.sales}}件</p>
            </div>
          </router-link>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { randomProductApi } from "../../../api";
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
      randomProductApi().then((res) => {
        this.list = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.like-container {
  margin-top: 20px;
  .like-title {
    overflow: hidden;
    h2 {
      font-size: 20px;
      color: #333;
      float: left;
      position: relative;
      &::before {
        position: absolute;
        height: 2px;
        width: 80px;
        background-color: #ff0000;
        content: "";
        bottom: 2px;
        left: 0px;
      }
    }
  }
  .product-list {
    /deep/.ant-skeleton-title {
      height: 150px;
    }
  }
  .product-item {
    display: block;
    font-size: 14px;
    color: #333;
    border-radius: 2px;
    border: 1px solid #e0e0e0;
    margin-bottom: 12px;
    transition: all 0.3s ease;
    img {
      width: 100%;
      height: 190px;
    }
  }
  .product-title {
    padding: 10px 10px 0 10px;
  }
  .product-detail {
    display: flex;
    padding: 0 10px 10px 10px;
    justify-content: space-between;
  }
  .product-item .product-detail p {
    margin-bottom: 0px;
  }
  .product-item .product-price {
    color: #ff8000;
  }
  .product-item .product-price span {
    font-size: 16px;
    font-weight: bold;
  }
  .product-item .product-count {
    font-size: 12px;
    color: #999;
    float: right;
    margin-top: 8px;
  }
}
</style>
