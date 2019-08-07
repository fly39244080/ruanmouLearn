import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import home from "./views/home/index.vue";
import computer from "./views/home/computer.vue";
import phone from "./views/home/phone.vue";
import tablet from "./views/home/tablet.vue";
import slot from "./views/home/slot.vue";

import about from "./views/about.vue";
import user from "./views/user.vue";
import iview from "./views/iview.vue";

import directives from "./views/directives/index.vue";


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path:"/home",
        // 下面这个属性也不少，我们是先进入home页面，才能进入子路由
        component: home,
        children:[{
            path:'phone',
            component:phone
        },{
            path:'computer',
            component:computer
        },{
            path:'tablet',
            component:tablet
        },{
            path:'slot',
            component:slot
        },{
            path:'',
            component:phone
        }]
    },
    {
        path: "/about",
        component: about
    },
    {
        path: "/directives",
        component: directives
    },
    {
        path: "/iview",
        component: iview
    },
    /*新增user路径，配置了动态的id*/
    {
        path: "/user/:id",
        component: user
    },

    // 重定向
    {
        path: '/', 
        redirect: '/home' 
    }
]

var router =  new VueRouter({
    routes,
    mode:'history'
})
export default router;