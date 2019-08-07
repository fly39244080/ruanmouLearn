<template>
    <div id="app">
        <div class="page-head">
            <h1>Hello App!</h1>
            <div class="top-menu">
                <!-- router-link 进行导航。 -->
                <router-link to="/home">Home</router-link>
                <router-link to="/about">About</router-link>

                <!--  增加两个到user组件的导航，可以看到这里使用了不同的to属性 -->
                <router-link to="/user/123">User123</router-link>
                <router-link to="/user/456">User456</router-link>
                <router-link to="/directives">指令</router-link>
            </div>
        </div>
        <div class="main-content">

            <!-- 路由外链 -->
            <router-view></router-view>
        </div>
        
    </div>

</template>

<script>
    import './views/styles/main.less';
    export default {
        data() {
            return {
                text: '236hhh' ,
                
            }
        }
    }
</script>


<style lang='less'>
    
</style>