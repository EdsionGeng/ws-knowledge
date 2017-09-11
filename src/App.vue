<template>
  <div id="app">
    <v-home></v-home>
    <!-- <v-login></v-login> -->
  </div>
</template>

<script>
import vHome from './components/layout/Home';
import vLogin from './views/login/index';
export default {
  name: 'app',
  components:{
    vHome,vLogin
  }
}
</script>

<style>
@import "../static/css/main.css";
</style>
