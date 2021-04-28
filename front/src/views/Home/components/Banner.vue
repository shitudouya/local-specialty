<template>
  <div class="banner-container">
    <a-row>
      <a-space size="middle">
        <a-col class="container-item">
          <router-link :to="'/product/' + hotSingle.pid">
            <em class="hot">热销单品</em>
            <img :src="hotSingle.cover && hotSingle.cover[0].url" alt="cover" />
            <span>{{ hotSingle.title }}</span>
          </router-link>
        </a-col>
        <a-col class="container-item">
          <router-link :to="'/product/' + most.pid">
            <em class="new">最多收藏</em>
            <img :src="most.cover && most.cover[0].url" alt="cover" />
            <span>{{ most.title }}</span>
          </router-link>
        </a-col>
        <a-col class="news-box">
          <div class="title">最新资讯<router-link to="/news">更多</router-link></div>
          <div class="news-item clearfix" v-for="(item, index) in newsList" :key="index">
            <p class="clip-one">{{ item.title }}</p>
            <p class="view-detail" @click="handleJump(item.nid)">查看详情</p>
          </div>
        </a-col>
        <a-col class="operate_list">
          <div>
            <ul>
              <li>
                <router-link to="/all?area=全部&classify=0&sort=1">
                  <i class="iconfont icon-fenlei-"></i>
                  全部分类
                </router-link>
              </li>
              <li>
                <router-link to="/cart">
                  <i class="iconfont icon-gouwuche2"></i>
                  购物车
                </router-link>
              </li>
              <li>
                <router-link to="/mine/order">
                  <i class="iconfont icon-dingdan"></i>
                  我的订单
                </router-link>
              </li>
              <li>
                <router-link to="/mine/store">
                  <i class="iconfont icon-shoucang"></i>
                  我的收藏
                </router-link>
              </li>
            </ul>
          </div>
        </a-col>
      </a-space>
    </a-row>
  </div>
</template>

<script>
import { getHomeNewsApi, getHotSingleApi, getHotStoreApi } from "../../../api/index";
export default {
  data() {
    return {
      hotSingle: {},
      most: {},
      newsList: [],
    };
  },
  created() {
    this.getHotSingle();
    this.getStoreMost();
    this.getNewsList();
  },
  methods: {
    getHotSingle() {
      getHotSingleApi().then((res) => {
        this.hotSingle = res.data;
      });
    },
    getNewsList() {
      getHomeNewsApi().then((res) => {
        this.newsList = res.data;
      });
    },
    getStoreMost() {
      getHotStoreApi().then((res) => {
        this.most = res.data;
      });
    },
    handleJump(id) {
      this.$router.push("/news/" + id);
    },
  },
};
</script>

<style lang="less" scoped>
.ant-space-align-center {
  align-items: flex-start;
}
.news-box {
  width: 580px;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: #404040;
    a {
      font-size: 13px;
      margin-left: 10px;
      color: #ff5100;
      cursor: pointer;
      font-weight: normal;
    }
  }
  .news-item {
    display: flex;
    border-bottom: 1px dashed #ccc;
    margin: 4px 0;
    p.clip-one {
      margin-bottom: 2px;
      width: 520px;
      line-height: 30px;
    }
    .view-detail {
      font-size: 13px;
      margin-bottom: 0px;
      line-height: 30px;
      color: #2d8cf0;
      cursor: pointer;
    }
  }
}
.banner-container {
  margin: 20px 0;
  .container-item {
    display: block;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    span {
      display: none;
    }
    a {
      display: block;
      &:hover {
        img {
          opacity: 0.26;
        }
        span {
          display: block;
          color: #343434;
          width: 100%;
          text-align: center;
          font-size: 14px;
        }
      }
    }
    img {
      width: 200px;
      height: 170px;
    }
    em {
      position: absolute;
      font-style: normal;
      top: -10px;
      left: -10px;
      background-color: #ff5100;
      border-radius: 40px;
      font-size: 12px;
      padding: 2px 8px;
      color: #fff;
      z-index: 99;
    }
    em.new {
      background-color: #19be6b !important;
    }
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.operate_list {
  background: #5f5750;
  height: 168px;
  padding: 10px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      i {
        display: block;
        text-align: center;
        font-size: 24px;
      }
      width: 50%;
      display: flex;
      height: 70px;
      float: left;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #777;
      border-bottom: 1px solid #777;
      a:hover {
        opacity: 1;
      }
      &:nth-of-type(n + 3) {
        border-bottom: 0;
      }
      &:nth-child(2) {
        border-right: 0;
      }
      &:nth-child(4) {
        border-right: 0;
      }
    }
  }
  img {
    display: block;
    width: 34px;
    height: 34px;
    margin: auto;
  }
  a {
    display: block;
    text-overflow: ellipsis;
    color: #fff;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
}
</style>
