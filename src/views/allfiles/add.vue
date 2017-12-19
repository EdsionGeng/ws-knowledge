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
            <!--<div id="editor" type="text/plain" style="width:900px;height:400px;"></div>-->
          </div>
        </FormItem>
        <FormItem label="上传附件：">
          <div class="uploadBtn">
            <Button type="primary" size="small" @click="uploadDoc=true">上传附件</Button>
          </div>
        <Row v-for='(item,index) in fujainList' :key='index'>
           <i class="iconfont  icon-fujian" style='margin-right:8px;color:#009DD9;'></i><span>{{item.name}} <span style='color:#ccc'>（{{parseInt((item.size)/1024)+'k'}}）</span>  </span>
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
            <Radio label="0" >普通文件</Radio>
            <Radio label="1" >部门文件</Radio>
            <Radio label="2" >公司文件</Radio>
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
        <!--<FormItem label="上传附件:">-->
        <!--<div class="back">-->
        <!--<Upload-->
        <!--:before-upload="handleUpload"-->
        <!--action="//jsonplaceholder.typicode.com/posts/">-->
        <!--<Button type="ghost" icon="ios-cloud-upload-outline">上传文件封面</Button>-->
        <!--</Upload>-->
        <!--<div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '内容' : ' 确定上传？' }}</Button></div>-->
        <!--</div>-->
        <!--</FormItem>-->
        <FormItem label="">
          <Button type='primary' size='large' @click="handleSubmit('formInline')">确定上传</Button>
        </FormItem>
      </Form>
    </div>
    <Modal
      v-model="uploadDoc"
      width="400"
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
            action="http://192.168.3.26:8011/photo/upload.htmls">
            <Button type="ghost" icon="ios-cloud-upload-outline">附件上传</Button>
          </Upload >
          <div v-if="filedoc!== null">Upload file: {{ filedoc.name }}
            <Button type="text" @click="docupload" :loading="fileloadingStatus">{{ fileloadingStatus ? '内容' : ' 确定上传？'}}
            </Button>
          </div>
        </FormItem>
        <FormItem label=" 文件描述：">
          <Input v-model="uploadForm.describle" placeholder="" style="width: 200px" placeholder='请先写描述，再上传'></Input>

        </FormItem>
      </Form>
    </Modal>

  </div>
</template>
<script>
import Ueditor from "@/components/setUeditor";
import docTree from "@/components/common/docTree";
import { getDepTree } from "../../api/all_interface";
import { queryUserByGroup } from "../../api/all_interface";
import { insertFile } from "../../api/all_interface";
import { lookFileUser } from "../../api/all_interface";
import { updateFilePermission } from "../../api/all_interface";
import { deleteFilePermission } from "../../api/all_interface";
import { queryadmin } from "../../api/all_interface";

