<template>
  <div>
    <h2>文档类型管理</h2>
     <Button type="primary" v-on:click='add()'>add</Button>
    <div>
     <Tree :data="baseData" v-model='selected' @on-select-change="onslectchange"></Tree>
    </div>
  </div>
</template>
<script>
    export default {
        data () {
            return {
               selected: true,
                baseData: [{
                    id:1,
                    expand: true,
                    title: 'parent 1',
                    children: [{
                        id:1,
                        title: 'parent 1-0',
                        expand: true,
                        disabled: false,
                        children: [{
                            id:0,
                            title: 'leaf',
                        }, {
                           id:0,
                            title: 'leaf',
                        }]
                    }, {
                        id:1,
                        title: 'parent 1-1',
                        expand: true,
                        checked: true,
                        children: [{
                            id:0,
                            title: '123',
                        }]
                    },
                   
                    ]
                }]
            }
        },
        methods:{
          add(){
          
            
              this.baseData[0].children.push(
              {
                        title: 'parent 1-1',
                        expand: true,
                        checked: true,
                        children: [{
                            title: '123',
                      }]
            }
            )
            
          },
         
          onslectchange(arr){
            console.log(arr[0].id);
            if(arr[0].id === "1"){
              this.add();
            }else{
              
            }
          }
        }
    }
</script>

