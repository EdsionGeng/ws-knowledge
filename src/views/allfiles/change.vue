<template>
  <div>
    <div class="body-area">
      <Form :rules="ruleValidate" label-position="right" :label-width="100" :model='uploadForm' ref='formValidate'>
        <FormItem label=" 文件标题：" prop="title">
          <Input v-model="uploadForm.title" style="width: 200px;color:#333" disabled></Input>
        </FormItem>
        <FormItem label="文档类型：" prop="value">
          <docTree :myvalue='uploadForm' ref='myUeditor'></docTree>
        </FormItem>
        <FormItem label="封面：">
          <div>
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
            <div v-if="file !== null"> 所选文件: {{ file.name }}
              <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '取消' : ' 确定上传？' }}
              </Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="内容：" prop='content'>
          <div class="hello">
            <Ueditor :ueditorContent='uploadForm'></Ueditor>
          </div>
        </FormItem>
        <FormItem label="上传附件：">
          <div class="uploadBtn">
            <Button type="primary" size="small" @click="uploadDoc=true">上传附件</Button>
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
          <Button type='primary' size='large' @click="handleSubmit()">{{submitText}}</Button>
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
            :format="[ 'doc','docx','xls','xlsx','ppt','pptx','txt','jpg','jpeg','png','mp3','mp4']"
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
          <Input v-model="uploadForm.describle" placeholder="" style="width: 200px" placeholder='描述内容' @on-enter='docupload'></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import Ueditor from "@/components/setUeditor";
import docTree from "@/components/common/docTree";
import { getDepTree } from "../../api/all_interface";
import { updateFile } from "../../api/all_interface";
import { lookFileUser } from "../../api/all_interface";
import { updateFilePermission } from "../../api/all_interface";
import { deleteFilePermission } from "../../api/all_interface";
import { getFileDetail } from "../../api/all_interface";
import { queryadmin } from "../../api/all_interface";
 import Vue from 'vue'
