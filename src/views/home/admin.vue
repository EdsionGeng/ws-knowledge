<template>
  <div class="pagebox">
    <div class="addmin-title" style="padding-bottom:10px">
      <ButtonGroup>
        <Button @click='getDayData("day")' :type="index=='day'?'primary':'ghost'">今日</Button>
        <Button @click="getWeekData('week')" :type="index=='week'?'primary':'ghost'">本周</Button>
        <Button @click="getMonthData('month')" :type="index=='month'?'primary':'ghost'">本月</Button>
      </ButtonGroup>
    </div>
    <Row class="table-top">
      <Col>
      <Card dis-hover style="width:600px;">
        <myPie title="文件操作统计" :legendData='legend' :seriesData="seriesCash"></myPie>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import myPie from "@/components/echarts/pie";
import { showDayData } from "@/api/all_interface";
import { showWeekData } from "@/api/all_interface";
import { showMonthData } from "@/api/all_interface";

export default {
  data() {
    return {
      seriesCash: [],
      index: "day",
      legend: ["上传", "修改", "删除"],
      params: {
        companyId:sessionStorage.getItem("companyId")
      }
    };
  },
  components: {
    myPie
  },
  mounted() {
    this.getDayData();
  },
  methods: {
    getDayData(val) {
      if (val != undefined) {
        this.index = val;
      }
      showDayData(this.params).then(res => {
        let data = res.data;
        if (data.code == 0) {
          let bardata = data.data;
          this.seriesCash = [
            {
              value: bardata.addpcs,
              name: this.legend[0]
            },
            {
              value: bardata.updatepcs,
              name: this.legend[1]
            },
            {
              value: bardata.deletepcs,
              name: this.legend[2]
            }
          ];
        }
      });
    },
    getWeekData(val) {
      this.index = val;
      showWeekData(this.params).then(res => {
        let data = res.data;
        if (data.code == 0) {
          let bardata = data.data;
          this.seriesCash = [
            {
              value: bardata.addpcs,
              name: this.legend[0]
            },
            {
              value: bardata.updatepcs,
              name: this.legend[1]
            },
            {
              value: bardata.deletepcs,
              name: this.legend[2]
            }
          ];
        }
      });
    },
    getMonthData(val) {
      this.index = val;
      showMonthData(this.params).then(res => {
        let data = res.data;
        if (data.code == 0) {
          let bardata = data.data;
          this.seriesCash = [
            {
              value: bardata.addpcs,
              name: this.legend[0]
            },
            {
              value: bardata.updatepcs,
              name: this.legend[1]
            },
            {
              value: bardata.deletepcs,
              name: this.legend[2]
            }
          ];
        }
      });
    }
  }
};
</script>
<style scoped>
.pagebox {
  padding: 40px 20px;
}
</style>


