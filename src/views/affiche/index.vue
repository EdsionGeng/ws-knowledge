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
   <div class='ModalAll' >
    
        <Button type="primary"  style='margin-right: 20px;' v-on:click='onChange'>添加公告</Button>
        <Button type="primary"  >批量删除</Button> 

         
   </div>
     
   
    <Modal v-model="isShow">
        <h2>添加公告</h2>
        <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
            <FormItem label="标题" prop='title'>
                <Input v-model="formItem.title" placeholder="最多输入20个字"></Input>
            </FormItem>
        


            <FormItem label="内容" prop='content'>
                <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="限制500字以内"></Input>
            </FormItem>
             <FormItem label="发送部门" prop='deptname'>
                <Select v-model="formItem.deptname" style="width:400px" multiple  >
                    <OptionGroup :label="list.deptno" v-for='list in contents' :key='list.inex'>
                  
                        <Option  v-for="item in child"  :key="item.index" :value="item.deptno">{{ item.deptno }}</Option> 
                    </OptionGroup>
                   
                </Select>
              </FormItem>
            <FormItem>
                <Button type="primary" v-on:click="handleSubmit('formItem')">提交</Button>
                
            </FormItem>
            
        </Form>
        <div slot="footer">
           
        </div>
    </Modal> 
    <div>
    
      <Table :columns="initcolumns"
        :data="afficheList" ref="selection" @on-select='onSelected' @on-select-cancel='delSelected'
      ></Table>
    </div>
    <div class="file-page">
      <Page :total="data.pageSize"  size="small" show-total @on-change='changePage' ></Page>
    </div>
</div>
</template>
<script>
import {getNoticeList} from '../../api/login'
import {getDepartList} from '../../api/login'
        export default {
        data () {
            return {
            
               isShow:false,
                initcolumns:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                
                    {
                    title:"标题",
                    key:'title'
                },{
                    title:'描述',
                    key:'content'
                },{
                    title:"发送部门",
                    key:'deptname'
                },{
                    title:'发送人',
                    key:'pubuserid'
                },{
                    title:"时间",
                    key:'pubtime'
                }],
                data:{
                    pageSize:20,
                    pageIndex:1,
                    type:'ddd'
                },
                afficheList:[],
               
                
               formItem: {
                    title: '',
                    content: '',
                    deptname:[]
                },
                ruleValidate:{
                   title: [
                        { required: true, message: '最多输入20个字', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '限制500字以内', trigger: 'blur' }
                    ],
                    // deptname:[{
                    //      required: true, message: '不能为空', trigger: 'blur'
                    // }]
                },
     
                contents:[],
               
                
                child:[]
           
                
            

            }
        },
         created(){
            //初始化数据，方法写在methods里面
            this.initfiledata();
            // console.log(this.afficheList);
            
        },
        methods: {
        
            onChange(){
              
                this.isShow = true;
                // 部门渲染
            getDepartList().then(res=>{
                if(res.data.code == 0){
                    this.contents = res.data.content;
                     console.log(this.contents); 
                   
                     this.contents.forEach(function(element,index) {
                        //    console.log(element);
                           this.child = element.child
                            // console.log(this.child); 
                           let childs = this.contents[index].child;
                           console.log(childs);
                            childs.forEach(function(element){

                                // console.log(element.deptno);
                               
                              
                               
                                // console.log(this.deptno)
                            //  console.log(element);
                            },this)
                           
                          
                            
                     }, this);
                     
                }
            })    
             
            },
            handleSubmit(name){
                
                this.$refs[name].validate((valid) => {
                    if (valid) {
                         
                       getNoticeList(this.data).then(res=>{
                            if(res.data.code == 0){
                                this.$Message.success(res.data.message);
                                res.data.content.forEach(function(element) {
                                    this.afficheList = [];
                                    this.afficheList.push({
                                        title:element.title,
                                        content:element.content,
                                        deptname:element.deptname,
                                        pubuserid:element.pubuserid,
                                        pubtime:element.pubtime,

                                    })
                                }, this);
                            }
                       })
                        // this.afficheList.push(this.formItem)
                        this.isShow = false;
                       
                        this.$router.push({path:'affiche'});
                        
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                    
                })
                
                
            },
            initfiledata(){
               
                getNoticeList(this.data).then(res=>{
                    // console.log(res);
                    if(res.data.code == 0){
                                res.data.content.forEach(function(element) {
                                    this.afficheList = [];
                                    this.afficheList.push({
                                        title:element.title,
                                        content:element.content,
                                        deptname:element.deptname,
                                        pubuserid:element.pubuserid,
                                        pubtime:element.pubtime,

                                    })
                                }, this);
                      

                        // console.log(this.afficheList);
                        // console.log(res)
                        
                    }
                    
                })
               
                
            },
            changePage(){
                 this. initfiledata();
            },
            onSelected(arr){
                // console.log(arr);
                
            },
            delSelected(arr){
                // console.log(arr)
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

