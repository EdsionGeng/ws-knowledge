<template>
  <div>
    <div class="body-area">
      <Form :rules="ruleValidate" label-position="right" :label-width="100" :model='uploadForm' ref='formValidate'>
        <FormItem label=" 文件标题：" prop="title">
          <Input v-model="uploadForm.title" placeholder="请输入标题" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="文档类型：" prop="value">
          <docTree :myvalue='uploadForm'></docTree>
        </FormItem>
        <FormItem label="封面：">
          <div style="width:450px;" class="picUpload">
            <Upload
              ref="upload"
              :show-upload-list="true"
              :before-upload='pichandleBeforeUpload'
              :format="['jpg','jpeg','png']"
              :on-exceeded-size="pichandleMaxSize"
              :max-size="2048"
              :on-format-error="pichandleFormatError"
              :on-success="pichandleSuccess"
              action="http://192.168.3.26:8011/photo/upload.htmls">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件封面</Button>
            </Upload>
          </div>
        </FormItem>
        <FormItem label="内容：" prop='content'>
          <div class="hello">
              <!-- <Ueditor :ueditorContent='uploadForm' ref="myUeditor"></Ueditor> -->
              <div id="editorElem" style="text-align:left;width:900px"></div>
          </div>
        </FormItem>
        <FormItem label="上传附件：">
          <div class="uploadBtn">
            <Button type="primary" size="small" @click="showUploadModel">上传附件</Button>
          </div>
          <Row v-for='(item,index) in fujainList' :key='index'>
            <i class="iconfont  icon-fujian" style='margin-right:8px;color:#009DD9;'></i><span>{{item.name}} <span
            style='color:#ccc'>（{{parseInt((item.size)/1024)+'k'}}）</span>  </span>
            <span style='padding-left:15px;color:#ccc'>描述：{{item.description}}</span>
          </Row>
        </FormItem>
        <FormItem label="权限设置：" prop='power'>
          <Tabs value="name1" type='card' class='newfileTab' style="width:900px;">
            <TabPane label="可查阅人员" name="name1">
              <div>
                <Tree :data="depTree" show-checkbox multiple :render="renderContentDep"
                      @on-check-change='chooseCheckPeople'></Tree>
              </div>
            </TabPane>
            <TabPane label="可编辑人员" name="name2">
              <div>
                <Tree :data="editdepTree" show-checkbox  multiple :render="renderContentDep"
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
        <FormItem>
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
        <FormItem label="">
          <Button type='primary' size='large' :loading="submitLoading" @click="handleSubmit('formInline')">
            {{submitText}}
          </Button>
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
            :format="[]"
            :on-format-error="handleFormatError"
            :max-size="10240"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :on-success="handleSuccess"
            action="http://192.168.3.26:8011/file/upload.htmls">
            <Button type="ghost" icon="ios-cloud-upload-outline">附件上传</Button>
          </Upload>
        </FormItem>
        <FormItem label=" 文件描述：">
          <Input v-model="uploadDescription"  style="width: 200px" placeholder='描述内容'></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
