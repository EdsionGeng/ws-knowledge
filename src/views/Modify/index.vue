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
  <div class='clearfix'>
    <div class='fl' style='height: 32px;line-height: 32px;margin-bottom:20px;'>类型&nbsp;&nbsp;</div>
 
    <Cascader :data="data3" :render-format="format"  class='fl'></Cascader>
 
  </div>
  <div styel='margin-bottom: 20px;'>
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll">全选</Checkbox>
        </div>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
            <Checkbox label="公开"></Checkbox>
            <Checkbox label="保密"></Checkbox>
            
        </CheckboxGroup>
    </div>
   <!-- 权限 -->
   <div class='Jurisdiction'>
        <Form ref="formDynamic" :model="formDynamic" >
            <FormItem
                v-for="(item, index) in formDynamic.items"
                :key="index"
                :label="'权限' + (index + 1)"
                :prop="'items.' + index + '.value'"
                :rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">
                <Row>
                    <Col span="18" >
                        <Input type="text" v-model="item.value" placeholder="请输入..."></Input>
                    </Col>
                    <Col span="4" offset="1" class='del'>
                        <Button type="ghost" @click="handleRemove(index)">删除</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col  style='text-align: center;'>
                        <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem style='text-align: center;'>
                <Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>
                <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
  <div class='cover-all clearfix'>
      <span>封面</span> 
      <div class='cover'>
        <router-link to="details">
          点击选择封面图片
        </router-link>
      </div>
  </div>
<!-- 富文本编辑器 -->
<div class='clearfix'>
    <span class='fl'>内容</span>
   <div class="editor-container fl">

      <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
   </div>
</div>
<div><img src="../../assets/link.png" alt=""><span>上传附件</span></div>
<div class='doc'><img src="../../assets/link.png" alt=""><span>我的文档.doc</span><i >(100k)</i><i>描述：这是产品部门的规章制度，必看</i></div>
<div class='btn'><Button type="primary">修改</Button></div>  
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
                },
                // 多选框
                indeterminate: true,
                checkAll: false,
                checkAllGroup: ['公开', '保密']
               

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
            },
             handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['公开', '保密'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }

    }
</script>
<style scoped>
.Modify h2{
color: #000;
margin-bottom: 20px;
}
.Modify p{
  height: 50px;
  line-height: 50px;
  color: #000;
  font-size: 14px;
}
.cover-all{
margin: 20px 0;
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
  /* 权限 */
  .Jurisdiction{
      position: relative;
      margin-top: 20px;
  }
  .del{
      position: absolute;
      top: 0;
      right: 0;
  }
  .doc i{
    color: #ccc;
  }
  .btn{
      text-align: center;
  }
</style>

