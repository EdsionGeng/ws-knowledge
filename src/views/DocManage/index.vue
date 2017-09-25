<template>
  <div>
    <h2>文档类型管理</h2>
     <Button type="primary" v-on:click='add()'>add</Button>
    <div>
     <Tree :data="baseData"  @on-select-change="onslectchange"></Tree>
    </div>
  </div>
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
                        typeId:1,
                        title:'管理制度'
                    }]
                }]
            }
        },
        methods:{
          onslectchange(arr){
              // 获取当前选择的数据
              console.log(arr);
          }
        }
    }
</script>

