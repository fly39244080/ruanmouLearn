var express = require('express');
var mysql = require('mysql');
var router = express.Router();
let auth = require('../lib/auth.js'); 

/*建立数据库链接*/
var db = mysql.createConnection({
  host:'127.0.0.1',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'ruanmoutest'
});

 // Connect
db.connect((err) => {
  if(err) {
      throw(err);
  }
  console.log('MySql Connected...')
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  //发送各种类型的响应
  res.send('respond with a resource');
  // res.end();//结束响应过程
});

//登录接口
router.post('/login',function(req,res,next){ 
  let username = req.body.username;
  let password = req.body.password;
  const adminStr = `select * from manage where username='${username}' and password='${password}'`;
 
  db.query(adminStr, (err, data) => {
    if (err) {
        console.log(err);
        res.status(500).send('database err').end();
    } else {
        if (data.length == 0) {
            res.json({
              code:0,
              data:0,
              message:'用户名或者密码错误'
            });
        } else {
            // res.send(data);
               //先从数据库里查询是否有这个用户， 如果有就开始鉴权生成token，否则不处理
            let Token = auth.makeToken(username); 
            res.json({
              code:1,
              data:1,
              token:Token
            },200)
        }
    }
});   
});
//注册
router.post('/reg',(req,res)=>{
   //先验证数据库里是否有这个 用户名
   var  sqlStr01 = 'select * from manage';
   db.query(sqlStr01,(err,results) => {
     if(err){
          return res.json({
              code:0,
              message:'注册失败，用户名已经被注册过了！',
              data:0
          })
     } else if(results.length>0) {
        //这里再进行数据库的插入工作
        var {phone,username,password} = req.query;
       
        var sqlInsert = `insert into manage(username,password,phone) values("${phone}","${username}","${password}")`;
        db.query(sqlInsert,(err,results) => {
          if(err) {
                return res.json({
                    code:0,
                    message:'获取失败'
                })
            }
            res.json({
                code:1,
                message:'注册成功',
                data:1
            })
         })
     }
   })
})
router.post('/staffs',(req,res)=>{
  const sqlStr = 'select * from staffs';
  db.query(sqlStr,(err,results) => {
      if(err) {
          return res.json({
              code:0,
              message:'获取失败',
              data:0
          })
      }
      res.json({
          code:1,
          message:'获取成功',
          data:results
      })
  })
})
router.use('*',[auth.validate],function(req,res,next){ 
  next();
}); 

router.post('/staffs/add',(req,res)=>{
  var {username,sex,age,hometown} = req.query;
       console.log(req.query);
      //  var sqp2="INSERT INTO staffs(username,age,hometown,sex) values('11','33','oo','ppp')";
   var sqlInsert = `INSERT INTO staffs(username,age,hometown,sex) values("${username}","${age}","${hometown}","${sex}")`;

  db.query(sqlInsert,(err,results) => {
      if(err) {
          return res.json({
              code:0,
              message:'插入数据失败',
              data:0
          })
      }
      res.json({
          code:1,
          message:'插入数据成功',
          data:results
      })
  })
});

//删除员工
router.get('/staffs/delete',(req,res)=>{
  var {id} = req.query;
      console.log(req.query);  
   var sqlDelete = `DELETE FROM staffs where id=${id}`;
  db.query(sqlDelete,(err,results) => {
      if(err) {
          return res.json({
              code:0,
              message:'删除数据失败',
              data:0
          })
      }
      res.json({
          code:1,
          message:'删除数据成功',
          data:1
      })
  })
});

//修改员工
router.get('/staffs/update',(req,res)=>{
  var {id} = req.query;
      console.log(req.query);  
   var sqlDelete = `UPDATE FROM staffs where id=${id}`;
  db.query(sqlDelete,(err,results) => {
      if(err) {
          return res.json({
              code:0,
              message:'删除数据失败',
              data:0
          })
      }
      res.json({
          code:1,
          message:'删除数据成功',
          data:1
      })
  })
});

module.exports = router;
