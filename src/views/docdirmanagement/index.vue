<template>
  <div>

    <div class="buttonarea">
      <Row>
        <Col span="1">
        <Button type="primary" size="small" >添加</Button>
        </Col>
        <Col span="2">
        <Button type="primary" size="small" >删除</Button>
        </Col>
      </Row>
    </div>
    <div class="doctree-sty ">

        <Tree :data="docTree" show-checkbox multiple :render="renderContent"></Tree>

    </div>
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
        docTreeParams: {
          id: "",
          fileKindName: "",
          fileParentId: "",
          operationTime: "",
          checked: "",
          fileKind: ""
        }

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
          console.info(_doc.docTree);

        })
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
