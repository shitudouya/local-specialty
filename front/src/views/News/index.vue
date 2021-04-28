<template>
  <div class="news-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="headers animate__animated animate__fadeInUp">快报资讯</div>
    <router-link class="news-item animate__animated animate__fadeInUp" :to="'/news/' + item.nid" v-for="item in list" :key="item.nid">
      <img :src="item.mainPic" alt="cover" class="left" />
      <div class="right">
        <h3>{{ item.title }}</h3>
        <p class="clip-two">{{ htmlFormat(item.content) }}</p>
        <span class="good-icon"><i class="iconfont icon-dianzan"></i> {{item.goods.length}}</span>
      </div>
    </router-link>
    <div class="loading">
      <div v-if="loading">
        <a-spin size="small" style="margin-right:8px" />
        <span>加载中</span>
      </div>
      <div class="v-else" style="font-size:13px;color:#777">没有更多文章了</div>
    </div>
  </div>
</template>

<script>
import { getNewsListApi } from "../../api";
import { replaceHtmlTag } from "../../utils/handler";
export default {
  data() {
    return {
      pageSize: 4,
      pageNum: 0,
      list: [],
      busy: false,
      loading: true,
    };
  },
  computed: {
    htmlFormat() {
      return function(html) {
        return replaceHtmlTag(html);
      };
    },
  },
  methods: {
    loadMore() {
      this.busy = true;
      this.pageNum = this.pageNum + 1;
      getNewsListApi({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            this.list.push(res.data[i]);
          }
          this.busy = false;
        } else {
          this.busy = true;
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.news-box {
  margin-top: 30px;
  .headers {
    font-weight: bold;
    font-size: 18px;
    color: #484848;
    margin-bottom: 20px;
    padding: 0 14px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 5px;
      height: 26px;
      bottom: 0px;
      left: 0;
      background-color: #fc4646;
    }
  }
}
.news-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px;
  display: flex;
  font-size: 14px;
  color: #999;
  overflow: hidden;
}
.news-item img {
  width: 160px;
}
.news-item:hover {
  background-color: #f8f8f8;
}
.news-item .left {
  display: block;
  margin-right: 20px;
}
.news-item .right {
  position: relative;
  .good-icon {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
.news-item .right h3 {
  font-size: 17px;
  font-weight: bold;
  color: #373737;
  margin-bottom: 10px;
}
.news-item .right p {
  font-size: 13.5px;
  color: #aaa;
}
.loading {
  text-align: center;
  margin-top: 10px;
}
</style>
