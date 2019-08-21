var path = require('path');
var fs = require('fs');
var glob = require('glob');
//以程序为根目录，作为起点，根据参数解析出一个绝对路径
var buildPath = path.resolve(__dirname,'build'); 
var devPath = path.resolve(__dirname,'dev'); 
var htmlPagesPath = path.resolve(__dirname,'pages');
var srcPath = path.resolve(__dirname,'src');
var pluginsAll = []; //存储所有的插件
var webpackdevServer={}; //热启动
var outFilename = '[name]';

console.log(process.env.mode);
// console.log(process.env.scene);
var isProduction = (process.env.scene=='prod');

//入口文件
var newEntries = {};
// var files = glob.sync(path.join(srcPath,'js/*.js')); // 方式一

var files = glob.sync(srcPath+'/js/*.js');  //方式二

files.forEach(function(file,index){
//    var substr =  file.split('/').pop().split('.')[0];
   var substr = file.match(/src\/js\/(\S*)\.js/)[1];
   newEntries[substr] = file;
})
// console.log(newEntries)
var htmlWebpackPlugin = require('html-webpack-plugin'); //需要在项目环境安装webpack

// 同步读取文件夹里的文件
var pages = fs.readdirSync(htmlPagesPath); 
pages.forEach(function(page){
    var name = page.split('.')[0];
    var plug = new htmlWebpackPlugin({
        filename:path.resolve(buildPath,'pages/'+page),
        title:'测试',
        template:path.resolve(htmlPagesPath,page),
        inject:true,
        chunks:[name]
    })
    pluginsAll.push(plug);

})

// 异步读取文件夹里的文件
//  fs.readdir(htmlPagesPath,function(err,files){
//     console.log(files);
// }); 

if(isProduction) {
    outFilename = '[name].[chunkhash]';
} else {
    webpackdevServer = {
        contentBase:devPath,
        host:'localhost',
        port:'3100',
        open:true,
        publicPath:'/'
        // useLocalIp:true
    }
}
module.exports = {
    //入口的配置文件
    // entry: './src/index.js',   //方式一
    // entry: ['./src/index.js','./src/main.js'], //方法二
    entry:newEntries,
    output: {
        filename: outFilename+'.js',
        path: path.resolve(buildPath,'js')
     },
     resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'src': srcPath,
          'styles': srcPath+'/styles',
        }
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
     },
     plugins:pluginsAll,
     devServer:webpackdevServer
}


