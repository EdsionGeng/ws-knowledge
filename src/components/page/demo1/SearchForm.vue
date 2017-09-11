<template>
  <div class="searchform">
     <Form inline :label-width="60">
        <Form-item label="工号">
          <Input type="text"></Input>
        </Form-item>
        <Form-item label="真实姓名">
           <Input type="text"></Input>
        </Form-item>
        <Form-item label="状态">
            <Select style="width:100px;">
                <Option value="0">正常</Option>
                <Option value="1">锁定</Option>
            </Select>
        </Form-item>
        <Form-item label="角色">
            <Select style="width:100px;">
                <Option value="0">正常</Option>
                <Option value="1">锁定</Option>
            </Select>
        </Form-item>
         <Form-item>
            <Button type="primary">查询</Button>
            <Button type="ghost" style="margin-left: 8px">重置</Button>
        </Form-item>
    </Form>
  </div>
</template>
<script>
export default {
   data () {
            return {
                ruleInline: {
                   
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
}
</script>
<style scoped>
.searchform{
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
</style>
