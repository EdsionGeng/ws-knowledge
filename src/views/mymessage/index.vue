<template>
  <div>
    <div  style="color:blue">
      全部消息
    </div>
    <div style="margin:10px">
      <Row class="table-top">
        <Col>
        <Table :columns="MyMsgColumns" :data="MyMessageList" v-model="showStripe" ></Table>
        </Col>
      </Row>
     <!--<Page :total="page.total" :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange" class="table-page"></Page>-->
    </div>
    <!--<Modal-->
      <!--v-model="modal1"-->
      <!--title="Common Modal dialog box title"-->
      <!--@on-ok="ok"-->
      <!--@on-cancel="cancel">-->

    <!--</Modal>-->
  </div>

</template>
<script>
  import { showUserAd } from "../../api/all_interface";
export default {
  data(){
      return {
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
    onPageChange() {},
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
    }
  }
}
</script>
<style scoped>
</style>
