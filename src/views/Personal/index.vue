<template>
<div class='personal'>
   <Card dis-hover>
       <div class='mainTitle clearfix'>
            <p slot="title" class='fl'>
                <Icon type="ios-film-outline"></Icon>
                我的消息
            </p>
            <a href="#" slot="extra" @click.prevent="changeLimit" class='fr'>
                <Icon type="ios-loop-strong"></Icon>
                换一换
            </a>
        </div>
        <ul>
            <li v-for="item in randomMovieList" :key='item.index' class="clearfix" >
                <a :href="item.url" target="_blank" class='fl'>{{ item.name }}</a>
                <span class='fr'>
                  
                    {{ item.rate }}
                </span>
            </li>
        </ul>
   
   
    </Card>
    <Card dis-hover style='margin-top: 20px;'v-for='item in 3' key='item.index'>
        
            <div class="allTitel clearfix">
                <p slot="title" class='fl'>
                    <Icon type="ios-film-outline"></Icon>
                    最新上传
                </p>
                <a href="#" slot="extra" @click.prevent="changeLimit" class='fr'>
                    <Icon type="ios-loop-strong"></Icon>
                    更多
                </a>
            </div>         
            <Row>
                <Col class="file-card" span="6" v-for="list in filelist" :key="list.index">
                    <router-link to="details">
                    <Card style="width:232px">
                        <div style="">
                            <img class="file-img" v-bind:src="list.img">
                            <h6>{{list.title}}</h6>
                            <span>{{list.timer}}</span>
                            <span>{{list.down}}</span>
                        </div>
                    </Card>
                    </router-link>
                </Col>
            </Row>
     
    </Card>
  
</div>
<!-- <Card>
    <Card>
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            经典电影
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            换一换
        </a>
        <ul>
            <li v-for="item in randomMovieList" :key='item.index' class="clearfix" >
                <a :href="item.url" target="_blank" class='fl'>{{ item.name }}</a>
                <span class='fr'>
                  
                    {{ item.rate }}
                </span>
            </li>
        </ul>
   
   
    </Card>
   
     <div class="allTitel clearfix">
        <p slot="title" class='fl'>
            <Icon type="ios-film-outline"></Icon>
            最新上传
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit" class='fr'>
            <Icon type="ios-loop-strong"></Icon>
            更多
        </a>
    </div> 
        
    
 
    <div class="file-list">
          <Row>
              <Col class="file-card" span="6" v-for="list in filelist" :key="list.index">
                  <router-link to="filedid">
                  <Card style="width:232px">
                      <div style="">
                          <img class="file-img" v-bind:src="list.img">
                          <h6>{{list.title}}</h6>
                          <span>{{list.timer}}</span>
                          <span>{{list.down}}</span>
                      </div>
                  </Card>
                  </router-link>
              </Col>
          </Row>
          
      </div> 
    <Card>
      
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            最新上传
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            更多
        </a>
  
      <div class="file-list">
          <Row>
              <Col class="file-card" span="6" v-for="list in filelist" :key="list.index">
                  <router-link to="filedid">
                  <Card style="width:232px">
                      <div style="">
                          <img class="file-img" v-bind:src="list.img">
                          <h6>{{list.title}}</h6>
                          <span>{{list.timer}}</span>
                          <span>{{list.down}}</span>
                      </div>
                  </Card>
                  </router-link>
              </Col>
          </Row>
         
      </div>    
    
   </Card> 
</Card>   -->
</template>
<script>
import {getHistorydata} from '../../api/login'
    export default {
        data () {
            return {
               filelist:[],
                filedid:'',
                filecount:0,
                movieList: [
                    {
                        name: '肖申克的救赎',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
                    },
                    {
                        name: '这个杀手不太冷',
                        url: 'https://movie.douban.com/subject/1295644/',
                        rate: 9.4
                    },
                    {
                        name: '霸王别姬',
                        url: 'https://movie.douban.com/subject/1291546/',
                        rate: 9.5
                    },
                    {
                        name: '阿甘正传',
                        url: 'https://movie.douban.com/subject/1292720/',
                        rate: 9.4
                    },
                    {
                        name: '美丽人生',
                        url: 'https://movie.douban.com/subject/1292063/',
                        rate: 9.5
                    },
                    {
                        name: '千与千寻',
                        url: 'https://movie.douban.com/subject/1291561/',
                        rate: 9.2
                    },
                    {
                        name: '辛德勒的名单',
                        url: 'https://movie.douban.com/subject/1295124/',
                        rate: 9.4
                    },
                    {
                        name: '海上钢琴师',
                        url: 'https://movie.douban.com/subject/1292001/',
                        rate: 9.2
                    },
                    {
                        name: '机器人总动员',
                        url: 'https://movie.douban.com/subject/2131459/',
                        rate: 9.3
                    },
                    {
                        name: '盗梦空间',
                        url: 'https://movie.douban.com/subject/3541415/',
                        rate: 9.2
                    }
                    
                    
                ],
                randomMovieList: []
            }
        },
          created(){
            //初始化数据，方法写在methods里面
            this.initfiledata();
    
           },
        methods: {
                  upData(){
        this.initfiledata();
      },
      downLoad(){
         this.initfiledata();
      },
      changePage(){
           this.initfiledata();
      },
      
      initfiledata(){

           getHistorydata().then(res=>{
                if(res.data.code===0){
                    this.filelist = res.data.data;
                    this.filecount=res.data.count;
                    this.despart = res.data;
                }else{
                    this.$Message.error('系统异常，请刷新重试！');
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
.mainTitle a,.mainTitle p{
    color: #000;
    font-weight: 700;
}
.allTitel a,.allTitel p{
    color: #000;
    font-weight: 700;
}

.mainTitle{
   margin-bottom: 20px; 
}
.allTitel{
    padding: 10px 0px;
    /* border-bottom: 1px solid #ccc; */
    
}
.clearfix:after {
	content: "";
	display: block;
	visibility: hidden;
	height: 0;
	clear: both;
}
.clearfix {
	zoom: 1;
}
.fr{
  float: right;
}
.fl{
    float: left;
}
.file{
    position: relative;
}
.file-card{
    
}
.file-card span{
    display: block;
}
.btn-left{
    position: absolute;
    right:0;
}
.file-card:hover{
    cursor: pointer;
}
.file-card a{
    color: #495060;
}
.file-card h6{
    display: block;
    width: 200px;
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis; 
}
.file-card h6:hover{
    color: #2d8cf0;
}
.file-img{
    width:200px;
    height: 100px;
}
.file-page{
    position: absolute;
    margin-top: 10px;
    right:20px;
}
.file-card{
    margin-top: 10px;
    
   box-sizing: border-box;
}

</style>

