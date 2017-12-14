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
              action="/photo/upload.htmls">
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
            <TabPane label="可查阅人员" name="name1" style='height:600px'>
                <div class="lf">
                    <Tree :data="depTree" show-checkbox multiple :render="renderContentDep"
                          @on-check-change='chooseCheckPeople'></Tree>
                </div>
                  <div class="rt" style='height:600px;overflow: scroll'>
                    <Table  border ref="circleAdUsers" :columns="showUserGroupColumns" :data="showUserGroup"
                           @on-selection-change="chooseSingleUser1" v-show="usershow"></Table>

                  </div>
            </TabPane>
            <TabPane label="可编辑人员" name="name2" style='height:600px'>
              <div class="lf">
                <Tree :data="depTree" show-checkbox multiple :render="renderContentDep"
                      @on-check-change='chooseEditPeople'>>
                </Tree>
              </div>
              <div class="rt" style='height:600px;overflow: scroll'>
                <Table border ref="circleAdUsers" :columns="showUserGroupColumns" :data="showUserGroup"
                       @on-selection-change="chooseSingleUser2" v-show="usershow"></Table>

              </div>


            </TabPane>
            <TabPane label="可删除人员" name="name3" style='height:600px'>
              <div class="lf" style="width: 50%">
                <Tree :data="depTree" show-checkbox multiple :render="renderContentDep"
                      @on-check-change='chooseDelPeople'> >
                </Tree>
              </div>
              <div class="rt" >
                  <Table border ref="circleAdUsers" :columns="showUserGroupColumns" :data="showUserGroup"
                       @on-selection-change="chooseSingleUser3" v-show="usershow"></Table>
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
            :show-upload-list="true"
            multiple
            :before-upload="handleUpload"
            :on-success="handleSuccess"
            action="///jsonplaceholder.typicode.com/posts/">

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
        uploadForm: {
          title: '',
          value: '',
          content: '',
          power: ''
        },
        showUserGroupColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: "姓名",
            key: "username",
            width: 100,
          }],
