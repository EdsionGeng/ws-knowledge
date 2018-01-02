<template>
  <div class="page">
    <Row>
      <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:8px;">
      <Tabs type="card" @on-click='changePic'>
      <TabPane label="图文" name='pic'>
          <Row :gutter="32">
            <Col span="4"   v-for='(list,index) in historyUploadpicMessageList' :key='index'
                 style='margin-bottom:10px;margin-top:10px;'>
            <a @click="onRowClick(list)">
              <Card style="">
                 <div style="text-align:center">
                  <img :src="baseurl+list.photoUrl" style='width:60%;height:100px;overflow:hidden;' onerror='this.style.opacity=0;'>
                  <div style='color:#444;font-size:16px;' class="nowrap">{{list.title}}</div>
                  <p style='color:#999;font-size:11px;margin-top:8px;' class="nowrap" >上传时间：{{list.addFileTime}}</p>
                </div>
              </Card>
            </a>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="列表" class="clearfix" name='table'>
          <Row>
            <Col>
            <Table class="myTable" :columns="columns1" stripe @on-sort-change="recSortType" :data="historyUploadMessageList"
                   @on-row-click="onRowClick"></Table>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      </Col>
    </Row>
    <Row>
      <Col>
      <Page :total="page.total" placement='top' :page-size-opts='pageOpts' show-sizer show-elevator :current="page.current"
            :page-size="page.pageSize" :show-total="true" @on-change="onPageChange"
            @on-page-size-change='onPageSizeChange' class="table-page"></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
import { showUserUpload } from "../../api/all_interface";
import { getRequestUrl } from "../../utils/commonurl";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      baseurl:'',
      pageOpts: [10, 20, 30, 40],
      listparams: {
        current: 1,
        pageSize: 20,
        userId: sessionStorage.getItem("userId"),
        sortType: "desc"
      },
      page: { total: 20, pages: 1, current: 1, pageSize: 20 },
      columns1: [
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "文件类型",
          key: "fileStyle",
          align: "center"
        },
        {
          title: "发布时间",
          key: "addFileTime",
          sortable: true,
          align: "center"
        }
      ],
      historyUploadpicMessageList: [],
      historyUploadMessageList: []
    };
  },
  mounted() {
    this.baseurl=getRequestUrl();
    this.initList();
  },
  beforeRouteLeave(to, from, next) {
    this.GET_LATEEST("hisuplod");
    next();
  },
  methods: {
    ...mapMutations(["GET_LATEEST"]),
    recSortType(order) {
      this.listparams.sortType = order.order;
      this.initList();
    },
    changePic(name) {
      if (name === "pic") {
        this.historyUploadMessageList = [];
      } else {
        this.historyUploadMessageList = this.historyUploadpicMessageList;
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
      showUserUpload(this.listparams)
        .then(res => {
          const showUserUpdata = res.data;
          console.log(showUserUpdata);
          if (res.data.code == 0) {
            this.page = res.data.rdPage;
            // this.historyUploadMessageList = showUserUpdata.data;
            this.historyUploadpicMessageList = showUserUpdata.data;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style>
.ivu-select-single .ivu-select-selection {
  width: 100px;
}
.page {
  height: 100%;
}
</style>
