<template>
  <div class="like-container">
    <div class="like-title">
      <h2>本周推荐</h2>
    </div>
    <div class="product-list">
      <a-row :gutter="12">
        <a-col :span="4" v-for="item in list" :key="item.pid">
          <router-link class="product-item" :to="'/product/'+item.pid">
            <img :src="item._product&&item._product[0].cover[0].url" alt="cover" />
            <p class="product-title clip-two">{{item._product&&item._product[0].title}}</p>
            <div class="product-detail">
              <p class="product-price">￥<span>{{item._product&&item._product[0].price}}元</span></p>
              <p class="product-count">销量 {{item._product&&item._product[0].sales}}</p>
            </div>

            <div class="recommend-reason animate__animated animate__slideInUp">
              <span>推荐理由：{{item.reason}}</span>
            </div>
          </router-link>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getWeekRecommendApi } from '../../../api';
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
      getWeekRecommendApi().then(res=>{
        this.list = res.data
      })
    }
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
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 190px;
    }
    &:hover {
      .recommend-reason {
        display: block;
        bottom: 0px;
      }
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
  .recommend-reason {
    background-color: #ff8000;
    color: #fff;
    position: absolute;

    left: 0;
    display: none;
    opacity: 0.94;
    font-size: 13px;
    padding: 10px;
  }
}
</style>
