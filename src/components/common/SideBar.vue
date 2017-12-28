<template>
  <div class="sidebar">
    <div>
      <search></search>
    </div>
    <Menu :theme="theme2" accordion @on-select="change" :active-name="this.$route.name">
      <MenuGroup title="" class='menuTitle'>
        <Menu-item name='home'>首页</Menu-item>
        <Submenu name="index" v-for='(item,index) in menuList' :key="index">
          <template slot="title">
            {{item.name}}
          </template>
          <Menu-item :name="list.menuurl" v-for='(list,index) in item.children' :key='index'>{{list.name}}</Menu-item>
        </Submenu>
      </MenuGroup>
    </Menu>
  </div>
</template>
<script>
import Search from "@/components/common/search";
import Vue from "vue";
import { Menu } from "iview";
Vue.component("Menu", Menu);
import { getUserMenus } from "../../api/all_interface";

export default {
  data() {
    return {
      theme2: "dark",
      active: sessionStorage.getItem("isAdmin"),
      menuListParams: { userId: sessionStorage.getItem("userId") },
      menuList: []
    };
  },
  mounted() {
    this.showUserMenus();
  },
  methods: {
    change(name) {
      this.$router.push("/" + name);
    },
    showUserMenus() {
      getUserMenus(this.menuListParams)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.menuList = res.data.data.slice(1);
            console.log(this.menuList);
          }
        })
        .catch(err => {});
    }
  },
  components: {
    Search
  }
};
</script>
<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 240px;
  left: 0;
  top: 0;
  bottom: 0;
  background: #495060;
  overflow-y: auto;
}
</style>
<style>
.ivu-menu-vertical .ivu-menu-item-group-title {
  height: 20px;
  line-height: 20px;
}
</style>

