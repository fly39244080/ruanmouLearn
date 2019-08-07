/**
 * 自定义 提示框( Toast )组件
 */
var Toast = {};
var showToast = false, // 存储toast显示状态
  showLoad = false, // 存储loading显示状态
  toastVM = null, // 存储toast vm
  loadNode = null; // 存储loading节点元素
 
Toast.install = function (Vue, options) {

 
  Vue.prototype.$loading = function (tips, type) {
    if (type == 'close') {
      loadNode.show = showLoad = false;
    } else {
      if (showLoad) {
        // 如果loading还在，则不再执行
        return;
      }
      var loadTpl = Vue.extend({
        data: function () {
          return {
            show: showLoad
          }
        },
        template: '<div v-show="show" class="lx-load-mark"><div class="lx-load-box"><div class="lx-loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_2"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><div class="lx-load-content">' + tips + '</div></div></div>'
      });
      loadNode = new loadTpl();
      var tpl = loadNode.$mount().$el;
 
      document.body.appendChild(tpl);
      loadNode.show = showLoad = true;
    }
  };
 
 
}
 
// 向外暴露接口
module.exports = Toast;