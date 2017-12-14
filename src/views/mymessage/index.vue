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
      <!--<Page :total="page.total" :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange" class="table-page"></Page>-->
    </div>
    <Modal
      :title="mymessageDetail.MyMessageListTitle"
      v-model="modal1"
      :mask-closable="false"
    >
      <p style='text-align:center'>发布时间：{{ mymessageDetail.MyMessageupdate}}&nbsp; &nbsp;发布人：{{ mymessageDetail.AddUser}}&nbsp;&nbsp;已读人：<strong style="color:red">{{mymessageDetail.readed }}</strong>&nbsp;&nbsp;未读人：<strong style="color:red">{{mymessageDetail.noreaded}}</strong></p>
      <p class="modal-content" style='color:#333;margin-top:10px;'>{{mymessageDetail.MyMessageMsg}}</p>
    </Modal>
  </div>

</template>
<script>
  import { showUserAd } from "../../api/all_interface";
  import { showAdPcs } from "../../api/all_interface";
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

          }],
        mymessageDetail:{
          MyMessageListTitle:'',
          MyMessageupdate:'',
          AddUser:'',
          MyMessageMsg:'',
          readed:0,
          noreaded:0
        },
        showStripe:true,
        MyMessageList: [],
        page: {},
        data: {
          current: 1,
          pageSize:10,
          userId:145
//          id: this.$route.query.id,
//          yhjId: this.$route.query.yhjId,
//          yhjType: this.$route.query.yhjType
        }
      };
    },
    created() {
      this.initUserAd();
    },
    methods:{
      onPageChange(value) {
        this.data.current=value;
        this.initUserAd();

      },
//    ok () {
//      this.$Message.info('Clicked ok');
//    },
//    cancel () {
//      this.$Message.info('Clicked cancel');
//    },
      initUserAd() {
        showUserAd(this.data)
          .then(res => {
            const data = res.data;
//          console.log(res.data);
            if (data.code == 0) {
              this.MyMessageList = data.data;
              console.log(this.MyMessageList)
              this.page = data.rdPage;
              console.log(data.rdPage)
            }
          })
          .catch(err => {});
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
      },
    }
  }
</script>
<style scoped>
</style>
