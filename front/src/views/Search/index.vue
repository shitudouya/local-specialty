<template>
  <div class="search-container">
    <div class="headers">
      <em> "{{ $route.query.keyword }}" </em>搜索结果
    </div>
    <div class="sortable">
      <router-link :to="'/search?keyword=' + keyword + '&sort=0'"
        ><i class="iconfont icon-xiaoliang"></i><span>销量最高</span></router-link
      >
      <span class="split">|</span>
      <router-link :to="'/search?keyword=' + keyword + '&sort=1'"
        ><i class="iconfont icon-jiageshengxu"></i><span>价格升序</span></router-link
      >
      <span class="split">|</span>
      <router-link :to="'/search?keyword=' + keyword + '&sort=2'"
        ><i class="iconfont icon-jiagejiangxu"></i><span>价格降序</span></router-link
      >
    </div>
    <a-row :gutter="14" class="result" v-if="list.length > 0">
      <a-col :span="4" v-for="item in list" :key="item.pid">
        <router-link class="product-item" :to="'/product/' + item.pid">
          <img :src="item.cover && item.cover[0].url" alt="cover" />
          <p class="product-title text-monospace">{{ item.title }}</p>
          <div class="product-detail clearfix">
            <p class="product-price">
              ￥<span>{{ item.price }}</span>
            </p>
            <p class="product-count">销量 {{ item.sales }}</p>
          </div>
        </router-link>
      </a-col>
    </a-row>
    <p v-else style="color:#888;margin-top:30px">未查询到相关结果</p>
  </div>
</template>

<script>
import { handleSearchProduct } from "../../api";
export default {
  data() {
    return {
      keyword: "",
      list: [],
    };
  },
  watch: {
    $route: {
      handler(o, n) {
        if (this.$route.query.keyword && this.$route.query.sort) {
          this.keyword = this.$route.query.keyword;
          this.getList({ keyword: this.keyword, sort: this.$route.query.sort });
        } else {
          this.list = [];
        }
      },
      immediate: true,
    },
  },
  created() {
    this.keyword = this.$route.query.keyword;
  },
  methods: {
    getList({ keyword, sort }) {
      handleSearchProduct({ keyword, sort }).then((res) => {
        this.list = res.data;
      });
    },
  },
};
</script>

<style scoped>
.search-container {
  margin-top: 20px;
}
.search-container .headers {
  font-size: 20px;
  color: #444;
  position: relative;
}
.search-container .headers::after {
  content: "";
  position: absolute;
  left: 10px;
  bottom: 1px;
  height: 3px;
  width: 15%;
  background-color: #ff4d4f;
}
.search-container .headers em {
  margin: 0 6px 0 0;
  font-style: normal;
  font-weight: bold;
}
.product-item {
  display: block;
  border: 1px solid #ddd;
  margin-top: 20px;
  transition: all 0.2s linear;
}
.product-item:hover {
  transform: translate3d(0, -2px, 0);
  box-shadow: 0px 15px 30px rgb(0 0 0 / 10%);
}
.product-item img {
  width: 180px;
  display: block;
  margin: auto;
}
.product-item .product-title {
  padding: 0 10px;
  color: #444;
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
  width: 100%;
  margin-bottom: 0px;
}
.product-item .product-detail {
  padding: 10px;
}
.product-item .product-detail p {
  margin-bottom: 0px;
}
.product-item .product-price {
  color: #ff4d4f;
  float: left;
}
.product-item .product-price span {
  font-size: 20px;
  font-weight: bold;
}
.product-item .product-count {
  font-size: 12px;
  color: #999;
  float: right;
  margin-top: 8px;
}
.sortable {
  margin: 20px 0 0 0;
}
.sortable a {
  color: #666;
  font-size: 14px;
}
.sortable a.router-link-exact-active {
  color: #ff4d4f;
}

.sortable a.router-link-exact-active i {
  color: #ff4d4f;
}
.sortable .icon-xiaoliang {
  font-size: 19px;
  margin-right: 3px;
  vertical-align: middle;
}
.sortable span {
  vertical-align: middle;
}
.sortable .icon-jiageshengxu,
.sortable .icon-jiagejiangxu {
  font-size: 12px;
  margin-right: 3px;
  color: #565656;
  display: inline-block;
  margin-top: 3px;
  vertical-align: middle;
}
.sortable .split {
  margin: 0 14px;
  color: #b9b9b9;
}
</style>
