<style scoped>

</style>
<template>
  <div>
      <div :id="id" :style="{height:height+'px'}"></div>
  </div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
import walden from "../echarts/theme/walden.json";
echarts.registerTheme("walden", walden);
export default {
  name: "myPie",
  props: {
    title: {
      type: String,
      default: "饼图"
    },
    height: {
      type: Number,
      default: 300
    },
    legendData: {
      type: Array,
      default() {
        return ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"];
      }
    },
    seriesData: {
      type: Array,
      default() {
        return [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" }
        ];
      }
    }
  },
  data() {
    return {
      barchart: null
    };
  },
  computed: {
    id() {
      return parseInt(Math.random() * 1000000);
    }
  },
  mounted() {
    this.drawBar();
  },
  watch: {
    seriesData() {
      this.drawBar();
    },
    legendData() {
      this.drawBar();
    }
  },
  methods: {
    drawBar() {
      console.log(this.seriesData);
      // 基于准备好的dom，初始化echarts实例
      this.barchart = echarts.init(document.getElementById(this.id), "walden");
      // 绘制图表
      this.barchart.setOption({
        title: {
          text: this.title
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: 10,
          data: this.legendData
        },
        series: [
          {
            name: this.title,
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
