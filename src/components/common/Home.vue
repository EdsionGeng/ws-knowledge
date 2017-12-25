<template>
<div class="wslayout">
    <div class="wslayout-menu-left">
      <vSideBar></vSideBar>
    </div>
    <div class="wslayout-breadcrumb">
      <pageTitle :BreadData="breaddata"></pageTitle>
    </div>
    <div class="layout-content">
        <router-view></router-view>
    </div>
</div>
</template>
<script>
import pageTitle from "./PageTitle";
import vSideBar from "./SideBar";
export default {
  name: "home",
  data() {
    return {
      breaddata: []
    };
  },
  components: {
    vSideBar,
    pageTitle
  },
  created() {
    this.initBreadData();
  },
  watch: {
    $route: "initBreadData"
  },
  methods: {
    initBreadData() {
      const pname = this.$route.meta.pname;
      const cname = this.$route.meta.cname;
      const tname = this.$route.meta.tname;
      const lname = this.$route.meta.lname;
      this.breaddata = [];
      if (cname != "首页") {
        this.breaddata.push({
          name: pname,
          to: {}
        });
        if (cname !== undefined)
          this.breaddata.push({
            name: cname,
            to: {}
          });
        if (tname !== undefined)
          this.breaddata.push({
            name: tname,
            to: {}
          });
        if (lname !== undefined)
          this.breaddata.push({
            name: lname,
            to: {}
          });
      }
    }
  }
};
</script>
<style scoped>

</style>
<style>
.wslayout {
  background: #f5f7f9;
  position: relative;
  height: 100%;
  width: 100%;
}
.wslayout-menu-left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  background: #464c5b;
}
.wslayout-breadcrumb {
  position: absolute;
  top: 0;
  left: 240px;
  right: 0;
  height: 40px;
}
.layout-content {
  position: absolute;
  top: 40px;
  left: 240px;
  right: 0;
  bottom: 0;
  margin: 10px;
  overflow: auto;
  background-color: #fff;
  border-radius: 3px;
}
</style>
