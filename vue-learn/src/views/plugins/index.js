import countDown from './countdown.vue';
import LoadingComponent from './loading.vue'
countDown.install = function(Vue){
    Vue.component(countDown.name,countDown)
};


const Loading={
  install:function (Vue) {
    Vue.component('Loading',LoadingComponent);
  }
}

let pluginsTest = {
    countDown,
    Loading
}
export default pluginsTest;
