<template>
  <div>
    <div class="bodyarea">
      <Row>
        <Form>
          <Col span="5">
          <FormItem label=" 标题：">
            <Input v-model="params.title" placeholder="请输入标题名称" style="width: 250px"></Input>
          </FormItem>
          </Col>

          <Col span="5">
          <FormItem label="发送时间：">
            <DatePicker format="yyyy-MM-dd HH:mm" type="daterange" size="large" placement="bottom-end"
                        placeholder="Select date" @on-change="dateOnChange" style="width: 250px"></DatePicker>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem>
            <Select placeholder="请选择公告类型" style="width:250px" v-model="params.adStyle">
              <Option value="">请选择类型</Option>
              <Option value="通知">通知</Option>
              <Option value="公告">公告</Option>
              <Option value="温馨提示">温馨提示</Option>
            </Select>

          </FormItem>
          </Col>
          </Col>
          <Col span="1">
          <Button type="primary" size="large" @click="handleSearch" style="width: 80px">查询</Button>
          </FormItem>
          </Col>


        </Form>
      </Row>
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
    </div>
    <div style="margin:40px">
      <Row class="table-top">
        <Col>
        <Table border ref="selection" :columns="AllAdColumns" :data="AllAdList" stripe
               @on-selection-change="delAdAction" @on-row-click="showAdDetail"></Table>
        </Col>
      </Row>
      <Page :total="page.total" :page-size-opts='pageOpts' show-sizer :current="page.current" :page-size="page.pageSize"
            :show-total="true"
            @on-change="onPageChange" @on-page-size-change='onPageSizeChange' class="table-page"></Page>
    </div>


    <Modal
      v-model="insertAd"
      width="700"
      title="添加公告"
      @on-ok="sureSend"
      @on-cancel="cancel">
      <Form ref="insertAdParams" :model="insertAdParams" :label-width="90">

        <FormItem prop="adStyle" label="类型：">
          <Select placeholder="请选择" :clearable="true" v-model="insertAdParams.adStyle">
            <Option value="">请选择类型</Option>
            <Option value="通知">通知</Option>
            <Option value="公告">公告</Option>
            <Option value="温馨提示">温馨提示</Option>
          </Select>
        </FormItem>
        <FormItem prop="" label="标题：">
          <Input type="text" :rows="4" placeholder="请输入标题！" v-model="insertAdParams.title"></Input>
        </FormItem>
        <FormItem prop="content" label="内容：">
          <Input type="textarea" :rows="4" placeholder="请输入内容！" v-model="insertAdParams.content"></Input>
        </FormItem>
        <FormItem prop="sendDepartmentName" label="接收人员：">
          <Input type="textarea" :rows="4" placeholder="请点击下方按钮选择人员" disabled
                 v-model="insertAdParams.sendDepartmentName"></Input>
        </FormItem>

        <Button type="primary" size="small" @click="chooseUser=true">选择人员</Button>

        <!--<Button type="primary" size="large" @click="sureSend">确定发送</Button>-->
      </Form>

    </Modal>
    <Modal
      v-model="chooseUser"
      width="700px"
      title="选择人员"
      @on-ok="ok"
      @on-cancel="cancel">
      <div class="clearfix" style="height:600px;overflow: scroll">
        <Tree class="lf" :data="depTree" show-checkbox multiple :render="renderContent"
              @on-check-change="circleUser"></Tree>
        <!--<Tree class="lf" :data="depTree" show-checkbox multiple :render="renderContent"></Tree>-->
        <div class="user-detail rt">

          <!--<Table border ref="circleAdUsers" :columns="showUserGroupColumns" :data="showUserGroup"-->
          <!--@on-selection-change="chooseSingleUser" v-show="usershow"></Table>-->
        </div>
        <!--<div class="clearup">-->
        <!--<Button type="primary" size="large" @click="">确定所勾选人员</Button>-->
        <!--</div>-->
      </div>
    </Modal>

    <Modal
      title=""
      v-model="modal1"
      :mask-closable="false"
    >
      <p style="font-size: 30px;margin;text-align: center">{{singleMessageDetail.AdTitle}}</p>
      <p style='text-align:center'>发布时间：{{ singleMessageDetail.addTime}}&nbsp; &nbsp;发布人：{{
        singleMessageDetail.AddUser}}&nbsp;&nbsp;已读人：<strong
          style="color:red">{{singleMessageDetail.readed }}</strong>&nbsp;&nbsp;未读人：<strong
          style="color:red">{{singleMessageDetail.noreaded}}</strong></p>
      <p class="modal-content" style='color:#333;text-align: center;margin-top:30px;'>
        {{singleMessageDetail.Content}}</p>
    </Modal>
  </div>
