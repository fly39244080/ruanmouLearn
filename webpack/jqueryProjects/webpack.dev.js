const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const extractTextPlugin = require('extract-text-webpack-plugin'); 
 //需要在项目环境安装webpack
var htmlWebpackPlugin = require('html-webpack-plugin');

const baseWebpackConfig = require('./webpack.common.js');
var htmlPagesPath = path.resolve(__dirname,'pages');
var buildPath = path.resolve(__dirname,'dev');

var pluginsAll2 = [];
// 同步读取文件夹里的文件
// var pages = fs.readdirSync(htmlPagesPath); 
var pages = glob.sync(path.join(htmlPagesPath,'**/*.html')); 

pages.forEach(function(page){
    var pagestr = page.match(/pages\/(\S*)\.html/);
    var name = pagestr[1];
    var plug = new htmlWebpackPlugin({
        filename:path.resolve(buildPath,name+'.html'),
        title:'测试',
        template:path.resolve(htmlPagesPath,name+'.html'),
        inject:true,
        chunks:[name],
        favicon: path.resolve(__dirname, './fav.ico') 
    })
    pluginsAll2.push(plug);
})

pluginsAll2.push(new extractTextPlugin("styles/[name].css"))

module.exports = merge(baseWebpackConfig,{
    output: {
        filename: '[name].js',
        path:buildPath,  
        publicPath:'/'
     },
     module:{
        rules:[
            {
                test:/\.less$/,
                //抽出css
                use:extractTextPlugin.extract({
                      use:[
                            {loader:'css-loader'},
                            {loader:'less-loader'}    
                      ],
                      fallback:'style-loader'
                   })
             },
        ]
     },
    devServer:{
        contentBase:buildPath,
        host:'0.0.0.0',
        port:'3200',
        historyApiFallback: true,
        open:false,
        publicPath:'/',
        useLocalIp:true,
        proxy: {
            "/api": {
              target: "http://localhost:3000",  //接口的服务
              secure: false
            }
          }
    },
    plugins:pluginsAll2
})