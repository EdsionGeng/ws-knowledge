<template>
    <Form :model="formItem" :label-width="80">
       
        <FormItem label="刷选类型">
            <Select v-model="formItem.select" placeholder="请选择">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
        <FormItem label="发布时间" class='fl' style='margin-right: 80px'>
            <Row>
                <Col   class='fl'>
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem.date"></DatePicker>
                </Col>
                <Col  class='fl' style="text-align: center;margin: 0 20px;" >-</Col>

                 <Col  class='fl'>
                    <span >截止时间&nbsp;</span>
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem.date"></DatePicker>
                </Col>
            </Row>
        </FormItem>
         <FormItem label="搜素文件" style='margin-left: 50px;' class='fr'>
            <Input icon="ios-search" placeholder="请输入..." style="width: 200px"></Input>
        </FormItem>
        
        
      
        
      
     
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
            }
        }
    }
</script>
<style scoped>
.fl{
  float: left;
}
</style>
