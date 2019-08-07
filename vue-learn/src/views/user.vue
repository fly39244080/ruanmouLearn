<template>
    <div>
        <h1>User</h1>
        <div>我是user组件 {{dynamicSegment}}</div>
        <!-- 我是来自 about里的数据 {{name}} <br/> -->
        我是计时器{{$store.state.count}}  <br/>
       count : {{count}} 
       <button @click="addCount">加值</button>  <button @click="reduceCount">减值</button> <br/>
       来自getter: {{$store.getters.getCount}}   {{getCount}} <br/>
       <!-- {{$store.getters.male}}  {{male}} -->
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
    export default {
        // 就是动态路由在来回切换时，由于它们都是指向同一组件，vue不会销毁再创建这个组件，
        // 而是复用这个组件，就是当第一次点击（如：user123）的时候，
        // vue 把对应的组件渲染出来，但在user123, user456点击来回切换的时候，
        // 这个组件就不会发生变化了，组件的生命周期不管用了

        // computed: {
        //     dynamicSegment () {
        //         return this.$route.params.id
        //     }
        // },
        data(){
            return {
                dynamicSegment: ''
            }
        },
        // computed:mapGetters(['getCount','male']),
        // computed:{
        //     count(){
        //         return this.$store.state.count;
        //     }
        // },

         computed:{
             ...mapGetters(['getCount','male']),
             count(){
                  return this.$store.state.count;
              }
         },
        // 利用watch 来监听$route 的变化
        watch:{
            '$route':function(to,from){
                console.log(to);    
                this.dynamicSegment = to.params.id;
            }
        },
        mounted(){
              // 在组件 Vue 创建的钩子中监听事件
              // $on(事件名，数据）
            // this.$root.eventtest.$on('helloevent',name => {
            //     debugger
            //     this.name = name
            // })
        },
        methods:{
            addCount(){
                this.$store.dispatch('add',{
                    step:10
                });
                // this.$store.commit('add',{
                //     step:8
                // });
            },
            reduceCount(){
                this.$store.dispatch('reduce',{
                    step:5
                });    
            }
        },
        methods:{
            // ...mapActions(['add','reduce']),
            // ...mapActions({
            //     addCount:'add'
            // }),
            // ...mapActions({
            //     reduceCount:'reduce'
            // }),
            addCount(){
                this.$store.dispatch('add',{
                    step:10
                });
                // this.$store.commit('add',{
                //     step:8
                // });
            },
            reduceCount(){
                this.$store.dispatch('reduce',{
                    step:5
                });    
            }
        }

               

    }
</script>