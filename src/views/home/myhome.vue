<template>
     <div class="mycenter">
        <Card >
            <p slot="title"><span>我的消息</span><a class='rt' @click="changeRoute('mymessage')">查看更多&gt;&gt;</a> </p>
            <div>
              <Table stripe :columns="columns1"  class="myTable"	:row-class-name='rowClassName'  :data="MyMessageList" @on-row-click="onRowClick"></Table>
            </div>
        </Card>
        <br>
        <Card >
            <p slot="title"><span>最新上传</span><a class='rt' @click="changeRoute('allfiles')">查看更多&gt;&gt;</a> </p>
            <div>
              <Table stripe :columns="columns2" class='myTable' :data="newMessageList"  @on-row-click="showNewMessageList"></Table>
            </div>
        </Card>
        <Modal
          title="查看消息"
          v-model="modal1"
          :mask-closable="false"
          >
          <div style='text-align:center;font-size:20px;color:#222;font-weight:700'>{{mymessageDetail.MyMessageListTitle}}</div>
          <p style='text-align:center;color:#ccc;padding:5px 0'>发布时间：{{ mymessageDetail.MyMessageupdate}}&nbsp; &nbsp;发布人：{{ mymessageDetail.AddUser}}&nbsp;&nbsp;已读人：{{mymessageDetail.readed }}&nbsp;&nbsp;未读人：{{mymessageDetail.noreaded}}</p>
          <p class="modal-content" style='color:#333;'>{{mymessageDetail.MyMessageMsg}}</p>
      </Modal>
    </div>
</template>
<script>
 import { showUserAd } from "../../api/all_interface";
 import { showAdPcs } from "../../api/all_interface";
 import {showUserLookFile} from '../../api/all_interface'
    export default {
        data () {
            return {
              //当前公告的详细信息
             mymessageDetail:{
                MyMessageListTitle:'ewrwqre',
                MyMessageupdate:'',
                AddUser:'',
                MyMessageMsg:'hello world hello you are welcome',
                readed:0,
                noreaded:0
              },
              MyMessageList: [],
              newMessageList: [],

               mesDetail: [],
               params:null,
               //modal信息
               title:'',
               modal1:false,

               data: {
                  current: 1,
                  pageSize:5,
                  userId:sessionStorage.getItem('userId')
                },
                newdata:{
                  current: 1,
                  pageSize:10,
                  userId:sessionStorage.getItem('userId'),
                  userGroupId:sessionStorage.getItem('userGroupId')
                }
                ,
                columns1: [
                    {
                        title: '标题',
                        key: 'at',
                    },
                    {
                        title: '发布时间',
                        key: 're',
                        sortType: 'desc',
                        align:'right',
                    }
                ],
                 columns2: [
                    {
                        title: '标题',
                        key: 'title',
                    },
                    {
                        title: '发布时间',
                        key: 'addFileTime',
                        sortType: 'desc',
                        align:'right',
                    }
                ]
            }
        },
        mounted(){
         this.initUserAd();
         this.initUserLookFile();
        },
        methods:{
          changeRoute(name){
             this.$router.push('/'+name);
          },

          onRowClick(row,index){
             this.params={
               commonId:row.commonId
             };
             console.log(this.params.commonId)
              showAdPcs(this.params).then(
              res => {
                const data = res.data;
                  console.log(res.data);
                if (data.code == 0) {
                  this.mymessageDetail.MyMessageListTitle=row.at
                  this.mymessageDetail.MyMessageupdate=row.re
                  this.mymessageDetail.AddUser=row.AddUser
                  this.mymessageDetail.MyMessageMsg=row.ad
                  this.mymessageDetail.readed=data.data.isRead
                  this.mymessageDetail.noreaded=data.data.noRead
                  }

              }
            )
            .catch(err => {});
           this.modal1=true;
          },//点击获取显示公告详情
          showNewMessageList(row,index) {
                this.$router.push('/allfiles/check/'+row.id);
            },
          //个人能看到的最新上传的文件后台获取
          initshowAdPcs(){

          },
         initUserLookFile(){
            showUserLookFile(this.newdata).then(
              res => {
                const data = res.data;
                console.log('this is a wo can show pic')
                 console.log(res);
                if (data.code == 0) {
                 // console.log(this.MyMessageList)
                  this.newMessageList = data.data;
                  //console.log(this.newMessageList)
                  this.page = data.rdPage;
                  //console.log(data.rdPage)
                }
              }
            )
            .catch(err => {});
          },
          // 我的消息初始化函数
          initUserAd() {
            showUserAd(this.data)
              .then(res => {
                const data = res.data;
                console.log('----');
                console.log(res);
                if (data.code == 0) {
                  console.log(this.MyMessageList)
                  this.MyMessageList = data.data;
                }
              })
              .catch(err => {});
          },
          //改变未读行的数据的color （row,index）是获取当前行的row的信息和当前行的index下标
          rowClassName(row,index){
            if(row.ifRead===0){
              return 'demo-table-info-row';
            }
          }
        }
    }
</script>
<style >
.ivu-table .demo-table-info-row td {
  color: #2d8cf0;
}
.myTable .ivu-table-body tr{
  cursor: pointer;
}
</style>

<style scoped>
.mycenter {
  padding: 20px;
}


</style>
