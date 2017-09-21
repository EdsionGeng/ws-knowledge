全部文件下的文件详情下的修改文件 路由Modify
<template>
<div class='Modify'>
  <Card dis-hover>
    <h2>修改文件</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class='clearfix' >
     <FormItem label="" prop="name" class='fl'> 
       <span>标题&nbsp;&nbsp;</span><Input  placeholder="请输入..." style="width: 300px"></Input>
     </FormItem>
   
  
  </Form> 
    <Cascader :data="data3" :render-format="format"></Cascader>
   <!-- 权限 -->
   <Form ref="formDynamic" :model="formDynamic" :label-width="80">
        <FormItem
            v-for="(item, index) in formDynamic.items"
            :key="index"
            :label="'权限' + (index + 1)"
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">
            <Row>
                <Col span="18">
                    <Input type="text" v-model="item.value" placeholder="请输入..."></Input>
                </Col>
                <Col span="4" offset="1">
                    <Button type="ghost" @click="handleRemove(index)">删除</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Row>
                <Col span="12">
                    <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>
            <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
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
                // 三级联动
              }, data3: [{
                    value: 'zhejiang',
                    label: '浙江',
                    children: [{
                        value: 'hangzhou',
                        label: '杭州',
                        children: [{
                            value: 'xihu',
                            label: '西湖',
                            code: 310000
                        }]
                    }]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [{
                        value: 'nanjing',
                        label: '南京',
                        children: [{
                            value: 'zhonghuamen',
                            label: '中华门',
                            code: 210000
                        }]
                    }]
                }],

             
                model1: '',
                // 权限
                 formDynamic: {
                    items: [
                        {
                            value: ''
                        }
                    ]
                }
               

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
          },
          // 三级联动
          format (labels, selectedData) {
              const index = labels.length - 1;
              const data = selectedData[index] || false;
              if (data && data.code) {
                  return labels[index] + ' - ' + data.code;
              }
              return labels[index];
          },
          // 权限
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.formDynamic.items.push({
                    value: ''
                });
            },
            handleRemove (index) {
                this.formDynamic.items.splice(index, 1);
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

