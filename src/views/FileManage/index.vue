全部文件 路由afs
<template>
    <div class="file">
        <div class="file-search">
        <Form inline>
            <FormItem>
                <Select placeh  older="请选择部门" style="width:200px;">
                    <Option value="beijing" >北京</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                </Select>
            </FormItem>
             <FormItem>
                <Select placeholder="请选择部门" style="width:200px;">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                </Select>
            </FormItem>
            <FormItem class="btn-left">
                <Button type="primary" v-on:click='downLoad()'>按下载热度排行</Button>
                <Button type="ghost" @click='upData'>按上传时间排行</Button>
            </FormItem>
        </Form>
    </div>
    <div class="file-list">
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
        <div class="file-page">
            <Page :total="filecount" size="small" show-total @on-change="changePage"></Page>
        </div>
    </div>
    </div>
</template>
<script>
import {getFilelistdata} from '../../api/login'
export default {
  data(){
      return{
          filelist:[],
          filedid:'',
          filecount:0
      }
  },
  created(){
    //初始化数据，方法写在methods里面
    this.initfiledata();
    
  },
  watch:{
      '$route':'getSearchList'  // 监听路由变化，执行getSearchList方法
  },
  methods:{
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

           getFilelistdata().then(res=>{
                if(res.data.code===0){
                    this.filelist = res.data.data;
                    this.filecount=res.data.count;
                    this.despart = res.data;
                }else{
                    this.$Message.error('系统异常，请刷新重试！');
                }
            })
      },
      getSearchList(){
          // 获取路由url中的查询参数
          var query = this.$route.query;
          // axios 获取远程数据，改变data里面的数据渲染界面
          console.log(this.$route.query)
      }
      
  }
}
</script>
<style scoped>
.file{
    position: relative;
}
.file-list span{
    display: block;
}
.btn-left{
    position: absolute;
    right:0;
}
.file-list:hover{
    cursor: pointer;
}
.file-list a{
    color: #495060;
}
.file-list h6{
    display: block;
    width: 200px;
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis; 
}
.file-list h6:hover{
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
}
</style>
