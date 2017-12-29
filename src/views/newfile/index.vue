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
              :before-upload="handleUpload"
              :on-success="uploadPhoto"
              :format="['jpg','jpeg','png']"
              action="http://192.168.22.45:8011/photo/upload.htmls">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件封面</Button>
            </Upload>
            <div v-if="file !== null"> 所选文件: {{ file.name }}
              <Button type="text" @click="upload " :loading="loadingStatus">{{ loadingStatus ? '取消' : ' 确定上传？' }}
              </Button>
            </div>
          </div>
        </FormItem>

        <FormItem label="内容：" prop='content'>
          <div class="hello">
            <div id="editor" type="text/plain" style="width:900px;height:400px;"></div>
            <div style='margin-top:10px;'>
              <Button @click="submits" type="primary">保存</Button>
              <Button @click="xieru" type="primary">写入</Button>
            </div>

          </div>
        </FormItem>
        <FormItem label="上传附件：">

          <div class="uploadBtn">
            <Button type="primary" size="small" @click="uploadDoc=true">上传附件</Button>
          </div>
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
                <Tree :data="depTree1" show-checkbox multiple :render="renderContentDep"
                      @on-check-change='chooseEditPeople'>>
                </Tree>
              </div>
            </TabPane>
            <TabPane label="可删除人员" name="name3">
              <div>
                <Tree :data="depTree2" show-checkbox multiple :render="renderContentDep"
                      @on-check-change='chooseDelPeople'> >
                </Tree>
              </div>
            </TabPane>
          </Tabs>
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
            :show-upload-list="false"
            multiple
            :max-size="10240"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleUpload"
            :on-success="handleSuccess"
            action="//jsonplaceholder.typicode.com/posts/">

            <Button type="ghost" icon="ios-cloud-upload-outline">附件上传</Button>
          </Upload>
          <div v-if="filedoc!== null">Upload file: {{ filedoc.name }}
            <Button type="text" @click="docupload" :loading="fileloadingStatus">{{ fileloadingStatus ? '内容' : ' 确定上传？'}}
            </Button>
          </div>
        </FormItem>
        <FormItem label=" 文件描述：">
          <Input v-model="addFileParams.describle" placeholder="" style="width: 200px"></Input>
        </FormItem>

      </Form>
    </Modal>

  </div>
</template>
<script>
  import "../../../static/utf8-jsp/ueditor.config";
  import "../../../static/utf8-jsp/ueditor.all";
  import "../../../static/utf8-jsp/lang/zh-cn/zh-cn";
  import docTree from "@/components/common/docTree";
  import {getDocTree} from "../../api/all_interface";
  import {getDepTree} from "../../api/all_interface";
  import {queryUserByGroup} from "../../api/all_interface";
  import {deleteFilePermission} from "../../api/all_interface";
  import {lookFileUser} from "../../api/all_interface";
  import {updateFilePermission} from "../../api/all_interface";
  import {insertFile} from "../../api/all_interface";
  export default {
    data() {
      return {
        ruleValidate: {
          title: [
            {required: true, message: '请填写文件标题', trigger: 'blur'},
            {type: "string", max: 20, message: "标题限制在20字以内"}
          ],
          value: [{required: true, message: '请选择文件类型', trigger: 'change'}],
          content: [{required: true}],
          power: [{required: true}],
        },

        addFileParams: {
          title: "",
          describle: "",
          fileutl:"",
          photourl:"",
          fileStyleId:"",
        },
        showMenu: false,
        file: null,
        loadingStatus: false,
        fileloadingStatus: false,
        // 编辑是根据查看人员进行筛选的
        depTree: [],
        editdepTree: [],
        deldepTree: [],
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
        lookFileParams:{
          userIds:"",
          userId:"",
          fileId:""
        },
        updateFileParams:{
          userIds:"",
          userId:"",
          fileId:""
        },
        deleteFileParams:{
          userIds:"",
          userId:"",
          fileId:""
        },
        ue: "",
        uedata: [],
        xierudata: [],
        uploadDoc: false
      };
    },
    components: {
      docTree
    },
    mounted() {
      this.showDepTree();
      this.ue = UE.getEditor("editor", {
        BaseUrl:"",
        UEDITOR_HOME_URL: "static/utf8-jsp/"
        // toolbars:[]
      });
    },
    methods: {
      chooseCheckPeople(arr) {
        let  userIds="";
        let departmentName="";
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children === null) {
            if (i > 0) {
              userIds += ",";
            }
            userIds += arr[i].id;

            if (arr[i].children != null) {
              departmentName += arr[i].name;
            }

          }

        }
        this.lookFileParams.userIds=userIds;
      },
      chooseDelPeople(arr) {
        let  userIds="";
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children === null) {
            if (i > 0) {
              userIds += ",";
            }
            userIds += arr[i].id;
          }
        }
      },
      chooseEditPeople(arr) {
        let  userIds="";
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children === null) {
            if (i > 0) {
              userIds += ",";
            }
            userIds += arr[i].id;
          }
        }
      },
      renderContentDep(h, {root, node, data}) {
        return h("span", data.name);
      },
      /**
       *
       * 获取文档树形结构
       */

      showDepTree() {
          let _self = this;
          getDepTree(_self.depTreeParams).then(res => {
           const data=res.data;
           if(data.code==0){
             _self.depTree =data.data;
             console.info("jj"+"",+data.data);
           }

        });
      },
      handleUpload(file) {
        this.file = file;
        return false;
      },
      handleSuccess(res, file) {
        file.url  = "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
        file.name = "7eb99afb9d5f317c912f08b5212fd69a";
      },
      upload() {
        this.loadingStatus = true;
        setTimeout(() => {
          this.file = null;
          this.loadingStatus = false;

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
      uploadPhoto(response, file, fileList) {
        console.info("上传成功响应" + response);
      },
      submits() {
        this.uedata.push(UE.getEditor("editor").getContent());

        let html = this.uedata.join("\n");
        this.uploadForm.content = html;
      },
      xieru() {
        UE.getEditor("editor").setContent("欢迎使用ueditor");
      },
      handleSubmit(name) {
        // 将文件上传中所有输入的信息已保存在uploadForm中
        if (this.addFileParams.title == '') {
          this.$Message.warning('请填写文件标题');
          return
        } else if (this.addFileParams.fileStyleId == '') {
          this.$Message.warning('请选择文件类型');
          return
        } else if (this.addFileParams.content === '') {
          this.$Message.warning('请编辑文件内容');
          return
        } else if (this.lookFileParams.userIds === '') {
          this.$Message.warning('请选择可以查看文件的人！');
          return
        }
        else if (this.lookFileParams.userIds.indexOf(this.updateFileParams.userIds) ==-1) {
          this.$Message.warning('修改文件权限的人超过查看文件权限的人');
          return
        }
          else if (this.lookFileParams.userIds.indexOf(this.deleteFileParams.userIds) ==-1) {
              this.$Message.warning('删除文件权限的人超过查看文件权限的人');
              return
        } else {





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
