<template>
  <div>

    <div class="bodyarea">
      <Row>
        <Form>
          <Col span="5">
          <FormItem label="文档类型:">
            <Input v-model="value4" icon="arrow-down-b" placeholder="文档类型" @on-click='dropmenu(!showMenu)'
                   style="width: 250px">
            </Input>
            <div v-if='showMenu' class="showmenubox">
              <Tree :data="docTree" :render="renderContent"></Tree>
            </div>

          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="发布时间：">
            <DatePicker format="yyyy-MM-dd HH:mm" type="daterange" size="large" placement="bottom-end"
                        placeholder="Select date" @on-change="dateOnChange" style="width: 250px"></DatePicker>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label=" 文件标题：">
            <Input v-model="dataParams.title" placeholder="" style="width: 250px"></Input>
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
        <Table border ref="selection" :columns="AllFileColumns" :data="AllFileList" stripe
               @on-selection-change="delFileAction"></Table>
        </Col>
      </Row>
      <Page :total="page.total"   :page-size-opts='pageOpts':current="page.current" :page-size="page.pageSize" show-sizer :show-total="true"
            @on-change="onPageChange" @on-page-size-change='onPageSizeChange'  class="table-page"></Page>
    </div>
    <Modal
      v-model="updateFileStyle"
      width="500"
      title="调整文件类型"
      @on-ok="ok"
      @on-cancel="cancel">
      <Tree :data="docTree" :render="renderContent1"></Tree>
      <!--@on-check-change="getCheckNode"-->
    </Modal>
    <Modal
      v-model="openDelWindow"
      width="500"
      title="删除文件"
      @on-ok="todelFile"
      @on-cancel="toDelCancel">
      <p>确定删除所选文件</p>
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
        showMenu: false,
        docTree: [],

        deleteFileParams: {
          fileIds: "",
          userId: 1
        },
        value4: "",
        updateFileParams: {
          fileIds: "",
          userId: 1,
          fileStyleId: ""
        },
        pageOpts:[10,20,30,40,50],
        dataParams: {
          current: 1,
          pageSize: 10,
          title: "",
          startDate: "",
          endDate: "",
          fileStyleId: ""
        },
        openDelWindow:false,
        updateFileStyle: false,
        selection: [],
        date: "",
        page: {},
        AllFileList: [],
      };
    },
    created() {
      this.showAllFileList();
      this.showDocTree();
    },
    methods: {
      renderContent(h, {root, node, data}) {
        return h('span',
          {
            style: {
              cursor: "pointer",
              marginLeft: "5px"
            },
            on: {
              click: () => {
                this.value4 = data.fileKindName;
                this.dataParams.fileStyleId = data.id;
                this.showMenu = false;
              }
            }
          },
          data.fileKindName)
      },

      renderContent1(h, {root, node, data}) {
        return h('span',
          {
            style: {
              cursor: "pointer",
              marginLeft: "5px"
            },
            on: {
              click: () => {
                this.updateFileParams.fileStyleId = data.id;
              }
            }
          },
          data.fileKindName)
      },
      dropmenu(isshow) {
        this.showMenu = isshow;
      },
      /**
       * 分页
       */
      onPageChange(value) {
        this.dataParams.current = value;
        this.showAllFileList();
      },
      onPageSizeChange(value){
        this.dataParams.pageSize=value;
        this.showAllFileList();
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
        this.updateFileParams.fileIds = fielIds;
        return fielIds
      },
      /**
       * 删除文件
       */
      todelFile() {
        // console.log("222解决"+this.selection)
        let _self = this;
//      console.info(_self.selection)
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
      toDelCancel(){
        this.deleteFileParams.fileIds="";
      },
      /**
       * 确定修改文档类型
       */
      ok() {
        if (this.updateFileParams.fileIds == "") {
          this.$Message.info('请勾选相应数据');
          return
        }
        this.updateFileParams.fileIds = this.selection;
        let _self = this;
        updateFileStyleDetail(this.updateFileParams).then(res => {
          const data = res.data;
          if (data.code == 0) {
            this.$Message.info('操作成功');
            _self.showAllFileList();
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
        this.dataParams.startDate = rangedate[0];
        if (rangedate[1] === undefined) {
          this.dataParams.endDate = "";
        } else {
          this.dataParams.endDate = rangedate[1];
        }
      },
      /**
       * 初始所有文件
       */
      showAllFileList() {
        showAllFile(this.dataParams)
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
    margin-left: 35px;
  }
  .bodyarea {
    margin-left: 30px;
    margin-top: 30px;
  }
</style>
