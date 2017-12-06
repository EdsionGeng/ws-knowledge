<template>
<div class="page">
   部门： <Select v-model="model7" style="width:200px">
        <Tree :data="deptlist"></Tree> 
    </Select>
</div>  
</template>
<script>
 import { getDepTree } from "../../api/all_interface";

    export default {
        data () {
            return {
              data:null,
              deptlist:[],
              model7:''
            }
        },
        mounted(){this.showDepTree()},
        methods:{
          showDepTree(){
             getDepTree(this.data)
              .then(res => {
                console.log(res)
                const data = res.data;
      //          console.log(res.data);
                if (res.status == 200) {
                   //this.deptlist=this.push(name)
                  this.deptlist=data[0].children
                  console.log(this.deptlist)
                }
              })
              .catch(err => {});  
          }
        }
    }
</script>
<style scoped>
  .page{
    padding:10px;
  }
</style>
