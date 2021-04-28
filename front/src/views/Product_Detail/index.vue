<template>
  <div>
    <div v-if="!detail.title">暂无找到有关商品信息</div>
    <div v-else>
      <div class="headers animate__animated animate__fadeInUp">
        <a-breadcrumb>
          <a-breadcrumb-item> 当前位置：商品详情</a-breadcrumb-item>
          <a-breadcrumb-item>{{ detail.title }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="detail-body animate__animated animate__fadeInUp">
        <a-row>
          <a-col :span="10">
            <div class="big-preview">
              <img class="left-img" :src="detail.cover[currentIndex].url" alt="cover" />
            </div>
            <div class="small-preview">
              <img
                v-for="(item, index) in detail.cover"
                :class="currentIndex === index ? 'small-img active' : 'small-img'"
                :key="index"
                :src="item.url"
                @click="handleToggleCover(index)"
                alt="cover"
              />
            </div>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <p class="title clip-two">{{ detail.title }}</p>
            <p class="product-detail">
              {{ detail.short_desc }}
            </p>
            <div class="split"></div>
            <div class="tags">
              <a-tag :color="labelFormat(item)" v-for="(item, index) in detail.tags" :key="index">
                {{ item }}
              </a-tag>
            </div>
            <div class="split"></div>
            <div class="product-price">
              <span>￥</span>
              {{ detail.price }}
            </div>
            <div class="buy-number">
              <span>购买数量：</span>
              <a-input-number v-model="count" :min="1" :max="100" :precision="0" />
            </div>
            <div class="buy-limit">库存剩余：{{ detail.stock }} 件</div>
            <div class="price-box">
              <div class="top clearfix">
                <div class="left clip-one">{{ detail.title }}</div>
                <div class="right">数量x{{ count === null ? 1 : count }}</div>
              </div>
              <div class="bottom">总价：{{ totalMoney }}元</div>
            </div>
            <div class="operate-box">
              <a-space>
                <div class="join operate-btn" @click="handleAddCart(detail.pid, detail.uid)">
                  加入购物车
                </div>
                <div class="store operate-btn" @click="handleAddStore(detail.pid)">
                  {{ store_tip }}
                </div>
              </a-space>
            </div>
          </a-col>
        </a-row>
        <div class="more-detail">
          <a-tabs default-active-key="1" style="width: 97%;margin: 30px auto;">
            <a-tab-pane key="1" tab="商品详情">
              <div class="more-body" v-html="detail.detail"></div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="商品评论" force-render>
              <div v-if="commentData.badNum >= 0">
                <p class="statistics-headers">共 {{ commentData.total }} 条评论，好评率 {{ commentData.goodRate }} %</p>
                <div class="headers-menu">
                  <span
                    :data-index="0"
                    :class="currentSort === 0 ? 'sort-text active' : 'sort-text'"
                    @click="handleSort"
                    >最新</span
                  >
                  <span class="text-split">|</span>
                  <span
                    :class="currentSort === 1 ? 'sort-text active' : 'sort-text'"
                    :data-index="1"
                    @click="handleSort"
                    >只看好评({{ commentData.goodNum }})</span
                  >
                  <span class="text-split">|</span>
                  <span
                    :class="currentSort === 2 ? 'sort-text active' : 'sort-text'"
                    :data-index="2"
                    @click="handleSort"
                    >只看中评({{ commentData.midNum }})</span
                  >
                  <span class="text-split">|</span>
                  <span
                    :class="currentSort === 3 ? 'sort-text active' : 'sort-text'"
                    :data-index="3"
                    @click="handleSort"
                    >只看差评({{ commentData.badNum }})</span
                  >
                  <span class="text-split">|</span>
                  <span
                    :class="currentSort === 4 ? 'sort-text active' : 'sort-text'"
                    :data-index="4"
                    @click="handleSort"
                    >带图评论({{ commentData.hasPicNum }})</span
                  >
                </div>
                <div class="comment-list">
                  <div v-if="commentData.list.length > 0">
                    <a-comment v-for="item in commentData.list" :key="item.cid">
                      <a slot="author" style="color:#333;font-size:14px">{{ item._buyer[0].nickname }}</a>
                      <a-avatar slot="avatar" :size="50" :src="item._buyer[0].avatar" alt="avatar" />
                      <p slot="content">
                        {{ item.content }}
                      </p>
                      <div slot="content" v-if="item.picList.length > 0">
                        <img
                          :src="current.url"
                          v-for="(current, index) in item.picList"
                          class="pic-cover"
                          :key="index"
                          v-viewer
                          alt="cover"
                        />
                      </div>
                      <span slot="datetime" style="color:#888;font-size:13px">{{ relativeTime(item.created) }}</span>
                      <span slot="datetime" style="margin-left:10px;color:#888;font-size:13px">{{ item.type }}</span>
                    </a-comment>
                  </div>
                  <div v-else>没有相关评论</div>
                </div>
              </div>
              <div v-else>暂时没有相关评论</div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import ee from "../../utils/events";
import { addCartApi, addProductStore, getCommentsListApi, getProductDetailApi, viewCurrentIsStore } from "../../api";
import { labelMapping } from "../../utils/datamap";
import { math } from "../../utils/math";
import { computedRelativeTime } from "../../utils/handler";
export default {
  data() {
    return {
      count: 1,
      currentIndex: 0,
      currentSort: 0,
      detail: {},
      store_tip: "收藏",
      commentData: {},
      tempcommentData: {},
    };
  },
  computed: {
    relativeTime() {
      return function(time) {
        return computedRelativeTime(time);
      };
    },
    labelFormat() {
      return function(label) {
        return labelMapping[label];
      };
    },
    totalMoney() {
      if (this.count === null) {
        return math.multiply(1, this.detail.price);
      } else {
        return math.multiply(this.count, this.detail.price);
      }
    },
    ...mapState({
      info: "info",
    }),
  },
  mounted() {
    this.getDetail();
    this.getCommentsList();
    if (this.info.email) {
      this.getIsStore();
    }
  },
  methods: {
    getCommentsList() {
      getCommentsListApi({ pid: this.$route.params.id }).then((res) => {
        this.commentData = cloneDeep(res.data);
        this.tempcommentData = cloneDeep(res.data);
      });
    },
    handleSort(e) {
      let newItem = cloneDeep(this.tempcommentData);
      let index = e.target.dataset.index;
      index = parseInt(index);
      this.currentSort = index;
      if (index === 0) {
        this.getCommentsList();
      } else if (index === 1) {
        this.commentData.list = newItem.list.filter((item) => item.type === "好评");
      } else if (index === 2) {
        this.commentData.list = newItem.list.filter((item) => item.type === "中评");
      } else if (index === 3) {
        this.commentData.list = newItem.list.filter((item) => item.type === "差评");
      } else if (index === 4) {
        this.commentData.list = newItem.list.filter((item) => item.picList.length > 0);
      }
    },
    handleAddCart(pid, uid) {
      if (this.info.email) {
        addCartApi({ pid, count: this.count === null ? 1 : this.count, seller_uid: uid }).then((res) => {
          if (res.code === 200) {
            ee.emit("refresh_cart");
            this.$msg.success("添加成功，您可以点击右上角的购物车查看");
          } else {
            this.$msg.warning(res.msg);
          }
        });
      } else {
        this.$msg.warning("请先登录");
      }
    },
    handleAddStore(pid) {
      if (this.info.email) {
        addProductStore({ pid }).then((res) => {
          if (res.code === 200) {
            this.$msg.success(res.msg);
            this.getIsStore();
          }
        });
      } else {
        this.$msg.warning("请先登录");
      }
    },
    getIsStore() {
      viewCurrentIsStore({ pid: this.$route.params.id }).then((res) => {
        if (res.data) {
          this.store_tip = "已收藏";
        } else {
          this.store_tip = "收藏";
        }
      });
    },
    getDetail() {
      getProductDetailApi({ pid: this.$route.params.id }).then((res) => {
        if (res.data) {
          this.detail = res.data;
        }
      });
    },
    handleToggleCover(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.headers {
  width: 86%;
  margin: 30px auto 0;
}
.detail-body {
  .ant-row {
    margin-top: 60px;
  }
  .left-img {
    width: 340px;
    height: 340px;
    display: flex;
    border: 1px solid #ff6600;
    padding: 10px;
    margin: auto;
    margin-top: 10px;
  }
  .small-preview {
    overflow: hidden;
    display: flex;
    margin-top: 20px;
    justify-content: center;
    .small-img {
      width: 100px;
      border: 1px solid #ddd;
      padding: 10px;
      height: 100px;
      margin: 0 10px;
      cursor: pointer;
      &.active {
        border: 1px solid #ff6600;
      }
    }
  }

  .title {
    font-size: 19px;
    font-weight: bold;
    color: #383838;
  }
  .product-detail {
    font-size: 14px;
    color: #ff6600;
    margin: 20px 0 10px 0;
  }
  .split {
    height: 1px;
    margin: 6px 0;
    width: 84%;
    background-color: #e0e0e0;
  }
  .tags {
    padding: 4px 0;
  }
  .buy-limit {
    margin: 20px 0;
  }
  .buy-number {
    margin: 18px 0;
  }
  .buy-number span {
    font-size: 14px;
    color: #484848;
  }
  .product-price {
    font-size: 22px;
    color: #fc4646;
    font-weight: 600;
  }
  .product-price span {
    font-size: 14px;
    font-weight: 500;
  }
  .price-box {
    width: 84%;
    position: relative;
    background: #f8f9fa;
    height: 120px;
    font-size: 14px;
    color: #383838;
    padding: 20px;
    margin-bottom: 30px;
  }
  .price-box .left {
    float: left;
    width: 280px;
  }
  .price-box .right {
    float: right;
  }
  .price-box .bottom {
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 26px;
    color: #fc4646;
  }
  .operate-box .operate-btn {
    padding: 10px 26px;
    background-color: #fc4646;
    color: #fff;
    cursor: pointer;
  }
  .operate-box .store {
    background-color: #fff;
    border: 1px solid #fc4646;
    color: #fc4646;
  }
  .more-detail {
    overflow: hidden;
    width: 1120px;
    margin: auto;
    .more-body {
      min-height: 200px;
      padding: 30px;
      width: 100%;
      background-color: #f9faf9;
      /deep/ul {
        padding: 0;
        list-style: none;
        margin: 0;
      }
    }
  }
}
.statistics-headers {
  font-size: 16px;
  padding: 10px;
  padding-left: 20px;
  text-align: center;
  background-color: #f67022;
  color: #fff;
}
.headers-menu {
  .text-split {
    margin: 0 8px;
    color: #b9b9b9;
  }
  .sort-text {
    color: #767676;
    font-size: 14px;
    cursor: pointer;
    &.active {
      color: #f67022;
    }
  }
}
/deep/.ant-comment-avatar img {
  width: 45px;
  height: 45px;
  object-fit: contain;
}
.pic-cover {
  height: 100px;
  display: block;
  float: left;
  margin-right: 14px;
  border: 1px solid #e0e0e0;
}
.ant-comment {
  border-bottom: 1px solid #e0e0e0;
}
</style>
