<template>
  <div>
    <div style=" margin-left:15px ;color:blue">
      全部消息
    </div>
    <div style="margin:10px">
      <Row class="table-top">
        <Col>
        <Table :columns="MyMsgColumns" :data="MyMessageList" stripe></Table>
        </Col>
      </Row>
      <Page :total="page.total" :current="page.current" :page-size="page.pageSize" :show-total="true"
            @on-change="onPageChange" class="table-page"></Page>
    </div>
  </div>

</template>
<script>
  import {showUserAd} from "../../api/all_interface";
  import {showAdPcs} from "../../api/all_interface";

  export default {
    data() {
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
        stripe: true,
        MyMessageList: [],
        page: {},
        data: {
          current: 1,
          pageSize: 10,
          userId: 145
        },
      };
    },
    created() {
      this.initUserAd();
    },
    methods: {
      onPageChange() {
      },
      initUserAd() {

        showUserAd(this.data)
          .then(res => {
            const data = res.data;
            if (data.code == 0) {
              this.MyMessageList = data.data;
              this.page = data.rdPage;
              console.log(this.page)
            }
          })
          .catch(err => {
          });
      },

    }
  }
</script>
<style scoped>
</style>
