<template>
  <div class="content_banner">
    <a-carousel autoplay>
      <router-link :to="'/product/' + item.target_id" v-for="item in carouselList" :key="item._id">
        <img :src="item.cover" />
      </router-link>
    </a-carousel>

    <ul class="banner_menu_wrap">
      <li class="category-item" v-for="(item, index) in productList" :key="index">
        <a class="category-title">{{ item.classify }}<i class="iconfont icon-jiantou"></i></a>
        <div class="banner_menu_content">
          <span v-if="item.children.length === 0">暂无相关商品</span>
          <a-row v-else>
            <a-col v-for="current in item.children" :key="current.pid" :span="6">
              <router-link :to="'/product/' + current.pid" class="item">
                <img :src="current.cover[0].url" alt="cover" />
                <p class="item-text">{{ current.title }}</p>
                <p>{{ current.price }} 元</p>
              </router-link>
            </a-col>
          </a-row>
          <router-link :to="'/all?area=全部&classify=' + classifyFormat(item.classify) + '&sort=1'" class="more-btn"
            >更多</router-link
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getClassifyProduct, getHomeCarouselApi } from "../../../api";
import { classifyMapping } from '../../../utils/datamap';
export default {
  data() {
    return {
      list: Array(10).fill(0),
      carouselList: [],
      productList: [],
    };
  },
  computed: {
    classifyFormat() {
      return function(type) {
        return classifyMapping[type];
      };
    },
  },
  created() {
    this.getCarouselList();
    this.getProductList();
  },
  methods: {
    getCarouselList() {
      getHomeCarouselApi().then((res) => {
        this.carouselList = res.data;
      });
    },
    getProductList() {
      getClassifyProduct().then((res) => {
        this.productList = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.ant-carousel {
  margin-top: 30px;
  img {
    width: 81%;
    margin-left: 235px;
    height: 460px;
  }
}
.content_banner {
  position: relative;
}
.banner_menu_wrap {
  width: 235px;
  height: 460px;
  float: left;
  padding: 20px 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  top: 0px;
  z-index: 600;
  .category-item {
    &:hover {
      background-color: #fc4646;
      .banner_menu_content {
        display: block;
      }
    }
    .category-title {
      color: #fff;
      position: relative;
      display: block;
      font-size: 16px;
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
    }

    .icon-jiantou {
      font-size: 12px;
      float: right;
    }
  }
}
.banner_menu_content {
  display: none;
  position: absolute;
  padding: 20px;
  left: 234px;
  width: 1036px;
  top: 0;
  z-index: 24;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-left: 0;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  .more-btn {
    background: #474e60;
    color: #fff;
    position: absolute;
    bottom: 14px;
    right: 20px;
    display: inline-block;
    width: 70px;
    height: 26px;
    font-size: 13px;
    border-radius: 2px;
    text-align: center;
    line-height: 26px;
    &:hover {
      opacity: 0.9;
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 76px;
      height: 76px;
    }
    .item-text {
      color: #333;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 5px 0;
      width: 82%;
    }
  }
}
</style>
