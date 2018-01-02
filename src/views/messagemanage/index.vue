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
            <DatePicker format="yyyy-MM-dd HH:mm:ss" type="daterange" size="large" placement="bottom-end"
                        placeholder="请选择时间" @on-change="dateOnChange" style="width: 250px"></DatePicker>
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
        <Table class="myTable" border ref="selection" :columns="AllAdColumns" @on-sort-change="recSortType" :data="AllAdList" stripe
               @on-selection-change="delAdAction" @on-row-click="showAdDetail"></Table>
        </Col>
      </Row>
      <Page :total="page.total" :page-size-opts='pageOpts' show-sizer show-elevator :current="page.current"
            :page-size="page.pageSize"
            :show-total="true"
            @on-change="onPageChange" @on-page-size-change='onPageSizeChange' class="table-page"></Page>
    </div>
    <Modal
      v-model="insertAd"
      width="700"
      title="添加公告"
      @on-ok="sureSend"
      @on-cancel="sureSubmit">
      <Form :rules="ruleValidate" ref='formValidate' :model="insertAdParams" :label-width="90">
        <FormItem prop="adStyle" label="类型：">
          <Select placeholder="请选择" :clearable="true" v-model="insertAdParams.adStyle">
            <Option value="">请选择类型</Option>
            <Option value="通知">通知</Option>
            <Option value="公告">公告</Option>
            <Option value="温馨提示">温馨提示</Option>
          </Select>
        </FormItem>
        <FormItem prop="title" label="标题：">
          <Input type="text" :rows="4" placeholder="请输入标题！" :maxlength="20" v-model="insertAdParams.title"></Input>
        </FormItem>
        <FormItem prop="content" label="内容：">
          <Input type="textarea" :rows="4" placeholder="请输入内容！" :maxlength="500"
                 v-model="insertAdParams.content"></Input>
        </FormItem>
        <FormItem prop="sendDepartmentName" label="接收人员：">
          <Input type="textarea" :rows="4" placeholder="请点击下方按钮选择人员" disabled
                 v-model="insertAdParams.sendDepartmentName"></Input>
        </FormItem>

        <Button type="primary" size="small" @click="chooseUser=true">选择人员</Button>
      </Form>
    </Modal>
    <Modal
      v-model="chooseUser"
      width="700px"
      title="选择人员"
      :closable="false"
      @on-cancel="cancel">
      <div class="clearfix" style="height:600px;overflow: scroll">
        <Tree class="lf" :data="depTree" show-checkbox multiple :render="renderContent"
              @on-check-change="circleUser"></Tree>
        <div class="user-detail rt">
        </div>
      </div>
    </Modal>

    <Modal
      v-model="isSubmit"
      width="500px"
      title="是否保存"
      :closable="false"
      @on-cancel="cancelSubmit">
      <p style="text-align: center;font-size: 16px">是否保存此次编辑？</p>
    </Modal>
    <Modal
      v-model="deleteofcourse"
      title="删除公告"
      @on-ok="sureDelete"
      :closable="false"
      @on-cancel="cancel">
      <p style="font-size: 18px;text-align: center">确定删除所选公告？</p>
    </Modal>
    <Modal
      title=""
      v-model="modal1"
      :mask-closable="false"
      :closable="false"
      width="700"
    >
      <p style="font-size: 16px;color:#444444;margin-top:10px;text-align: center">{{singleMessageDetail.AdTitle}}</p>
      <p style='text-align:center;color:#999999;font-size: 12px;margin-top:10px;'>发布时间：{{ singleMessageDetail.addTime}}&nbsp; &nbsp;发布人：{{
        singleMessageDetail.AddUser}}&nbsp;&nbsp;已读人：<strong
          style="color:red">{{singleMessageDetail.readed }}</strong>&nbsp;&nbsp;未读人：<strong
          style="color:red">{{singleMessageDetail.noreaded}}</strong>
      <p class="modal-content" style="color:#666666;margin-top:5px;margin-left:10px;margin-right:10px;">
        {{singleMessageDetail.Content }}
      </p>
    </Modal>
  </div>
</template>
<script>
import { showAllAd } from "../../api/all_interface";
import { deleteAd } from "../../api/all_interface";
import { getDepTree } from "../../api/all_interface";
import { queryUserByGroup } from "../../api/all_interface";
import { showAdPcs } from "../../api/all_interface";
import { insertAd } from "../../api/all_interface";
import { sendAdToUser } from "../../api/all_interface";

