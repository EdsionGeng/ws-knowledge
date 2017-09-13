<template>
  <div id="app">
    <v-home></v-home>
    <!-- <v-login></v-login> -->
  </div>
</template>

<script>
import vHome from './components/layout/Home';
import vLogin from './views/login/index';
import {mapActions} from 'vuex';
export default {
  name: 'app',
  components:{
    vHome,vLogin
  },
  data(){
    return{
      isLogin:this.$store.state.user.isLogin
    }
  },
  methods:{
    
  }
}
</script>

<style>
@import "../static/css/main.css";
</style>