//    String title = String.valueOf(jsonObject.get("title"));
//    String content = String.valueOf(jsonObject.get("content"));
//    String photourl = String.valueOf(jsonObject.get("photourl"));
//    String filesize = String.valueOf(jsonObject.get("filesize"));
//    String fileurl = String.valueOf(jsonObject.get("fileurl"));
//    String describe = String.valueOf(jsonObject.get("describe"));
//    Integer userId = Integer.parseInt(String.valueOf(jsonObject.get("userId")));
//    Integer fileStyleId = Integer.parseInt(String.valueOf(jsonObject.get("fileStyleId")));

        addFileParams: {
          title: "",
          describle: "",
          photourl: "",
          fileurl: "",
          content: "",
          filesize: "",
          fileStyleId: "",
          userId: 145
        },
        usershow: false,
        uploadList: [],
        showMenu: false,
        file: null,
        filedoc: null,
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
        ue: "",
        uedata: [],
        showUserGroup: [],
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
        BaseUrl: "",
        UEDITOR_HOME_URL: "static/utf8-jsp/"
        // toolbars:[]
      });
    },
    methods: {
      chooseCheckPeople(arr) {
        let fetchs = []
        let departmentName = "";
        let groupIds="";
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children === null) {
            let o = {
              userGroupId: arr[i].id
            }
            if (i > 0) {
              departmentName += ",";
              groupIds += ",";
            }
            departmentName += arr[i].name;
            groupIds += arr[i].id;
            fetchs.push(queryUserByGroup(o))
          }
          }

        Promise.all(fetchs).then(ret => {
          let tmpa = []
          ret.forEach(item => {
            // console.log('item:', item)
            tmpa = [...tmpa, ...item.data.data]
          })
          this.showUserGroup = tmpa;
          this.usershow = true;
        })
      },
      /**
       *选可以查看文件的人
       *
       */
      chooseSingleUser1(arr) {
        let userIds = "";
        let userNames = "";
        for (let i = 0; i < arr.length; i++) {
          if (i > 0) {
            userIds += ",";
            userNames += ",";
          }
          userIds += arr[i].id;
          userNames += arr[i].username;
        }

      },
      /**
       *选可以修改文件的人
       *
       */
      chooseSingleUser2(arr) {
        let userIds = "";
        let userNames = "";
        for (let i = 0; i < arr.length; i++) {
          if (i > 0) {
            userIds += ",";
            userNames += ",";
          }
          userIds += arr[i].id;
          userNames += arr[i].username;
        }

      },
      /**
       *选可以删除文件的人
       *
       */
      chooseSingleUser3(arr) {
        let userIds = "";
        let userNames = "";
        for (let i = 0; i < arr.length; i++) {
          if (i > 0) {
            userIds += ",";
            userNames += ",";
          }
          userIds += arr[i].id;
          userNames += arr[i].username;
        }
      },
      chooseDelPeople(arr) {
        let fetchs = []
        let departmentName = "";
        let groupIds="";
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children === null) {
            let o = {
              userGroupId: arr[i].id
            }
            if (i > 0) {
              departmentName += ",";
              groupIds += ",";
            }
            departmentName += arr[i].name;
            groupIds += arr[i].id;
            fetchs.push(queryUserByGroup(o))
          }
        }
        Promise.all(fetchs).then(ret => {
          let tmpa = []
          ret.forEach(item => {
            // console.log('item:', item)
            tmpa = [...tmpa, ...item.data.data]
          })
          this.showUserGroup = tmpa;
          this.usershow = true;
        })
      },
      chooseEditPeople(arr) {
        let fetchs = []
        let departmentName = "";
        let groupIds="";
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].children === null) {
            let o = {
              userGroupId: arr[i].id
            }
            if (i > 0) {
              departmentName += ",";
              groupIds += ",";
            }
            departmentName += arr[i].name;
            groupIds += arr[i].id;
            fetchs.push(queryUserByGroup(o))
          }
        }
        Promise.all(fetchs).then(ret => {
          let tmpa = []
          ret.forEach(item => {
            // console.log('item:', item)
            tmpa = [...tmpa, ...item.data.data]
          })
          this.showUserGroup = tmpa;
          this.usershow = true;
        })
      },
      renderContentDep(h, {root, node, data}) {
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
      handleUpload(file) {
        this.file = file;
        return false;
      },
      handleSuccess(res, file) {
        file.url =
          "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
        file.name = "7eb99afb9d5f317c912f08b5212fd69a";
      },
      upload() {
        this.loadingStatus = true;
        setTimeout(() => {
          this.file = null;
          this.loadingStatus = false;
          this.$Message.success("上传成功");
        }, 1500);
      },

      handleUpload(){
        const check = this.uploadList.length < 11;
        if (!check) {
          this.$Notice.warning({
            title: '最多上传十个附件！'
          });
        }
        return check;
      },
      docupload() {
        this.fileloadingStatus = true;
        setTimeout(() => {
          this.filedoc = null;
          this.fileloadingStatus = false;
          this.$Message.success("上传成功");
        }, 1500);
      },

      submits() {
        this.uedata.push(UE.getEditor("editor").getContent());
        console.log(this.uedata)
        let html = this.uedata.join("\n");
        console.log(this.uedata.join("\n"));
        this.uploadForm.content = html;
      },
      xieru() {
        UE.getEditor("editor").setContent("欢迎使用ueditor");
      },
      handleSubmit(name) {
        // 将文件上传中所有输入的信息已保存在uploadForm中
        if (this.uploadForm.title == '') {
          this.$Message.warning('请填写文件标题');
        } else if (this.uploadForm.value == '') {
          this.$Message.warning('请选择文件类型');
        } else if (this.uploadForm.content === '') {
          this.$Message.warning('请编辑文件内容');
        } else if (this.uploadForm.power === '') {
          this.$Message.warning('请选择文件权限');
        } else {
          this.$Message.success('上传成功');
        }
        //console.log(this.uploadForm);
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
