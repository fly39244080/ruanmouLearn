<template>
    <div>
        tablet
        <comp-a :count="count" @getCountFromAA="getNow" ref="comP"></comp-a>
        从组建AA得到的值为 {{count}}
    </div>
</template>
<script>
import aa from '../components/aa.vue';

export default {
    data(){
        return {
             count:10
        }
       
    },
    components:{
        'comp-a':aa
    },
    methods:{
        getNow(obj){           
            console.log(obj);
            this.count = obj.num;
            if(this.count ==15){
                alert('hello laney');
            }
        }
    },
    mounted(){
         document.addEventListener('click', (e)=>{
             
             if(e.target.id=='tag' && e.target.tagName=='BUTTON'){
                 return;
             }
             if(e.target.className=='data-list'){
                  return;
             }
             
             this.$refs.comP.hidePOP();
         },false);
    }
}
</script>