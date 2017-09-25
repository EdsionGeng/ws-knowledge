//消息推送 路由affiche
<template>

  <div class='affiche'>
    <h2>公告推送</h2>
   
 


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
    <div>
    
      <Table :columns="initcolumns"
        :data="afficheList"
      ></Table>
    </div>
    <div class="file-page">
      <Page :total="100" size="small" show-total ></Page>
    </div>
</div>
</template>
<script>
import {getNoticeList} from '../../api/login'
        export default {
        data () {
            return {
                initcolumns:[{
                    title:"标题",
                    key:'title'
                },{
                    title:'描述',
                    key:'content'
                },{
                    title:"发送部门",
                    key:''
                }],
                data:{
                    pageSize:20,
                    pageIndex:1,
                    type:'ddd'
                },
                afficheList:[],
                modal1:null,
                modal2:null

            }
        },
         created(){
            //初始化数据，方法写在methods里面
            this.initfiledata();
            // console.log(this.afficheList);
        },
        methods: {
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            initfiledata(){
                getNoticeList(this.data).then(res=>{
                    if(res.data.code == 0){
                        res.data.content.forEach(function(element) {
                            this.afficheList.push({
                                title:element.title,
                                content:element.content,

                            })
                        }, this);
                        console.log(this.afficheList);
                        console.log(res)
                    }
                })
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

