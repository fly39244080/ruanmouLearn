const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const extractTextPlugin = require('extract-text-webpack-plugin'); 
 //需要在项目环境安装webpack
 var htmlWebpackPlugin = require('html-webpack-plugin');
 var htmlPagesPath = path.resolve(__dirname,'pages');
const baseWebpackConfig = require('./webpack.common.js');

var buildPath = path.resolve(__dirname,'build');

var pluginsAll2 = [];
// 同步读取文件夹里的文件
var pages = fs.readdirSync(htmlPagesPath); 

pages.forEach(function(page){
    var name = page.split('.')[0];
    var plug = new htmlWebpackPlugin({
        filename:path.resolve(buildPath,page),
        title:'测试www',
        template:path.resolve(htmlPagesPath,page),
        inject:true,
        chunks:[name,'vendor','common'],
        favicon: path.resolve(__dirname, './fav.ico') 
    })
    pluginsAll2.push(plug);
})
pluginsAll2.push(new extractTextPlugin("styles/[name].[chunkhash].css"))

console.log('----------');
console.log(pluginsAll2);

 var teat = merge(baseWebpackConfig,{
   optimization: {
      splitChunks: {
          cacheGroups: {
              vendor: {
                  name: "vendor",
                  test: /[\\/]node_modules[\\/]/,
                  chunks: "all",
                  priority: 10 // 优先级
              },
              common: {
                  name: "common",
                  test: /[\\/]src[\\/]/,
                  minSize: 1024,
                  chunks: "all",
                  priority: 5
              }
          }
      }
  },
    output: {
        filename: '[name].[chunkhash].js',
        path:buildPath,  
        publicPath:'./'
     },
     module:{
        rules:[
         {
            test:/\.less$/,
            //抽出css
            use:extractTextPlugin.extract({
                  use:[
                        {loader:'css-loader'},
                        {loader:'postcss-loader'
                           //, options:{
                           //     plugins:[
                           //         require("autoprefixer")
                           //       ]
                           // }
                        },
                        {loader:'less-loader'}    
                  ],
                  fallback:'style-loader'
               })
               //方式一
               // use:['style-loader','css-loader','less-loader'], 
               //方式二
               // use:[
               //     {loader:'style-loader'},
               //     {loader:'css-loader'},
               //     {loader:'less-loader'}
               // ]
         },
            { 
                test:/\.(jsx|js)$/, 
                use:[{ loader:'babel-loader' }], 
                exclude:/node_modules/ 
            }
        ]
     },
     plugins:pluginsAll2
})
// console.log('--------------');
// console.dir(teat.module.rules[2])
module.exports = teat