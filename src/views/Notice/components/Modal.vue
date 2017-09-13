<template>
    <div class='Nall clearfix'>
        <p class='Ntitle'>
           公告推送
        </p>
        <p>
            <Button @click="render" class='fl'style='margin-right: 40px;'>添加公告</Button >
        </p>
        <p>
            <Button @click="render" class='fl'>批量删除</Button>
        </p>
    </div>    
</template>
<script>
    export default {
        data () {
            return {
                value: ''
            }            
        },
        methods: {
            render () {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: 'Please enter your name...'
                            },
                            on: {
                                input: (val) => {
                                    this.value = val;
                                }
                            }
                        })
                    }
                })
            }
        }
    }
</script>
<style scoped>
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
.Ntitle{
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin-bottom: 20px;
}
.Nall{
  padding: 20px 20px;
}
</style>



