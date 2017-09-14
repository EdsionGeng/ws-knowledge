<template>
  <div >
    <p class='title'>公告推送</p>
    <Modal></Modal>
   
    <DataTime></DataTime>
     <Forms></Forms> 
     <Pages></Pages>
  </div>
</template>
<script>
//公告推送
import DataTime from "../Notice/components/DataTime"
import Forms from "../Notice/components/Forms"

import Modal from "../Notice/components/Modal"
import Pages from "../DocManage/components/pages"
export default {
  components:{
    DataTime,
    Forms,
    Pages,
    Modal

  }
}
</script>
<style scoped>
 .title{
padding: 20px;
font-size: 18px;
font-weight: 700;
color:#000;
}
</style>



