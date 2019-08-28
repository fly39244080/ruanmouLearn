const path = require('path');

const glob = require('glob');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//必须是最新的beta版本才支持webpack4
const extractTextPlugin = require('extract-text-webpack-plugin'); 

//以程序为根目录，作为起点，根据参数解析出一个绝对路径
var buildPath = path.resolve(__dirname,'build'); 

var htmlPagesPath = path.resolve(__dirname,'pages');
var srcPath = path.resolve(__dirname,'src');
var pluginsAll = []; //存储所有的插件

console.log(process.env.scene);
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

if(!isProduction) {
    buildPath = path.resolve(__dirname,'dev');
} 

pluginsAll.push(new webpack.DefinePlugin({
    'sceneParam': JSON.stringify(process.env.scene),
    'laney':JSON.stringify('laney'),
    'test':'"kkkkk"'
})); 

pluginsAll.push(new CopyWebpackPlugin([ 
    { from: path.resolve(__dirname,'./static'), to: buildPath+'/static' }
  ]));

  pluginsAll.push(new webpack.ProvidePlugin({
    // config:path.resolve(srcPath,'js/config.js')
    // config:'config'
    // config:['config','default'],
    config:[path.resolve(srcPath,'js/config.js'),'default'],
    $:'jquery',
    jQuery:'jquery'
  }));
  
  
// 异步读取文件夹里的文件
//  fs.readdir(htmlPagesPath,function(err,files){
//     console.log(files);
// }); 

module.exports = {
    //入口的配置文件
    // entry: './src/index.js',   //方式一
    // entry: ['./src/index.js','./src/main.js'], //方法二
    entry:newEntries,
     resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'src': srcPath,
          'styles': srcPath+'/styles',
          'images':srcPath+'/images',
          'config':path.resolve(srcPath,'js/config.js')
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
                test:/\.(png|jpg|gif|jpeg)/, //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        name: "[name].[hash:5].[ext]",
                        outputPath: "img",
                        limit:1024 //是把小于500B的文件打成Base64的格式，写入JS
                        // publicPath: "http:/33.33.3.3.3/"
                    }
                }]
            }
        ]
     },
     plugins:pluginsAll
}


