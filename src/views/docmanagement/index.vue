<template>
  <div>

    <div class="bodyarea">
      <Row>
        <Form>
          <Col span="5">
          <FormItem label="文档类型:">
              <docTree :myvalue='docTypeKey'></docTree>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="发布时间：">
            <DatePicker format="yyyy-MM-dd HH:mm:ss" type="daterange" size="large" placement="bottom-end"
                        placeholder="请选择时间" @on-change="dateOnChange" style="width: 250px"></DatePicker>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label=" 文件标题：">
            <Input v-model="dataParams.title" placeholder="请输入标题" style="width: 250px"></Input>
          </FormItem>
          </Col>
          <Col span="3">
          <Button type="primary" size="large" @click="handleSearch" style="width: 80px">查询</Button>
          </Col>
        </Form>
      </Row>
    </div>
    <div class="buttonarea">
      <Row>
        <Col span="2">
        <Button type="primary" size="large" @click="updateFileStyle=true">调整文件类型</Button>
        </Col>
        <Col span="2">
        <Button type="primary" size="large" @click="openDelWindow=true">删除</Button>
        </Col>
      </Row>
    </div>
    <div style="margin:40px">
      <Row class="table-top">
        <Col>
        <Table border ref="selection" :columns="AllFileColumns"   @on-sort-change="recSortType" :data="AllFileList" stripe
               @on-selection-change="delFileAction"></Table>
        </Col>
      </Row>
      <Page :total="page.total"  show-elevator :page-size-opts='pageOpts':current="page.current" :page-size="page.pageSize" show-sizer :show-total="true"
            @on-change="onPageChange" @on-page-size-change='onPageSizeChange'  class="table-page"></Page>
    </div>
    <Modal
      v-model="updateFileStyle"
      width="500"
      title="调整文件类型"
      @on-ok="ok"
    >
      <Tree :data="docTree" :render="renderContent1" ref='tree2'></Tree>
      <!--@on-check-change="getCheckNode"-->
    </Modal>
    <Modal
      v-model="openDelWindow"
      width="500"
      title="删除文件"
      @on-ok="todelFile"
      @on-cancel="toDelCancel">
      <p style="text-align: center;font-size: 18px">是否确定删除选中文件？</p>
      <!--@on-check-change="getCheckNode"-->
    </Modal>
  </div>
</template>
<script>
import { showAllFile } from "../../api/all_interface";
import { deleteFile } from "../../api/all_interface";
import { getDocTree } from "../../api/all_interface";
import { updateFileStyleDetail } from "../../api/all_interface";
import docTree from "@/components/common/docTree";
export default {
  data() {
    return {
      docTypeKey: {
        value: "",
        id: 0
      },
      AllFileColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          key: "fileNo"
        },
        {
          title: "文件名称",
          key: "title"
        },
        {
          title: "创建时间",
          key: "addFileTime",
          sortable: true
        },
        {
          title: "创建人",
          key: "username"
        },
        {
          title: "部门",
          key: "departmentName"
        },
        {
          title: "文档类型",
          key: "fileStyle"
        }
      ],
      docTreeParams: {
        id: "",
        fileKindName: "",
        fileParentId: "",
        operationTime: "",
        checked: "",
        fileKind: ""
      },
      docTree: [],

      deleteFileParams: {
        fileIds:"",
        userId: 1
      },
      updateFileParams: {
        fileIds:"",
        userId: 1,
        fileStyleId: ""
      },
      pageOpts: [10, 20, 30, 40, 50],
      dataParams: {
        current: 1,
        pageSize: 20,
        title:"",
        startDate:"",
        endDate: "",
        fileStyleId: "",
        sortType: "desc",
        companyId:sessionStorage.getItem("companyId")
      },
      openDelWindow: false,
      updateFileStyle: false,
      selection: [],
      date: "",
      page: {},
      AllFileList: []
    };
  },
  components: {
    docTree
  },
  created() {
    this.showAllFileList();
    this.showDocTree();
  },
  methods: {
    renderContent1(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            cursor: "pointer",
            padding: "3px 5px",
            borderRadius: "3px"
          },
          on: {
            click: e => {
              this.selectNode(this.$refs.tree2.$el);
              e.target.className = "activeSpan";
              this.updateFileParams.fileStyleId = data.id;
            }
          }
        },
        data.fileKindName
      );
    },
    selectNode(data) {
      function funSelect(data) {
        for (let val of data.children) {
          if (val.children.length !== 0) {
            funSelect(val);
          }
          if (val.className === "activeSpan") {
            val.className = "";
          }
        }
      }
      funSelect(data);
    },
    onPageChange(value) {
      this.dataParams.current = value;
      this.showAllFileList();
    },
    onPageSizeChange(value) {
      this.dataParams.pageSize = value;
      this.showAllFileList();
    },
    showDocTree() {
      let _doc = this;
      getDocTree(this.docTreeParams).then(res => {
        _doc.docTree = res.data;
      });
    },
    recSortType(order) {
      this.dataParams.sortType = order.order;
      this.showAllFileList();
    },
    delFileAction(arr) {
      let fielIds = "";
      for (let i = 0; i < arr.length; i++) {
        if (i > 0) {
          fielIds += ",";
        }
        fielIds += arr[i].id;
      }
      this.selection = fielIds;
      this.deleteFileParams.fileIds = fielIds;
      this.updateFileParams.fileIds = fielIds;
      return fielIds;
    },
    todelFile() {
      let _self = this;
      if (_self.deleteFileParams.fileIds == "") {
        _self.$Message.info("请勾选相应数据");
        return;
      }
      _self.deleteFileParams.fileIds = _self.selection;
      deleteFile(_self.deleteFileParams)
        .then(res => {
          const data = res.data;
          console.log(data);
          if (data.code == 0) {
            _self.$Message.info("操作成功");

            _self.showAllFileList();
          } else {
            _self.$Message.info(data.msg);
          }
        })
        .catch(err => {});
    },
    toDelCancel() {
      this.deleteFileParams.fileIds = "";
    },
    ok() {
      if (this.updateFileParams.fileIds == "") {
        this.$Message.info("请勾选相应数据");
        return;
      }
      this.updateFileParams.fileIds = this.selection;
      let _self = this;
      updateFileStyleDetail(this.updateFileParams)
        .then(res => {
          const data = res.data;
          if (data.code == 0) {
            this.$Message.info("操作成功");
            _self.showAllFileList();
          }
        })
        .catch(err => {});
    },
    handleSearch() {
      this.dataParams.fileStyleId = this.docTypeKey.id;
      this.showAllFileList();
    },
    dateOnChange(arr) {
      const rangedate = arr;
      this.dataParams.startDate = rangedate[0];
      if (rangedate[1] === undefined) {
        this.dataParams.endDate = "";
      } else {
        this.dataParams.endDate = rangedate[1];
      }
    },
    showAllFileList() {
      showAllFile(this.dataParams)
        .then(res => {
          const data = res.data;
          if (data.code == 0) {
            this.AllFileList = data.data;
            this.page = data.rdPage;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.buttonarea {
  margin-left: 35px;
}
.bodyarea {
  margin-left: 30px;
  margin-top: 30px;
}

.bodyarea .treestyle {
  max-height: 200px;
  overflow: auto;
}
</style>
