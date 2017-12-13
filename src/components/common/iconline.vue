<template>
  <div>
      <div class='fujian'>
          <span><i :class="myclass"></i> <span style='padding-left:5px;'>{{msg}}</span></span>
            <span class="line"></span>
      </div>
  </div>
</template>
<script>
export default {
     props:['myclass','msg'],
  data(){
      return{
          
      }
  }
}
</script>
<style scoped>
    .fujian{
        width: 50%;
        display: flex;
        color:#2D8CF0;
        font-size:14px;
    }
    .line{
        height: 3px;
        background: linear-gradient(90deg,#2D8CF0,#fff);
        flex:1;
        margin-top:10px;
        margin-left:10px;
        border-radius: 3px;
    }
</style>
