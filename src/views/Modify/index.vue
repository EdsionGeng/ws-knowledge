<template>
<div class='Modify'>
  <h2>修改文件</h2>
  <p>标题：<span>这是标题的名字</span></p>
  <div class='selct'>
      <Select v-model="model1" style="width:200px" placeholder="请选择文件类型">
            <Option v-for="item in cityList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
      
      </Select>
  </div>
  <div>权限：</div>
  <div class='cover-all'>
    <span>封面：</span> 
    <div class='cover'>
      <router-link to="details">
        点击选择封面图片
      </router-link>
    </div>
  </div>

</div>
</template>
<script>
    export default {
    
        data () {
            return {
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
        }
    }
</script>
<style scoped>
.Modify h2{
color: #000;
}
.Modify p{
  height: 50px;
  line-height: 50px;
  color: #000;
  font-size: 14px;
}
.cover-all span{
  width: 50px;
  height: 100px;
  line-height: 100px;
  float: left;
}
.cover{
  width: 200px;
  height: 100px;
  line-height: 100px;
  border: 1px solid #666;
  border-radius: 12px;
  text-align: center;
  float: left;
  background: #fff;
}
.selct{
  margin-bottom: 20px;
}
</style>

