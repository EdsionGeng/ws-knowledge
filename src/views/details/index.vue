全部文件下的文件详情 路由details
<template>
<div >
  <h2 class='details'>文件详情</h2>
    <Row style='margin-bottom: 20px;' class='details-title'>
        <Col >
            <Card dis-hover>
                <p slot="title">标题</p>
                <p><span> 文件类型:</span><i>  规则制度 </i>
                  <span>文件上传者:</span> <i> 上传人姓名</i> 
                  <span>上传时间:</span> <i>2017-09-04 12:31 </i>
                  <span>文件大小:</span> <i> 200K</i>
                  <span>已读人数:</span> <i>38</i>人
                  <span>未读人数:</span><i>18</i>人
                  <span>查阅次数:</span> <i>18</i>次</p>
                <p><router-link to=''> 文件描述</router-link></p>
            </Card>
        </Col>                                                                      
       
    </Row>              
    <Row  style='margin-bottom: 20px;'>
        <Col >
            <Card dis-hover >
                <p slot="title">附件列表</p>
               <p><router-link to=''>
                  <img src="../../assets/link.png" alt="">
                  <span>我的文档1.doc <i>(100k)</i></span>
                  <i>描述:这是产品部门的规章制度，必看</i>
               </router-link></p>
              
                  <p><router-link to=''>
                  <img src="../../assets/link.png" alt="">
                  <span>我的文档1.doc <i>(100k)</i></span>
                  <i>描述:这是产品部门的规章制度，必看</i>
                  </router-link></p>
              
              
                <p></p>
            </Card>
        </Col>
       
    </Row>
    <Row> 
        <Col>
            <Card dis-hover >      
                <div class='Journal clearfix'>
                    <span class='fl'>操作日志</span>
                    <span class='fr'><router-link to='Journal'>更多内容>></router-link></span>
                </div>
                <div>

                    <Table :border="showBorder" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''" :size="tableSize" :data="tableData3" :columns="tableColumns3"></Table>
                </div>
                <div class='btn'>
                    <router-link to='Modify'><Button type="primary">修改文件</Button></router-link>
                    <Button type="primary" @click="modal1 = true">删除文件</Button>
                    <Modal
                    v-model="modal1"
                    title=""
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <p>确认是否删除文件</p>

                    </Modal>
                </div>
            </Card> 
        </Col> 
    </Row>
</div>

</template>
<script>
    export default {
       data(){
           return{
                modal1: false,
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
                    }
                ],
                showBorder: false,
                showStripe: false,
                showHeader: true,
                showIndex: false,
                showCheckbox: false,
                fixedHeader: false,
                tableSize: 'default'
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
    }
</script>
<style scoped>
.details{
  font-size: 18px;
  color: #000;  
  margin-top: 10px;
  margin-bottom: 20px;
}
i{
    color: #ccc;
}
.Journal span{
    font-size: 14px;
    color: #000;
    
}
.Journal{
   margin-bottom: 20px;
    
}
.btn{
    margin: 20px;
    text-align: center;
}
.btn button{
    margin-left: 20px;
}
.details-title span i{
    background: #e9eaec;
}

</style>