

// apiUrl[sceneParam].product 
window.jQuery = window.$ = vendor_library('./node_modules/jquery/dist/jquery.js');
window._ = window._ = vendor_library('./node_modules/underscore/underscore.js');
window.globalCom  = vendor_library('./node_modules/webpack/buildin/global.js');
window.Vue = vendor_library('./node_modules/vue/dist/vue.runtime.esm.js');

var commonFun = {};
commonFun.test = function(){

}
commonFun.ajaxFun=function(obj,callback){
    console.log(obj);
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


