<template>
  <div class="page">
    <Row align='middle' class='clearfix' style='margin-bottom:20px'>
      <Col span="1" offset=1 style='height:30px;line-height:30px;padding-left:20px;'>
      部门:</Col>
      <Col span="4">
      <SelectTree :myvalue='depTypeKey'></SelectTree>
      </Col>
      <Col span="1" style='height:30px;line-height:30px;padding-left:20px;'>
      类型:</Col>
      <Col span="4">
      <docTree :myvalue='docTypeKey'></docTree>
      </Col>
      </Col>
      <Button type='primary' @click="selAllFile">查询</Button>
      </Col>
    </Row>
    <Row>
      <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:8px;">
      <Tabs type="card" @on-click='changePic'>
        <TabPane label="图文" name='pic'>
          <Row :gutter="32">
            <Col span="4"  v-for='(list,index) in userLookpicFileList' :key='index'
                 style='margin-top:24px;margin-bottom:24px;'>
            <a @click="onRowClick(list)">
              <Card style="max-height:200px;">
                <div style="text-align:center">
                  <img :src="list.photoUrl?baseurl+list.photoUrl:defaultUrl" style='width:60%;height:100px;overflow:hidden;'>
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
            <Table :columns="columns1" stripe class="myTable" @on-sort-change="recSortType" :data="userLookFileList"
                   @on-row-click="onRowClick"></Table>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      </Col>
    </Row>
    <Row style='padding-top:10px,padding-right:5px;' class="bottom-fixed">
      <Col>
      <Page :total="page.total" placement='top' :page-size-opts='pageOpts' show-sizer show-elevator
            :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange"
            @on-page-size-change='onPageSizeChange' class="table-page"></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
import { showUserLookFile } from "../../api/all_interface";
import SelectTree from "@/components/common/selectTree";
import docTree from "@/components/common/docTree";
import { getRequestUrl } from "../../utils/commonurl";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      activeName: "pic",
      baseurl: "",
      defaultUrl: "@/assets/img/default.png",
      docTypeKey: {
        value: "",
        id: ""
      },
      depTypeKey: {
        value: "",
        id: ""
      },
      pageOpts: [20, 40, 60, 100],
      listparams: {
        userId: sessionStorage.getItem("userId"),
        current: 1,
        pageSize: 20,
        userGroupId: sessionStorage.getItem("userGroupId"),
        sortType: "desc"
      },
      photourl: "1513841327678bg.jpg",
      page: { total: 20, pages: 1, current: 1, pageSize: 20 },
      columns1: [
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "发布时间",
          key: "addFileTime",
          sortable: true,
          sortType: "desc",
          align: "center"
        },
        {
          title: "文件类型",
          key: "fileStyle",
          align: "center"
        },
        {
          title: "上传人",
          key: "username",
          align: "center"
        }
      ],
      userLookpicFileList: [],
      userLookFileList: []
    };
  },
  components: {
    SelectTree,
    docTree
  },
  beforeRouteLeave(to, from, next) {
    this.GET_LATEEST("allfiles");
    next();
  },
  mounted() {
    this.baseurl = getRequestUrl();
    console.log(this.baseurl);
  },
  created() {
    this.initList();
  },
  methods: {
    ...mapMutations(["GET_LATEEST"]),
    recSortType(order) {
      this.listparams.sortType = order.order;
      this.initList();
    },
    changePic(name) {
      this.activeName = name;
      this.initList();
    },
    selAllFile() {
      this.listparams.departmentName = this.depTypeKey.value;
      this.listparams.fileStyleId = this.docTypeKey.id;
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
      showUserLookFile(this.listparams)
        .then(res => {
          const showUserUpdata = res.data;
          if (res.data.code == 0) {
            this.page = res.data.rdPage;
            if (this.activeName === "pic") {
              this.userLookpicFileList = showUserUpdata.data;
              this.userLookFileList = [];
            } else {
              this.userLookFileList = showUserUpdata.data;
              this.userLookpicFileList = [];
            }
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
