<template>
  <div class="components-container">
   
    <div class="editor-container">
      <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
    </div>
  </div>
</template>
<style>
  .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
</style>
<script>
  import UE from './common.vue';
  export default {
    components: {UE},
    data() {
      return {
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    methods: {
   
    }
  };
</script>