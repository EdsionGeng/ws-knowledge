<template>
  <div class="set">
    <div type="text/plain" id="ueditor"></div>
    <br>
    <Button @click="submits" type='primary'>保存</Button> 
    <Button @click="xieru" type='primary'>加载已保存的文件内容</Button> 
  </div>
</template>
<script>
import "../../static/utf8-jsp/ueditor.config";
import "../../static/utf8-jsp/ueditor.all";
import "../../static/utf8-jsp/lang/zh-cn/zh-cn";
export default {
  props:['ueditorContent'],
  name: "set",
  data() {
    return {
      ueditor1: "",
      ueditorText: "欢迎使用ueditor"
    };
  },
  mounted() {
      this.ueditor1 = UE.getEditor("ueditor", {
      serverUrl:'/static/',
      BaseUrl: "",
      initialFrameWidth:900  // null表示宽度自动
      ,initialFrameHeight:400,
      UEDITOR_HOME_URL: "static/utf8-jsp/"
      // toolbars: [
      //   ['fullscreen', 'source', 'undo', 'redo'],
      //   ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
      // ]
    });
   setTimeout(() => {
     this.xieru();
   }, 1000); 
  },
  destroyed(){
    this.ueditor1.destroy();
  },
  methods: {
    submits() {
      this.ueditorContent.content=UE.getEditor("ueditor").getContent();
      console.log(this.ueditorContent.content)
    },
    xieru() {
      UE.getEditor("ueditor").setContent(sessionStorage.getItem('content'));
    }
  }
};
</script>
