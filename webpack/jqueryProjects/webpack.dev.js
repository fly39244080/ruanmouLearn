const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const extractTextPlugin = require('extract-text-webpack-plugin'); 

const baseWebpackConfig = require('./webpack.common.js');

var buildPath = path.resolve(__dirname,'dev');
module.exports = merge(baseWebpackConfig,{
    output: {
        filename: '[name].js',
        path:buildPath,  
        publicPath:'/'
     },
    devServer:{
        contentBase:buildPath,
        host:'0.0.0.0',
        port:'3200',
        historyApiFallback: true,
        open:true,
        publicPath:'/',
        useLocalIp:true
    },
    plugins:[
        new extractTextPlugin("styles/[name].css")
     ]
})