// import Ueditor from "@/components/setUeditor";
import docTree from "@/components/common/docTree";
import { getDepTree } from "../../api/all_interface";
import { insertFile } from "../../api/all_interface";
import { lookFileUser } from "../../api/all_interface";
import { updateFilePermission } from "../../api/all_interface";
import { deleteFilePermission } from "../../api/all_interface";
import { queryadmin } from "../../api/all_interface";
import { mapState, mapMutations } from "vuex";
import Vue from "vue";
var E = require("wangeditor");
export default {
  data() {
    return {
      uploadDescription: "",
      submitText: "确定上传",
      submitLoading: false,
      insertFileList: {},
      fujainList: [],
      uploadList: [],
      ruleValidate: {
        title: [
          { required: true, message: "请填写文件标题", trigger: "blur" },
          { type: "string", max: 20, message: "标题限制在20字以内" }
        ],
        value: [{ required: true, message: "请选择文件类型" }],
        content: [{ required: true }],
        power: [{ required: true }]
      },
      uploadForm: {
        userId: sessionStorage.getItem("userId"),
        fileType: "0",
        title: "",
        id: "",
        content: "",
        fileurl: "",
        photourl: "",
        describle: "",
        filesize: "",
        value: ""
      },
      lookFileParams: {
        userIds: "",
        fileId: "",
        operationStyleId: 1
      },
      updateFileParams: {
        userIds: "",
        operationStyleId: 1,
        fileId: ""
      },
      deleteFileParams: {
        userIds: "",
        operationStyleId: 1,
        fileId: ""
      },
      loadingStatus: false,
      depTree: [],
      editdepTree: [],
      deldepTree: [],
      depTreeList: [],
      editdepTreeList: [],
      deldepTreeList: [],
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
      isBanDuan: true,
      editorContent: ""
    };
  },
  components: {
    docTree
  },
  computed: mapState(["addFileSaveList", "hasSaveContent"]),
  mounted() {
    var editor = new E("#editorElem");
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.customConfig.zIndex = 100;
    editor.customConfig.showLinkImg = false;
    editor.customConfig.uploadImgHeaders = {
      Accept: "multipart/form-data"
    };
    editor.customConfig.uploadImgServer =
      "http://192.168.22.45:8011/file/upload.htmls";
    editor.create();
    setTimeout(() => {
      editor.txt.html(this.uploadForm.content);
    }, 1000);
    this.adminPower();
    this.uploadList = this.$refs.fujianupload.fileList;
    this.picuploadList = this.$refs.upload.fileList;
    if (this.hasSaveContent) {
      const storeState = this.addFileSaveList;
      this.uploadForm.title = storeState.addFileListParams.title;
      this.uploadForm.id = storeState.addFileListParams.fileStyleId;
      this.uploadForm.content = storeState.addFileListParams.content;
      this.uploadForm.fileurl = storeState.addFileListParams.fileUrl;
      this.uploadForm.photourl = storeState.addFileListParams.photoUrl;
      this.uploadForm.value = storeState.addFileListParams.fileStyle;
      this.uploadForm.describle = storeState.addFileListParams.describle;
      this.uploadForm.filesize = storeState.addFileListParams.filesize;
      this.uploadForm.fileType = storeState.addFileListParams.fileType;
      this.fujainList = storeState.fujainList;
      this.$refs.fujianupload.fileList = storeState.fujainList;
      this.$refs.upload.fileList = storeState.photoUrlList;
      if (storeState.lookFileParams.userIds === "") {
        this.showDepTree();
      } else {
        this.depTree = storeState.powerTreeLookList;
        this.selectDate(storeState.lookFileParams.userIds, this.depTree);
      }
      if (storeState.updateFileParams.userIds === "") {
        this.showeditDepTree();
      } else {
        this.editdepTree = storeState.powerTreeEditList;
        this.selectDate(storeState.updateFileParams.userIds, this.editdepTree);
      }
      if (storeState.deleteFileParams.userIds === "") {
        this.showdelDepTree();
      } else {
        this.deldepTree = storeState.powerTreeDelList;
        this.selectDate(storeState.deleteFileParams.userIds, this.deldepTree);
      }
    } else {
      this.showDepTree();
      this.showeditDepTree();
      this.showdelDepTree();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isBanDuan) {
      if (
        this.uploadForm.title !== "" ||
        this.uploadForm.id !== "" ||
        this.uploadForm.content !== "" ||
        this.fujainList.length !== 0 ||
        this.depTreeList.length !== 0 ||
        this.editdepTreeList.length !== 0 ||
        this.deldepTreeList.length !== 0
      ) {
        next(false);
        this.$Modal.confirm({
          title: "保存当前内容",
          content: "<p>是否保存当前编辑的内容</p>",
          onOk: () => {
            this.getEditorContent();
            this.getLookTreeList(this.depTree);
            this.getEditTreeList(this.editdepTree);
            this.getDelTreeList(this.deldepTree);
            this.setHasSaveContent(true);
            this.getdeleteFileParams(this.deleteFileParams);
            this.getupdateFileParams(this.updateFileParams);
            this.getlookFileParams(this.lookFileParams);
            this.getTitle(this.uploadForm.title);
            this.getFileStyle(this.uploadForm.value);
            this.getFileStyleId(this.uploadForm.id),
              this.getPhotoUrl(this.uploadForm.photourl),
              this.getFileUrl(this.uploadForm.fileurl),
              this.getContent(this.uploadForm.content),
              this.getFujainList(this.fujainList);
            this.getFilesize(this.uploadForm.filesize);
            this.getDescrible(this.uploadForm.describle);
            this.getFileType(this.uploadForm.fileType);
            this.getPhotoUrlList(this.picuploadList);
            next();
          },
          onCancel: () => {
            this.getEditorContent();
            this.getLookTreeList([]);
            this.getEditTreeList([]);
            this.getDelTreeList([]);
            this.setHasSaveContent(false);
            this.getdeleteFileParams(null);
            this.getupdateFileParams(null);
            this.getlookFileParams(null);
            this.getTitle("");
            this.getFileStyle("");
            this.getFileStyleId("0"),
              this.getPhotoUrl(""),
              this.getFileUrl(""),
              this.getContent(""),
              this.getFujainList([]);
            this.getFilesize("");
            this.getDescrible("");
            this.getFileType("");
            this.getPhotoUrlList([]);
            next();
          }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  },
  methods: {
    ...mapMutations([
      "getLookTreeList",
      "getEditTreeList",
      "getDelTreeList",
      "getdeleteFileParams",
      "getupdateFileParams",
      "getlookFileParams",
      "getTitle",
      "getFileStyle",
      "getFileStyleId",
      "getPhotoUrl",
      "getFileUrl",
      "getContent",
      "getFujainList",
      "setHasSaveContent",
      "getFilesize",
      "getDescrible",
      "getFileType",
      "getPhotoUrlList"
    ]),
    showUploadModel() {
      this.uploadDoc = true;
      this.uploadDescription = "";
    },
    getEditorContent() {
      this.uploadForm.content = this.editorContent;
      console.log(this.editorContent);
    },
    handleSuccess(res, file) {
      const fileList = this.$refs.fujianupload.fileList;
      if (res.code === 2) {
        this.$refs.fujianupload.fileList.splice(fileList.indexOf(file), 1);
        this.$Notice.warning({
          title: res.msg
        });
      } else {
        console.log(fileList);
        this.fujainList = fileList;
      }
    },
    pichandleSuccess(res, file) {
      this.uploadForm.photourl = res.data;
      console.log(this.$refs.upload);
    },
    pichandleBeforeUpload(file) {
      const check = this.picuploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "封面最多只能上传一个图片"
        });
      }
      return check;
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 10;
      console.log(this.uploadList.length);
      if (!check) {
        this.$Notice.warning({
          title: "附件上传已达上限"
        });
      }
      return check;
    },
    pichandleMaxSize(file) {
      this.$Notice.warning({
        title: "大小限制",
        desc: "" + file.name + "：头像大小不能超过2M"
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件上传类型限制",
        desc: file.name + " ：该文件类型不支持上传"
      });
    },
    pichandleFormatError(file) {
      this.$Notice.warning({
        title: "文件类型限制",
        desc: file.name + " 该文件不是图片类型"
      });
    },
    chooseCheckPeople(arr) {
      this.depTreeList = arr;
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].id);
        }
      }
      this.lookFileParams.userIds = userIds.join(",");
      this.lookFileParams.userIds =
      this.lookFileParams.userIds + "," + sessionStorage.getItem("userId");
    },
    chooseDelPeople(arr) {
       if(this.lookFileParams.userIds===''){
          this.$Message.error('请先选择可查阅的人员')
          return
      }else{
        this.deldepTreeList = arr;
        var userIds = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children === null) {
            userIds.push(arr[i].id);
          }
        }
        this.deleteFileParams.userIds = userIds.join(",");
        this.deleteFileParams.userIds =
          this.deleteFileParams.userIds + "," + sessionStorage.getItem("userId");
      }
   },
    chooseEditPeople(arr) {
      if(this.lookFileParams.userIds===''){
          this.$Message.error('请先选择可查阅的人员')
          return
      }else{
        this.editdepTreeList = arr;
        var userIds = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children === null) {
            userIds.push(arr[i].id);
          }
        }
        this.updateFileParams.userIds = userIds.join(",");

        this.updateFileParams.userIds =
          this.updateFileParams.userIds + "," + sessionStorage.getItem("userId");
      }
    },
    renderContentDep(h, { root, node, data }) {
      return h("span", data.name);
    },
    showDepTree() {
      let _self = this;
      getDepTree(_self.depTreeParams).then(res => {
        _self.depTree = res.data;
        console.log(res.data);
      });
    },
    showeditDepTree() {
      let _self = this;
      getDepTree(_self.depTreeParams).then(res => {
        _self.editdepTree = res.data;
      });
    },
    showdelDepTree() {
      let _self = this;
      getDepTree(_self.depTreeParams).then(res => {
        _self.deldepTree = res.data;
      });
    },
    docupload() {
      console.log(this.$refs.fujianupload);
      for (let val of this.fujainList) {
        if (!val.hasOwnProperty("description")) {
          Vue.set(val, "description", this.uploadDescription);
          if (val.description === "") {
            Vue.set(val, "description", "无");
          }
        }
      }
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "友情提醒",
        desc: "文件  " + file.name + "过大,已超过10M！"
      });
    },
    upFileloadSuccess() {
      this.insertFileList.title = this.uploadForm.title;
      this.insertFileList.content = this.uploadForm.content;
      this.insertFileList.photourl = this.uploadForm.photourl;
      if (this.insertFileList.photourl === "") {
        this.insertFileList.photourl = "1514028176737moren1.png";
      }
      this.insertFileList.fileurl = this.uploadForm.fileurl;
      this.insertFileList.userId = this.uploadForm.userId;
      this.insertFileList.fileStyleId = this.uploadForm.id;
      this.insertFileList.filesize = this.uploadForm.filesize;
      this.insertFileList.fileSpecies = this.uploadForm.fileType;
      this.insertFileList.describle = this.uploadForm.filedescrible;
      console.log(this.insertFileList);
      insertFile(this.insertFileList)
        .then(res => {
          if (res.data.code == 0) {
            console.log("新建文件成功");
            this.lookFileParams.fileId = res.data.data;
            this.updateFileParams.fileId = res.data.data;
            this.deleteFileParams.fileId = res.data.data;
            console.log(res.data.data);
            if (this.lookFileParams.userIds === "") {
              this.lookFileParams.userIds = this.adminIds;
            }
            console.log(this.lookFileParams.userIds);
            lookFileUser(this.lookFileParams)
              .then(res => {
                console.log(res.data);
                if (res.data.code == 0) {
                  console.log("设置权限成功");
                  console.log(this.updateFileParams.userIds);
                  if (this.updateFileParams.userIds === "") {
                    this.updateFileParams.userIds = this.adminIds;
                    console.log(this.updateFileParams.userIds);
                  }
                  updateFilePermission(this.updateFileParams)
                    .then(res => {
                      console.log(res.data);
                      if (res.data.code == 0) {
                        console.log("设置修改权限成功");
                        if (this.deleteFileParams.userIds === "") {
                          this.deleteFileParams.userIds = this.adminIds;
                        }
                        deleteFilePermission(this.deleteFileParams)
                          .then(res => {
                            console.log(res.data);
                            if (res.data.code == 0) {
                              console.log("设置删除权限成功");
                              this.submitLoading = false;
                              this.isBanDuan = false;
                              this.$Message.success("上传成功,2s后少跳转到历史上传界面");
                              setTimeout(() => {
                                this.$router.push("/hisupload");
                              }, 1000);
                            }
                          })
                          .catch(err => {});
                      }
                    })
                    .catch(err => {});
                }
              })
              .catch(err => {});
          }
        })
        .catch(err => {});
    },
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
    selectDate(ids, data) {
      const prams = ids.split(",");
      console.log(prams);
      console.log(data);
      function funSelect(data, prams) {
        for (let val of data) {
          const dataId = String(val.id);
          if (prams.indexOf(dataId) !== -1) {
            val.checked = true;
          }
          if (val.children !== null) {
            funSelect(val.children, prams);
          }
        }
      }
      funSelect(data, prams);
    },
    getFileData() {
      // 获得文件大小，名字，和描述
      var newArry = [];
      var filesizeArry = [];
      var filedescribleArry = [];
      for (let i = 0; i < this.fujainList.length; i++) {
        console.log(this.fujainList[i].response);
        newArry.push(this.fujainList[i].response.data);
        filesizeArry.push(this.fujainList[i].size);
        filedescribleArry.push(this.fujainList[i].description);
      }
      this.uploadForm.fileurl = newArry.join(",");
      this.uploadForm.filesize = filesizeArry.join(",");
      this.uploadForm.filedescrible = filedescribleArry.join(",");
    },
    handleSubmit(name) {
      // 将文件上传中所有输入的信息已保存在uploadForm中
      this.getEditorContent();
      if (this.uploadForm.title == "") {
        this.$Message.warning("请填写文件标题");
        return;
      } else if (this.uploadForm.id == "") {
        this.$Message.warning("请选择文件类型");
        return;
      } else if (this.uploadForm.content === "") {
        this.$Message.warning("请编辑文件内容");
        return;
      } else if (this.uploadForm.content.length >= 2600) {
        this.$Message.warning("文件占位符过多,请删除多余的空格");
      } else if (
        this.lookFileParams.userIds.indexOf(this.updateFileParams.userIds) == -1
      ) {
        this.$Message.warning("修改文件权限的人超过查看文件权限的人");
        return;
      } else if (
        this.lookFileParams.userIds.indexOf(this.deleteFileParams.userIds) == -1
      ) {
        this.$Message.warning("删除文件权限的人超过查看文件权限的人");
        return;
      } else {
        this.getFileData();
        this.submitLoading = true;
        this.submitText = "正在上传";
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
.picUpload .ivu-upload-list-remove {
  font-size: 24px;
  padding: 3px;
}
</style>
<style scoped>
.body-area {
  padding: 20px;
}
</style>
