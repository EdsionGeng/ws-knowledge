<template>
  <div>
    <div class="body-area">
      <Form :rules="ruleValidate" label-position="right" :label-width="100" :model='uploadForm' ref='formValidate'>
        <FormItem label=" 文件标题：" prop="title">
          <Input v-model="uploadForm.title" style="width: 200px;color:#333" disabled></Input>
        </FormItem>
        <FormItem label="文档类型：" prop="value">
          <docTree :myvalue='uploadForm'></docTree>
        </FormItem>
        <FormItem label="封面：">
          <div style='width:450px;' class="picUpload">
            <Upload
              ref="upload"
              :show-upload-list="false"
              :before-upload='pichandleBeforeUpload'
              :format="['jpg','jpeg','png']"
              :on-exceeded-size="pichandleMaxSize"
              :max-size="2048"
              :on-format-error="pichandleFormatError"
              :on-success="pichandleSuccess"
              :action="uploadurl">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件封面 <br><span style='color:#bbb'>(建议宽高比例10:9)</span></Button>
            </Upload>
             <Row 
                v-if='picuploadList.length!==0' v-for='(item,index) in picuploadList' :key='index' style='padding:3px 0;width:450px;margin-left:5px;'>
                <Icon type="image" style='margin-right:8px;color:#009DD9;'></Icon>
                <span>                  
                      <a @click.prevent="picViewModel=true" :href="baseurl+uploadForm.photourl">{{item.name}} </a>
                </span>
                <Button type="text" size="small" @click="pichandRemove(item)">
                    <Icon type="android-cancel" ></Icon>
                </Button>
            </Row>
          </div>
        </FormItem>
        <FormItem label="内容：" prop='content'>
          <div class="hello">
            <!-- <Ueditor :ueditorContent='uploadForm'></Ueditor> -->
             <div id="editorElem1" style="text-align:left;width:900px"></div>
          </div>
        </FormItem>
        <FormItem label="上传附件：">
          <div class="uploadBtn">
            <Button type="primary" size="small" @click="uploadDoc=true">上传附件</Button>
          </div>
       <Row v-for='(item,index) in fujainList' :key='index'>
             <i class="iconfont  icon-fujian" style='margin-right:8px;color:#009DD9;'>
            </i>
                <a  target="_blank" :href="baseurl+item.url">
                  <span >{{item.name}} 
                  </span>
                  <span style='color:#ccc;margin-left:5px;'>
                    ({{parseInt((item.size)/1024)+'k'}})       
              </span>
                </a>       
            <span style='padding-left:15px;color:#ccc'>描述：{{item.description}}</span>
            <Button type="text" size="small" @click="handleRemove(item)">
              <Icon type="android-cancel" ></Icon>
            </Button>
          </Row>
        </FormItem>
        <FormItem label="权限设置：" prop='power'>
          <Tabs value="name1" type='card' class='newfileTab' style="width:900px;" @on-click='changeTab'>
            <TabPane label="可查阅人员" name="name1">
              <div>
                <Tree :data="depTree" show-checkbox multiple :render="renderContentDep"
                      @on-check-change='chooseCheckPeople'></Tree>
              </div>
            </TabPane>
            <TabPane label="可编辑人员" name="name2">
              <div>
                <Tree :data="editdepTree" show-checkbox multiple :render="renderContentDep"
                      @on-check-change='chooseEditPeople'>>
                </Tree>
              </div>
            </TabPane>
            <TabPane label="可删除人员" name="name3">
              <div>
                <Tree :data="deldepTree" show-checkbox multiple :render="renderContentDep"
                      @on-check-change='chooseDelPeople'> >
                </Tree>
              </div>
            </TabPane>
          </Tabs>
        </FormItem>
        <FormItem  style='margin-bottom:80px;'>
          <RadioGroup v-model="uploadForm.fileType">
            <Radio label="0">普通文件</Radio>
            <Radio label="1">部门文件</Radio>
            <Radio label="2">公司文件</Radio>
          </RadioGroup>
          <div v-if="uploadForm.fileType=='0'">
            仅当前设置的查阅人员可以查看此文件，新入职的人员看不到，如果需要设置某一新入职人员查看该文件，可通过修改查阅人员实现
          </div>
          <div v-if="uploadForm.fileType=='1'">
            当前可查阅人员对应的部门有新入职的人员均能看到此文件
          </div>
          <div v-if="uploadForm.fileType=='2'">
            公司有新入职的人员均能看到此文件
          </div>
        </FormItem>
        <FormItem label=""  class="absolute-position" >
          <Button type='primary'  style='margin-bottom:6px;' size='large' @click="handleSubmit()" :loading="submitLoading">{{submitText}}</Button>
        </FormItem>
      </Form>
    </div>
    <Modal
      v-model="uploadDoc"
      width="400"
      @on-ok='docupload'
      title="选择附件">
      <Form>
        <FormItem label="">
          <Upload
            ref="fujianupload"
            :show-upload-list="true"
            multiple  
            :before-upload="handleBeforeUpload"
            :on-success="handleSuccess"
            :action="uploadurl">
            <Button type="ghost" icon="ios-cloud-upload-outline">附件上传</Button>
          </Upload>
        </FormItem>
        <FormItem label=" 文件描述：">
          <Input v-model="uploadDescription"  style="width: 200px" placeholder='描述内容' @on-enter.prevent='docupload'></Input>
        </FormItem>
      </Form>
    </Modal>
      <Modal
       v-model="picViewModel"
        width="500"
        :closable='false'
        cancel-text=''
      >
        <p slot="footer" style="height:0;line-height:0">
        </p>
      <img style='width:100%;height:100%;' :src="baseurl+uploadForm.photourl" alt="">
    </Modal>
  </div>
