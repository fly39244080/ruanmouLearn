<template>
    <div>
        <h1>about</h1>
        <p>{{aboutMsg}}</p>
         <button @click="useCOM('B')">用bb组建</button>
        <button @click="useCOM('C')">用cc组建</button>
         <keep-alive>
            <component v-bind:is="currentView"> </component>
         </keep-alive>

         <button @click="send">发送数据到Vue组件User中</button>

         我是计时器{{$store.state.count}}  <br/>
    </div>
</template>
<script>
import bb from './components/bb.vue';
import cc from './components/cc.vue';
    export default {
        data () {
            return {
                aboutMsg: '我是about组件',
                currentView:'cc'
            }
        },
        components:{
            bb,
            cc
        },
        methods:{
            useCOM(tag){

                switch(tag){
                    case 'B':
                        this.currentView = 'bb';
                        break;
                    case 'C':
                        this.currentView = 'cc';
                        break;
                }

            },
            send(){
                // 触发组件 Hello 中的事件
                 // $emit(事件名，数据）
                this.$root.eventtest.$emit('helloevent','hello 我是lanet')
            }
        }
      
    }
</script>