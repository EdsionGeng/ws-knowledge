<template>
  <div class="page">
    <div>
        <PageTitle :BreadTitle='BreadTitle'></PageTitle>
    </div>
    <div class="pagebox">
        <div class="addmin-title">
          <span :class="index=='today'?'active':''" @click="changClass('today')">今日</span>
          <span :class="index=='week'?'active':''" @click="changClass('week')">本周</span>
          <span :class="index=='month'?'active':''" @click="changClass('month')">本月</span>
        </div>
        <div id='echarts'>

        </div>
    </div>
  </div>
</template>
<script>
import PageTitle from '@/components/common/PageTitle';
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
       index:'today'
      }
  },
  mounted:function(){
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
              color: ['#3398DB'],
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
                      data : ['上传', '修改', '删除'],
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
                      data:[21, 14, 3, ]
                  }
              ]
          })
      },
      changClass(active){
        this.index=active
      }
    },
  components:{
    PageTitle
  }
 
}
</script>
<style scoped>
  .addmin-title span{
    display:inline-block;
    text-align: center;
    border:1px solid #ccc;
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer; 
  }
   .addmin-title span.active{
    font-size: 16px;
    font-weight: 700;
    color:#009688;
  }
   .addmin-title span:not(:first-child){
     border-left:none;  
     margin-left:-4px;
  }
  .pagebox{
    padding:40px 20px;
  }
  #echarts{
    margin-top:30px;
    width: 60%;
    height: 600px;
  }
</style>


