// nodejs+express+jwt-simple

let jwt = require('jwt-simple');
//秘钥
let secret = "laney";
let time = 10;
let tokenExpiresTime = 1000 * 60 * 60 * 24 * 7;//token过期时间,毫秒为单位， 7天
 module.exports = { 
 /*
  *检验token合法性
 */ 
 validate:function(req,res,next){ 
        let token = req.headers.token;
        if(token){ 
          let decodeToken = null;
          try { 
            //防止假冒token解析報錯 
             decodeToken = jwt.decode(token,secret);  //解密
          } catch (err) { 
            res.status(401).send("非法访问"); 
            return; 
          } 
        let exp = decodeToken.exp; 
        if(!exp){
          res.status(401).send("非法访问");
        }
        // time*60*1000   = > 10分钟
     if(exp<(Date.now()+time*60*1000)){
        res.send({code:'002',"errorMsg":"授权超时"})
      }
      next();
    }else{ 
       res.status(401).send("非法访问");
    }
  },
  /* 生成token*/ 
  makeToken(username){ 
      let Token = null; 
      //需要加密的对象
      let payload = { 
              user:username,
              time:new Date().getTime(), 
              exp:Date.now() + tokenExpiresTime
          };
      Token = jwt.encode(payload,secret); //加密
       return Token; 
 }

 }


// jwt 编码解码方法
// jwt_encode(payload, key, algorithm, options)
// jwt_decode(token, key, noVerify, algorithm)