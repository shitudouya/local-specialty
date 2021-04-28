<template>
  <div>
    <div v-if="current.title">
      <a-breadcrumb class="header-breadcrumb animate__animated animate__fadeInUp">
        <a-breadcrumb-item>当前位置：<router-link to="/news">资讯快报</router-link></a-breadcrumb-item>
        <a-breadcrumb-item>{{ current.title }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="body-content">
        <a-row :gutter="20">
          <a-col :span="18">
            <div class="left-content animate__animated animate__fadeInUp">
              <h3>{{ current.title }}</h3>
              <div class="body-box" v-html="current.content"></div>
              <div class="goods-box">
                <span @click="handleGood(current.nid)"><i class="iconfont icon-dianzan1"></i></span>
                <p>{{ current.goods && current.goods.length }} 人表示很赞</p>
              </div>
            </div>
          </a-col>
          <a-col :span="6">
            <a-affix :offset-top="90">
              <div class="right-random animate__animated animate__fadeInUp">
                <h3>随机推荐</h3>
                <router-link :to="'/news/' + item.nid" class="news-item" v-for="item in list" :key="item.nid">
                  <p class="title clip-one">{{ item.title }}</p>
                  <p class="desc clip-two">
                    {{ htmlFormat(item.content) }}
                  </p>
                </router-link>
              </div>
            </a-affix>
          </a-col>
        </a-row>
      </div>
    </div>
    <div v-else>
      <p class="none-find">没有找到相关文章</p>
      <router-link to="/news">返回快报中心</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getNewsDetailApi, handleNewsGoodApi, randomGetThreeNewsApi } from "../../api";
import { replaceHtmlTag } from "../../utils/handler";
export default {
  data() {
    return {
      current: {},
      list: [],
    };
  },
  computed: {
    ...mapState({
      info: "info",
    }),

    htmlFormat() {
      return function(html) {
        return replaceHtmlTag(html);
      };
    },
  },
  created() {
    this.getCurrent();
    this.getRandom();
  },
  methods: {
    getCurrent() {
      getNewsDetailApi({ nid: this.$route.params.id }).then((res) => {
        this.current = res.data;
      });
    },
    getRandom() {
      randomGetThreeNewsApi().then((res) => {
        this.list = res.data;
      });
    },
    handleGood(nid) {
      if (this.info.email) {
        handleNewsGoodApi({ nid }).then((res) => {
          if (res.code === 200) {
            this.$msg.success("谢谢您的赞");
            this.getCurrent();
          } else {
            this.$msg.warning(res.msg);
          }
        });
      } else {
        this.$msg.warning("登录后操作");
      }
    },
  },
};
</script>

<style scoped>
.header-breadcrumb {
  margin: 20px 0;
}
.body-content .left-content {
  min-height: 600px;
  padding: 40px;
  box-shadow: 0px 0px 15px 0px #ddd;
}
.left-content h3 {
  font-size: 20px;
  font-weight: bold;
  display: inline;
  position: relative;
  color: #404040;
}
.left-content h3::after {
  position: absolute;
  content: "";
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #fc4646;
}
.body-content .right-random {
  height: 356px;
  padding: 20px 12px;
  box-shadow: 0px 0px 15px 0px #ddd;
}
.right-random h3 {
  position: relative;
  margin-bottom: 16px;
}
.right-random h3::after {
  content: "";
  position: absolute;
  left: -12px;
  top: 1px;
  width: 4px;
  height: 22px;
  background-color: #fc4646;
}
.right-random .news-item {
  display: block;
  color: #404040;
  margin-bottom: 10px;
  font-weight: bold;
  border-bottom: 1px solid #d9d9d9;
}
.right-random .news-item:last-of-type {
  border-bottom: 0;
}
.right-random .news-item .desc {
  font-weight: normal;
  color: #909090;
  font-size: 13px;
}
.none-find {
  margin-top: 30px;
}

.body-box {
  margin-top: 20px;
  color: #484848;
}
.goods-box {
  display: flex;
  justify-content: center;
  margin: 40px 0 0 0;
  flex-direction: column;
  align-items: center;
}
.goods-box span {
  border-radius: 50%;
  width: 54px;
  cursor: pointer;
  height: 54px;
  text-align: center;
  line-height: 54px;
  background-color: #ff9900;
}
.goods-box p {
  font-size: 13px;
  margin-top: 10px;
  color: #898989;
}
.goods-box span:hover {
  opacity: 0.86;
}
.goods-box span i {
  color: #fff;
  font-size: 20px;
}
</style>
