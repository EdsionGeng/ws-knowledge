<template>
<div class='Card clearfix'>
    <Card style="width:300px"  class='fl mains' v-for="item in movieList" :key="item.index">
        <div style="text-align:center;">
            <img v-bind:src="item.url">
            <h3>标题:{{item.title}}</h3>
            <h3>{{item.timer}}</h3>
            <h3>{{item.down}}次下载</h3>
        </div>
    </Card>
</div>
</template>
<script>
    export default {
        data(){
          return {
            movieList:[
              {
                url:"http://dummyimage.com/218x200",
                title:"文档1",
                timer:"07/23 11:12",
                down:"8901"
              },
               {
                url:"../../../assets/bg.jpg",
                title:"文档2",
                timer:"07/23 11:12",
                down:"8901"
              },
               {
                url:"../../../assets/bg.jpg",
                title:"文档3",
                timer:"07/23 11:12",
                down:"8901"
              },
               {
                url:"../../../assets/bg.jpg",
                title:"文档4",
                timer:"07/23 11:12",
                down:"8901"
              }
            ]
          }
        }
    }
</script>
<style scoped>
.mains{
  margin: 10px 10px;
}

.Card img{
width: 218px;
}
.Card h3{
  text-align: left;
}
.fl{
  float: left;
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
</style>
