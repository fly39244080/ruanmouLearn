<template>
    <div>
        <button type="button" @click="changeVal()">AA</button>
        <button type="button" id='tag' @click="displayPOP()">是否显示</button>
         {{num}}
         <div class="data-list" v-show="display">一些数据</div>
    </div>
</template>
<style lang='less'>
.data-list {
    width:300px;
    height:100px;
    background: red;
}
</style>

<script>
export default {
    props:['count'],
    data(){
       return {
           num:this.count,
           display:false
       }
    },
    methods:{
        changeVal(){
            this.num = this.num+1;
            this.$emit('getCountFromAA',{
                num:this.num
            });
        },

        displayPOP(){
            this.display = !this.display;
        },
        hidePOP(){
            this.display=false;
        }
    }
}
</script>

<style>

</style>
