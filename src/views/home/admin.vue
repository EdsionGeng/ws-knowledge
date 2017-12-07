<template>
   <div class="pagebox">  
    <div class="addmin-title">
      <ButtonGroup>
        <Button type="ghost" @click='getDayData'>今日</Button>
        <Button type="ghost" @click="getWeekData">本周</Button>
        <Button type="ghost" @click="getMonthData">本月</Button>
      </ButtonGroup>
    </div>
    <Row class="table-top">
          <Col>
            <Card dis-hover>
               <div id='echarts'>
                </div>
            </Card>
          </Col>
    </Row>    
  </div>
</template>
<script>
import { showDayData } from "@/api/all_interface";
import { showWeekData } from "@/api/all_interface";
import { showMonthData } from "@/api/all_interface";
var echarts = require('echarts/lib/echarts');
        // 引入柱状图
        require('echarts/lib/chart/bar');
        // 引入提示框和标题组件
        require('echarts/lib/component/tooltip');
        require('echarts/lib/component/title');
export default {
  data(){
      return{
       BreadTitle:['首页'],
       index:'today',
       m1date:[2,34,18],
       series:['上传','修改','删除'],
       spinShow:false,
       params:null

      }
  },
  watch: {
    series() {
      this.makeEchart()
    },
    m1date() {
      this.makeEchart()
    }
  },
  created(){
    this.getDayData()
    },
  mounted(){
    this.makeEchart()
  },
  methods:{
      makeEchart(){
        // 引入 ECharts 主模块
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts'));
        // 绘制图表
        myChart.setOption({
             parallelAxis:{
               axisLabel:{
                  fontSize:22,
                  fontWeight:'bold'
               }
             },
              color: ['#52C6EB'],
              tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                  }
              },
              grid: {
                  left: '2%',
                  right: '3%',
                  bottom: '4%',
                  containLabel: true
              },
              xAxis : [
                  {
                      type : 'category',
                      data : this.series,
                      axisTick: {
                          alignWithLabel: true
                      }
                  }
              ],
              yAxis : [
                  {
                      type : 'value'
                  }
              ],
              series : [
                  {
                      name:'直接访问',
                      type:'bar',
                      barWidth: '20%',
                      data:this.m1date
                  }
              ]
          })
      },
      getDayData(){
         this.spinShow=true;
        showDayData(this.params).then(res=>{
            const data = res.data;
            const bardata=data.data;
            this.m1date =[],
            this.m1date[0]=bardata.addpcs;
            this.m1date[1]=bardata.updatepcs;
            this.m1date[2]=bardata.deletepcs;
             console.log(bardata)
        })
         this.spinShow=true;
      },
      getWeekData(){
        showWeekData(this.params).then(res=>{
            let data = res.data;
            let bardata=data.data;
            this.m1date =[],
            this.m1date[0]=bardata.addpcs;
            this.m1date[1]=bardata.updatepcs;
            this.m1date[2]=bardata.deletepcs;
        })
      },
      getMonthData(){
        showMonthData(this.params).then(res=>{
            let data = res.data;
            let bardata=data.data;
            this.m1date =[],
            this.m1date[0]=bardata.addpcs;
            this.m1date[1]=bardata.updatepcs;
            this.m1date[2]=bardata.deletepcs;
        })
      }
    }
}
</script>
<style scoped>
  .pagebox{
    padding:40px 20px;
  }
  #echarts{
    margin-top:10px;
    width: 50%;
    height: 600px;
  }
</style>


