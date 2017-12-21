
<template>
<div class="page">
        <Row>
        <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card" @on-click='changePic'>
                <TabPane label="列表" class="clearfix" name='table'>
                  <Row>
                    <Col>
                      <Table class="myTable"  :columns="columns1" stripe	:data="historyUploadMessageList" @on-row-click="onRowClick"></Table>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane label="图文" name='pic'>
                    <Row>
                      <Col  span="5" offset=1  pull=1 v-for='(list,index) in historyUploadpicMessageList' :key='index' style='margin-bottom:10px;'>
                        <a @click="onRowClick(list)">
                        <Card style="">
                          <div style="text-align:center">
                              <img src="./bg.jpg" style='width:50%;height:100px;'>
                              <h2 class="nowrap" style='color:#000;font-size:19px;'>{{list.title}}</h2>
                              <p style='color:#ccc'>上传时间：{{list.addFileTime}}</p>
                          </div>
                        </Card>
                        </a>

                      </Col>
                  </Row>
                </TabPane>

            </Tabs>

        </Col>
    </Row>
    <Row>
        <Col>
          <Page :total="page.total" placement='top' :page-size-opts='pageOpts' show-sizer  :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange" @on-page-size-change='onPageSizeChange' class="table-page"></Page>
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
      pageOpts:[10,20,30,40,50],
      listparams: {
        current: 1,
        pageSize: 20,
        userId: sessionStorage.getItem("userId")
      },
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
      historyUploadpicMessageList:[],
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
    changePic(name){
      console.log(name)
      if(name==='pic'){
        this.historyUploadpicMessageList=this.historyUploadMessageList;
      }else{
        this.historyUploadpicMessageList=[]
      }
    },
    //显示文件详情的方法
    onRowClick(row) {
      this.$router.push('/allfiles/check/'+row.id);
    },
    onPageChange(value) {
     this.listparams.current = value;
     this.initList();
    },
    onPageSizeChange(value){
      this.listparams.pageSize=value;
      this.initList();
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
