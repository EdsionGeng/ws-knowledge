<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="标题" class='fl'>
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
      
        <FormItem label="发送时间" class='fl'>
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem.date"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem.date"></DatePicker>
                </Col>
            </Row>
        </FormItem>
      
    
     
        
        
        <FormItem>
            <Button type="primary" style='margin-left: 20px;'>查询</Button>
            
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
                    date2: '',
                    data: '',
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
.clearfix:after {
	content: "";
	display: block;
	visibility: hidden;
	height: 0;
	clear: both;
}
.clearfix {
	zoom: 1;
}
</style>



