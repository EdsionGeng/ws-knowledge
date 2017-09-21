全部文件下的文件详情下的修改文件 路由Modify
<template>
<div class='Modify'>
  <Card dis-hover>
    <h2>修改文件</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class='clearfix' >
     <FormItem label="" prop="name" class='fl'> 
       <span>标题&nbsp;&nbsp;</span><Input  placeholder="请输入..." style="width: 300px"></Input>
     </FormItem>
  
  <div class='selct fl'>
      <Select v-model="model1" style="width:200px;" placeholder="请选择文件类型">
            <Option v-for="item in cityList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
      
      </Select>
     
  </div>
  </Form> 
  <div class='Jur'><span >权限：</span><img src="../../assets/add.png" alt=""></div>
  <div class='cover-all clearfix'>
      <span>封面：</span> 
      <div class='cover'>
        <router-link to="details">
          点击选择封面图片
        </router-link>
      </div>
  </div>
<!-- 富文本编辑器 -->
   <div class="editor-container">
      <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
   </div>

</Card>
</div>
</template>
<script>
 import UE from '../ueitor/common.vue';
    export default {
     components: {UE},
        data () {
          
            return {
                defaultMsg: '这里是UE测试',
                config: {
                  initialFrameWidth: null,
                  initialFrameHeight: 350
                },
              formValidate:{
                name:'',
              },
              ruleValidate:{
                name:[{
                   required: true, message: '最多为20个字', trigger: 'blur' 
                }]
              },

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
        methods: {
          getUEContent() {
            let content = this.$refs.ue.getUEContent();
            this.$notify({
              title: '获取成功，可在控制台查看！',
              message: content,
              type: 'success'
            });
            console.log(content)
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
  margin-left: 20px;
}
.Jur span{
  height: 64px;
  line-height: 64px;
  display: inline-block;
  vertical-align: middle;
}
/* 富文本编辑器 */
.info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
</style>

