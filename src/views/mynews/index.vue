我的消息 路由mynews
<template>
  <div>
      <Card dis-hover>
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
           我的消息
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            换一换
        </a>
        <ul>
            <li v-for="item in mynews" :key='item.index' class="clearfix" >
                <a :href="item.url" target="_blank" class='fl'>{{ item.title }}</a>
                <span class='fr'>
                  
                    {{ item.timer}}
                </span>
            </li>
        </ul>
   
   
    </Card>
    
      <div class="file-page">
             <Page :total="mycount" show-total @on-change="changePage"></Page>
      </div>   
   
  </div>
</template>
<script>
import {getMynews} from '../../api/login'
export default {
        data () {

            return {
              mynews:[],
              mycount:0,
              
               
           
                randomMovieList: []
            }
        },
        created(){
            this.initfiledata();
        },
          
        methods: {
          changePage(){
            this.initfiledata();
          },
          initfiledata(){
             getMynews().then(res=>{
               if(res.data.code === 0){
                 this.mynews = res.data.data;
                 this.mycount = res.data.count;
               }
            
          })
         
         
        },
      
            changeLimit () {
                function getArrayItems(arr, num) {
                    const temp_array = [];
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    const return_array = [];
                    for (let i = 0; i<num; i++) {
                        if (temp_array.length>0) {
                            const arrIndex = Math.floor(Math.random()*temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }
                this.randomMovieList = getArrayItems(this.movieList, 5);
            }
        },
        mounted () {
            this.changeLimit();
        }
    }
</script>
<style scoped>
.file-page{
  margin-top: 20px;
  float: right;
}
</style>


