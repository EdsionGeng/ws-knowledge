<template>
  <div class="hello">
    <div id="editor" type="text/plain" style="width:1024px;height:500px;"></div>
    <button @click="submits">保存</button>
    <button @click="xieru">写入</button>
  </div>
</template>


<script>
  import '../../static/utf8-jsp/ueditor.config'
  import '../../static/utf8-jsp/ueditor.all';
  import '../../static/utf8-jsp/lang/zh-cn/zh-cn';
  export default {
    name: 'hello',
    data () {
      return {
        ue: '',
        uedata: [],
        xierudata: []
      }
    },
    mounted() {
      this.ue = UE.getEditor('editor',{
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/utf8-jsp/',
// toolbars:[]
      });
    },
    methods: {
      submits(){
        this.uedata.push(UE.getEditor('editor').getContent());
        console.log(this.uedata.join("\n"));
      },
      xieru(){
        UE.getEditor('editor').setContent('欢迎使用ueditor');
      }
    }
  }
</script>
