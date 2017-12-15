<template>
  <div>

    <div class="buttonarea">
      <Row>
        <Col span="1">
        <Button type="primary"  @click="insertFile=true">添加</Button>
        </Col>
        <Col span="2">
        <Button type="primary"  v-model="open" @click="deleteFileKind">删除</Button>
        </Col>
      </Row>
    </div>
    <div class="doctree-sty ">
      <Tree :data="docTree" :render="renderContent1"></Tree>
    </div>


    <Modal
      v-model="insertFile"
      width="400"
      title="添加文件类型"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :model="insertFileParams" :label-width="90">

        <FormItem prop="adStyle" label="类型：">
          <Input v-model="value4" icon="arrow-down-b" placeholder="文档类型" @on-click='dropmenu(!showMenu)'
                 style="width: 200px">
          </Input>
          <div v-if='showMenu' class="showmenubox">
            <Tree :data="docTree" :render="renderContent"></Tree>
          </div>
        </FormItem>

        <FormItem prop="content" label="内容：">
          <Input type="text" :rows="4" placeholder="请输入内容！" v-model="insertFileParams.docName"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="open "
      width="400"
      title="删除文件类型"
    >
      <p v-show="fileStyleShow">此文档类型对应的文件数量为<strong style="color:red">{{filePcs}}</strong>，请先删除相应的文件再进行操作！</p>
      <p v-show="pShow">此文档类型对应的文件数量为0，可以进行删除！</p>
      <Button type="primary" @click="sureDelete" v-show="sureShow">确认删除!</Button>
    </Modal>
  </div>
</template>
<script>
  import {getDocTree} from "../../api/all_interface";
  import {insertDocKind} from "../../api/all_interface";
  import {deleteDocRule} from "../../api/all_interface";
  import {countFileStyle} from "../../api/all_interface";

  export default {
    data() {
      return {
        docTree: [],
        docTree1: [],
        insertFile: false,
        docTreeParams: {
          id: "",
          fileKindName: "",
          fileParentId: "",
          operationTime: "",
          checked: "",
          fileKind: ""
        },
        pShow: "false",
        filePcs: "",
        open: false,
        deleteDocParams: {
          fileStyleId: "",
        },
        fileStyleShow: false,
        value4: "",
        showMenu: false,
        sureShow: false,
        insertFileParams: {
          parentId: "",
          docName: "",
        },
      };
    },
    created() {
      this.showDocTree();
    },
    methods: {
      showDocTree() {
        let _doc = this
        getDocTree(this.docTreeParams).then(res => {
          _doc.docTree = res.data;
        })
      },
      dropmenu(isshow) {
        this.showMenu = isshow;

      },
      renderContent1(h, {root, node, data}) {
        return h('span',
          {
            style: {
              cursor: "pointer",
              marginLeft: "5px"
            },
            on: {
              click: () => {
                if (data.children != null) {
                  this.$Message.warning("请点击树形结构分支末尾节点，再进行删除操作");
                  return
                }
                this.deleteDocParams.fileStyleId = data.id;
              }
            }
          }, data.fileKindName)
      },
      deleteFileKind() {
        if (this.deleteDocParams.fileStyleId == "") {
          this.$Message.warning("请点击树形结构想要调整的目录！")
          return
        }
        this.open = true;
        countFileStyle(this.deleteDocParams).then(res => {
          let _self = this;
          const data = res.data;
          if (data.data != 0) {
            _self.fileStyleShow = true;
            _self.filePcs = data.data;
            _self.deleteDocParams.fileStyleId = "";
            _self.pShow =false;
            _self.sureShow = false;
            return
          }
          else {
            _self.fileStyleShow = false;
            _self.pShow = true;
            _self.sureShow = true;

          }

        }).catch(err => {
        });


      },
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
                this.insertFileParams.parentId = data.id;
                this.showMenu = false;
              }
            }
          }, data.fileKindName)
      },
      sureDelete() {
        console.info(this.deleteDocParams.fileStyleId)
        deleteDocRule(this.deleteDocParams).then(res => {
          let _self = this;
          const data = res.data;
          console.info(res.data);
          if (data.code == 0) {
            _self.deleteDocParams.fileStyleId = "";
            _self.$Message.success(data.msg);
            _self.showDocTree();
            _self.open=false;
          }
          else{
            _self.$Message.warning(data.msg);
          }
        }).catch(err => {
        });

      },
      ok() {
        insertDocKind(this.insertFileParams).then(res => {
          let _self = this;
          const data = res.data;
          if (data.code == 0) {
            _self.$Message.success("操作成功");
            _self.insertFileParams.docName = "";
            _self.insertFileParams.parentId = "";
            _self.showDocTree();
          }
        }).catch(err => {
        });
      },
      cancel() {

      }
      // this.$Message.info('Clicked ok');
    },
  }
</script>
<style scoped>
  .doctree-sty {
    margin-top: 20px;
    margin-left: 40px;
  }

  .buttonarea {
    margin-top: 30px;
    margin-left: 200px;

  }
</style>
