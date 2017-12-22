<template>
  <div class="set">
    <script type="text/plain" id="ueditor"></script>
    <br>
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
      ueditor1: ""
    };
  },
  mounted() {
    console.log(sessionStorage)
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
    },
    xieru() {
      if(this.ueditorContent.content!==''){
        UE.getEditor("ueditor").setContent(this.ueditorContent.content);
      }else{
        UE.getEditor("ueditor").setContent('');
      }
    }
  }
};
</script>