export default {
  data() {
    return {
      AllAdColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "标题",
          key: "adTitle"
        },
        {
          title: "公告类型",
          key: "adStyle"
        },
        {
          title: "发送人",
          key: "addUser"
        },
        {
          title: "接收人员",
          key: "sendObject",
          ellipsis: true
        },
        {
          title: "发送时间",
          key: "sendTime",
          sortable: "custom",
          sortType: ""
        }
      ],
      usershow: false,
      params: {
        current: 1,
        pageSize: 20,
        startDate: "",
        endDate: "",
        title: "",
        adStyle: "",
        sortType: "desc"
      },

      deleteofcourse: false,
      singleMessageDetail: {
        AdTitle: "",
        addTime: "",
        AddUser: "",
        Content: "",
        readed: 0,
        noreaded: 0
      },
      insertAdParams: {
        title: "",
        adStyle: "",
        content: "",
        sendDepartmentName: "",
        userId: sessionStorage.getItem("userId")
      },
      modal1: false,
      isSubmit: false,
      insertAd: false,
      sendAdParams: {
        userIds: "",
        commonId: ""
      },
      pageOpts: [10, 20, 30, 40, 50],
      depTree: [],
      chooseUser: false,
      delAdParams: {
        ids: ""
      },
      ruleValidate: {
        title: [
          { required: true, message: "请填写公告标题", trigger: "blur" },
          { type: "string", max: 20, message: "标题限制在20字以内" }
        ],
        content: [
          { required: true, message: "请填写公告内容", trigger: "blur" },
          { type: "string", max: 500, message: "内容限制在500字以内" }
        ]
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
        commonId: ""
      },
      page: {},
      ids: "",
      selection: [],
      AllAdList: []
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
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            width: "52px"
          }
        },
        data.name
      );
    },
    sureSubmit() {
      this.isSubmit = true;
    },
    cancelSubmit() {
      this.insertAdParams.title = "";
      this.insertAdParams.content = "";
      this.insertAdParams.sendDepartmentName = "";
      this.insertAdParams.adStyle = "";
      this.sendAdParams.userIds = "";
      this.sendAdParams.commonId = "";
      this.showDepTree();
    },
    delAdAction(arr) {
      let fielIds = "";
      for (let i = 0; i < arr.length; i++) {
        if (i > 0) {
          fielIds += ",";
        }
        fielIds += arr[i].id;
      }
      this.delAdParams.ids = fielIds;
      return fielIds;
    },
    showAdDetail(row, index) {
      this.showAdParams = {
        commonId: row.id
      };
      showAdPcs(this.showAdParams)
        .then(res => {
          const data = res.data;
          if (data.code == 0) {
            this.singleMessageDetail.AdTitle = row.adTitle;
            this.singleMessageDetail.addTime = row.sendTime;
            this.singleMessageDetail.AddUser = row.addUser;
            var reg = new RegExp("<br>", "g");
            this.singleMessageDetail.Content = row.adContent.replace(reg, "\n");
            this.singleMessageDetail.readed = data.data.isRead;
            this.singleMessageDetail.noreaded = data.data.noRead;
          } else {
            this.$Message.warning("网络异常！");
          }
        })
        .catch(err => {});
      this.modal1 = true;
    },
    recSortType(order) {
      this.params.sortType = order.order;
      this.showAllAdList();
    },
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
          userIds += arr[i].userId;
        }
      }

      this.sendAdParams.userIds = userIds;
      if (departmentName.length > 1000) {
        departmentName = "全公司";
      }
      this.insertAdParams.sendDepartmentName = departmentName;
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
        this.$Message.warning("没有选中相应数据!");
        return;
      }
      this.deleteofcourse = true;
    },
    sureDelete() {
      deleteAd(this.delAdParams)
        .then(res => {
          const data = res.data;
          if (data.code == 0) {
            this.$Message.info(data.msg);
            this.showAllAdList();
          } else {
            this.$Message.info(data.msg);
          }
        })
        .catch(err => {});
    },
    handleSearch() {
      console.info(this.params);
      this.showAllAdList();
    },
    sureSend() {
      if (this.insertAdParams.title == "") {
        this.$Message.warning("标题不能为空！");
        return;
      }
      if (this.insertAdParams.adStyle == "") {
        this.$Message.warning("公告类型不能为空！");
        return;
      }
      if (this.insertAdParams.content == "") {
        this.$Message.warning("内容不能为空！");
        return;
      }
      if (this.insertAdParams.sendDepartmentName == "") {
        this.$Message.warning("发送对象不能为空！");
        return;
      }
      let newcontent = this.insertAdParams.content.replace(/\n|\r\n/g, "<br>");
      this.insertAdParams.content = newcontent;
      insertAd(this.insertAdParams)
        .then(res => {
          const data = res.data;
          let _self = this;
          if (data.code == 0) {
            _self.sendAdParams.commonId = data.data;
            sendAdToUser(_self.sendAdParams).then(res => {
              const data = res.data;
              if (data.code == 0) {
                this.$Message.success("操作成功!");
                this.insertAd = false;
                this.insertAdParams.title = "";
                this.insertAdParams.content = "";
                this.insertAdParams.sendDepartmentName = "";
                this.insertAdParams.adStyle = "";
                this.sendAdParams.userIds = "";
                this.sendAdParams.commonId = "";
                this.showDepTree();
                this.showAllAdList();
              }
            });
          }
        })
        .catch(err => {});
    },
    cancel() {
      this.insertAdParams.sendDepartmentName = "";
      this.sendAdParams.userIds = "";
    },
    showDepTree() {
      let _self = this;
      getDepTree(_self.depTreeParams).then(res => {
        _self.depTree = res.data;
      });
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
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.myTable .demo-table-info-row td {
  color: red;
}

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

<style>
.ivu-select-single .ivu-select-selection {
  width: 100% !important;
}
</style>
