<template>
  <div>

    <div class="buttonarea">
      <Row>
        <Col span="2">
        <Button type="primary" size="large" @click="updateFileStyle=true">调整文件类型</Button>
        </Col>
        <Col span="2">
        <Button type="primary" size="large" @click="todelFile">删除</Button>
        </Col>
      </Row>
    </div>
    <div class="bodyarea">
      <Row>
        <Form>
          <Col span="5">
          <FormItem label="文档类型:">
            <Select v-model="data.fileStyleId" style="width:200px">
              <Tree :data="docTree" show-checkbox :render="renderContent" @on-check-change="showKindName"></Tree>
            </Select>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="发布时间：">
            <DatePicker format="yyyy-MM-dd HH:mm" type="daterange" size="large" placement="bottom-end"
                        placeholder="Select date" @on-change="dateOnChange" style="width: 275px"></DatePicker>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label=" 文件标题：">
            <Input v-model="data.title" placeholder="" style="width: 200px"></Input>
          </FormItem>
          </Col>
          <Col span="3">
          <Button type="primary" size="large" @click="handleSearch" style="width: 80px">查询</Button>
          </Col>
        </Form>
      </Row>
    </div>
    <div style="margin:40px">
      <Row class="table-top">
        <Col>
        <Table border ref="selection" :columns="AllFileColumns" :data="AllFileList" stripe
               @on-selection-change="delFileAction"></Table>
        </Col>
      </Row>
      <Page :total="page.total" :current="page.current" :page-size="page.pageSize" show-sizer :show-total="true"
            @on-change="onPageChange" class="table-page"></Page>
    </div>
    <Modal
      v-model="updateFileStyle"
      width="500"
      title="调整文件类型"
      @on-ok="ok"
      @on-cancel="cancel">

      <Tree :data="docTree" show-checkbox :render="renderContent" @on-check-change="circleStyleId"></Tree>
      <!--@on-check-change="getCheckNode"-->
    </Modal>
  </div>
</template>
<script>
  import {showAllFile} from "../../api/all_interface";
  import {deleteFile} from "../../api/all_interface";
  import {getDocTree} from "../../api/all_interface";
  import {updateFileStyleDetail} from "../../api/all_interface";

  export default {
    data() {
      return {
        AllFileColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'

          },
          {
            title: "编号",
            key: "fileNo",

          },
          {
            title: "文件名称",
            key: "title",

          }, {
            title: "创建时间",
            key: "addFileTime",
            sortable: true

          },
          {
            title: "创建人",
            key: "username",
          },
          {
            title: "部门",
            key: "departmentName",
          },
          {
            title: "文档类型",
            key: "fileStyle",
          },
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
        renderContent(h, {root, node, data}) {
          return h('span', data.fileKindName)
        },
        deleteFileParams: {
          fileIds: "",
          userId: 1
        },
        updateFileParams: {
          fileIds: "",
          userId: 1,
          fileStyleId: ""
        },
        data: {
          current: 1,
          pageSize: 10,
          title: "",
          startDate: "",
          endDate: "",
          fileStyleId: ""
        },
        updateFileStyle: false,
        selection: [],
        date: "",
        page: {},
        AllFileList: [],
      };
    },
    created() {
      this.showAllFileList();
      if (!this.updateFileStyle) {
        this.showDocTree();
      }
    },
    methods: {
      /**
       * 分页
       */
      onPageChange() {
//      this.params.current = value;
        this.showAllFileList();
      },
      /**
       * 操作树
       * @param arr
       */
      getCheckNode(arr) {
        if (arr.length > 1) {
          this.$Message.info("只能选取一种类型");
          return
        }

      },
      /**
       * 获取文档树形结构
       */
      showDocTree() {
        let _doc = this
        getDocTree(this.docTreeParams).then(res => {
          _doc.docTree = res.data;
        })
      },
      /**
       * 删除文件获取参数
       * @param arr
       * @returns {string}
       */
      delFileAction(arr) {
        let fielIds = "";

        for (let i = 0; i < arr.length; i++) {
          if (i > 0) {
            fielIds += ","
          }
          fielIds += arr[i].id
        }
        this.selection = fielIds
        this.deleteFileParams.fileIds = fielIds;
        //  console.info(this.selection)
        return fielIds
      },

      showKindName(node,data) {
        conosole.info(data)
      },
      /**
       * 删除文件
       */

      todelFile() {
        // console.log("222解决"+this.selection)
        let _self = this;
//        console.info(_self.selection)
        if (_self.deleteFileParams.fileIds == "") {
          this.$Message.info('请勾选相应数据');
          return
        }
        _self.deleteFileParams.fileIds = _self.selection;
        deleteFile(_self.deleteFileParams)
          .then(res => {
            const data = res.data;
            if (data.code == 0) {
              _self.$Message.info('操作成功');
              _self.showAllFileList();
            }
          })
          .catch(err => {
          });
      },
      circleStyleId(arr) {

//        if (arr.length > 1) {
//          this.$Message.info("请选择其中一个或子节点！")
//          return
//        }
//        console.info(arr.id);
//        this.updateFileParams.fileStyleId = arr.id;

      },
      /**
       * 确定修改文档类型
       */
      ok() {
        let _self = this;
        if (_self.selection == []) {
          this.$Message.info('请勾选相应数据');
          return
        }
        this.deleteFileParams.fileIds = this.selection;
        updateFileStyleDetail(this.deleteFileParams).then(res => {
          const data = res.data;
          if (data.code == 0) {
            this.$Message.info('操作成功');
          }
        })
          .catch(err => {
          });
      },
      cancel() {

      },
      /**
       * 搜索
       */
      handleSearch() {
        this.showAllFileList();
      },
      /**
       * 获取选择日期
       * @param arr
       */
      dateOnChange(arr) {
        const rangedate = arr;

        this.data.startDate = rangedate[0];
        if (rangedate[1] === undefined) {
          this.data.endDate = "";
        } else {
          this.data.endDate = rangedate[1];
        }
      },
      /**
       * 初始所有文件
       */
      showAllFileList() {
        showAllFile(this.data)
          .then(res => {
            const data = res.data;
            if (data.code == 0) {
              this.AllFileList = data.data;
              this.page = data.rdPage;
            }
          })
          .catch(err => {
          });
      }
    }
  }
</script>
<style scoped>
  .buttonarea {
    margin-top: 30px;
    margin-left: 35px;
  }

  .bodyarea {
    margin-left: 35px;
    margin-top: 40px;
  }
</style>
