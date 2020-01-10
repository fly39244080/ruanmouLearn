axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:3000';

//http request 拦截器  你给服务端 的数据 
axios.interceptors.request.use(
  config => {   
    config.headers.common = {
      'token': localStorage.getItem('token'),
      'version': '1.0',
      'Content-Type': 'application/json;charset=UTF-8'
    }
 
    //如果项目中只有个别的是formData可以这么处理
    if (config.url=='/api/info') {
        //转化成formData格式
        config.transformRequest=[function (data) {
            //方式一
            var ret = '';
            for (let it in data) {
              ret += it+'=' +data[it] + '&';
            }
            return ret.substring(0,ret.length-1); 
          }]
        }

    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//响应拦截器即异常处理 -  -- 服务给我们的数据
axios.interceptors.response.use(response => {
    
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
            console.log('错误请求')
          break;
        case 401:
            console.log('未授权，请重新登录')
          break;
        case 403:
          console.log('拒绝访问')
          break;
        case 404:
          console.log('请求错误,未找到该资源')
          break;
        case 405:
          console.log('请求方法未允许')
          break;
        case 408:
          console.log('请求超时')
          break;
        case 500:
          console.log('服务器端出错')
          break;
        case 501:
          console.log('网络未实现')
          break;
        case 502:
          console.log('网络错误')
          break;
        case 503:
          console.log('服务不可用')
          break;
        case 504:
          console.log('网络超时')
          break;
        case 505:
          console.log('http版本不支持该请求')
          break;
        default:
          console.log(`连接错误${err.response.status}`)
      }
    } else {
      console.log('连接到服务器失败')
    }
    return Promise.resolve(err.response)
})

window.ajax =  {
    async post (url, params) {
        var res = await axios({
            method: 'post',
            url:url,
            data: params,
            headers:{
            'token':localStorage.getItem('token')
            }
        });
        //接口正常，但是处理失败的时候
        if(res.data.code==0) {
           createMessTipWin.removeLoading();
            createMessTipWin.tipMsg(res.data.message)
            return;
        }
    return res.data;

    },
    async get(url,params={}){
      
        var res = await axios({
            method: 'get',
            url:url,
            params: params,
            headers:{
            'token':localStorage.getItem('token')
            }
        });
    return res.data;
    },
    async delete(url,params={}){
      var res = await axios({
          method: 'delete',
          url:url,
          data: params,
          headers:{
          'token':localStorage.getItem('token')
          }
      });
  return res.data;
  }
     
}