</template>
<script>
import docTree from "@/components/common/docTree";
import { getDepTree } from "../../api/all_interface";
import { updateFile } from "../../api/all_interface";
import { lookFileUser } from "../../api/all_interface";
import { updateFilePermission } from "../../api/all_interface";
import { deleteFilePermission } from "../../api/all_interface";
import { showusermission } from "../../api/all_interface";
import { getFileDetail } from "../../api/all_interface";
import { queryadmin } from "../../api/all_interface";
import { getUploadUrl } from "../../utils/commonurl";
import { getRequestUrl } from "../../utils/commonurl";
import Vue from "vue";
var E = require("wangeditor");
export default {
  data() {
    return {
      baseurl: "",
      uploadurl: "",
      picViewModel: false,
      picuploadList: [],
      userLookIds: "",
      chooseuserLookIds: "",
      uploadDescription: "",
      showusermissionIdArry: [],
      submitText: "确认修改",
      submitLoading: false,
      chooseUser: false,
      insertFileList: {},
      fileDetailParams: {
        fileId: this.$route.params.id
      },
      uploadForm: {
        userId: sessionStorage.getItem("userId"),
        fileType: "0",
        title: "",
        id: "",
        fileId: "",
        content: "",
        fileurl: "",
        photourl: "",
        describle: "",
        filesize: "",
        value: ""
      },
      updateFileList: {},
      fujainList: [],
      ruleValidate: {
        title: [{ required: true }],
        value: [{ required: true, message: "请选择文档类型" }],
        content: [{ required: true }],
        power: [{ required: true }]
      },
      fileDetails: null,
      showusermissionParams: {
        fileId: this.$route.params.id
      },
      lookFileParams: {
        userIds: "",
        fileId: this.$route.params.id,
        operationStyleId: 1
      },
      updateFileParams: {
        userIds: "",
        operationStyleId: 1,
        fileId: this.$route.params.id
      },
      deleteFileParams: {
        userIds: "",
        operationStyleId: 1,
        fileId: this.$route.params.id
      },
      userUpdateIds: "",
      userDeleteIds: "",
      fileDetailUrl: [],
      fileDetailSize: [],
      fileDetaildescible: [],
      loadingStatus: false,
      fileloadingStatus: false,
      // 编辑是根据查看人员进行筛选的
      depTree: [],
      editdepTree: [],
      deldepTree: [],
      adminIds: "",
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
      uploadDoc: false,
      editorContent: ""
    };
  },
  components: {
    docTree
  },
  mounted() {
    this.uploadurl = getUploadUrl();
    this.baseurl = getRequestUrl();
    this.picuploadList = this.$refs.upload.fileList;
    // 根据文件详情显示
    this.initFileDetail();
    this.adminPower();
    this.getUserMission();
  },

  methods: {
    // 创建了editor
    createdEditor() {
      var editor = new E("#editorElem1");
      this.editorContent = this.uploadForm.content;
      editor.customConfig.onchange = html => {
        this.editorContent = html;
      };
      editor.customConfig.zIndex = 100;
      editor.customConfig.showLinkImg = false;
      editor.customConfig.uploadImgHeaders = {
        Accept: "multipart/form-data"
      };
      editor.customConfig.uploadImgServer = this.uploadurl;
      editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        // 'image',  // 插入图片
        "table", // 表格
        // 'video',  // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      editor.create();
      editor.txt.html(this.uploadForm.content);
    },
    // 切换路由触发是否选择可查阅人员
    changeTab(name) {
      if (name == "name2" || name == "name3") {
        if (this.chooseuserLookIds === "") {
          this.$Message.error("请先选择可查阅的人员");
          return;
        }
      }
    },
    // 得到用户权限
    getUserMission() {
      showusermission(this.fileDetailParams).then(res => {
        console.log("用户权限", res.data);
        if (res.data.code == 0) {
          const data = res.data.data;
          this.showusermissionIdArry = data;
          this.lookFileParams.userIds = data[0].join(",");
          this.updateFileParams.userIds = data[1].join(",");
          this.deleteFileParams.userIds = data[2].join(",");
          this.chooseuserLookIds = data[0].join(",");
          this.userLookIds = data[0].join(",");
          this.userUpdateIds = data[1].join(",");
          this.userDeleteIds = data[2].join(",");
          console.log(this.userLookIds);
          this.showDepTree();
          this.showeditDepTree();
          this.showdelDepTree();
        }
      });
    },
    // 根据id选树形的checked
    selectDate(ids, data) {
      function funSelect(data, ids) {
        for (let val of data) {
          const dataId = parseInt(val.userId);
          if (ids.indexOf(dataId) !== -1) {
            val.checked = true;
          }
          if (val.children !== null) {
            funSelect(val.children, ids);
          }
        }
      }
      funSelect(data, ids);
    },
    //得到editor的内容
    getEditorContent() {
      this.uploadForm.content = this.editorContent;
    },
    // 根据文件详情显示
    initFileDetail() {
      getFileDetail(this.fileDetailParams)
        .then(res => {
          console.log("文件详情", res.data);
          if (res.data.code == 0) {
            this.fileDetails = res.data.data;
            this.uploadForm.id = this.fileDetails.fileStyleId;
            this.uploadForm.title = this.fileDetails.title;
            this.uploadForm.content = this.fileDetails.fileContent;
            this.uploadForm.fileId = this.fileDetails.id;
            this.uploadForm.photourl = this.fileDetails.photoUrl;

            if (this.uploadForm.photourl !== "") {
              let picUploadDetails = {
                name: this.uploadForm.photourl.slice(15),
                url: this.uploadForm.photourl
              };
              this.$refs.upload.fileList.push(picUploadDetails);
            }
            this.uploadForm.filesize = this.fileDetails.fileSize;
            if (this.fileDetails.fileUrl !== "") {
              this.uploadForm.fileurl = this.fileDetails.fileUrl;
              this.uploadForm.describle = this.fileDetails.enclosureInfo;
            }
            this.uploadForm.value = this.fileDetails.fileStyle;
            this.uploadForm.fileType = this.fileDetails.fileSpecies;
            if (this.uploadForm.fileurl !== "") {
              this.fileDetailUrl = this.fileDetails.fileUrl.split(",");
              this.fileDetailSize = this.fileDetails.fileSize.split(",");
              this.fileDetaildescible = this.fileDetails.enclosureInfo.split(
                ","
              );
              this.fujainList = [];
              for (let i = 0; i < this.fileDetailUrl.length; i++) {
                let fujainDetail = {};
                fujainDetail.size = parseInt(this.fileDetailSize[i]);
                fujainDetail.name = this.fileDetailUrl[i].slice(15);
                fujainDetail.url = this.fileDetailUrl[i];
                fujainDetail.description = this.fileDetaildescible[i];
                this.fujainList.push(fujainDetail);
              }
            } else {
              this.fujainList = [];
            }
            console.log("初始化后的uploform", this.uploadForm);
            console.log("初始化后的uploform", this.fujainList);
            this.createdEditor();
          }
        })
        .catch(err => {});
    },
    // 移除pic
    pichandRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.picuploadList.splice(fileList.indexOf(file), 1);
    },
    // 移除附件
    handleRemove(file) {
      const fileList = this.fujainList;
      this.fujainList.splice(fileList.indexOf(file), 1);
    },
    // 上传附件成功
    handleSuccess(res, file) {
      if (res.code === 2) {
        this.$refs.fujianupload.fileList.splice(fileList.indexOf(file), 1);
        this.$Notice.warning({
          title: res.msg
        });
      }
    },
    // 上传图片成功
    pichandleSuccess(res, file) {
      this.uploadForm.photourl = res.data;
    },
    // 判断图片上传数量
    pichandleBeforeUpload() {
      const check = this.picuploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "封面最多只能上传一个图片"
        });
      }
      return check;
    },
    // 判断附件上传数量
    handleBeforeUpload(file) {
      const checkfileList =
        this.fujainList.length + this.$refs.fujianupload.fileList.length < 10;
      const check = this.fujainList.length < 10;
      if (!check || !checkfileList) {
        this.$Notice.warning({
          title: "附件上传已达上限"
        });
      }
      return check && checkfileList;
    },
    // 图片大小限制
    pichandleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小限制",
        desc: file.name + "： 该文件大小超过2M."
      });
    },
    // 上传头像类型限制
    pichandleFormatError(file) {
      this.$Notice.warning({
        title: "文件类型限制",
        desc: file.name + " 该文件不是图片类型"
      });
    },
    // 选择查看人的权限
    chooseCheckPeople(arr) {
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].userId);
        }
      }
      this.lookFileParams.userIds = userIds.join(",");
      this.chooseuserLookIds = userIds.join(",");
    },
    chooseDelPeople(arr) {
      console.log(111);
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].userId);
        }
      }
      this.deleteFileParams.userIds = userIds.join(",");
    },
    chooseEditPeople(arr) {
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].userId);
        }
      }
      this.updateFileParams.userIds = userIds.join(",");
    },
    // 树形渲染函数
    renderContentDep(h, { root, node, data }) {
      return h("span", data.name);
    },
    showDepTree() {
      let _self = this;
      getDepTree(_self.depTreeParams).then(res => {
        _self.depTree = res.data;
        console.log("查看", this.showusermissionIdArry[0]);
        this.selectDate(this.showusermissionIdArry[0], _self.depTree);
      });
    },
    showeditDepTree() {
      let _self = this;
      getDepTree(_self.depTreeParams).then(res => {
        _self.editdepTree = res.data;
        console.log("修改", this.showusermissionIdArry[1]);
        this.selectDate(this.showusermissionIdArry[1], _self.editdepTree);
      });
    },
    showdelDepTree() {
      let _self = this;
      getDepTree(_self.depTreeParams).then(res => {
        _self.deldepTree = res.data;
        console.log("删除", this.showusermissionIdArry[2]);
        this.selectDate(this.showusermissionIdArry[2], _self.deldepTree);
      });
    },
    // 设置图片的描述
    docupload() {
      const fileList = this.$refs.fujianupload.fileList;
      console.log(fileList);
      if (this.uploadDescription === "") {
        this.uploadDescription = "无";
      }
      for (var val of fileList) {
        let fujianListDetail = {
          url: val.response.data,
          name: val.response.data.slice(15),
          size: val.size,
          description: this.uploadDescription
        };
        this.fujainList.push(fujianListDetail);
      }
      this.$refs.fujianupload.fileList = [];
    },
    // 文件验证成功进入修改
    upFileloadSuccess() {
      this.updateFileList.fileId = this.uploadForm.fileId;
      this.updateFileList.content = this.uploadForm.content;
      this.updateFileList.photourl = this.uploadForm.photourl;
      if (this.insertFileList.photourl === "") {
        this.insertFileList.photourl = "458814304482422455.png";
      }
      this.updateFileList.describle = this.uploadForm.describle;
      this.updateFileList.fileurl = this.uploadForm.fileurl;
      this.updateFileList.userId = this.uploadForm.userId;
      this.updateFileList.fileStyleId = this.uploadForm.id;
      this.updateFileList.fileStyleName = this.uploadForm.value;
      this.updateFileList.fileSize = this.uploadForm.filesize;
      this.updateFileList.fileSpecies = this.uploadForm.fileType;
      this.updateFileList.chooseUser = "0";
      console.log("修改文件的入参", this.updateFileList);
      if (
        this.lookFileParams.userIds !== this.userLookIds ||
        this.updateFileParams.userIds !== this.userUpdateIds ||
        this.deleteFileParams.userIds !== this.userDeleteIds
      ) {
        this.chooseUser = true;
        this.updateFileList.chooseUser = "1";
      }
      updateFile(this.updateFileList)
        .then(res => {
          if (res.data.code == 0) {
            if (this.chooseUser) {
              lookFileUser(this.lookFileParams)
                .then(res => {
                  if (res.data.code == 0) {
                    console.log("设置权限成功");
                    updateFilePermission(this.updateFileParams)
                      .then(res => {
                        if (res.data.code == 0) {
                          console.log("设置修改权限成功");
                          deleteFilePermission(this.deleteFileParams)
                            .then(res => {
                              if (res.data.code == 0) {
                                console.log("设置删除权限成功");
                                this.submitLoading = false;
                                this.$Message.success("修改成功,2s后少跳转到文件详情页面");
                                setTimeout(() => {
                                  this.$router.push(
                                    "/allfiles/check/" + this.$route.params.id
                                  );
                                }, 2000);
                              }
                            })
                            .catch(err => {});
                        }
                      })
                      .catch(err => {});
                  }
                })
                .catch(err => {});
            } else {
              this.submitLoading = false;
              this.$Message.success("修改成功,2s后少跳转到文件详情页面");
              setTimeout(() => {
                this.$router.push("/allfiles/check/" + this.$route.params.id);
              }, 2000);
            }
          }
        })
        .catch(err => {});
    },
    // 获取管理员权限
    adminPower() {
      queryadmin()
        .then(res => {
          console.log("管理员账户");
          if (res.data.code == 0) {
            var newArr = [];
            for (let val of res.data.data) {
              newArr.push(val);
            }
            this.adminIds = newArr.join(",");
            this.adminIds =
              this.adminIds + "," + sessionStorage.getItem("userId");
          }
        })
        .catch(err => {});
    },
    // 获得文件大小，名字，和描述
    getFileData() {
      var newArry = [];
      var filesizeArry = [];
      var filedescribleArry = [];
      for (let i = 0; i < this.fujainList.length; i++) {
        newArry.push(this.fujainList[i].url);
        filesizeArry.push(this.fujainList[i].size);
        filedescribleArry.push(this.fujainList[i].description);
      }
      this.uploadForm.fileurl = newArry.join(",");
      this.uploadForm.filesize = filesizeArry.join(",");
      this.uploadForm.describle = filedescribleArry.join(",");
    },
    checkIfContainId(ids, id) {
      ids = ids.split(",");
      id = id.split(",");
      if (ids === "") {
        return true;
      }
      if (id === "") {
        return false;
      }
      for (var val of id) {
        console.log(111, val, ids, ids.indexOf(val) === -1);
        if (ids.indexOf(val) === -1) {
          return true;
        }
      }
      return false;
    },
    // 确认修改触发的事件
    handleSubmit() {
      // 将文本编辑器的内容传给content
      this.getEditorContent();
      if (this.lookFileParams.userIds == "") {
        this.lookFileParams.userIds = this.adminIds;
      } else {
        this.lookFileParams.userIds =
          this.lookFileParams.userIds + "," + this.adminIds;
      }
      if (this.updateFileParams.userIds == "") {
        this.updateFileParams.userIds = this.adminIds;
      } else {
        this.updateFileParams.userIds =
          this.updateFileParams.userIds + "," + this.adminIds;
      }
      if (this.deleteFileParams.userIds == "") {
        this.deleteFileParams.userIds = this.adminIds;
      } else {
        this.deleteFileParams.userIds =
          this.deleteFileParams.userIds + "," + this.adminIds;
      }
      if (this.uploadForm.id == "") {
        this.$Message.warning("请选择文档类型");
        return;
      } else if (this.uploadForm.content === "") {
        this.$Message.warning("请编辑文件内容");
        return;
      } else if (
        this.checkIfContainId(
          this.lookFileParams.userIds,
          this.updateFileParams.userIds
        )
      ) {
        this.$Message.warning({
          content: "有查阅权限的人员，才能修改或删除文件，请重新设置人员权限",
          duration: 5
        });
        return;
      } else if (
        this.checkIfContainId(
          this.lookFileParams.userIds,
          this.deleteFileParams.userIds
        )
      ) {
        this.$Message.warning({
          content: "有查阅权限的人员，才能修改或删除文件，请重新设置人员权限",
          duration: 5
        });
        return;
      } else {
        if (this.fujainList.length > 0) {
          this.getFileData();
        }
        this.submitLoading = true;
        this.submitText = "正在修改";
        console.log("之前的ids与现在的ids", this.lookFileParams.userIds);
        console.log(this.userLookIds);
        console.log("之前的ids与现在的ids", this.updateFileParams.userIds);
        console.log(this.userUpdateIds);
        console.log("之前的ids与现在的ids", this.deleteFileParams.userIds);
        console.log(this.userDeleteIds);
        this.upFileloadSuccess();
      }
    }
  }
};
</script>
<style>
.ivu-tabs-tabpane {
  border: 1px solid #eee;
}

.newfileTab .ivu-tabs-bar {
  margin-bottom: 0;
}
</style>

<style scoped>
.body-area {
  padding: 20px;
}
</style>
