<template>
  <div class="sidebar">
      <div>
        <search></search>
      </div>
  
    <Menu :theme="theme2" accordion @on-select="change">
         <MenuGroup title="首页" class='menuTitle'>
            <Submenu name="1">
                <template slot="title">
                    文件管理
                </template>
                <Menu-item name="CRUD">全部文件</Menu-item>
                <Menu-item name="1-2">历史上传</Menu-item>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    管理中心
                </template>
                <Menu-item name="2-1">消息推送</Menu-item>
                <Menu-item name="2-2">文档管理</Menu-item>
                <Menu-item name="2-2">文档目录管理</Menu-item>
            </Submenu>
        </MenuGroup>
    </Menu>
  </div>
</template>
<script>
import Search from '@/components/common/search';
import Vue from 'vue'
import { Menu } from 'iview';
Vue.component('Menu', Menu);
export default {
  data(){
      return{
          theme2:'dark'
      }
  },
  methods:{
      change(name){
          console.log(name);
          this.$router.push('/'+name);
      }
  },
  components:{
      Search
  }
}
</script>


<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 240px;
        left: 0;
        top:0;
        bottom: 0;
        background: #495060;
        overflow-y: auto;
    }
   
   
</style>
