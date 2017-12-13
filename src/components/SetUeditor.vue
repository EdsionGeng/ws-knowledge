<template>
  <div class="set">
    <div id="ueditor" type="text/plain" style="width:1024px;height:500px;"></div>
    <Button @click="submits">保存</Button> 
    <Button @click="xieru">写入</Button> 
  </div>
</template>
<script>
import "../../static/utf8-jsp/ueditor.config";
import "../../static/utf8-jsp/ueditor.all";
import "../../static/utf8-jsp/lang/zh-cn/zh-cn";
export default {
  name: "set",
  data() {
    return {
      ueditor: "",
      ueditorContent: [],
      ueditorText: "欢迎使用ueditor"
    };
  },
  mounted() {
    this.ueditor = UE.getEditor("ueditor", {
      BaseUrl: "",
      UEDITOR_HOME_URL: "static/utf8-jsp/"
      // toolbars: [
      //   ['fullscreen', 'source', 'undo', 'redo'],
      //   ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
      // ]
    });
  },
  methods: {
    submits() {
      this.ueditorContent.push(UE.getEditor("ueditor").getContent());
      console.log(this.ueditorContent.join("\n"));
    },
    xieru() {
      UE.getEditor("ueditor").setContent(this.ueditorText);
    }
  }
};
</script>
