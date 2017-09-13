<template>
  <div>
    <div class='Doc'><h2>文档管理</h2></div>
    <Filetit></Filetit>
    <Model></Model>
    <Forms></Forms>
    <Pages></Pages>
  </div>
</template>
<script>
import Filetit from "../File/filetit"
import Model from "../Notice/components/Modal"
import Forms from "../Notice/components/Forms"
import Pages from "../DocManage/components/pages"
export default {
  components:{
    Filetit,
    Model,
    Forms,
    Pages
  }
}
</script>

<style scoped>
.Doc{
  padding: 20px;
}
.Doc>h2{
color: #000;
}
</style>
