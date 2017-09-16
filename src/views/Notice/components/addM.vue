

<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="标题">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="发送部门">
            <Select v-model="formItem.select" placeholder="请选择">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select>
        </FormItem>
       
        
        
        <FormItem label="内容">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入..."></Input>
        </FormItem>
        <!-- <FormItem>
            <Button type="primary">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
        </FormItem> -->
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
                    slider: [70, 100],
                    textarea: ''
                }
            }
        }
    }
</script>