const webpack = require('webpack');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const extractTextPlugin = require('extract-text-webpack-plugin'); 
 //需要在项目环境安装webpack
 var htmlWebpackPlugin = require('html-webpack-plugin');
 var htmlPagesPath = path.resolve(__dirname,'pages');
const baseWebpackConfig = require('./webpack.common.js');

var buildPath = path.resolve(__dirname,'build');
// 引入 happypack
const HappyPack = require('happypack');

// 创建 happypack 共享进程池，其中包含 6 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 6 });

var pluginsAll2 = [];
// 同步读取文件夹里的文件

var pages = glob.sync(path.join(htmlPagesPath,'**/*.html')); 
pages.forEach(function(page){
    // console.log(page);
    var pagestr = page.match(/pages\/(\S*)\.html/);
    var name = pagestr[1];
    console.log('----------------------------------');
    console.log(name);
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
pluginsAll2.push(new extractTextPlugin("styles/[name].[chunkhash].css"));
pluginsAll2.push(new HappyPack({
          //用id来标识 happypack处理那里类文件
          id: 'babel',
          //如何处理  用法和loader 的配置一样
          loaders: [{
            loader: 'babel-loader?cacheDirectory=true',
          }],
          //共享进程池
          threadPool:happyThreadPool,
          verbose: true    //允许 HappyPack 输出日志
        }));

    pluginsAll2.push(new HappyPack({
              //用id来标识 happypack处理那里类文件
              id: 'styles',
              //如何处理  用法和loader 的配置一样
              loaders:['css-loader','postcss-loader','less-loader'],

              //共享进程池
              threadPool:happyThreadPool,
              verbose: true    //允许 HappyPack 输出日志
            }));

 var teat = merge(baseWebpackConfig,{
//    optimization: {
//       splitChunks: {
//           cacheGroups: {
//               vendor: {
//                   name: "vendor",
//                   test: /[\\/]node_modules[\\/]/,
//                   chunks: "all",
//                   priority: 10 // 优先级
//               },
//               common: {
//                   name: "common",
//                   test: /[\\/]src[\\/]/,
//                   minSize: 1024,
//                   chunks: "all",
//                   priority: 5
//               }
//           }
//       }
//   },
    output: {
        filename: 'js/[name].[chunkhash].js',
        path:buildPath,  
        publicPath:'./'
     },
     module:{
        rules:[
         {
            test:/\.less$/,
            //抽出css
            use:extractTextPlugin.extract({
                //   use:[
                //         {loader:'css-loader'},
                //         {loader:'postcss-loader'
                //            //, options:{
                //            //     plugins:[
                //            //         require("autoprefixer")
                //            //       ]
                //            // }
                //         },
                //         {loader:'less-loader'}    
                //   ],
                  use:'happypack/loader?id=styles',
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
                // use:[{ loader:'babel-loader' }], 
                use:'happypack/loader?id=babel',
                exclude:/node_modules/ 
            }
        ]
     },
     plugins:pluginsAll2
})

module.exports = teat