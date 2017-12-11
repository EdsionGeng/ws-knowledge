<template>
<div style='display:inline-block;position:relative'>
    <Input v-model="myvalue.value" icon="arrow-down-b" placeholder="类型" @on-click='dropmeun(!showMenu)' style="width: 200px">   
    </Input>
    <div v-show='showMenu' class="showmenubox">
         <Tree :data="docTreeList"  multiple   :render="renderContent"></Tree>   
    </div> 
</div>
</template>
<script>
import { getDocTree } from "../../api/all_interface";
export default {
    props:["myvalue"],
  data() {
    return {
      showMenu: false,
       docTreeList:[],
        docTreedata:{
          id: "",
          deptno: "",
          no: "",
          pid: "",
          type: "",
          checked: "",
          name: "",
          department: ""
        },
    };
  },
  mounted(){
    this.showDocKind();
  },
  methods: {
     showDocKind(){
      getDocTree(this.docTreedata).then(res=>{
        if(res.status==200){
         this.docTreeList=res.data;
        }
      })
    },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            cursor: "pointer",
            marginLeft: "5px"
          },
          on: {
            click: () => {
              this.myvalue.value = data.fileKindName;
              this.showMenu = false;
            }
          }
        },
        data.fileKindName
      );
    },
    dropmeun(isshow) {
      this.showMenu = isshow;
    }
  }
};
</script>
<style scoped>
.showmenubox {
  border: 1px solid #eee;
      margin: 5px 0;
    padding: 5px 0;
  min-width: 200px;
  border-radius: 4px;
  position: absolute;
  top: 32px;
  left: 0;
  z-index: 9999;
  background: #fff;
  transform-origin: center top 0px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  max-height:200px;
  overflow: auto;
}
.showmenubox.hide {
  height: 0;
}
</style>
