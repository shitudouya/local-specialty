<template>
  <div class="hot-container">
    <div class="hot-title">
      <h2>
        本地热销 <span>已定位到您的地址：{{ city }}</span>
      </h2>
      <a-button type="link">
        更多
      </a-button>
    </div>
    <div class="hot-body">
      <a-carousel arrows :dots="false">
        <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: -20px">
          <i class="iconfont icon-left"></i>
        </div>
        <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: -30px">
          <i class="iconfont icon-right"></i>
        </div>
        <div>
          <a-row :gutter="16">
            <a-col :span="4" v-for="item in firstList" :key="item.pid">
              <router-link :to="'/product/' + item.pid" style="display:block">
                <div class="p-item">
                  <img :src="item.cover && item.cover[0].url" alt="cover" />
                  <p class="clip-two p-name">{{ item.title }}</p>
                  <div class="footer">
                    <span class="money">{{ item.price }}元</span>
                    <span class="count">销量 {{ item.sales }}件</span>
                  </div>
                </div>
              </router-link>
            </a-col>
          </a-row>
        </div>
        <div>
          <a-row :gutter="16">
            <a-col :span="4" v-for="item in secondList" :key="item.pid">
              <router-link :to="'/product/' + item.pid" style="display:block">
                <div class="p-item">
                  <img :src="item.cover && item.cover[0].url" alt="cover" />
                  <p class="clip-two p-name">{{item.title}}</p>
                  <div class="footer">
                    <span class="money">{{ item.price }}元</span>
                    <span class="count">销量 {{ item.sales }}件</span>
                  </div>
                </div>
              </router-link>
            </a-col>
          </a-row>
        </div>
      </a-carousel>
    </div>
  </div>
</template>

<script>
import { getLocalHotProductApi } from "../../../api";
export default {
  data() {
    return {
      city: "",
      firstList: [],
      secondList: [],
    };
  },
  mounted() {
    this.city = lo;
    this.getList();
  },
  methods: {
    getList() {
      getLocalHotProductApi({ province: lo }).then((res) => {
        this.firstList = res.data.slice(0, 5);
        this.secondList = res.data.slice(6, 11);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.p-name {
  margin: 8px 0 4px 0;
  color: #444;
}
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .money {
    color: #ff6600;
    font-weight: bold;
  }
  .count {
    font-size: 13px;
    color: #666;
  }
}
.hot-container {
  .hot-title {
    overflow: hidden;
    margin-bottom: 10px;
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
      span {
        font-size: 13px;
        color: #555;
        margin-left: 10px;
      }
    }
    .ant-btn-link {
      float: right;
    }
  }
  .hot-body {
    .p-item {
      border: 1px solid #e0e0e0;
      padding: 10px;
      img {
        width: 120px;
        display: block;
        margin: auto;
      }
    }
  }
  .ant-carousel /deep/ .slick-slide {
    text-align: center;
    overflow: hidden;
  }

  .ant-carousel /deep/ .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #777;
  }
  .ant-carousel /deep/ .custom-slick-arrow:before {
    display: none;
  }
}
</style>
