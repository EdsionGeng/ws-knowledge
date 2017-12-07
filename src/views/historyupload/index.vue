<style>
    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
        height: 100%;
        margin-top: -16px;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
        background: #fff;
        padding: 16px;
    }

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        border-color: transparent;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-color: #fff;
    }
</style>
<template>
    <Row :gutter="32">
        <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card">
                <TabPane label="列表">    
                  <Row>
                    <Col>
                      <Table :columns="columns1" 	:data="historyUploadMessageList" @on-row-click="onRowClick"></Table>
                    </Col>  
                  </Row>               
                  <Page :total="page.total" :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange" class="table-page"></Page>
                </TabPane>
                <TabPane label="图文">
                    <Row type="flex" justify="start" :gutter='16'>
                      <Col  span="4" v-for='(list,index) in historyUploadMessageList' :key='index' style='margin-bottom:15px;'>
                          <Card >
                              <p slot="title">{{list.at}}</p>
                              <p>{{list.re}}</p>
                          </Card>
                      </Col>
                  </Row>
                </TabPane>
            </Tabs>
        </Col>
    </Row>
</template>
<script>
    export default {
        data(){
        return {
           page: {total:30,current:3,pageSize:29},
           columns1: [
                    {
                        title: '标题',
                        key: 'at'
                    },
                    {
                        title: '发布时间',
                        key: 're', 
                        sortable: true
                       ,
                        align:'right'
                    }
                ],
                historyUploadMessageList:[{
                    at:'hello',re:'2017-01-01'
                },{
                     at:'hello world',re:'2017-01-02'
                },{
                     at:'hello world',re:'2017-01-05'
                },{
                     at:'hello world',re:'2017-01-05'
                },{
                     at:'hello world',re:'2017-01-05'
                },{
                     at:'hello world',re:'2017-01-05'
                },{
                     at:'hello world',re:'2017-01-05'
                }]
          }
        },
        methods:{
          onRowClick(row,index){
            console.log(row,index)
          },onPageChange(){}
        }
   
   }
</script>
