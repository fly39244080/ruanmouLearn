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
var commonFun = {};
commonFun.test = function(){

}
commonFun.ajaxFun=function(obj){
    // $.ajax({
     //     url:apiUrl[sceneParam] +obj.url,
    //     type:'post',
    //     data:''
    // }).then(()=>{
    //     console.log('oo');
    // })
}


export default commonFun;


