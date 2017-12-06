<template>
  <div>
    这是文档管理页面
    <div class="buttonarea">
      <Row>
        <Col span="2">
        <Button type="primary" size="large">调整文件类型</Button>
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
      <Page :total="page.total" :current="page.current" :page-size="page.pageSize" :show-total="true"
            @on-change="onPageChange" class="table-page"></Page>
    </div>
  </div>
</template>
<script>
  import {showAllFile} from "../../api/all_interface";
  import {deleteFile} from "../../api/all_interface";

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
        deleteFileParams: {
          fileIds: "",
          userId: 1
        },
        data: {
          current: 1,
          pageSize: 10,
          title: "",
          startDate: "",
          endDate: "",
          fileStyleId: ""
        },
        selection: [],
        date: "",
        page: {},
        AllFileList: [],

      };

    },
    created() {
      this.showAllFileList();
    },
    methods: {
      onPageChange() {
//        this.params.current = value;
        this.showAllFileList();
      },

      delFileAction(arr) {
        console.log('arr:',arr)
        let fielIds = "";
        for (let i = 0; i < arr.length; i++) {
          if (i > 0) {
            fielIds += ","
          }
          fielIds += arr[i].id
//          console.log(id)
        }
        this.selection = fielIds
        return fielIds
      },
      todelFile() {
//        console.log('selection:',this.$refs['selection'])
//        return
        this.deleteFileParams.fileIds = this.selection;
        deleteFile(this.deleteFileParams)
          .then(res => {
            const data = res.data;
            if (data.code == 0) {

            }
          })
          .catch(err => {
          });
      },

      handleSearch() {
        this.showAllFileList();
      },
      dateOnChange(arr) {
        const rangedate = arr;
        console.log(rangedate);
        this.data.startDate = rangedate[0];
        if (rangedate[1] === undefined) {
          this.data.endDate = "";
        } else {
          this.data.endDate = rangedate[1];
        }
      },
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
