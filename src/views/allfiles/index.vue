<template>
  <div>
      <div>
        <PageTitle :BreadTitle='BreadTitle'></PageTitle>
      </div>
      这是所有文件页面
  </div>
</template>
<script>
import PageTitle from '@/components/common/PageTitle'
export default {
  data(){
      return {
        BreadTitle:['文件管理','全部文件']
      };
  },
  components:{
    PageTitle
  }

}
</script>
<style scoped>

</style>
