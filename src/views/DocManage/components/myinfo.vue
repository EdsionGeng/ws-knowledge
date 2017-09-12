<template>
    <Card style='margin-top: 50px;'>
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            我的消息
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            更多
        </a>
        <ul>
            <li v-for="item in randomMovieList" class='clearfix'>
                <a :href="item.url" target="_blank">{{ item.name }}</a>
                {{msg}}
                <a href="#"><img src="../../../assets/wd.png" alt=""></a>
                <a href="#"><img src="../../../assets/yd.png" alt=""></a>
                <span class='timer'>
                  
                    {{ item.rate }}
                </span>
            </li>
        </ul>
    </Card>
</template>
<script>
    export default {
        data () {
            return {
                msg:'aaa',
                movieList: [
                    {
                        name: '肖申克的救赎',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 20150701,
                        isread:true
                        
                    },
                    {
                        name: '这个杀手不太冷',
                        url: 'https://movie.douban.com/subject/1295644/',
                        rate: 20150701
                    },
                    {
                        name: '霸王别姬',
                        url: 'https://movie.douban.com/subject/1291546/',
                        rate: 20150701
                    },
                    {
                        name: '阿甘正传',
                        url: 'https://movie.douban.com/subject/1292720/',
                        rate: 20150701
                    },
                    {
                        name: '美丽人生',
                        url: 'https://movie.douban.com/subject/1292063/',
                        rate: 20150701
                    },
                    {
                        name: '千与千寻',
                        url: 'https://movie.douban.com/subject/1291561/',
                        rate: 20150701
                    },
                    {
                        name: '辛德勒的名单',
                        url: 'https://movie.douban.com/subject/1295124/',
                        rate: 20150701
                    },
                    {
                        name: '海上钢琴师',
                        url: 'https://movie.douban.com/subject/1292001/',
                        rate: 20150701
                    },
                    {
                        name: '机器人总动员',
                        url: 'https://movie.douban.com/subject/2131459/',
                        rate: 20150701
                    },
                    {
                        name: '盗梦空间',
                        url: 'https://movie.douban.com/subject/3541415/',
                        rate: 20150701
                    }
                ],
                randomMovieList: []
            }
        },
        methods: {
            changeLimit () {
                function getArrayItems(arr, num) {
                    const temp_array = [];
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    const return_array = [];
                    for (let i = 0; i<num; i++) {
                        if (temp_array.length>0) {
                            const arrIndex = Math.floor(Math.random()*temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }
                this.randomMovieList = getArrayItems(this.movieList, 5);
            }
        },
        mounted () {
            this.changeLimit();
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
.timer{
  float: right;
}
</style>
