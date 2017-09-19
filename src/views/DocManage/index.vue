<template>
  <div class='contents'>
    <myinfo></myinfo>
    <updata></updata>
    <download></download> 
    <history></history> 

  </div>
</template>
<script>
import myinfo from "../DocManage/components/myinfo"
import updata from "../DocManage/components/updata"
import download from "../DocManage/components/download"
import history from "../DocManage/components/history"
import Imgs from "../DocManage/components/Imgs"
export default {
  components:{
    myinfo,
    updata,
    download,
    history,
  }

}
</script>
<style scoped>
.contents{
flex: 3;
}
</style>
  

