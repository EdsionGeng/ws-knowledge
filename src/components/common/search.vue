<template>
<div class="clearfix">
 <div class="search">
      <Input class='searchInput' size='large'  icon="search" placeholder="搜索" 
      style="width: 200px"></Input>
  </div>
  <div class="creatFile">
       <Button  size='large' icon="plus" @click="changeRouter('newfile')">新建文件</Button>
  </div>
</div>
 
</template>
<script>
export default {
   data(){
        return{
        }
    },
    methods:{
        changeRouter(name){
          console.log(name);
          this.$router.push('/'+name);
      }
    }
}
</script>
<style>
     .searchInput .ivu-input-icon{
      font-size: 22px;
       height: 40px;
       line-height: 40px;
    }
    .searchInput .ivu-input{
        border-radius:18px;
        height: 40px;
        line-height: 40px;
    }
</style>

<style scoped>
    .search{
        text-align:center;
        margin-top:10px;
    }
    .creatFile{
        text-align:center;
        margin-top:20px;
         
    }
        .creatFile button{
            height: 40px;
            width: 200px;
           
            border-radius:5px;
            font-size: 16px;  
            background: #009688;
            color:#fff;
            border:1px solid #009688;
        }
</style>
