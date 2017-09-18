<template>
  <div class='affiche'>
    <h2>公告推送</h2>
    <div class='ModalAll'>
    
        <Button type="primary" @click="modal1 = true" style='margin-right: 20px;'>添加公告</Button>
      
        <Modal
            v-model="modal1"
            title="添加公告"
            @on-ok="ok"
            @on-cancel="cancel">
            
            
        </Modal>
        <Button type="primary" @click="modal2 = true">批量删除</Button>

        <Modal
            v-model="modal2"
            title="批量删除"
            @on-ok="ok"
            @on-cancel="cancel">
          <p class='del'>确认是否删除选中文件</p>
            
        </Modal>
    </div>
 


    <div class='title clearfix' >
         
        
         
          
 
        <Row >
            <Col class='fl' style='margin-right: 30px;'>
                  <span >选择主题&nbsp;</span >
                <Input  placeholder="请输入..." style="width: 200px"></Input>
            </Col>
            
            <Col class='fl' style='margin-right: 30px;'>
                <span >发布时间&nbsp;</span>
                <DatePicker size="large" type="date" placeholder="选择日期"></DatePicker>
            </Col>
          
            <Col class='fl'  style='margin-right:30px;'>
            <span >截止时间&nbsp;</span>
                <DatePicker size="large" type="date" placeholder="选择日期"></DatePicker>
            </Col>
             <Col class='fr' >
                <Button type="primary" >查询</Button>
            </Col>
            
        </Row>
    </div>
  
    <div>
    
      <Table :border="showBorder" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''" :size="tableSize" :data="tableData3" :columns="tableColumns3"></Table>
    </div>
    <div class="file-page">
      <Page :total="100" size="small" show-total ></Page>
    </div>
</div>
</template>
<script>
        export default {
        data () {
            return {
                modal1: false,
                modal2: false,
                value1: '',
                value2: '',
                value3: '',
                 tableData3: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        date: '2016-10-03'
                    },
                    {
                        name: '张小刚',
                        age: 24,
                        address: '北京市海淀区西二旗',
                        date: '2016-10-01'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        date: '2016-10-02'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        date: '2016-10-04'
                    },
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        date: '2016-10-03'
                    },
                    {
                        name: '张小刚',
                        age: 24,
                        address: '北京市海淀区西二旗',
                        date: '2016-10-01'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        date: '2016-10-02'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        date: '2016-10-04'
                    }
                ],
                showBorder: true,
                showStripe: false,
                showHeader: true,
                showIndex: false,
                showCheckbox: true,
                fixedHeader: false,
                tableSize: 'default'

            }
        },
        computed: {
            tableColumns3 () {
                let columns = [];
                if (this.showCheckbox) {
                    columns.push({
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    })
                }
                if (this.showIndex) {
                    columns.push({
                        type: 'index',
                        width: 60,
                        align: 'center'
                    })
                }
                columns.push({
                    title: '日期',
                    key: 'date',
                    sortable: true
                });
                columns.push({
                    title: '姓名',
                    key: 'name'
                });
                columns.push({
                    title: '年龄',
                    key: 'age',
                    sortable: true,
                    filters: [
                        {
                            label: '大于25岁',
                            value: 1
                        },
                        {
                            label: '小于25岁',
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.age > 25;
                        } else if (value === 2) {
                            return row.age < 25;
                        }
                    }
                });
                columns.push({
                    title: '地址',
                    key: 'address',
                    filters: [
                        {
                            label: '北京',
                            value: '北京'
                        },
                        {
                            label: '上海',
                            value: '上海'
                        },
                        {
                            label: '深圳',
                            value: '深圳'
                        }
                    ],
                    filterMethod (value, row) {
                        return row.address.indexOf(value) > -1;
                    }
                });
                return columns;
            }
        },
        methods: {
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        },
      
     
        }
</script>
<style scoped>
.affiche{
    position: relative;
}
.affiche h2{
color: #000;
margin-bottom: 20px;
}
.ModalAll button{
margin-bottom: 20px;
}
.title{
margin-bottom: 20px;
}
.title Col{
margin-right: 10px;
}
.file-page{
position: absolute;
 margin-top: 10px;
right:20px;  
}
</style>