export default {
  data() {
    return {
     insertFileList:{},
      isSave:false,
      fujainList: [],
      uploadList: [],
      ruleValidate: {
        title: [
          { required: true, message: "请填写文件标题", trigger: "blur" },
          { type: "string", max: 20, message: "标题限制在20字以内" }
        ],
        value: [{ required: true, message: "请选择文件类型", trigger: "change" }],
        content: [{ required: true }],
        power: [{ required: true }]
      },

      uploadForm: {
        userId:sessionStorage.getItem('userId'),
        fileType:'0',
        title: "",
        id: "",
        content: "",
        fileurl:'',
        photourl:'./bg.jpg',
        filesize:0,
        describle:''
      },
      lookFileParams: {
        userIds: "",
        fileId: "",
        operationStyleId:1
      },
      updateFileParams: {
        userIds: "",
        operationStyleId:1,
        fileId: ""
      },
      deleteFileParams: {
        userIds: "",
        operationStyleId:1,
        fileId: ""
      },
      showMenu: false,
      file: null,
      filedoc: null,
      loadingStatus: false,
      fileloadingStatus: false,
      // 编辑是根据查看人员进行筛选的
      depTree: [],
      editdepTree: [],
      deldepTree: [],
      canMove:false,
      adminIds:'',
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
      uedata: [],
      xierudata: [],
      uploadDoc: false
    };
  },
  components: {
    docTree,
    Ueditor
  },
  mounted() {
    this.adminPower();
    this.uploadList = this.$refs.upload.fileList;
    this.showDepTree();
    this.showeditDepTree();
    this.showdelDepTree();
    if(sessionStorage.getItem('title')){
      this.uploadForm.title=sessionStorage.getItem('title');
      this.uploadForm.id=sessionStorage.getItem('fileId');
      this.uploadForm.content=sessionStorage.getItem('content');
      this.uploadForm.power=sessionStorage.getItem('power');
      this.uploadForm.photourl=sessionStorage.getItem('photourl');
    }
  },
  // beforeDestroy(){
  //   this.isSave=true;
  //   console.log(this.isSave)
  // },
  beforeRouteLeave(to,from,next){
    console.log(this.uploadForm);
    if(this.uploadForm.title!==''||this.uploadForm.id!==''||this.uploadForm.content!==''){
      next(false);
      this.$Modal.confirm({
                    title: '保存当前内容',
                    content: '<p>是否保存当前编辑的内容</p>',
                    onOk: () => {
                        sessionStorage.setItem('title',this.uploadForm.title)
                        sessionStorage.setItem('fileId',this.uploadForm.id)
                        sessionStorage.setItem('content',this.uploadForm.content)
                        sessionStorage.setItem('photourl',this.uploadForm.photourl)
                        sessionStorage.setItem('fileUrlUrl',this.fujainList)
                        next();
                    },
                    onCancel: () => {
                       next();
                    }
                });
    }else{
      next();
    }
    console.log(sessionStorage)
  },
  methods: {
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      console.log("上传成功返回的信息");
      const fileList = this.$refs.fujianupload.fileList;
      if(res.code===2){
        this.$refs.fujianupload.fileList.splice(fileList.indexOf(file), 1);
         this.$Notice.warning({
          title: res.msg
        });
      }else{
      file.description = this.uploadForm.describle;
      console.log(fileList)
      this.fujainList=fileList;
      var newArry=[];
      for (let i=0;i<fileList;i++){
        console.log(this.fujainList[i].response)   
        newArry.push(this.fujainList[i].response.data);
      }
      this.uploadForm.fileurl=newArry.join(',');
    }
    },
    pichandleSuccess(res, file) {
      console.log("上传成功返回的信息");
      this.uploadForm.photourl=res.data;
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
    handleBeforeUpload() {
      const check = this.uploadList.length < 10;
      if (!check) {
        this.$Notice.warning({
          title: "附件上传已达上限"
        });
      }
      return check;
      // return false;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    pichandleMaxSize(file) {
      this.$Notice.warning({
        title: "大小限制",
        desc: "File  " + file.name + " 头像大小不能超过2M"
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    toBold($el){
      console.log(1111111)
      console.log($el)
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
          userIds.push(arr[i].id)
        }
      }
    this.lookFileParams.userIds=userIds.join(',')
    },
    chooseDelPeople(arr) {   
      var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].id)
        }
      }
 this.deleteFileParams.userIds=userIds.join(',')          
    },
    chooseEditPeople(arr) {
       var userIds = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children === null) {
          userIds.push(arr[i].id)
        }
      }
     this.updateFileParams.userIds=userIds.join(',')
     console.log(this.deleteFileParams.userIds)
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
        console.log(res.data);
      });
    },
      showeditDepTree() {
      let _self = this;
      getDepTree(_self.depTreeParams).then(res => {
        _self.editdepTree=res.data;
        console.log(res.data);
      });
    },
      showdelDepTree() {
      let _self = this;
      getDepTree(_self.depTreeParams).then(res => {
        _self.deldepTree=res.data;
        console.log(res.data);
      });
    },
    handleUpload(file) {
      console.log(1111111);
      this.file = file;
      console.log(file);
      //return false;
    },
    upload() {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success("上传成功");
      }, 1500);
    },
    docupload() {
      this.fileloadingStatus = true;
      setTimeout(() => {
        this.filedoc = null;
        this.fileloadingStatus = false;
        this.$Message.success("上传成功");
      }, 1500);
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "友情提醒",
        desc: "文件  " + file.name + "过大,已超过10M！"
      });
    },
    upFileloadSuccess(){
        this.insertFileList.title=this.uploadForm.title;
        this.insertFileList.content=this.uploadForm.content;
        this.insertFileList.photourl=this.uploadForm.photourl;
        this.insertFileList.fileurl=this.uploadForm.fileurl;
        this.insertFileList.userId=this.uploadForm.userId;
        this.insertFileList.fileStyleId=this.uploadForm.id;
        this.insertFileList.filesize=this.uploadForm.filesize;
        this.insertFileList.fileSpecies=this.uploadForm.fileType;
        insertFile(this.insertFileList)
        .then(res => {
          if (res.data.code == 0) {
            console.log('新建文件成功');
            this.lookFileParams.fileId=res.data.data;
            this.updateFileParams.fileId=res.data.data;
            this.deleteFileParams.fileId=res.data.data;
            console.log(res.data.data);
            if(this.lookFileParams.userIds===''){
                this.lookFileParams.userIds=','+this.adminIds;
            }
            console.log(this.lookFileParams.userIds);
            lookFileUser(this.lookFileParams)
            .then(res => {
              console.log(res.data); 
              if (res.data.code == 0) {
                console.log('设置权限成功');
                if(this.updateFileParams.userIds===''){
                 
                     this.updateFileParams.userIds=','+this.adminIds;
                     console.log(this.updateFileParams.userIds)
                  }
                  updateFilePermission(this.updateFileParams)
                    .then(res => {
                      console.log(res.data); 
                      if (res.data.code == 0) {
                        console.log('设置修改权限成功');   
                         if(this.deleteFileParams.userIds===''){
                           
                             this.deleteFileParams.userIds=','+this.adminIds;
                          }
                          deleteFilePermission(this.deleteFileParams)
                          .then(res => {
                            console.log(res.data); 
                            if (res.data.code == 0) {
                              console.log('设置删除权限成功');
                                this.$Message.success("上传成功,2s后少跳转到历史上传界面");
                              setTimeout(()=>{
                                this.$router.push('/hisupload')
                              })
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
        console.log(this.insertFileList)
        console.log(this.uploadForm);
      
    },
    adminPower(){
       queryadmin().then(res => {
            console.log('管理员账户');
            console.log(res.data); 
              if (res.data.code == 0) {    
                var newArr=[];
                for (let val of res.data.data){
                  console.log(val)
                    newArr.push(val);
                }
                  this.adminIds=newArr.join(',')
                  console.log(this.adminIds)
              }
            })
      .catch(err => {});
    },
    handleSubmit(name) {
      // 将文件上传中所有输入的信息已保存在uploadForm中
      if (this.uploadForm.title == "") {
        this.$Message.warning("请填写文件标题");
        return;
      } else if (this.uploadForm.id == "") {
        this.$Message.warning("请选择文件类型");
        return;
      } else if (this.uploadForm.content === "") {
        this.$Message.warning("请编辑文件内容");
        return;
       }else if (
        this.lookFileParams.userIds.indexOf(this.updateFileParams.userIds) == -1
      ) {
        this.$Message.warning("修改文件权限的人超过查看文件权限的人");
        return;
      } else if (
        this.lookFileParams.userIds.indexOf(this.deleteFileParams.userIds) == -1
      ) {
        this.$Message.warning("删除文件权限的人超过查看文件权限的人");
        return;
      }
      else {
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

.body-area .hello {
}

.body-area .back {
}

.body-area .uploadBtn {
}
</style>
