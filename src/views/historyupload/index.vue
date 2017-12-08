
<template>
<div class="page">
        <Row>
        <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card">
                <TabPane label="列表" class="clearfix">    
                  <Row>
                    <Col>
                      <Table :columns="columns1" 	:data="historyUploadMessageList" @on-row-click="onRowClick"></Table>
                    </Col>  
                  </Row>                   
                </TabPane>
                <TabPane label="图文">
                    <Row>
                      <Col  span="5" offset=1  pull=1 v-for='(list,index) in historyUploadMessageList' :key='index' style='margin-bottom:15px;'>
                        <a @click="onRowClick(list)">
                        <Card style="">
                          <div style="text-align:center">
                              <img src="./bg.jpg" style='width:60%;height:150px;'>
                              <h2>{{list.title}}</h2>
                              <p>上传时间：{{list.addFileTime}}</p>
                          </div>
                          
                        </Card>
                        </a>
                             
                      </Col>
                  </Row>
                </TabPane>
                
            </Tabs>
           
        </Col>
         
    </Row>
    <Row style='padding-top:10px,padding-right:5px'> 
        <Col>            
          <Page :total="page.total" :page-size-opts='pageOpts' show-sizer show-elevator :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange" @on-page-size-change='onPageSizeChange' class="table-page"></Page>
        </Col>  
    </Row>
     
</div>
    
</template>
<script>
import { showUserUpload } from "../../api/all_interface";
export default {
  data() {
    return {
      imgUrl:'./bg.jpg',
      modal1: false,
      pageOpts:[20,40,60,100],  
      listparams: {
        current: 1,
        pageSize: 20,
        userId: 145
      },
      fileparams:null,
      page: { total: 100,pages:1, current: 1, pageSize: 20 },
      columns1: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "发布时间",
          key: "addFileTime",
          sortable: true,
          align: "right"
        }
      ],
      historyUploadMessageList: [
        {
          title: "hello",
          addFileTime: "2017-01-01"
        },
        {
          title: "hello",
          addFileTime: "2017-01-01"
        },
        {
          title: "hello",
          addFileTime: "2017-01-01"
        },
        {
          title: "hello world",
          addFileTime: "2017-01-02"
        },
        {
          title: "hello world",
          addFileTime: "2017-01-05"
        }
      ]
    };
  },
  mounted() {
    this.initList();
  },
  methods: {
    //显示文件详情的方法
    onRowClick(row) {
      this.$router.push('/allfiles/check/'+row.id);  
    },
    onPageChange(value) {    
      console.log(value)
     this.page.current = value;
     this.initList();
    },
    onPageSizeChange(value){
      console.log(value)
      this.page.pageSize=value
    },
    initList() {
      showUserUpload(this.listparams)
        .then(res => {
          const showUserUpdata = res.data;
          console.log(showUserUpdata);
          if (res.data.code == 0) {
            this.page=res.data.rdPage;
            this.historyUploadMessageList = showUserUpdata.data;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style>
  .ivu-select-single .ivu-select-selection{
    width: 100px;
  }
  .page{
    height: 100%;
  }
 
</style>
