<template>
  <div>


    <div class="buttonarea">
      <Row>
        <Col span="1">
        <Button type="primary" size="large" @click="insertAd=true">添加</Button>
        </Col>
        <Col span="2">
        <Button type="primary" size="large" @click="toDelAd">删除</Button>
        </Col>
      </Row>
    </div>
    <div class="bodyarea">
      <Row>
        <Form>
          <Col span="4">
          <FormItem label=" 标题：">
            <Input v-model="params.title" placeholder="请输入标题名称" style="width: 200px"></Input>
          </FormItem>
          </Col>

          <Col span="6">
          <FormItem label="发送时间：">
            <DatePicker format="yyyy-MM-dd HH:mm" type="daterange" size="large" placement="bottom-end"
                        placeholder="Select date" @on-change="dateOnChange" style="width: 275px"></DatePicker>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem>
            <Select placeholder="请选择类型" style="width:200px">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="1">
          <Button type="primary" size="large" @click="handleSearch" style="width: 80px">查询</Button>
          </Col>
        </Form>
      </Row>
    </div>
    <div style="margin:40px">
      <Row class="table-top">
        <Col>
        <Table border ref="selection" :columns="AllAdColumns" :data="AllAdList" stripe
               @on-selection-change="delAdAction"></Table>
        </Col>
      </Row>
      <Page :total="page.total" :current="page.current" :page-size="page.pageSize" :show-total="true"
            @on-change="onPageChange" class="table-page"></Page>
    </div>


    <Modal
      v-model="insertAd"
      width="700"
      title="添加公告"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form ref="insertAdParams" :model="insertAdParams" :label-width="90">

        <FormItem prop="adStyle" label="类型：">
          <Select placeholder="请选择" :clearable="true" v-model="insertAdParams.adStyle">
            <Option value="">请选择类型</Option>
            <Option value="通知">通知</Option>
            <Option value="公告">公告</Option>
          </Select>
        </FormItem>
        <FormItem prop="" label="标题：">
          <Input type="text" :rows="4" placeholder="请输入标题！" v-model="insertAdParams.title"></Input>
        </FormItem>
        <FormItem prop="content" label="内容：">
          <Input type="textarea" :rows="4" placeholder="请输入内容！" v-model="insertAdParams.content"></Input>
        </FormItem>
        <FormItem prop="sendDepartmentName" label="接收人员：">
          <Input type="text" :rows="4" placeholder="" disabled v-model="insertAdParams.sendDepartmentName"></Input>
        </FormItem>

        <Button type="primary" size="small" @click="chooseUser=true">选择人员</Button>
      </Form>

    </Modal>
    <Modal
      v-model="chooseUser"
      width="700px"
      title="选择人员"
      @on-ok="ok"
      @on-cancel="cancel">
      <div class="clearfix">
        <Tree class="lf" :data="depTree" show-checkbox multiple :render="renderContent" @on-check-change="circleUser"></Tree>

        <div  class="user-detail rt">

          <Table border ref="circleAdUsers" :columns="showUserGroupColumns"  :data="showUserGroup"
                 @on-selection-change="" v-show="usershow"></Table>

        </div>
      </div>


    </Modal>
  </div>

</template>
<script>
  import {showAllAd} from "../../api/all_interface";
  import {deleteAd} from "../../api/all_interface";
  import {getDepTree} from "../../api/all_interface";
  import {queryUserByGroup} from "../../api/all_interface";

  export default {

    data() {
      return {
        showUserGroupColumns:[
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: "姓名",
            key:"username",
            width: 100,
          }],
        AllAdColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'

          },
          {
            title: "标题",
            key: "adTitle",
          },
          {
            title: "内容",
            key: "adContent",
          },
          {
            title: "发送人",
            key: "addUser",
          },
          {
            title: "发送部门",
            key: "sendObject",
          },
          {
            title: "发送时间",
            key: "sendTime",
            sortable: true
          },

          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看')])
            },
          }
        ],
        usershow:false,
        params: {
          current: 1,
          pageSize: 10,
          startDate: "",
          endDate: "",
          title: "",
          adStyle: ""
        },
        insertAdParams: {
          title: "",
          adStyle: "",
          content: "",
          sendDepartmentName: "",
          userId: 1,
        },
        insertAd: false,
        childData: [],

        depTree: [],
        chooseUser: false,
        delAdParams: {
          ids: ""
        },
        queryUserParams: {
          userGroupId: ""
        },
        showUserGroup:[],
        depTreeParams: {
          id: "",
          deptno: "",
          no: "",
          pid: "",
          type: "",
          checked: "",
          name: "",
          department: ""
        },
        page: {},
        ids: "",
        chooseObject: "",
        selection: [],
        circleAdUsers:[],
        AllAdList: []
      };
    },
    created() {
      this.showAllAdList();
      this.showDepTree();
    },
    methods: {
      onPageChange() {
        this.showAllAdList();
      },
      renderContent(h, {root, node, data}) {
        return h('span',


          data.name)

      },
      delAdAction(arr) {
        let fielIds = "";
        for (let i = 0; i < arr.length; i++) {
          if (i > 0) {
            fielIds += ","
          }
          fielIds += arr[i].id
        }
        this.delAdParams.ids = fielIds;
        return fielIds
      },
      circleUser(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children === null) {
           this.queryUserParams.userGroupId = arr[i].id;
            queryUserByGroup(this.queryUserParams).then(res => {
              const data = res.data;
              if (data.code == 0) {
                this.showUserGroup=data.data;
                this.usershow=true;
              }
            })
          }

        }
      },
      dateOnChange(arr) {
        const rangedate = arr;
        this.params.startDate = rangedate[0];
        if (rangedate[1] === undefined) {
          this.params.endDate = "";
        } else {
          this.params.endDate = rangedate[1];
        }
      },
      toDelAd() {
        if (this.delAdParams.ids == "") {
          this.$Message.info('没有选中相应数据!');
          return
        }
        else {
          let _self = this;
          deleteAd(this.delAdParams).then(res => {
            const data = res.data;
            if (data.code == 0) {
              this.$Message.info(data.msg);
              _self.showAllAdList();
            }
            else {
              this.$Message.info(data.msg);
            }
          }).catch(err => {
          });
        }
      },
      handleSearch() {
        this.showAllAdList();
      },
      ok() {
        // this.$Message.info('Clicked ok');
      },
      cancel() {
        //this.$Message.info('Clicked cancel');
      },
      showDepTree() {
        let _self = this
        getDepTree(_self.depTreeParams).then(res => {
          _self.depTree = res.data;
        })
      },
      showAllAdList() {
        showAllAd(this.params)
          .then(res => {
            const data = res.data;
            if (data.code == 0) {
              this.AllAdList = data.data;
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
.user-detail{

  }
</style>
