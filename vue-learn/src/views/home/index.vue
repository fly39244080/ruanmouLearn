<template>
    <div class="home-page">
        <h1>home</h1>
        <!-- router-link 的to属性要注意，路由是先进入到home,然后才进入相应的子路由如 phone,所以书写时要把 home 带上 -->
        <p>
            <router-link to="/home/phone">手机</router-link>
            <router-link to="/home/tablet">平板</router-link>
            <router-link to="/home/computer">电脑</router-link>
             <router-link to="/home/slot">slot</router-link>
        </p>

         <router-view></router-view>
        <p>{{msg}}</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: "我是home 组件"
            }
        },
        mounted(){
            this.getPicList();
        },
        methods:{
            getPicList(){
                var params = {
                    picTypeId:'01',
                    serialNumber:'101030101001'
                } 
                //拍摄地图图片
                this.$axios.post(this.$api.test.getPic,params).then((res)=>{
                    let {city,country,isExists} = res.data;
                    if(isExists){
                        return this.$axios.post(this.$api.test.bookArticle,{
                            photographerId:1
                        })
                    } 
                }).then((res1)=>{
                    if(res1.data.book.length){
                        return this.$axios.post(this.$api.test.introduce,{
                            photographerId:1
                        })
                    }
                }).then((data)=>{
                    console.log(data);
                })
            }
        }
    }
</script>