<template>
    <div class="page-directive">

          <input type="text" v-pin:[direction]='250' />
          <input type="text" v-focus  class="testLany" />

        <!-- v-text -->
       <div v-text="msg"></div>
       <!-- 简写 -->
       <!-- <span>{{msg}}</span>  -->

        <!-- v-html -->
       <div v-html="html" class="info"></div>
        <!-- <div  class="info"> {{html}}</div> //不能 -->

         <!-- v-if  v-else-->
         <div class="text" v-if="isShowMain">
             我是主标题
         </div>
         <div class="sub-text" v-else>
             我是副标题
         </div>


         <!-- v-show-->
         <div class="desc" v-show="toShowDesc">
             我是一些人物的描述
         </div>

        <!-- v-for-->
        <div>
            <ul>
                <li v-for="(item,index) in datalist" :key="index"> {{item.name}} {{item.age}}</li>
            </ul>
        </div>

        <!-- v-on -->
        <!-- v-on:click  -- > @click  -->
        <button type="button" id="etr" v-on:click="search($event)">查询</button>
        <button type="button" id="etr" @click="search($event)">查询2</button>


        <div class="outer" @click="doThis($event)">
            <p >outer</p>
            <div class="center"  @click="doThis($event)">
                <p>center</p>
                <div class="inner" @click.stop="doThis($event)">
                    <p >inner</p>
                </div>
            </div>
        </div>
        <!-- 方法处理器 -->
        <button v-on:click="doThis">搜索</button>
        <!-- 内联语句 -->
        <button v-on:click="doThat('hello', $event)">搜索</button>
        <!-- 缩写 -->
        <button @click="doThis">搜索</button>
        <!-- 停止冒泡 -->
        <button @click.stop="doThis">搜索</button>
        <!-- 阻止默认行为 -->
        <button @click.prevent="doThis">搜索</button>
        <!-- 阻止默认行为，没有表达式 -->
        
        <form @submit.prevent></form>
        <!--  串联修饰符 -->
        <button @click.stop.prevent="doThis">搜索</button>
        <!-- 键修饰符，键别名 -->
        <input @keyup.enter="onEnter">
        <!-- 键修饰符，键代码 -->
        <input @keyup.13="onEnter">

<!-- v-bind -->

<!-- 绑定一个属性 -->
<img v-bind:src="imageSrc" />
<!-- 缩写 -->
<img :src="imageSrc" />
<!-- class 绑定 -->
<div :class="{ red: isRed }">bind test</div>
<div :class="[classA, classB]">bind test</div>
<div :class="[classA, { classB: isB, classC: isC }]">bind test</div>
<!-- style 绑定 -->
<div :style="{ fontSize: '12px' }">bind test</div>
<!-- <div :style="[styleObjectA, styleObjectB]">bind test</div> -->
<!-- 绑定一个有属性的对象 -->
<!-- <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div> -->

<!-- v-model 随表单控件类型不同而不同。 -->
<!-- 限制：
<input>
<select>
<textarea>
components -->

<!-- 表单控件绑定 -->
<!-- http://doc.vue-js.com/v2/guide/forms.html#number -->

    </div>
</template>
<style lang='less'>
.page-directive {
    button {
        padding:5px 10px;
    }
    li {
        list-style-type: none;
    }
    .info {
        padding:20px;
    }
    div {
        border:1px solid #ccc;
        margin: 15px;
        padding:10px;
    }
}
</style>

<script>
import allDirectives from './index.js';
const {clickoutside,pin,loading,demo} = allDirectives;
export default {
    data(){
        return {
            direction: 'right',
            isRed:true,
            isShowMain:false,
            toShowDesc:true,
            classA:'classA',
            classB:'classB',
            isB:true,
            isC:true,
            msg:'ddd',
            html:'<p>这个是测试代码<em>详情</em></p>',
            datalist:[{
                name:'小明',
                age:'5'
            },{
                name:'小刚',
                age:'6'
            },{
                name:'小红',
                age:'7'
            }],
            imageSrc:'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super'
        }
    },
    methods:{
        search(e){
            console.log(e);
        },
        doThis(e){
            var classN = e.currentTarget.className;
    
            switch(classN){
                case 'outer':
                    console.log('outer');
                    break;
               case 'center':
                   console.log('center');
                    break;
               case 'inner':
                   console.log('inner');
                    break;
            }
            
        }
    },
    directives:{
         clickoutside,
            pin,
            loading,
            demo,
            focus: {
                    bind:function(el, binding, vnode){
                        console.log('kkk');
                    },
                    // 指令的定义
                    inserted: function (el) {
                        console.log('uuu');
                        debugger
                        el.focus()
                    },
                    update(){
                        console.log('nnn');
                    },
                    componentUpdated(){
                        console.log('mbb');
                    }
                }
    },
    mounted(){

    }
}
</script>




