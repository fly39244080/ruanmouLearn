const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode:'development',
    entry:{
        vender:['jquery','underscore']
    },
    
    output:{
        path:path.join(__dirname,'static/js'),
        filename:'[name].dll.js',  //在这个文件全局变量名
        library:'[name]_library'  
    },
    plugins:[
        new webpack.DllPlugin({
            path:path.join(__dirname,'[name]-mainfest.json'),
            name:'[name]_library',
            context:'__dirname'
        })
    ]
}