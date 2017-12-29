<template>
  <div>
    <div class="body-area">
      <Form :rules="ruleValidate" label-position="right" :label-width="100" :model='uploadForm' ref='formValidate' >
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
                v-if='picuploadList.length!==0' v-for='(item,index) in picuploadList' :key='index' style='padding:3px 0;width:450px;'>
                <Icon type="image" style='margin-right:8px;color:#009DD9;'></Icon>
                <span>
                      <a @click.prevent="picViewModel=true" :href="baseurl+uploadForm.photourl">{{item.name}} </a>
                </span>
                <Button type="text" size="small" @click="pichandleRemove(item)">
                    <Icon type="android-cancel" ></Icon>
                </Button>
            </Row>
            </div>
        </FormItem>
        <FormItem label="内容：" prop='content'>
          <div class="hello">
              <div id="editorElem" style="text-align:left;width:900px"></div>
          </div>
        </FormItem>
        <FormItem label="上传附件：">
          <div class="uploadBtn">
            <Button type="primary" size="small" @click="showUploadModel">上传附件</Button>
          </div>
          <Row  v-for='(item,index) in fujainList' :key='index'>
            <a target="_blank" :href="item.url?baseurl+item.url:''">
              <i class="iconfont  icon-fujian" style='margin-right:8px;color:#009DD9;'></i><span>{{item.name}} <span
              style='color:#ccc'>（{{parseInt((item.size)/1024)+'k'}}）</span>  </span>
            </a>
            <span style='padding-left:15px;color:#ccc'>描述：{{item.description}}</span>
             <Button type="text" size="small" @click="handleRemove(item)">
              <Icon type="android-cancel" ></Icon>
            </Button>
          </Row>
        </FormItem>
        <FormItem label="权限设置：" prop='power' >
          <Tabs value="name1" type='card' class='newfileTab' style="width:900px;" @on-click='changeTab'>
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
        <FormItem style='margin-bottom:80px;'>
          <RadioGroup v-model="uploadForm.fileType">
            <Radio label="0">普通文件</Radio>
            <Radio label="1">部门文件</Radio>
            <Radio label="2">公司文件</Radio>
          </RadioGroup>
          <div v-if="uploadForm.fileType=='0'">
            仅当前设置的查阅人员可以查看此文件，新入职的人员看不到，如果需要设置某一新入职人员查看该文件，可通过修改查阅人员实现
          </div>
          <div v-if="uploadForm.fileType=='1'">
            上传人对应的部门有新入职的人员均能看到此文件
          </div>
          <div v-if="uploadForm.fileType=='2'">
            公司有新入职的人员均能看到此文件
          </div>
        </FormItem>
        <FormItem label="" class="absolute-position" >
          <Button style='margin-bottom:6px;' type='primary' size='large'  :loading="submitLoading" @click="handleSubmit('formInline')">
            {{submitText}}
          </Button>
        </FormItem>
      </Form >
    </div>
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
    <Modal
      v-model="uploadDoc"
      width="400"
      @on-ok='docupload'
      :mask-closable="false"
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
          <Input v-model="uploadDescription"  style="width: 200px" placeholder='描述内容'></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import docTree from "@/components/common/docTree";
