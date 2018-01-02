<template>
  <div class="page">
    <Row>
      <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
      <Tabs type="card" @on-click='changePic'>
         <TabPane label="图文" name='pic'>
          <Row :gutter="32">
            <Col span="4"  v-for='(list,index) in historyUploadpicMessageList' :key='index'
                 style='margin-bottom:10px;margin-top:10px;'>
            <a @click="onRowClick(list)">
              <Card style="">
                <div style="text-align:center">
                   <img :src="baseurl+list.photoUrl" style='width:60%;height:100px;overflow:hidden' onerror='this.style.opacity=0'>
                  <div style='color:#444;font-size:16px;' class="nowrap">{{list.title}}</div>
                  <p style='color:#999;font-size:11px;' class="nowrap" >上传时间：{{list.addFileTime}}</p>
                  <p style='color:#999;font-size:11px;' class="nowrap">上传人：{{list.username}}</p>
                </div>
              </Card>
            </a>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="列表" name='table'>
          <Row>
            <Col>
            <Table :columns="columns1" class="myTable" stripe :data="historyUploadMessageList"
                   @on-row-click="onRowClick"></Table>
            </Col>
          </Row>
        </TabPane>
       
      </Tabs>
      </Col>
    </Row>
    <Row>
      <Col>
      <Page placement='top' :total="page.total" :page-size-opts='pageOpts' show-sizer show-elevator
            :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange"
            @on-page-size-change='onPageSizeChange' class="table-page"></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
import { searchResult } from "../../api/all_interface";
import { getRequestUrl } from "../../utils/commonurl";
import { mapState } from "vuex";
export default {
  data() {
    return {
      baseurl: "",
      docTypeKey: {
        value: "",
        id: 0
      },
      depTypeKey: {
        value: ""
      },
      pageOpts: [20, 40, 60, 100],
      listparams: {
        current: 1,
        pageSize: 20,
        userId: sessionStorage.getItem("userId"),
        searchContent: this.$route.query.key,
        userGroupId: sessionStorage.getItem("userGroupId")
      },
      page: { total: 20, pages: 1, current: 1, pageSize: 20 },
      columns1: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "发布时间",
          key: "addFileTime",
          sortable: true,
          align: "center"
        },
        {
          title: "上传人",
          key: "username",
          align: "right"
        }
      ],
      historyUploadpicMessageList: [],
      historyUploadMessageList: []
    };
  },
  watch: {
    searchKey() {
      this.initList();
    }
  },
  computed: {
    ...mapState(["searchKey"])
  },
  mounted() {
    this.baseurl = getRequestUrl();
    this.initList();
  },
  methods: {
    changePic(name) {
      if (name === "pic") {
        this.historyUploadMessageList = [];
      } else {
      this.historyUploadMessageList=this.historyUploadpicMessageList;
      }
    },
    onRowClick(row) {
      this.$router.push("/allfiles/check/" + row.id);
    },
    onPageChange(value) {
      this.listparams.current = value;
      this.initList();
    },
    onPageSizeChange(value) {
      this.listparams.pageSize = value;
      this.initList();
    },
    initList() {
      console.log(this.listparams);
      this.listparams.searchContent = this.$route.query.key;
      searchResult(this.listparams)
        .then(res => {
          const showUserUpdata = res.data;
          if (res.data.code == 0) {
            console.log(res.data);
            this.page = res.data.rdPage;
            this.historyUploadpicMessageList = showUserUpdata.data;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.page {
  padding: 20px 10px;
}
</style>
