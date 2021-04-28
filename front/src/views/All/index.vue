<template>
  <div class="classify-box">
    <div class="header-sort">
      <div class="classify clearfix">
        <div class="icon">地区</div>
        <ul class="clearfix">
          <li v-for="(item, index) in areaList" :key="index">
            <router-link
              @click.native="handleToggleArea(item)"
              :to="'/all?area=' + item + '&classify=' + currentClassify + '&sort=' + currentSort"
              >{{ item }}</router-link
            >
          </li>
        </ul>
      </div>
      <div class="classify clearfix">
        <div class="icon">类型</div>
        <ul class="clearfix">
          <li v-for="item in classifyList" :key="item.index">
            <router-link
              @click.native="handleToggleClassify(item.index)"
              :to="'/all?area=' + currentArea + '&classify=' + item.index + '&sort=' + currentSort"
              >{{ item.title }}</router-link
            >
          </li>
        </ul>
      </div>
      <div class="classify clearfix">
        <div class="icon">筛选</div>
        <ul class="clearfix">
          <li v-for="item in sortList" :key="item.index">
            <router-link
              @click.native="handleToggleSort(item.index)"
              :to="'/all?area=' + currentArea + '&classify=' + currentClassify + '&sort=' + item.index"
              >{{ item.title }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="body-content clearfix" v-if="list.length > 0">
      <router-link :to="'/product/' + item.pid" class="product-item clearfix" v-for="item in list" :key="item.pid">
        <img :src="item.cover && item.cover[0].url" alt="cover" />
        <p class="title clip-two">{{ item.title }}</p>
        <div class="bottom clearfix">
          <p class="price">
            <span>￥</span>
            {{ item.price }}
          </p>
          <div class="view">销量 {{ item.sales }}</div>
        </div>
      </router-link>
    </div>
    <div v-else>没有相关商品</div>
    <div class="pagination">
      <a-pagination
        v-if="list.length > 0"
        v-model="currentPage"
        :defaultPageSize="15"
        :total="total"
        @change="handlePageChange"
        show-less-items
      />
    </div>
  </div>
</template>

<script>
import { handleClassifySortApi } from "../../api";
export default {
  data() {
    return {
      currentClassify: 0,
      currentPage: 1,
      pageSize: 15,
      currentSort: 1,
      total: 0,
      currentArea: "全部",
      areaList: [
        "全部",
        "河北省",
        "山西省",
        "辽宁省",
        "吉林省",
        "江苏省",
        "浙江省",
        "安徽省",
        "福建省",
        "江西省",
        "山东省",
        "河南省",
        "湖北省",
        "湖南省",
        "广东省",
        "海南省",
        "四川省",
        "贵州省",
        "云南省",
        "陕西省",
        "甘肃省",
        "青海省",
        "北京市",
        "天津市",
        "上海市",
        "重庆市",
        "新疆",
        "宁夏",
        "广西",
        "内蒙古",
      ],
      classifyList: [
        { index: 0, title: "全部" },
        { index: 1, title: "特色小吃" },
        { index: 2, title: "水果干果" },
        { index: 3, title: "时令蔬菜" },
        { index: 4, title: "罐头腌菜" },
        { index: 5, title: "茶水饮品" },
        { index: 6, title: "地方特产" },
        { index: 7, title: "山珍海味" },
        { index: 8, title: "家禽海鲜" },
      ],
      sortList: [
        { index: 1, title: "销量优先" },
        { index: 2, title: "价格降序" },
        { index: 3, title: "价格升序" },
        { index: 4, title: "低销帮扶" },
      ],
      list: [],
    };
  },
  watch: {
    $route: {
      handler(o, n) {
        if (this.$route.query.area) {
          let { sort, area, classify } = this.$route.query;
          this.currentPage = 1;
          this.getList({ sort, area, classify });
        }
      },
      immediate: true,
    },
  },
  created() {
    const { area, classify, sort } = this.$route.query;
    if (area !== undefined) {
      this.currentArea = area;
    }
    if (classify !== undefined) {
      this.currentClassify = parseInt(classify);
    }
    if (sort !== undefined) {
      this.currentSort = sort;
    }
    if (area === undefined && classify === undefined && sort === undefined) {
      this.$router.push("/all?area=全部&classify=0&sort=1");
    }
  },
  methods: {
    handleToggleArea(item) {
      this.currentArea = item;
    },
    getList({ area, classify, sort }) {
      handleClassifySortApi({
        area,
        classify,
        sort,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
      }).then((res) => {
        this.total = res.data.total;
        this.list = res.data.list;
      });
    },
    handleToggleClassify(index) {
      this.currentClassify = index;
    },
    handleToggleSort(index) {
      this.currentSort = index;
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getList({ area: this.currentArea, sort: this.currentSort, classify: this.currentClassify });
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
.classify-box {
  width: 100%;
  margin-top: 40px;
  min-height: calc(100vh - 200px);
}
.classify {
  font-size: 14px;
}
.classify .icon {
  margin-right: 20px;
  width: 80px;
  padding: 0 5px;
  border-radius: 16px 0 16px 16px;
  background-color: #68687b;
  color: #fff;
  line-height: 32px;
  text-align: center;
  float: left;
}
.classify ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}
.classify ul li {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 14px;
  margin-bottom: 14px;
  background-color: #f7f5f4;
  margin-right: 14px;
}
.classify ul a.router-link-exact-active {
  background-color: #ff4d4f;
  color: #fff;
  border-radius: 14px;
}

.classify ul li a {
  font-size: 14px;
  color: #666;
  display: block;
}
.product-item {
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 0 10px;
  width: 19%;
  display: block;
  float: left;
  border: 1px solid #e9e9e9;
  transition: all 0.2s linear;
}
.product-item:hover {
  transform: translate3d(0, -2px, 0);
  box-shadow: 0px 15px 30px rgb(0 0 0 / 10%);
}
.product-item img {
  width: 100%;
  height: 220px;
}
.product-item .title {
  padding: 0 10px;
  margin: 10px 0;
  font-size: 14px;
  word-break: break-all;
  color: #333;
}
.product-item span {
  font-size: 12px;
}
.product-item .bottom .price {
  font-size: 20px;
  font-weight: bold;
  float: left;
  color: #ff8000;
  padding: 0 10px;
  margin-bottom: 10px;
}
.product-item .bottom .view {
  float: right;
  margin-right: 10px;
  font-size: 12px;
  margin-top: 6px;
}
.pagination {
  text-align: center;
}
</style>
