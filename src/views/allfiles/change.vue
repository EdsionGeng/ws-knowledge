<template>
  <div>
    <div class="body-area">
      <Form :rules="ruleValidate" label-position="right" :label-width="100" :model='uploadForm' ref='formValidate'>
        <FormItem label=" 文件标题：" prop="title" class='mychangeform'>
          <Input v-model="uploadForm.title"  style="width: 200px;color:#333" disabled></Input>
        </FormItem>
        <FormItem label="文档类型：" prop="value">
          <docTree  :myvalue='uploadForm'></docTree>
        </FormItem>
        <FormItem label="封面：">
          <div >
            <Upload :show-upload-list='true'
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

        <FormItem label="内容：" prop='content'>
          <div class="hello">
            <div id="editor" type="text/plain" style="width:900px;height:400px;"></div>
           <div style='margin-top:10px;'>
             <Button @click="submits" type="primary">保存</Button>
             <Button @click="xieru" type="primary">写入</Button>
           </div>

          </div>
        </FormItem>
        <FormItem label="上传附件：" >

          <div class="uploadBtn">
            <Button type="primary" size="small" @click="uploadDoc=true" :show-upload-list='true'>上传附件</Button>
          </div>
        <Row v-for='(item,index) in fujainList' :key='index'>
           <i class="iconfont  icon-fujian" style='margin-right:8px;color:#009DD9;'></i>
           <span>{{item.title}} <span style='color:#ccc'>（{{item.fileSize}}）</span>  </span>
           <span style='padding-left:15px;color:#ccc'>描述：{{item.description}}</span>
        </Row>
        </FormItem>
        <div  v-if='canchangepower'>
          <FormItem label="权限设置：" prop='power'>
            <Tabs value="name1" type='card' class='newfileTab'  style="width:900px;">
              <TabPane label="可查阅人员" name="name1">
                <div>
                <Tree :data="depTree" show-checkbox multiple :render="renderContentDep" @on-check-change='chooseCheckPeople'></Tree>
                </div>
              </TabPane>
              <TabPane label="可编辑人员" name="name2"><div>
                <Tree :data="depTree" show-checkbox multiple :render="renderContentDep" @on-check-change='chooseEditPeople'>></Tree>
                </div>
              </TabPane>
              <TabPane label="可删除人员" name="name3">
                <div>
                  <Tree :data="depTree" show-checkbox multiple :render="renderContentDep"@on-check-change='chooseDelPeople'> ></Tree>
                </div>
              </TabPane>
            </Tabs>

          </FormItem>

        </div>
      
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
          <Button type='primary' size='large' @click="handleSubmit('formInline')">确定修改</Button>
           <Button style='margin-left:2%;' type='primary' size='large' @click="handleSubmit('formInline')">取消</Button>
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
import { getDocTree } from "../../api/all_interface";
import { getDepTree } from "../../api/all_interface";
import { queryUserByGroup } from "../../api/all_interface";
export default {
  data() {
    return {
       canchangepower:true,
       fujainList: [
        {
          fileSize: "100k",
          title: "我的文档",
          description: "sdfjsdfj osdafi sdf sdaf asdf sad"
        },
        {
          fileSize: "100k",
          title: "我的文档",
          description: "sdfjsdfj osdafi sdf sdaf asdf sad"
        },
        {
          fileSize: "100k",
          title: "我的文档",
          description: "sdfjsdfj osdafi sdf sdaf asdf sad"
        }
      ],
      ruleValidate: {
        title: [
          { required: true,message: '请填写文件标题', trigger: 'blur'},
          { type: "string", max: 20, message: "标题限制在20字以内"}
        ],
        value : [{ required: true, message: '请选择文件类型', trigger: 'change'}],
        content: [{ required: true }],
        power: [{ required: true }],
      },
      uploadForm:{
        title:'你是我的小啊小苹果',
        value:'',
        content:'',
        power:''
      },
      addFileParams: {
        title: "",
        describle: ""
      },
      showMenu: false,
      file: null,
      filedoc: null,
      loadingStatus: false,
      fileloadingStatus: false,
      // 编辑是根据查看人员进行筛选的
      depTree: [],
      editdepTree:[],
      deldepTree:[],

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
    chooseCheckPeople(val){
      if(val.length>0){
      console.log(val[0])
     
      let checkval=val[0];
      
      let editval=val[0]
      this.editdepTree=[];
      this.deldepTree=[];
      this.uploadForm.power=val
      this.editdepTree.push(checkval);
      this.deldepTree.push(editval);
      }
      },
    chooseDelPeople(val){console.log(val)},
    chooseEditPeople(val){console.log(val)},
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
    submits() {
      this.uedata.push(UE.getEditor("editor").getContent());
      console.log(this.uedata)
      let html=this.uedata.join("\n");
      console.log(this.uedata.join("\n"));
      this.uploadForm.content=html;
    },
    xieru() {
      UE.getEditor("editor").setContent("欢迎使用ueditor");
    },
    handleSubmit(name) {
        // 将文件上传中所有输入的信息已保存在uploadForm中
        if(this.uploadForm.title==''){
          this.$Message.warning('请填写文件标题');
        }else if(this.uploadForm.value==''){
          this.$Message.warning('请选择文件类型');
        }else if(this.uploadForm.content===''){
          this.$Message.warning('请编辑文件内容');
        }else if(this.uploadForm.power===''){
           this.$Message.warning('请选择文件权限');
        }else{
          this.$Message.success('上传成功');
        }
       console.log(this.uploadForm);
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
.mychangeform .ivu-input[disabled], fieldset[disabled] .ivu-input{
  color:#333
}
</style>

<style scoped>
.body-area {
  padding: 20px;
}

</style>
