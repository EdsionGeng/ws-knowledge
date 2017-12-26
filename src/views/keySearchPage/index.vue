<template>
  <div class="page">
    <Row>
      <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
      <Tabs type="card" @on-click='changePic'>
        <TabPane label="列表" name='table'>
          <Row>
            <Col>
            <Table :columns="columns1" class="myTable" stripe :data="historyUploadMessageList"
                   @on-row-click="onRowClick"></Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="图文" name='pic'>
          <Row>
            <Col span="5" offset=1 pull=1 v-for='(list,index) in historyUploadpicMessageList' :key='index'
                 style='margin-bottom:8px;'>
            <a @click="onRowClick(list)">
              <Card style="">
                <div style="text-align:center">
                   <img :src="'http://192.168.3.26:8011/'+list.photoUrl" style='width:50%;height:90px;'>
                  <div style='color:#444;font-size:16px;' class="nowrap">{{list.title}}</div>
                  <p style='color:#999;font-size:12px;' >上传时间：{{list.addFileTime}}</p>
                  <p style='color:#999;font-size:12px;'>上传人：{{list.username}}</p>
                </div>
              </Card>
            </a>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      </Col>
    </Row>
    <Row>
      <Col>
      <Page placement='top' :total="page.total" :page-size-opts='pageOpts' show-sizer
            :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange"
            @on-page-size-change='onPageSizeChange' class="table-page"></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
import { searchResult } from "../../api/all_interface";
import { mapState } from "vuex";
export default {
  data() {
    return {
      docTypeKey: {
        value: "",
        id: 0
      },
      depTypeKey: {
        value: ""
      },
      selectValue: "",
      imgUrl: "",
      pageOpts: [20, 40, 60, 100],
      listparams: {
        current: 1,
        pageSize: 20,
        userId: sessionStorage.getItem("userId"),
        searchContent:this.$route.params.key,
        userGroupId:sessionStorage.getItem('userGroupId')
      },
      num: 0,
      deptlist: [],
      fileparams: null,
      page: { total: 20, pages: 1, current: 1, pageSize: 20 },
      mymessageDetail: {
        MyMessageListTitle: "",
        MyMessageupdate: "",
        AddUser: "",
        MyMessageMsg: "",
        readed: 0,
        noreaded: 0
      },
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
    this.initList();
  },
  methods: {
    changePic(name) {
      console.log(name);
      if (name === "pic") {
        this.historyUploadpicMessageList = this.historyUploadMessageList;
      } else {
        this.historyUploadpicMessageList = [];
      }
    },
    selAllFile() {
      this.listparams.departmentName = this.depTypeKey.value;
      this.listparams.fileStyleId = this.docTypeKey.id;
      console.log(this.listparams);
      this.initList();
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
      this.listparams.searchContent = this.$route.params.key;
      searchResult(this.listparams)
        .then(res => {
          const showUserUpdata = res.data;
          if (res.data.code == 0) {
            console.log(res.data);
            this.page = res.data.rdPage;
            this.historyUploadMessageList = showUserUpdata.data;
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
