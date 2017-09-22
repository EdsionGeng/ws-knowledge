<template>
  <div>
     <Hisup></Hisup>
      <Pages></Pages>
     
  </div>
</template>
<script>
//历史上传
import Pages from "@/views/DocManage/components/pages"
import Hisup from '@/views/Hsup/hisup'
export default {
  components:{
    Pages,
    Hisup
  }
}
</script>

