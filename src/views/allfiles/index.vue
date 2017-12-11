<template>
<div class="page">
   <Row align='middle'   class='clearfix'  style='margin-bottom:20px'	>
        <Col span="1" offset=2  style='height:30px;line-height:30px'> 部门:</Col>
        <Col span="6">
            <SelectTree  :myvalue='depTypeKey'></SelectTree>
        </Col>
        <Col span="1"  style='height:30px;line-height:30px'> 类型:</Col>
        <Col span="6">
          <docTree  :myvalue='docTypeKey'></docTree>
        </Col>
          </Col> <Button type='primary' @click="selAllFile">查询</Button></Col>
    </Row>
      <Row>
          <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
              <Tabs type="card">
                  <TabPane label="列表">    
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
                              <p>上传人：{{list.username}}</p>
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
import { showUserLookFile } from "../../api/all_interface";
import SelectTree from '@/components/common/selectTree'
import docTree from '@/components/common/docTree'

export default {
  data() {
    return {
      //用对象就可以让子组件修改父组件的内容
      docTypeKey:{
        value:''
      },
      depTypeKey:{
        value:''
      },
      pageOpts: [20, 40, 60, 100],
      listparams: {
        userId:145,
        current: 1,
        pageSize: 20
      },
      page: { total: 100, pages: 1, current: 1, pageSize: 20 },
      columns1: [
        {
          title: "标题",
          key: "title"
        },
        
        {
          title: "发布时间",
          key: "addFileTime",
          sortable: true,
          align:'center'
          
        },
        {
          title: "上传人",
          key: "username",
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
  components:{
    SelectTree,docTree
  },
  created() {
     this.initList();
  },
  methods: {
    selAllFile(){
      console.log(this.docTypeKey.value)
      console.log(this.depTypeKey.value)
    },
    onRowClick(row) {
      this.$router.push("/allfiles/check/" + row.id);
    },
    onPageChange(value) {
      console.log(value);
      this.page.current = value;
      this.initList();
    },
    onPageSizeChange(value) {
      this.page.pageSize = value;
    }, 
    initList() {
      showUserLookFile(this.listparams)
        .then(res => {
          console.log(res)
          const showUserUpdata = res.data;
          console.log(showUserUpdata);
          if (res.data.code == 0) {
            this.page = res.data.rdPage;
            this.historyUploadMessageList = showUserUpdata.data;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.page {
  padding: 30px 10px;
}

</style>