</template>
<script>
  import {showAllAd} from "../../api/all_interface";
  import {deleteAd} from "../../api/all_interface";
  import {getDepTree} from "../../api/all_interface";
  import {queryUserByGroup} from "../../api/all_interface";
  import {showAdPcs} from "../../api/all_interface";
  import {insertAd} from "../../api/all_interface";
  import {sendAdToUser} from "../../api/all_interface";

  export default {
    data() {
      return {
//        showUserGroupColumns: [
//          {
//            type: 'selection',
//            width: 60,
//            align: 'center'
//          },
//          {
//            title: "姓名",
//            key: "username",
//            width: 100,
//          }],
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
            title: "公告类型",
            key: "adStyle",
          },
          {
            title: "发送人",
            key: "addUser",
          },
          {
            title: "发送人员",
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
                      this.modal1 = true;
                    }
                  }
                }, '查看')])
            },
          }
        ],
        usershow: false,
        params: {
          current: 1,
          pageSize: 10,
          startDate: "",
          endDate: "",
          title: "",
          adStyle: ""
        },
        singleMessageDetail: {
          AdTitle: '',
          addTime: '',
          AddUser: '',
          Content: '',
          readed: 0,
          noreaded: 0
        },
        insertAdParams: {
          title: "",
          adStyle: "",
          content: "",
          sendDepartmentName: "",
          userId: 1,
        },
        modal1: false,
        insertAd: false,
        childData: [],
        sendAdParams: {
          userIds: "",
          commonId: "",
        },
        pageOpts: [10, 20, 30, 40, 50],
        depTree: [],
        chooseUser: false,
        delAdParams: {
          ids: ""
        },
        queryUserParams: {
          userGroupId: ""
        },
        showUserGroup: [],
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
        showAdParams: {
          commonId: "",
        },
        readAdParams: {
          commonId: "",
          userId: sessionStorage.getItem("userId"),
        },
        page: {},
        ids: "",
        chooseObject: "",
        selection: [],
        circleAdUsers: [],
        AllAdList: [],
        CircleUserIds: [],
        CircleUserNames: [],
      };
    },
    created() {
      this.showAllAdList();
      this.showDepTree();
    },
    methods: {
      onPageChange(value) {
        this.params.current = value;
        this.showAllAdList();
      },
      onPageSizeChange(value) {
        this.params.pageSize = value;
        this.showAllAdList();
      },
      renderContent(h, {root, node, data}) {
        return h('span', {
            style: {
              width: '52px'
            },
          },
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
      showAdDetail(row, index) {
        this.showAdParams = {
          commonId: row.id,
        };
//      console.info(this.showAdParams.commonId)
        showAdPcs(this.showAdParams).then(
          res => {
            const data = res.data;
            // console.log(res.data);
            if (data.code == 0) {
              console.info("hjhjhj");
              console.info(row);
              this.singleMessageDetail.AdTitle = row.adTitle;
              this.singleMessageDetail.addTime = row.sendTime;
              this.singleMessageDetail.AddUser = row.addUser;
              this.singleMessageDetail.Content = row.adContent;
              this.singleMessageDetail.readed = data.data.isRead;
              this.singleMessageDetail.noreaded = data.data.noRead;
            }
            else {
              this.$Message.warning("网络异常！");
            }
          }
        ).catch(err => {
        });
        this.modal1 = true;
      },
//      chooseSingleUser(arr) {
//        let userIds = "";
//        let userNames = "";
//        for (let i = 0; i < arr.length; i++) {
//          if (i > 0) {
//            userIds += ",";
//            userNames += ",";
//          }
//          userIds += arr[i].id;
//          userNames += arr[i].username;
//        }
//        this.insertAdParams.sendDepartmentName = userNames;
//        this.sendAdParams.userIds = userIds;
//      },
      circleUser(arr) {
        let departmentName = "";
        let userIds = "";
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children == null) {
            if (i > 0) {
              departmentName += ",";
              userIds += ",";
            }
            departmentName += arr[i].name;
            userIds += arr[i].id;
          }
        }
        this.sendAdParams.userIds = userIds;
        if (departmentName.length > 1000) {
          departmentName = "全公司";
        }
        this.insertAdParams.sendDepartmentName = departmentName;
      },
//      circleUser(arr) {
//        // console.log('circleUser:', arguments)
//        let fetchs = []
//        let departmentName = "";
//        let groupIds="";
//        for (let i = 0; i < arr.length; i++) {
//          if (arr[i].children === null) {
//            let o = {
//              userGroupId: arr[i].id
//            }
//            if(i>0){
//              departmentName + =",";
//              groupIds +=",";
//            }
//            departmentName += arr[i].name;
//            groupIds+=arr[i].id;
//            this.sendAdParams.groupIds=groupIds;
//            fetchs.push(queryUserByGroup(o))
//          }
//        }
//        this.insertAdParams.sendDepartmentName = departmentName;
//        Promise.all(fetchs).then(ret => {
//          let tmpa = []
//          ret.forEach(item => {
//            // console.log('item:', item)
//            tmpa = [...tmpa, ...item.data.data]
//          })
//          this.showUserGroup = tmpa;
//          this.usershow = true;
//        })
//      },
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
          this.$Message.warning('没有选中相应数据!');
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
        console.info(this.params);
        this.showAllAdList();
      },
      sureSend() {
        if (this.insertAdParams.title == "") {
          this.$Message.warning("标题不能为空！");
          return
        }

        if (this.insertAdParams.adStyle == "") {
          this.$Message.warning("公告类型不能为空！");
          return
        }
        if (this.insertAdParams.content == "") {
          this.$Message.warning("内容不能为空！");
          return
        }
        if (this.insertAdParams.sendDepartmentName == "") {
          this.$Message.warning("发送对象不能为空！");
          return
        }
        insertAd(this.insertAdParams).then(res => {
          const data = res.data;
          let _self = this;
          if (data.code == 0) {
            _self.sendAdParams.commonId = data.data;
            console.info(_self.sendAdParams);

            sendAdToUser(_self.sendAdParams).then(res => {
                const data = res.data;
                console.info(data);
                if (data.code === 0) {
                  _self.$Message.success("操作成功!");
                  _self.insertAd = false;
                  _self.showAllAdList();
                }
              }
            )
          }
        })
          .catch(err => {
          });
      },
      ok() {
      },
      cancel() {
        this.insertAdParams.sendDepartmentName = "";
        this.sendAdParams.userIds = "";
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
      },
    }
  }
</script>
<style scoped>
  .buttonarea {

    margin-left: 20px;
  }

  .bodyarea {
    margin-left: 30px;
    margin-top: 30px;
  }

  .user-detail {
  }
</style>
