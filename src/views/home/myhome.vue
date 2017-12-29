<template>
  <div class="mycenter">
    <Card>
      <p slot="title"><span>我的消息</span><a class='rt' @click="changeRoute('mymessage')">查看更多&gt;&gt;</a></p>
      <div>
        <Table stripe :columns="columns1" class="myTable" :row-class-name='rowClassName' :data="MyMessageList"
               @on-row-click="onRowClick"></Table>
      </div>
    </Card>
    <br>
    <Card>
      <p slot="title"><span>最新上传</span><a class='rt' @click="changeRoute('allfiles')">查看更多&gt;&gt;</a></p>
      <div>
        <Table stripe :columns="columns2" class='myTable' :data="newMessageList"
               @on-row-click="showNewMessageList"></Table>
      </div>
    </Card>
    <Modal
      v-model="modal1"
      :mask-closable="false"
    >
      <div style='font-size: 16px;color:#444444;margin-top:10px;text-align: center'>{{mymessageDetail.MyMessageListTitle}}
      </div>
      <p style='text-align:center;color:#999999;font-size: 12px;margin-top:10px;'>发布时间：{{ mymessageDetail.MyMessageupdate}}&nbsp; &nbsp;发布人：{{
        mymessageDetail.AddUser}}&nbsp;&nbsp;已读人数：<strong style="color:red">{{mymessageDetail.readed
        }}</strong> 未读人数：<strong style="color:red">{{mymessageDetail.noreaded}}</strong></p>
      <p class="modal-content" style='color:#666666;margin-top:5px;margin-left:10px;margin-right:10px;'>{{mymessageDetail.MyMessageMsg}}</p>
    </Modal>
  </div>
</template>
<script>
import { showUserAd } from "../../api/all_interface";
import { showAdPcs } from "../../api/all_interface";
import { showUserLookFile } from "../../api/all_interface";
  import { readAd } from "../../api/all_interface";

export default {
  data() {
    return {
      //当前公告的详细信息
      mymessageDetail: {
        MyMessageListTitle: "",
        MyMessageupdate: "",
        AddUser: "",
        MyMessageMsg: "",
        readed: 0,
        noreaded: 0
      },
      MyMessageList: [],
      newMessageList: [],
      params: null,
      title: "",
      modal1: false,
      readAdParams:{
          userId:sessionStorage.getItem("userId"),
          commonId:""
        },
      data: {
        current: 1,
        pageSize: 5,
        userId: sessionStorage.getItem("userId")
      },
      newdata: {
        current: 1,
        pageSize: 10,
        userId: sessionStorage.getItem("userId"),
        userGroupId: sessionStorage.getItem("userGroupId")
      },
      columns1: [
        {
          title: "标题",
          key: "at"
        },
        {
          title: "发布时间",
          key: "re",
          sortType: "desc",
          align: "right"
        }
      ],
      columns2: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "发布时间",
          key: "addFileTime",
          sortType: "desc",
          align: "right"
        }
      ]
    };
  },
  mounted() {
    this.initUserAd();
    this.initUserLookFile();
  },
  methods: {
    changeRoute(name) {
      this.$router.push("/" + name);
    },
    onRowClick(row, index) {
      this.params = {
        commonId: row.commonId
      };
      this.readAdParams.commonId=row.commonId
       readAd(this.readAdParams).then(res => {
        const data = res.data;
        
        if (data.code == 0) {
          this.initUserAd()
        }
      });
      showAdPcs(this.params)
        .then(res => {
          const data = res.data;
          console.log(res.data);
          if (data.code == 0) {
            this.mymessageDetail.MyMessageListTitle = row.at;
            this.mymessageDetail.MyMessageupdate = row.re;
            this.mymessageDetail.AddUser = row.addUser;
            var reg = new RegExp("<br>", "g");
            this.mymessageDetail.MyMessageMsg = row.ad.replace(reg, "\n");
            this.mymessageDetail.readed = data.data.isRead;
            this.mymessageDetail.noreaded = data.data.noRead;
           
          }
        })
        .catch(err => {});
      this.modal1 = true;
      
    },
    showNewMessageList(row, index) {
      this.$router.push("/allfiles/check/" + row.id);
    },
    initUserLookFile() {
      showUserLookFile(this.newdata)
        .then(res => {
          const data = res.data;
          if (data.code == 0) {
            // console.log(this.MyMessageList)
            this.newMessageList = data.data;
            //console.log(this.newMessageList)
            this.page = data.rdPage;
            //console.log(data.rdPage)
          }
        })
        .catch(err => {});
    },
    initUserAd() {
      showUserAd(this.data)
        .then(res => {
          const data = res.data;
          if (data.code == 0) {
            this.MyMessageList = data.data;
          }
        })
        .catch(err => {});
    },
    rowClassName(row, index) {
      if (row.ifRead === 0) {
        return "demo-table-info-row";
      }
    }
  }
};
</script>
<style>
.ivu-table .demo-table-info-row td {
  color: #2d8cf0;
}
.myTable .ivu-table-body tr {
  cursor: pointer;
}
</style>
<style scoped>
.mycenter {
  padding: 20px;
}
</style>
