超管首页 路由SuperHome
<template>
<div>
     <Card shadow>
        <p slot="title">文件数据统计</p>
        <RadioGroup v-model="btnvalue" type="button" size="small" @on-change="onChange">
            <Radio label="日"></Radio>
            <Radio label="周"></Radio>
            <Radio label="月"></Radio>
        </RadioGroup>
        <div :id="id" :style="{width:width,height:height}">
        </div>
        <Select v-model="model1" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    </Card>
</div>
</template>
<script>
    // 引入 ECharts 主模块
    var echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');

    export default {
        props:{
            id:{
                type:String,
                default:'myChart'
            },
            width:{
                type:String,
                default:'600px'
            },
            height:{
                type:String,
                default:'400px'
            }
        },
        data(){
            return{
                btnvalue:'',
                myChart:null,
                cityList: [
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],
                model1: ''
            }
        },
        mounted(){
            this.initChart();
        },
        methods:{
            initChart(){
                // 基于准备好的dom，初始化echarts实例
                this.myChart = echarts.init(document.getElementById(this.id));
                // 绘制图表
                this.myChart.setOption({
                    title: { text: 'Vue集成echarts实例' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            },
            onChange(e){
                // 监听按钮更改状态
            }
            
        }
    }
</script>
<style scoped>

</style>

