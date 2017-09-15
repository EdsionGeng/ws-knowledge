
<template>
  <div>
    <Search></Search>
    <Btn></Btn>
    <div style='margin:0 20px;'>
        <Imgs></Imgs>
    </div>
    <Pages></Pages>
  </div>
</template>
<script>
// 全部文件
import Search from './search'
import Btn from "./Btn"
import Imgs from "../DocManage/components/Imgs"
import Pages from "../DocManage/components/pages"
export default {
  components:{
    Search,
    Btn,
    Imgs,
    Pages

   
  }
}
</script>