export default {
  data() {
    return {
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
        photourl: "./bg.jpg",
        describle: "",
        filesize: "",
        value: ""
      },
      updateFileList: {},
      fujainList: [],
      uploadList: [],
      ruleValidate: {
        title: [{ required: true }],
        value: [{ required: true, message: "请选择文件类型" }],
        content: [{ required: true }],
        power: [{ required: true }]
      },
      fileDetails: null,
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
      fileDetailUrl: [],
      fileDetailSize: [],
      fileDetaildescible: [],
      file: null,
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
      uploadDoc: false
    };
  },
  components: {
    docTree,
    Ueditor
  },
  mounted() {
    this.initFileDetail();
    this.adminPower();
    this.showDepTree();
    this.showeditDepTree();
    this.showdelDepTree();
  },
  methods: {
    initFileDetail() {
      getFileDetail(this.fileDetailParams)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.fileDetails = res.data.data;
            console.log("文件详情");
            console.log(this.uploadForm);
            this.uploadForm.id = this.fileDetails.fileStyleId;
            this.uploadForm.title = this.fileDetails.title;
            this.uploadForm.content = this.fileDetails.fileContent;
            this.uploadForm.fileId = this.fileDetails.id;
            if (this.fileDetails.fileUrl !== "") {
              this.uploadForm.fileurl = this.fileDetails.fileUrl;
              this.uploadForm.describle = this.fileDetails.enclosureInfo;
            }
            this.uploadForm.value = this.fileDetails.fileStyle;
            this.uploadForm.fileType = this.fileDetails.fileSpecies;
            console.log(this.uploadForm);
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
                console.log(this.fileDetailSize[i]);
                fujainDetail.name = this.fileDetailUrl[i].slice(13);
                fujainDetail.url = this.fileDetailUrl[i];
                fujainDetail.description = this.fileDetaildescible[i];
                this.fujainList.push(fujainDetail);
              }
            } else {
              this.fujainList = [];
            }
          }
        })
        .catch(err => {});
    },
    handleRemove(file) {
      const fileList = this.fujainList;
      this.fujainList.splice(fileList.indexOf(file), 1);
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
    },
    pichandleBeforeUpload() {
      console.log(this.$refs.upload);
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "封面最多只能上传一个图片"
        });
      }
      return check;
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 10;
      if (!check) {
        this.$Notice.warning({
          title: "附件上传已达上限"
        });
      }
      return check;
    },
    pichandleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小限制",
        desc: file.name + "： 该文件大小超过2M."
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
    pichandleFormatError(file) {
      this.$Notice.warning({
        title: "文件类型限制",
        desc: file.name + " 不是图片类型"
      });
    },
    chooseCheckPeople(arr) {
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].id);
        }
      }
      this.lookFileParams.userIds = userIds.join(",");
    },
    chooseDelPeople(arr) {
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].id);
        }
      }
      this.deleteFileParams.userIds = userIds.join(",");
    },
    chooseEditPeople(arr) {
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].id);
        }
      }
      this.updateFileParams.userIds = userIds.join(",");
      console.log(this.deleteFileParams.userIds);
    },
    renderContentDep(h, { root, node, data }) {
      return h("span", data.name);
    },
    /**
       * 获取文档树形结构
       */

    showDepTree() {
      let _self = this;
      getDepTree(_self.depTreeParams).then(res => {
        _self.depTree = res.data;
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
    handleUpload(file) {
      console.log(1111111);
      this.file = file;
      console.log(file);
      //return false;
    },
    
    docupload() {
      console.log(111)
      console.log(this.$refs.fujianupload);
      for (let val of this.fujainList) {
        if (!val.hasOwnProperty("description")) {
          Vue.set(val, "description", this.uploadForm.describle);
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
      this.updateFileList.fileId = this.uploadForm.fileId;
      this.updateFileList.content = this.uploadForm.content;
      this.updateFileList.photourl = this.uploadForm.photourl;
      this.updateFileList.describle = this.uploadForm.describle;
      this.updateFileList.fileurl = this.uploadForm.fileurl;
      this.updateFileList.userId = this.uploadForm.userId;
      this.updateFileList.fileStyleId = this.uploadForm.id;
      this.updateFileList.fileStyleName = this.uploadForm.value;
      this.updateFileList.fileSize = this.uploadForm.filesize;
      this.updateFileList.fileSpecies = this.uploadForm.fileType;
      if (this.lookFileParams.userIds !== "") {
        this.chooseUser = true;
      }
      updateFile(this.updateFileList)
        .then(res => {
          if (res.data.code == 0) {
           
            if (this.chooseUser) {
              this.lookFileParams.fileId = res.data.data;
              this.updateFileParams.fileId = res.data.data;
              this.deleteFileParams.fileId = res.data.data;
              lookFileUser(this.lookFileParams)
                .then(res => {
                  console.log(res.data);
                  if (res.data.code == 0) {
                    console.log("设置权限成功");
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
                            this.deleteFileParams.userIds =  this.adminIds;
                          }
                          deleteFilePermission(this.deleteFileParams)
                            .then(res => {
                              console.log(res.data);
                              if (res.data.code == 0) {
                                console.log("设置删除权限成功");                             
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
            this.submitLoading = false;                              
            this.$Message.success("修改成功,1s后少跳转到文件详情页面");
            setTimeout(() => {
              //this.$router.push('/allfiles/check/'+this.$route.params.id);
            }, 1000);   
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
            console.log(this.adminIds);
          }
        })
        .catch(err => {});
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
    handleSubmit() {
      console.log(this.$refs);
       //this.$refs.myUeditor.submits();
      // 将文件上传中所有输入的信息已保存在uploadForm中
      if (this.uploadForm.id == "") {
        this.$Message.warning("请选择文件类型");
        return;
      } else if (this.uploadForm.content === "") {
        this.$Message.warning("请编辑文件内容");
        return;
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
        if (this.uploadList.length > 0) {
          this.getFileData();
        }
        this.submitLoading = true;
        this.submitText = "正在修改";
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
