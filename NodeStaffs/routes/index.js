var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 登录页面. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录页面' });
});

//注册页面

router.get('/register', function(req, res, next) {
  res.render('register', { title: '注册页面' });
});
//关于  
// 修改成了/views目录下面的about.ejs
// 当然系统会根据我们的配置直接去找views目录下面的about.ejs
router.get('/about', function(req, res, next) {
  //呈现视图模板 res.render(模板名称，渲染的页面的参数)
  res.render('about', { title: 'about page' });
});

//员工列表  
router.get('/staffs', function(req, res, next) {
  //呈现视图模板 res.render(模板名称，渲染的页面的参数)
  res.render('staffs', { title: 'staffs page' });
});

//添加员工
router.get('/staffs/add', function(req, res, next) {
  res.render('staff-add', { title: '添加新员工' });
});

module.exports = router;
