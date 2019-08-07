import { ssh } from "node-forge";

/*
    自定义 loading 组件
    调用
    this.$loading('正在加载中...');
    this.$loading.close();
*/ 
let _LOADING = {
    show: false,     // Boolean loading显示状态
    component: null  // Object loading组件
 };    

window.Loading = function install(Vue){
    /*
        text: String
        type: String
    */
    Vue.prototype.$loading = function(text='正在加载中...', type) {
        if (type == 'close') {
            _LOADING.component.show = _LOADING.show = false;
        } else {
            if (_LOADING.show) {
                return;
            }
            let LoadingCompoent = Vue.extend({
                data: function() {
                    return {
                        show: _LOADING.show
                    }
                },
                template: `<div v-show="show" class="zh-load-mark">
                                <div class="zh-load-box">
                                    <div class="zh-loading">
                                        <div class="loading_leaf loading_leaf_0"></div>
                                        <div class="loading_leaf loading_leaf_1"></div>
                                        <div class="loading_leaf loading_leaf_2"></div>
                                        <div class="loading_leaf loading_leaf_3"></div>
                                        <div class="loading_leaf loading_leaf_4"></div>
                                        <div class="loading_leaf loading_leaf_5"></div>
                                        <div class="loading_leaf loading_leaf_6"></div>
                                        <div class="loading_leaf loading_leaf_7"></div>
                                        <div class="loading_leaf loading_leaf_8"></div>
                                        <div class="loading_leaf loading_leaf_9"></div>
                                        <div class="loading_leaf loading_leaf_10"></div>
                                        <div class="loading_leaf loading_leaf_11"></div>
                                    </div>
                                    <div class="zh-load-content">${text}</div>
                                </div>
                            </div>`
            });
            
            _LOADING.component = new LoadingCompoent();
            let element = _LOADING.component.$mount().$el;
            document.body.appendChild(element);
            _LOADING.component.show = _LOADING.show = true;
        }
    };
    // 打开/关闭
    ['open', 'close'].forEach(function(type) {
        Vue.prototype.$loading[type] = function(text) {
            return Vue.prototype.$loading(text, type);
        }
    });
}
