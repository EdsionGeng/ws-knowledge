<template>
   <div class='PersonalCenter'>
    <div class='myinfo'>
      <div class="myinfo-top clearfix">
        <div class="myinfo-left">
          <h2>我的消息</h2>
        </div> 
        <div class="myinfo-right">
          <span><a href="#"> 查看更多>></a></span>
        </div>  
      </div>
      <div class="myinfo-bottom">
        <ul>
          <li>
            <a href="#">
              <span>公告</span>
              <span>标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1</span>
              <span class='fr'>2017-04-15</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>公告</span>
              <span>标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1</span>
              <span class='fr'>2017-04-15</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>公告</span>
              <span>标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1</span>
              <span class='fr'>2017-04-15</span>
            </a>
          </li>
           <li>
            <a href="#">
              <span>公告</span>
              <span>标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1</span>
              <span class='fr'>2017-04-15</span>
            </a>
          </li>
           <li>
            <a href="#">
              <span>公告</span>
              <span>标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1</span>
              <span class='fr'>2017-04-15</span>
            </a>
          </li>
        </ul>   
      </div>
    </div>  
      <!-- 最新上传 -->
    <div class='updata'>   
        <div class="myinfo-top clearfix">
        
            <div class="myinfo-left">
              <h2>最新上传</h2>
            </div> 
            <div class="myinfo-right">
              <span><a href="#"> 查看更多>></a></span>
            </div> 

        </div>
        <div class="updata-bottom">
          <a href="#">
            <img src="../../../src/assets/logo.png" alt="">
            <p>标题</p>
            <span>标题</span>
            <span>07/23 10:12</span>
          </a>
        </div> 
     </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.PersonalCenter{
  background: #fff;
}
.myinfo{
  margin-bottom: 40px;
}
.PersonalCenter .myinfo-left{
  float: left;
}
.PersonalCenter .myinfo-right{
  float: right;
}
.PersonalCenter .myinfo-bottom li{
  height: 30px;
  line-height: 30px;
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
a {
	text-decoration: none;
	color: #969696;
	font-family: 'Microsoft YaHei', Tahoma, Arial, sans-serif;
}
a:hover {
	text-decoration: none;
}
</style>

