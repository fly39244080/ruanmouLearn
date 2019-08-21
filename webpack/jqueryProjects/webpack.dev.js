var path = require('path');
var fs = require('fs');
var glob = require('glob');
//以程序为根目录，作为起点，根据参数解析出一个绝对路径
var buildPath = path.resolve(__dirname,'build'); 
var htmlPagesPath = path.resolve(__dirname,'pages');
var srcPath = path.resolve(__dirname,'src');

//入口文件
var newEntries = {};
// var files = glob.sync(path.join(srcPath,'js/*.js')); // 方式一
// console.log(path.join(srcPath,'js/*.js'));
// console.log(srcPath+'/js/*.js');

var files = glob.sync(srcPath+'/js/*.js');  //方式二

files.forEach(function(file,index){
//    var substr =  file.split('/').pop().split('.')[0];
   var substr = file.match(/src\/js\/(\S*)\.js/)[1];
   newEntries[substr] = file;
})
console.log(newEntries)
var htmlWebpackPlugin = require('html-webpack-plugin'); //需要在项目环境安装webpack

// 同步读取文件夹里的文件
// var pages = fs.readdirSync(htmlPagesPath); 

// 异步读取文件夹里的文件
//  fs.readdir(htmlPagesPath,function(err,files){
//     console.log(files);
// }); 


module.exports = {
    //入口的配置文件
    // entry: './src/index.js',   //方式一
    // entry: ['./src/index.js','./src/main.js'], //方法二
    entry:newEntries,
    output: {
        filename: '[name].js',
        path: path.resolve(buildPath,'js')
     },
     //模块，处理各种loader
     module:{
        rules:[
            // {
            //     test:/\.css$/,
            //     //use:['style-loader','css-loader'],
            //     use:[{loader:'style-loader'},{loader:'css-loader}]
            // },
        {
            test:/\.less$/,
            use:['style-loader','css-loader','less-loader'],
            // use:[
            //     {loader:'style-loader'},
            //     {loader:'css-loader'},
            //     {loader:'less-loader'}
            // ]
        }
    ]
     }
}