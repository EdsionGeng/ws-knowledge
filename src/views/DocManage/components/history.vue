<template>
  <div style='height: 500px;'>
    <Card class='Card'>
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            历史下载
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            查看
        </a>
        <!-- <ul class='clearfix'>
           <li class='updatali'>
           
              <Row>
                 
                 <Col col="8" span='6' class='clearfix'> 
                    <a href="#">
                      <div class='updataimg'>
                        <img src="../../../assets/bg.jpg" alt="" >
                      </div> 
                        <p>标题</p>
                        <p class='clearfix'>
                          <span>07/23 10:23</span>
                          <span class='fr'>下载次数213</span>
                        </p>
                    </a>
                  </Col>
                
                  <Col col="8" span='6' class='clearfix'> 
                    <a href="#">
                      <div class='updataimg'>
                        <img src="../../../assets/bg.jpg" alt="" >
                      </div> 
                        <p>标题</p>
                        <p class='clearfix'>
                          <span>07/23 10:23</span>
                          <span class='fr'>下载次数213</span>
                        </p>
                    </a>
                  </Col>
                  <Col col="8" span='6' class='clearfix'> 
                    <a href="#">
                      <div class='updataimg'>
                        <img src="../../../assets/bg.jpg" alt="" >
                      </div> 
                        <p>标题</p>
                        <p class='clearfix'>
                           <span>07/23 10:23</span>
                          <span class='fr'>下载次数213</span>
                        </p>
                    </a>
                  </Col>
                   <Col col="8" span='6' class='clearfix'> 
                    <a href="#">
                      <div class='updataimg'>
                        <img src="../../../assets/bg.jpg" alt="" >
                      </div>

                        <p>标题</p>
                        <p class='clearfix'>
                           <span>07/23 10:23</span>
                          <span class='fr'>下载次数213</span>
                        </p>
                    </a>
                  </Col>
             </Row>
           
          </li>
        </ul> -->
        <Imgs></Imgs>
    </Card>
</div>
</template>
<script>
import Imgs from "../components/Imgs.vue"  
  export default {
    components:{
      Imgs
    }
  }  
</script>
<style scoped>
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
.ivu-col-span-8 {
    display: block;
    width: 25%;
}
.Card li{
  
}
.updatali a{
  display: block;
  width: 100%;
  padding:10px;
  
}

.fr{
  float: right;
}
.timer{
  float: right;
}
.updataimg{
  text-align: center;
}
.updataimg img{
 
 width: 219px;

  
}
</style>