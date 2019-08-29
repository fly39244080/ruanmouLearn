var apiUrl = {
    // dev:{
    //     product:'http://39.105.171.16:8085/',
    //     login:'http://39.105.171.16:8082/',
    //     check:'http://39.105.171.16:8082/'
    // },
    dev:'http://39.105.171.16:8085/',
    prod:'http://localhost:5001/',
    test:'http://localhost:5002/'
};

// apiUrl[sceneParam].product 
// debugger
// window.jQuery = window.$ = window.vender_library(1);
// window.layer = window.vender_library(2);

window.jQuery = window.$ = vendor_library('./node_modules/jquery/dist/jquery.js');
window._ = window._ = vendor_library('./node_modules/underscore/underscore.js');
window.globalCom  = vendor_library('./node_modules/webpack/buildin/global.js');
window.Vue = vendor_library('./node_modules/vue/dist/vue.runtime.esm.js');

var commonFun = {};
commonFun.test = function(){

}
commonFun.ajaxFun=function(obj,callback){
    $.ajax({
         url:apiUrl[sceneParam] +obj.url,
        type:obj.type?obj.type:'post',
        data:JSON.stringify(obj.params),
        contentType:'application/json'
    }).then(()=>{
        console.log('oo');
        callback && callback(data);
    })
}


export default commonFun;


