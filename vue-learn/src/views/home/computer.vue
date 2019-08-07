<template>
    <div>computer<br/>

<div class="test"  v-loading="isLoading">

 <h2>我是标题1</h2>
 <div>我是加载后的数据 {{name}}</div>

</div>
       
{{isLoading}}
{{isLoading2}}

       <div class="test2"  v-loading="isLoading2">

            <h2>我是标题2</h2>
            <div>我是加载后的数据 <input type="text" v-model="school"> {{school}}</div>

        </div>

 </div>
 
</template>
<style lang='less'>
.test,.test2 {
    border:1px solid #ccc;
    padding:20px;
}
</style>

<script>
export default {
    data(){
        return {
            isLoading:true,
            isLoading2:true,
            name:'laney',
            school:'xiaoxue'
        }
    },
    mounted(){
        setTimeout(()=>{
            this.isLoading = false
        },2000)

         setTimeout(()=>{
            this.isLoading2 = false;
            this.school = 'bbbee';
        },5000)
    }
}
</script>