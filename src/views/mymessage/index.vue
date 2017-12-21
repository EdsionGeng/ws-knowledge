<template>
  <div>
    <div  style="color:blue">
      全部消息
    </div>
    <div style="margin:10px">
      <Row class="table-top">
        <Col>
        <Table :columns="MyMsgColumns" :data="MyMessageList" showStripe  @on-row-click="onRowClick"></Table>
        </Col>
      </Row>
      <Page :total="page.total" :page-size-opts='pageOpts'show-sizer  :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange" @on-page-size-change='onPageSizeChange' class="table-page"></Page>
    </div>
    <Modal
      :title="mymessageDetail.MyMessageListTitle"
      v-model="modal1"
      :mask-closable="false"
      style="margin-left: 160px"
    >
      <p style='text-align:center'>发布时间：{{ mymessageDetail.MyMessagetime}}&nbsp; &nbsp;发布人：{{ mymessageDetail.AddUser}}&nbsp;&nbsp;已读人：<strong style="color:red">{{mymessageDetail.readed }}</strong>&nbsp;&nbsp;未读人：<strong style="color:red">{{mymessageDetail.noreaded}}</strong></p>
      <p class="modal-content" style='color:#333;margin-top:10px;'>{{mymessageDetail.MyMessageMsg}}</p>
    </Modal>
  </div>

</template>
<script>
  import { showUserAd } from "../../api/all_interface";
  import { showAdPcs } from "../../api/all_interface";
  import {readAd } from "../../api/all_interface";
  export default {
    data(){
      return {
        modal1:false,
        MyMsgColumns: [
          {
            title: "标题",
            key: "at",

          },
          {
            title: "时间",
            key: "re",
            width: 150,
            align: 'center',
            sortable: true
          }],
        mymessageDetail:{
          MyMessageListTitle:'',
          MyMessagetime:'',
          AddUser:'',
          MyMessageMsg:'',
          readed:0,
          noreaded:0
        },
        pageOpts:[10,20,30,40,50],
        showStripe:true,
        MyMessageList: [],
        page: {},
        readAdParams:{
          userId:sessionStorage.getItem("userId"),
          commonId:""
        },
        dataParams: {
          current: 1,
          pageSize:10,
          userId:sessionStorage.getItem("userId")
        }
      };
    },
    created() {
      this.initUserAd();
    },
    methods:{
      onPageChange(value) {
        this.dataParams.current=value;
        this.initUserAd();
      },

      onPageSizeChange(value){
        this.dataParams.pageSize=value;
        this.initUserAd();
      },
      initUserAd() {
        showUserAd(this. dataParams)
          .then(res => {
            const data = res.data;
              // console.log(res.data);
              if (data.code == 0) {
              this.MyMessageList = data.data;
              //console.log(this.MyMessageList)
              this.page = data.rdPage;
              //console.info(data.rdPage)
              //console.log(data.rdPage)
            }
          })
          .catch(err => {});
      },
      onRowClick(row,index){
        this.params={
          commonId:row.commonId
        };

        //console.log(this.params.commonId)
        let _self=this;
        showAdPcs(this.params).then(
          res => {
            const data = res.data;

            if (data.code == 0) {
              console.info(row);
              _self.mymessageDetail.MyMessageListTitle=row.at;
              _self.mymessageDetail.MyMessagetime=row.re;
              _self.mymessageDetail.AddUser=row.addUser;
              _self.mymessageDetail.MyMessageMsg=row.ad;
              _self.mymessageDetail.readed=data.data.isRead;
              _self.mymessageDetail.noreaded=data.data.noRead;
              _self.readAdParams.commonId=row.commonId;
              readAd(this.readAdParams).then(res=>{
                const data=res.data;
              if(data.code==0){

              }
            })
              .catch(err =>{});
            }
          }
        )
          .catch(err => {});
        this.modal1=true;
      },
    }
  }
</script>
<style scoped>
</style>
