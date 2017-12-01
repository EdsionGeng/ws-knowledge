import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex);

// const store = new Vuex.Store({
//     state:{
//         isLogin:false
//     },
//     mutations:{
//         add(state){
//             state.isLogin=true;
//         }
//     },
//     actions:{
//         add(context){
//             context.commit('add');
//         }
//     }

// });



const store = new Vuex.Store({
    modules:{
        user
    }
});


export default store;