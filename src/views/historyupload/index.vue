<style>
.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
  height: 100%;
  margin-top: -16px;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-color: transparent;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: #fff;
}
.table-page {
  float: right;
}
</style>
<template>
<div>
        <Row :gutter="32">
        <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card">
                <TabPane label="列表">    
                  <Row>
                    <Col>
                      <Table :columns="columns1" 	:data="historyUploadMessageList" @on-row-click="onRowClick"></Table>
                    </Col>  
                  </Row>               
                  <Page :total="page.total" :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange" class="table-page"></Page>
                </TabPane>
                <TabPane label="图文">
                    <Row type="flex" justify="start" :gutter='16'>
                      <Col  span="4" v-for='(list,index) in historyUploadMessageList' :key='index' style='margin-bottom:15px;'>
                          <Card >
                              <p slot="title">{{list.at}}</p>
                              <p>{{list.re}}</p>
                          </Card>
                      </Col>
                  </Row>
                </TabPane>
            </Tabs>
        </Col>
    </Row>
      <Modal
          :title="mymessageDetail.MyMessageListTitle"
          v-model="modal1"
          :mask-closable="false"
          >
          <p style='text-align:center'>发布时间：{{ mymessageDetail.MyMessageupdate}}&nbsp; &nbsp;发布人：{{ mymessageDetail.AddUser}}&nbsp;&nbsp;已读人：{{mymessageDetail.readed }}&nbsp;&nbsp;未读人：{{mymessageDetail.noreaded}}</p>
          <p class="modal-content" style='color:#333;margin-top:10px;'>{{mymessageDetail.MyMessageMsg}}</p>
      </Modal>
</div>
    
</template>
<script>
import { showUserUpload } from "../../api/all_interface";
export default {
  data() {
    return {
      modal1: false,
      params: {
        current: 1,
        pageSize: 10,
        userId: 145
      },
      page: { total: 2, current: 1, pageSize: 5 },
      mymessageDetail: {
        MyMessageListTitle: "ewrwqre",
        MyMessageupdate: "",
        AddUser: "",
        MyMessageMsg: "hello world hello you are welcome",
        readed: 0,
        noreaded: 0
      },
      columns1: [
        {
          title: "标题",
          key: "at"
        },
        {
          title: "发布时间",
          key: "re",
          sortable: true,
          align: "right"
        }
      ],
      historyUploadMessageList: [
        {
          at: "hello",
          re: "2017-01-01"
        },
        {
          at: "hello world",
          re: "2017-01-02"
        },
        {
          at: "hello world",
          re: "2017-01-05"
        },
        {
          at: "hello world",
          re: "2017-01-05"
        },
        {
          at: "hello world",
          re: "2017-01-05"
        },
        {
          at: "hello world",
          re: "2017-01-05"
        },
        {
          at: "hello world",
          re: "2017-01-05"
        }
      ]
    };
  },
  mounted() {
    this.initList();
  },
  methods: {
    onRowClick(row, index) {
      this.params = {
        commonId: row.commonId
      };
      this.$router.push('/allfiles/check/:id='+this.params.commonId);
        
      this.modal1 = true;
    },
    onPageChange() {},
    initList() {
      showUserUpload(this.params)
        .then(res => {
          const showUserUpdata = res.data;
          console.log(res.data);
          if (data.code == 0) {
            this.historyUploadMessageList = showUserUpdata.data;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
