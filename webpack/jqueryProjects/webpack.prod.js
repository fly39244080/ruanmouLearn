const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const extractTextPlugin = require('extract-text-webpack-plugin'); 
const baseWebpackConfig = require('./webpack.common.js');

var buildPath = path.resolve(__dirname,'build');
 var teat = merge(baseWebpackConfig,{
    output: {
        filename: '[name].[chunkhash].js',
        path:buildPath,  
        publicPath:'/'
     },
    //  module:{
    //     rules:[
    //         { 
    //             test:/\.(jsx|js)$/, 
    //             use:[{ loader:'babel-loader' }], 
    //             exclude:/node_modules/ 
    //         }
    //     ]
    //  },
     plugins:[
        new extractTextPlugin("styles/[name].[chunkhash].css")
     ]
})
console.dir(teat.module.rules[2])
module.exports =teat