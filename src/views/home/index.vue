<template>
<div>
    <div v-if='isAdmin'>
        <admin></admin>
    </div>
    <div v-if='!isAdmin'>
        <my-home></my-home>
    </div>
</div>
    
</template>
<style scoped>

</style>
<script>
import admin from './admin.vue';
import myHome from './myhome.vue';
export default {
  data(){
      return{
          isAdmin:sessionStorage.getItem('isAdmin')
      }
  },
  components:{
      admin,myHome
  }
}
</script>
