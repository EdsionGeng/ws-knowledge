<template>
  <div>
    这是新建文件页面

    <div class="body-area">
      <Form>
        <FormItem label=" 文件标题：">
          <Input v-model="addFileParams.title" placeholder="" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="文档类型:">
          <Input v-model="value4" icon="arrow-down-b" placeholder="文档类型" @on-click='dropmenu(!showMenu)'
                 style="width: 200px">
          </Input>
          <div v-if='showMenu' class="showmenubox">
            <Tree :data="docTree" :render="renderContent"></Tree>
          </div>
        </FormItem>
        <FormItem label="封面:">
          <div class="back">
            <Upload
              :before-upload="handleUpload"
              action="//jsonplaceholder.typicode.com/posts/">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件封面</Button>
            </Upload>
            <div v-if="file !== null"> 所选文件: {{ file.name }}
              <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '取消' : ' 确定上传？' }}
              </Button>
            </div>
          </div>
        </FormItem>

        <FormItem label="内容:">
          <div class="hello">
            <div id="editor" type="text/plain" style="width:900px;height:400px;"></div>
            <Button @click="submits" type="primary">保存</Button>
            <Button @click="xieru" type="primary">写入</Button>
          </div>
        </FormItem>
        <FormItem label="上传附件:">

          <div class="uploadBtn">
            <Button type="primary" size="small" @click="uploadDoc=true">上传附件</Button>
          </div>
        </FormItem>
        <FormItem label="权限设置:">
          <Tabs value="name1">
            <TabPane label="可查阅人员" name="name1"> <div><Tree :data="depTree" show-checkbox multiple :render="renderContentDep" ></Tree></div></TabPane>
            <TabPane label="可编辑人员" name="name2"><div> <Tree :data="depTree" show-checkbox multiple :render="renderContentDep" ></Tree></div></TabPane>
            <TabPane label="可删除人员" name="name3"><div> <Tree :data="depTree" show-checkbox multiple :render="renderContentDep" ></Tree></div></TabPane>
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
  import '../../../static/utf8-jsp/ueditor.config'
  import '../../../static/utf8-jsp/ueditor.all';
  import '../../../static/utf8-jsp/lang/zh-cn/zh-cn';
  import {getDocTree} from "../../api/all_interface";
  import {getDepTree} from "../../api/all_interface";
  import {queryUserByGroup} from "../../api/all_interface";
  export default {
    data() {
      return {
        addFileParams: {
          title: "",
          describle: "",

        },
        showMenu: false,
        file: null,
        filedoc: null,
        loadingStatus: false,
        fileloadingStatus: false,
        docTreeParams: {
          id: "",
          fileKindName: "",
          fileParentId: "",
          operationTime: "",
          checked: "",
          fileKind: ""
        },
        value4:"",
        depTree: [],
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
        ue: '',
        uedata: [],
        xierudata: [],
        docTree: [],


        uploadDoc: false,
      };
    },
    mounted() {
      this.ue = UE.getEditor('editor', {
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/utf8-jsp/',
// toolbars:[]
      });
    },

    created() {
      this.showDocTree();
      this.showDepTree();
    },
    methods: {

      renderContent(h, {root, node, data}) {
        return h('span',
          {
            style: {
              cursor: "pointer",
              marginLeft: "5px"
            },
            on: {
              click: () => {
                this.value4 = data.fileKindName;
//                this.dataParams.fileStyleId = data.id;

                this.showMenu = false;
              }
            }
          },
          data.fileKindName)
      },

      renderContentDep(h, {root, node, data}) {
        return h('span', data.name)
      },
      /**
       * 获取文档树形结构
       */
      showDocTree() {
        let _doc = this
        getDocTree(this.docTreeParams).then(res => {
          _doc.docTree = res.data;
        })
      },
      showDepTree() {
        let _self = this
        getDepTree(_self.depTreeParams).then(res => {
          _self.depTree = res.data;
        })
      },
      dropmenu(isshow) {
        this.showMenu = isshow;
        console.log(1212);
      },
      handleUpload(file) {
        this.file = file;
        return false;
      },
      handleSuccess(res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      upload() {
        this.loadingStatus = true;
        setTimeout(() => {
          this.file = null;
          this.loadingStatus = false;
          this.$Message.success('上传成功')
        }, 1500);
      },
      docupload() {
        this.fileloadingStatus = true;
        setTimeout(() => {
          this.filedoc = null;
          this.fileloadingStatus = false;
          this.$Message.success('上传成功')
        }, 1500);
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '友情提醒',
          desc: '文件  ' + file.name + '过大,已超过10M！'
        });
      },
      submits() {
        this.uedata.push(UE.getEditor('editor').getContent());
        console.log(this.uedata.join("\n"));
      },
      xieru() {
        UE.getEditor('editor').setContent('欢迎使用ueditor');
      }
    }


  }
</script>
<style scoped>
  .body-area {
    margin-left: 30px;
  }

  .body-area .hello {
    margin-left: 55px;

  }

  .body-area .back {
    margin-left: 55px;

  }

  .body-area .uploadBtn {
    margin-left: 55px;

  }
</style>
