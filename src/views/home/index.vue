<template>
  <div> 
     <div class="mycenter">    
        <Card >
            <p slot="title"><span>我的消息</span><a class='rt' @click="changeRoute('mymessage')">查看更多&gt;&gt;</a> </p>
            <div>
              <Table :columns="columns1" 	 :data="MyMessageList" @on-row-click="show(1)"></Table>
            </div>
        </Card>
        <br>
        <Card >
            <p slot="title"><span>最新上传</span><a class='rt' @click="changeRoute('allfiles')">查看更多&gt;&gt;</a> </p>
            <div>
              <Table :columns="columns1"  :data="MyMessageList"  @on-row-click="show()"></Table>
            </div>
        </Card>
    </div>
  </div>
  </div>
</template>
<script>
 import { showUserAd } from "../../api/all_interface";
    export default {
        data () {
            return {
               MyMessageList: [],
               data: {
                  current: 1,
                  pageSize:10,
                  userId:145
        //          id: this.$route.query.id,
        //          yhjId: this.$route.query.yhjId,
        //          yhjType: this.$route.query.yhjType
                },
                columns1: [
                    {
                        title: '标题',
                        key: 'at'
                    },
                    {
                        title: '发布时间',
                        key: 're', 
                        sortType: 'desc',
                        align:'right'
                    }
                ]
            }
        },
        mounted(){
          this.initUserAd();
        },
        methods:{
          changeRoute(name){
             this.$router.push('/'+name);
          },
          show(index){
            console.log(index)
          },
          // 我的消息初始化函数
          initUserAd() {
            showUserAd(this.data)
              .then(res => {
                const data = res.data;
      //          console.log(res.data);
                if (data.code == 0) {
                  console.log(this.MyMessageList)
                  this.MyMessageList = data.data;
                  console.log(this.MyMessageList)
                  this.page = data.rdPage;
                  console.log(data.rdPage)
                }
              })
              .catch(err => {});
             
          }
        }
    }
</script>
<style scoped>
 .mycenter{
   padding:20px;
 }
</style>
