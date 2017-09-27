文档管理 路由file
<template>
  <div class='Doc'>
    <h2>文档管理</h2>
    <div >
    
        <Cascader :data="datas" change-on-select style='width:340px;'></Cascader>
    </div>
    <div class='title clearfix' >
            <Row class='fl'>
                
                <Col class='fl' style='margin-right: 50px;'>
                    <span >发布时间&nbsp;</span>
                    <DatePicker size="large" type="date" placeholder="选择日期"></DatePicker>
                </Col>
              
                <Col class='fl'  style='margin-right:50px;'>
                <span >截止时间&nbsp;</span>
                    <DatePicker size="large" type="date" placeholder="选择日期"></DatePicker>
                </Col>
                <Col class='fl'style='margin-right:50px;' >
                    <Input v-model="value4" icon="ios-search" placeholder="请输入..." style="width: 200px"></Input>

                </Col>
                <Col class='fr'>
                    <Button type="primary">查询</Button>
                </Col>
                
            </Row>
    </div>
    <div class='Modal'>
        <Button type="primary"  v-on:click='add'>批量调整目录</Button>
        <Button type="primary" @click="isDel = true">批量删除</Button>
    </div>    
      
        
        
    <Modal v-model="isShow">
        <h2>批量调整目录</h2>
         <Tree :data="baseData" show-checkbox></Tree>
         <!-- <div slot="footer">
           
        </div> -->
    </Modal>  
    <Modal v-model="isDel" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <div style="text-align:center">
           
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
        </div>
    </Modal>
    <div>
        <Table :border="showBorder" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''" :size="tableSize" :data="tableData3" :columns="tableColumns3"></Table>
    </div>
    <div class="file-page">
         <Page :total="100" size="small" show-total ></Page>
    </div>
   
  </div>
</template>
<script>
import {getFileSysList} from '../../api/login'
    export default {
        data () {
            return {
              isShow: false,
              value4:'',
              isDel:false,
              modal_loading: false,
               data:{
                    pageSize:20,
                    pageIndex:1,
                    type:'ddd'
                },
               datas: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }],
            
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
                model1: '',
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
                tableSize: 'default',
                 baseData: [{
                    expand: true,
                    title: 'parent 1',
                    children: [{
                        title: 'parent 1-0',
                        expand: true,
                        disabled: true,
                        children: [{
                            title: 'leaf',
                            disableCheckbox: true
                        }, {
                            title: 'leaf',
                        }]
                    }, {
                        title: 'parent 1-1',
                        expand: true,
                        checked: true,
                        children: [{
                            title: '<span style="color: red">leaf</span>',
                        }]
                    }]
                }]
            }
        },
        created(){
           this.initfiledata();
        },
        methods: {
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            add(){
                this.isShow = true;
            },
            del(){
               
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal2 = false;
                    this.$Message.success('删除成功');
                }, 2000);
            },
            initfiledata(){
                getFileSysList(this.data).then(res=>{
                    if(res.data.code === 0){
                        console.log(res)
                    }
                })
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
.Doc{
  position: relative;
}
.Doc h2{
color: #000;
margin-bottom: 20px;
}
.title{
  margin: 20px 0 ;
}
.Modal{
  margin-bottom: 20px;
}
.Modal button{
  margin-right: 20px;
}
.file-page{
position: absolute;
margin-top: 10px;
right:20px;  
}
</style>
