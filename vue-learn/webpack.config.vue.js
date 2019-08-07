var webpack = require('webpack');
const fs = require('fs')
var path = require('path');


//插件是用于编译 Webpack项目中的html类型的文件
var HtmlWebpackPlugin  = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin'); //必须是最新的beta版本才支持webpack4

//开发环境打包路径
var buildPath = path.resolve(__dirname,"dev1");

var outFilename = '[name]'; //输出文件
var pluginsAll=[];   //插件
var webpackdevServer={}; 

pluginsAll.push(new VueLoaderPlugin());  // 请确保引入这个插件来施展魔法
pluginsAll.push(new HtmlWebpackPlugin({
    title: '首页2',
    template: 'indexV.html',
    filename: 'index.html',
    hash:true,
    chunks: ["index"],
    chunksSortMode:'manual'}));  // 处理html模版

var isProduction = (process.env.scene.replace(/ /g,'')) == 'prod';  //判断运行环境
//isProduction true 线上环境
//isProduction false 开发环境
if(isProduction){
    buildPath = path.resolve(__dirname,"build");
    outFilename = '[name].[chunkhash]';

} else {
    webpackdevServer={
        contentBase: buildPath,
        historyApiFallback: true,   //任意的 404 响应都可能需要被替代为 index.html
        host: '0.0.0.0',
        port: 3010
    };
}
pluginsAll.push(new CopyWebpackPlugin([
   {
        from: path.resolve(__dirname, './static'),
        to: buildPath+'/copy',
        ignore: ['.*']
        }
    ]));

// pluginsAll.push(new webpack.DefinePlugin({
//     'NICE_FEATURE': JSON.stringify(true),
//     'EXPERIMENTAL': JSON.stringify(false),
// }));  

//抽出 css 方式一：
pluginsAll.push(new extractTextPlugin('styles/'+outFilename+'.css'));


var config = {
    //入口文件配置
    entry: path.join(__dirname, 'src/index.js'),
    resolve:{
        //配置以后，后面import的时候可以省略文件后缀名
        extensions:['.less','.js','jsx','.tsx','.ts']
    },
    //文件导出的配置
    output:{
        path:buildPath, //打包文件路径
        publicPath:'/',
        filename:outFilename+'.js',   //打包文件名称,入口进去的是什么名字，输出的就是什么名字
    },
    plugins:pluginsAll,
    //定义对模块的处理逻辑
    module:{
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
              },
            {
                test:/\.vue$/,   // 处理以.vue结尾的文件
                use:{
                    loader:'vue-loader' 
                }
            },
            //babel 配置，用来识别ES6语法
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader'
                },
                exclude:/node_modules/
            },
            //用来预解析SCSS
            {
                test: /\.scss$/,
                // loader:'style-loader!css-loader!postcss-loader!sass-loader', //不需要抽出CSS的时的简写
                //单独抽出CSS
                use: extractTextPlugin.extract({ 
                    use:[{
                        loader: "css-loader" 
                      }, {
                        loader:"postcss-loader"
                      },{
                        loader: "sass-loader"
                      }],
                      fallback: "style-loader"
                })
            },
            //不单独抽出CSS
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },   
            //抽出CSS配置
            // {
            //     test: /\.less$/,
            //     use: extractTextPlugin.extract({
            //         use: [{
            //             loader: "css-loader"
            //         }, {
            //             loader: "less-loader"
            //         }],
            //         fallback: "style-loader"
            //     })
            // },
            //图片配置
            {
                test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        name: "[name].[hash:5].[ext]",
                        outputPath: "img",
                        limit:5000, //是把小于500B的文件打成Base64的格式，写入JS
                        // publicPath: "../"
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'fonts/[name].[hash:7].[ext]'
                }
              },
              {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'img/[name].[hash:7].[ext]'
                }
              }
          ]    
    },
    devServer:webpackdevServer
}
 
module.exports = config;
