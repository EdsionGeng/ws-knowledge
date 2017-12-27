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
      <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
      <Tabs type="card" @on-click='changePic'>
        <TabPane label="列表" name='table'>
          <Row>
            <Col>
            <Table :columns="columns1" stripe class="myTable" :data="userLookFileList"
                   @on-row-click="onRowClick"></Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="图文" name='pic'>
          <Row>
            <Col span="5" offset=1 pull=1 v-for='(list,index) in userLookpicFileList' :key='index'
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
  import {showUserLookFile} from "../../api/all_interface";
  import SelectTree from "@/components/common/selectTree";
  import docTree from "@/components/common/docTree";

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
        pageOpts: [20, 40, 60, 100],
        listparams: {
          userId: sessionStorage.getItem("userId"),
          current: 1,
          pageSize: 20,
          userGroupId: 3
        },
        photourl:"1513841327678bg.jpg",
        page: {total: 20, pages: 1, current: 1, pageSize: 20},
        columns1: [
          {
            title: "标题",
            key: "title"
          },

          {
            title: "发布时间",
            key: "addFileTime",
            sortType: "desc",
            align: "center"
          },
          {
            title: "上传人",
            key: "username",
            align: "right"
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
    created() {
      this.initList();
    },
    methods: {
      changePic(name) {
        if (name === 'pic') {
          this.userLookpicFileList = this.userLookFileList;
        } else {
          this.userLookpicFileList = []
        }
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
              this.userLookFileList = showUserUpdata.data;
              this.userLookpicFileList = showUserUpdata.data;
            }
          })
          .catch(err => {
          });
      }
    }
  };
</script>
<style scoped>
  .page {
    padding: 20px 10px;
  }
</style>
