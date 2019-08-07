<template>
    <div>bb
        <button type="button" @click="changeNum">改变test</button>
        {{test}}
    </div>
</template>

<script>
export default {
    data(){
        return {
            test:1
        }
    },
    mounted(){
        this.test++;
    },
    methods:{
        changeNum(){
            this.test = 20;
        }
    }


}
</script>

<style>

</style>
