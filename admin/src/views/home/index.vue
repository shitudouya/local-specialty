<template>
  <div>
    <div class="dashboard-container" v-if="current_info.permission === 2">
      <p>
        您好，<em>{{ current_info.nickname }}</em> 欢迎登录后台管理。
      </p>
      <p class="current">
        当前身份为：<em>{{ current_info.roles[0] === "admin" ? "管理员" : "卖家" }}</em>
      </p>
    </div>
    <div v-else>
      <el-row :gutter="30">
        <el-col :span="6">
          <div class="box">
            <div class="top">今日销售额</div>
            <div class="bottom">￥ {{numberFormat(statistics.todayAmount,2)}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="box">
            <div class="top" style="background: rgb(255, 153, 0);">总销售额</div>
            <div class="bottom">￥ {{numberFormat(statistics.totalAmount,2)}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="box">
            <div class="top" style="background: rgb(25, 190, 107);">上架商品</div>
            <div class="bottom">{{statistics.totalSellProduct}} 件</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="box">
            <div class="top" style="background: rgb(154, 102, 228);">待处理订单</div>
            <div class="bottom" style="color:rgb(242 64 64);">{{statistics.handleOrderCount}} 条</div>
          </div>
        </el-col>
      </el-row>
      <div class="chart">
        <v-chart :options="polar" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";
import { getBeforetime, number_format, timeFormatShort } from "../../utils/handler";
import { getHomeStatisticsApi, getSevenDaysSellApi } from "../../api";

export default {
  name: "home",
  computed: {
    ...mapGetters(["current_info"]),
    numberFormat() {
      return function(money) {
        return number_format(money, 2);
      };
    },
  },
  components: {
    "v-chart": ECharts,
  },
  mounted() {
    this.getDateData();
    this.getHomeData();
  },
  data() {
    return {
      statistics: {},
      polar: {
        title: {
          text: "近七日销售额",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "#fff",
          color: "black",
          textStyle: {
            color: "black", //设置文字颜色
          },
          extraCssText: "box-shadow:rgba(0, 0, 0, 0.2) 1px 2px 10px",
          padding: 12,
        },
        legend: {
          data: ["销售额"],
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: getBeforetime(timeFormatShort(), 7),
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 元",
          },
        },
        series: [
          {
            name: "销售额",
            type: "line",
            data: [],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
        ],
      },
    };
  },
  methods: {
    getDateData() {
      getSevenDaysSellApi({ dateList: getBeforetime(timeFormatShort(), 7) }).then((res) => {
        this.polar.series[0].data = res.data;
      });
    },
    getHomeData() {
      this.$msg.loading("数据请求中...");
      getHomeStatisticsApi().then((res) => {
        if (res.code === 200) {
          this.$msg.closeAll();
          this.statistics = res.data;
        }
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  p {
    font-size: 20px;
    color: #363636;
    em {
      color: #ff6600;
      font-style: normal;
    }
  }
}
.box {
  box-shadow: 0px 0px 15px 0px #ddd;
  .top {
    background: #2d8cf0;
    color: #fff;
    height: 90px;
    font-size: 24px;
    text-align: center;
    line-height: 90px;
  }
  .bottom {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34px;
    font-weight: bold;
    color: #515a6e;
  }
}
.chart {
  margin-top: 40px;
  height: 340px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
