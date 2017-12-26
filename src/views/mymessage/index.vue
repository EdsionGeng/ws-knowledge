<template>
  <div>
    <div  style="color:blue">

    </div>
    <div style="margin:10px">
      <Row class="table-top">
        <Col>
        <Table :columns="MyMsgColumns" :data="MyMessageList" :row-class-name='rowClassName' showStripe  @on-row-click="onRowClick"></Table>
        </Col>
      </Row>
      <Page :total="page.total" :page-size-opts='pageOpts'show-sizer  :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange" @on-page-size-change='onPageSizeChange' class="table-page"></Page>
    </div>
    <Modal
      v-model="modal1"
      :mask-closable="false"
      :closable="false"
      @on-cancel="cancel"
      style="margin-left: 160px"
    >
      <p style="font-size: 16px;color:#444444;margin-top:10px;text-align: center">{{mymessageDetail.MyMessageListTitle}}</p>
      <p style='text-align:center;color:#999999;font-size: 12px;margin-top:10px;'>发布时间：{{ mymessageDetail.MyMessagetime}}&nbsp; &nbsp;发布人：{{ mymessageDetail.AddUser}}&nbsp;&nbsp;已读人：<strong style="color:red">{{mymessageDetail.readed }}</strong>&nbsp;&nbsp;未读人：<strong style="color:red">{{mymessageDetail.noreaded}}</strong></p>
      <p class="modal-content" style='color:#666666;margin-top:5px;margin-left:10px;margin-right:10px;'><pre>{{mymessageDetail.MyMessageMsg}}</pre></p>
    </Modal>
  </div>

</template>
<script>
  import { showUserAd } from "../../api/all_interface";
  import { showAdPcs } from "../../api/all_interface";
  import { readAd } from "../../api/all_interface";
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
               // console.info(data.data)
              this.MyMessageList = data.data;
              this.page = data.rdPage;
              //console.info(data.rdPage)
              //console.log(data.rdPage)
            }
          })
          .catch(err => {});
      },   rowClassName(row,index){
        if(row.ifRead===0){
          return 'demo-table-info-row';
        }
      },
      cancel(){
       window.location.reload();
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
              //console.info(row);
              _self.mymessageDetail.MyMessageListTitle=row.at;
              _self.mymessageDetail.MyMessagetime=row.re;
              _self.mymessageDetail.AddUser=row.addUser;
              var reg = new RegExp("<br>","g");
              _self.mymessageDetail.MyMessageMsg=row.ad.replace(reg,"\n");
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
