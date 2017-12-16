<template>
<div class="clearfix">
 <div class="search">
      <Input class='searchInput' size='large' v-model='inputValue'  icon="search" placeholder="搜索"
      style="width: 200px" @on-enter="changekeyRouter('keySearchPage')" @on-click="changekeyRouter('keySearchPage')"></Input>
  </div>
  <div class="creatFile">
       <Button  size='large' icon="plus" type='primary' @click="changeRouter('newfile')">新建文件</Button>
  </div>
</div>

</template>
<script>
export default {
   data(){
        return{
            inputValue:''
        }
    },
    methods:{
        changekeyRouter(name){
          console.log(this.inputValue);
          if(this.inputValue===''){
            this.$Message.warning('请输入关键字进行搜索');
          }
          this.$router.push('/'+name+'/'+this.inputValue);
      },changeRouter(name){
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
            font-size: 16px;
            color:#fff;
        }
</style>