import { getDepTree } from "../../api/all_interface";
import { insertFile } from "../../api/all_interface";
import { lookFileUser } from "../../api/all_interface";
import { updateFilePermission } from "../../api/all_interface";
import { deleteFilePermission } from "../../api/all_interface";
import { queryadmin } from "../../api/all_interface";
import { mapState, mapMutations } from "vuex";
import { getUploadUrl } from "../../utils/commonurl";
import { getRequestUrl } from "../../utils/commonurl";
import Vue from "vue";
var E = require("wangeditor");
export default {
  data() {
    return {
      uploadurl: "",
      baseurl: "",
      picViewModel: false,
      picuploadList: [],
      userLookIds: "",
      uploadDescription: "",
      submitText: "确定上传",
      submitLoading: false,
      insertFilePrams: {},
      fujainList: [],
      ruleValidate: {
        title: [
          { required: true, message: "请填写文件标题", trigger: "blur" },
          { type: "string", max: 20, message: "标题限制在20字以内" }
        ],
        value: [{ required: true, message: "请选择文档类型" }],
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
      isBanDuan: true,
      editorContent: ""
    };
  },
  components: {
    docTree
  },
  computed: mapState(["addFileSaveList", "hasSaveContent"]),
  mounted() {
    this.uploadurl = getUploadUrl();
    this.baseurl = getRequestUrl();
    this.adminPower();
    //this.fujainList = this.$refs.fujianupload.fileList;
    this.picuploadList = this.$refs.upload.fileList;
    // 有保存信息时要执行的方法（默认为false）
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
      //this.$refs.fujianupload.fileList = storeState.fujainList;
      this.$refs.upload.fileList = storeState.photoUrlList;
      this.picuploadList = storeState.photoUrlList;
      if (storeState.lookFileParams.userIds === "") {
        this.showDepTree();
      } else {
        this.depTree = storeState.powerTreeLookList;
        this.userLookIds = storeState.lookFileParams.userIds;
        this.lookFileParams.userIds = storeState.lookFileParams.userIds;
        this.selectDate(storeState.lookFileParams.userIds, this.depTree);
      }
      if (storeState.updateFileParams.userIds === "") {
        this.showeditDepTree();
      } else {
        this.updateFileParams.userIds = storeState.updateFileParams.userIds;
        this.editdepTree = storeState.powerTreeEditList;
        this.selectDate(storeState.updateFileParams.userIds, this.editdepTree);
      }
      if (storeState.deleteFileParams.userIds === "") {
        this.showdelDepTree();
      } else {
        this.deleteFileParams.userIds = storeState.deleteFileParams.userIds;
        this.deldepTree = storeState.powerTreeDelList;
        this.selectDate(storeState.deleteFileParams.userIds, this.deldepTree);
      }
    } else {
      this.showDepTree();
      this.showeditDepTree();
      this.showdelDepTree();
    }
    this.createEditor();
  },
  // 离开这个页面时需要保存的信息
  beforeRouteLeave(to, from, next) {
    // 得到保存当前编辑器的内容
    this.getEditorContent();
    // 控制是否可以保存
    if (this.isBanDuan) {
      if (
        this.uploadForm.title !== "" ||
        this.uploadForm.id !== "" ||
        this.uploadForm.content !== "" ||
        this.fujainList.length !== 0 ||
        this.lookFileParams.userIds !== "" ||
        this.updateFileParams.userIds !== "" ||
        this.deleteFileParams.userIds !== ""
      ) {
        next(false);
        this.$Modal.confirm({
          title: "保存当前内容",
          content: "<p>是否保存当前编辑的内容</p>",
          onOk: () => {
            this.setHasSaveContent(true);
            this.getLookTreeList(this.depTree);
            this.getEditTreeList(this.editdepTree);
            this.getDelTreeList(this.deldepTree);
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
            this.$Message.success("保存成功");
            console.log("content:", this.uploadForm.content);
            next();
          },
          onCancel: () => {
            this.getEditorContent();
            this.clearSaveUploadFile();
            this.$Message.success("已清空保存的信息");
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
    clearSaveUploadFile() {
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
    },
    createEditor() {
      var editor = new E("#editorElem");
      this.editorContent = this.uploadForm.content;
      editor.customConfig.onchange = html => {
        this.editorContent = html;
      };
      editor.customConfig.zIndex = 100;
      editor.customConfig.uploadImgShowBase64 = true;
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
        // "image", // 插入图片
        "table", // 表格
        // "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      editor.create();
      editor.txt.html(this.uploadForm.content);
    },
    // 切换tab时进行的提示
    changeTab(name) {
      if (name == "name2" || name == "name3") {
        if (this.userLookIds === "") {
          this.$Message.error("请先选择可查阅的人员");
          return;
        }
      }
    },
    // 移除图片
    pichandleRemove(file) {
      const fileList = this.picuploadList;
      this.picuploadList.splice(fileList.indexOf(file), 1);
    },
    // 移除附件
    handleRemove(file) {
      const fileList = this.fujainList;
      this.fujainList.splice(fileList.indexOf(file), 1);
    },
    // 清空图片描述
    showUploadModel() {
      this.uploadDoc = true;
      this.uploadDescription = "";
    },
    // 得到编辑器内容 （提交，要保存时）
    getEditorContent() {
      this.uploadForm.content = this.editorContent;
      console.log(this.editorContent);
    },
    // 附件上传成功返回fujainList
    handleSuccess(res, file) {
      console.log(file);
      const fileList = this.$refs.fujianupload.fileList;
      if (res.code === 2) {
        this.$refs.fujianupload.fileList.splice(fileList.indexOf(file), 1);
        this.$Notice.warning({
          title: res.msg
        });
      }
    },
    // 图片上传成功返回photourl
    pichandleSuccess(res, file) {
      this.uploadForm.photourl = res.data;
    },
    // 图片上传个数验证
    pichandleBeforeUpload(file) {
      const check = this.picuploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "封面最多只能上传一个图片"
        });
      }
      return check;
    },
    // 附件上传个数验证
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
    // 图片上传大小设置
    pichandleMaxSize(file) {
      this.$Notice.warning({
        title: "大小限制",
        desc: "" + file.name + "：头像大小不能超过2M"
      });
    },
    // 图片格式设置
    pichandleFormatError(file) {
      this.$Notice.warning({
        title: "文件类型限制",
        desc: file.name + " 该文件不是图片类型"
      });
    },
    // 选择查看权限的人
    chooseCheckPeople(arr) {
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].id);
        }
      }
      this.lookFileParams.userIds = userIds.join(",");
      this.userLookIds = userIds.join(",");
    },
    // 选择删除权限的人
    chooseDelPeople(arr) {
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].id);
        }
      }
      this.deleteFileParams.userIds = userIds.join(",");
    },
    // 选择修改权限的人
    chooseEditPeople(arr) {
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].id);
        }
      }
      this.updateFileParams.userIds = userIds.join(",");
    },
    // 树形结构渲染
    renderContentDep(h, { root, node, data }) {
      return h("span", data.name);
    },
    // 获取默认树形数据结构
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
    // 点击确定给附件加描述
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
    // 验证通过开始上传函数
    upFileloadSuccess() {
      this.insertFilePrams.title = this.uploadForm.title;
      this.insertFilePrams.content = this.uploadForm.content;
      this.insertFilePrams.photourl = this.uploadForm.photourl;
      if (this.insertFilePrams.photourl === "") {
        this.insertFilePrams.photourl = "1514028176737moren1.png";
      }
      this.insertFilePrams.fileurl = this.uploadForm.fileurl;
      this.insertFilePrams.userId = this.uploadForm.userId;
      this.insertFilePrams.fileStyleId = this.uploadForm.id;
      this.insertFilePrams.filesize = this.uploadForm.filesize;
      this.insertFilePrams.fileSpecies = this.uploadForm.fileType;
      this.insertFilePrams.describle = this.uploadForm.filedescrible;
      console.log("验证获取的参数是否正确", this.insertFilePrams);
      insertFile(this.insertFilePrams)
        .then(res => {
          if (res.data.code == 0) {
            console.log("新建文件成功");
            this.lookFileParams.fileId = res.data.data;
            this.updateFileParams.fileId = res.data.data;
            this.deleteFileParams.fileId = res.data.data;

            console.log("验证入参是否正确", this.lookFileParams);
            console.log("验证修改入参是否正确", this.updateFileParams);
            console.log("验证删除入参是否正确", this.deleteFileParams);
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
                              this.isBanDuan = false;
                              this.clearSaveUploadFile();
                              this.$Message.success("上传成功,2s后少跳转到历史上传界面");
                              setTimeout(() => {
                                this.$router.push("/hisupload");
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
          }
        })
        .catch(err => {});
    },
    // 获取管理员用户和自己上传人的用户
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
    // 根据ids进行树的选择
    selectDate(ids, data) {
      const prams = ids.split(",");
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
      this.uploadForm.filedescrible = filedescribleArry.join(",");
    },
    //检测是否查看包含编辑或删除的功能
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
        if (ids.indexOf(val) === -1) {
          return true;
        }
      }
      return false;
    },
    // 确定上传要执行的验证
    handleSubmit(name) {
      // 得到编辑器内容 （提交，要保存时）
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
      if (this.uploadForm.title == "") {
        this.$Message.warning("请填写文件标题");
        return;
      } else if (this.uploadForm.title.length > 20) {
        this.$Message.warning("标题字符过长");
        return;
      } else if (this.uploadForm.id == "") {
        this.$Message.warning("请选择文档类型");
        return;
      } else if (this.uploadForm.content === "") {
        this.$Message.warning("请编辑文件内容");
        return;
      } else if (this.uploadForm.content.length >= 2600) {
        this.$Message.warning("文件占位符过多,请删除多余的空格");
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
        this.submitLoading = true;
        this.submitText = "正在上传";
        this.getFileData();
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
