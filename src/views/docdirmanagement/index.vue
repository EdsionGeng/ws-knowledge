<template>
  <div>

    <div class="buttonarea">
      <Row>
        <Col span="1">
        <Button type="primary" size="small"  @click="insertFile=true" >添加</Button>
        </Col>
        <Col span="2">
        <Button type="primary" size="small" @click="deleteFileKind=true" >删除</Button>
        </Col>
      </Row>
    </div>
    <div class="doctree-sty ">
      <Tree :data="docTree" show-checkbox  multiple :render="renderContent"  >  </Tree>
    </div>


    <Modal
      v-model="insertFile"
      width="400"
      title="添加文件类型"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form  :model="insertFileParams" :label-width="90">

        <FormItem prop="adStyle" label="类型：">
          <Select placeholder="请选择" :clearable="true" v-model="docTree">
            <Tree :data="docTree" show-checkbox  multiple :render="renderContent"  >  </Tree>
          </Select>
        </FormItem>

        <FormItem prop="content" label="内容：">
          <Input type="text" :rows="4" placeholder="请输入内容！" v-model="insertFileParams.docName"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="  deleteFileKind"
      width="400"
      title="删除文件类型"
      @on-ok="sureDelete"
    >
      <Form  :model="insertFileParams" :label-width="90">
        <FormItem prop="adStyle" label="类型：">
          <Select placeholder="请选择" :clearable="true" v-model="docTree">
            <Tree :data="docTree" show-checkbox  multiple :render="renderContent"  >  </Tree>
          </Select>
        </FormItem>


      </Form>
    </Modal>
  </div>
</template>
<script>
  import {getDocTree} from "../../api/all_interface";

  export default {
    data() {
      return {
        docTree: [
        ],
        renderContent(h, {root, node, data}){
          return h('span',data.fileKindName)
        },
        insertFile:false,
        docTreeParams: {
          id: "",
          fileKindName: "",
          fileParentId: "",
          operationTime: "",
          checked: "",
          fileKind: ""
        },
        deleteFileKind:false,
        insertFileParams:{
          parentId:"",
          docName:"",
        },
      };
    },
    created() {
      this.showDocTree();
    },
    methods: {
      showDocTree() {
        let _doc=this
        getDocTree(this.docTreeParams).then(res => {
          _doc.docTree = res.data;
        })
      },
      ok() {
        // this.$Message.info('Clicked ok');
      },
      sureDelete(){



      }


    }
  }
</script>
<style scoped>
  .doctree-sty {
    margin-top: 20px;
    margin-left:40px;
  }
  .buttonarea{
    margin-top: 30px;
    margin-left:200px;

  }
</style>
