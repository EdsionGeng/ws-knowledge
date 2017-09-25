<template>
<Card dis-hover>
  <div>
    <h2>文档类型管理</h2>
     <Button type="primary" @click='addFileType'>添加</Button>
    <div>
     <Tree :data="baseData"  @on-select-change="onslectchange"></Tree>
    </div>
  </div>
</Card>  
</template>
<script>

    export default {
        data () {
            return {
                // 定义基础数据
                baseData: [{
                    expand:true,
                    pId:1,
                    title:'规则制度',
                    children:[{
                        expand:true,
                        typeId:2,
                        title:'管理制度'
                    }]
                }],
                currtreedata:null,
                addData:{
                    typePid:null,
                    typeName:null
                }
            }
        },
        methods:{
            initFileTypeData(){

            },
            onslectchange(arr){
                // 获取当前选择的数据
                this.currtreedata=arr;
            },
            addFileType(){
                // 获取当前节点数据
                // 判断当前节点是否有子节点
                if(this.currtreedata[0].children!==undefined){
                    this.addData.typePid = this.currtreedata[0].pId;
                    // 
                }else{
                    this.addData.typePid = this.currtreedata[0].typeId;
                }
            }
          }
           
        }
    
</script>

