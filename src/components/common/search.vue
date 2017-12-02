<template>
<div class="clearfix">
 <div class="search">
      <Input class='searchInput' size='large'  icon="search" placeholder="搜索" 
      style="width: 200px"></Input>
  </div>
  <div class="creatFile">
       <Button type='primary' size='large' icon="plus">新建文件</Button>
  </div>
</div>
 
</template>
<script>
export default {
   data(){
        return{
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
        margin-top:20px;
    }
    .creatFile{
        text-align:center;
        margin-top:20px;
         
    }
        .creatFile button{
            height: 40px;
            width: 200px;
            border-radius:5px;
            font-size: 18px;  
        }
</style>
