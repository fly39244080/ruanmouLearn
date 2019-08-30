const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode:'development',
    entry:{
        vendor:['vue','jquery','underscore']
    },
    
    output:{
        path:path.join(__dirname,'static/js'),
        filename:'[name].dll.js',  //打包文件的名字
        library:'[name]_library'    ////可选 暴露出的全局变量名
        // vendor.dll.js中暴露出的全局变量名。
      // 主要是给DllPlugin中的name使用，
      // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    },
    plugins:[
        new webpack.DllPlugin({
            //生成上文说到清单文件，放在当前目录，这个看你自己想放哪里了。
            path:path.join(__dirname,'[name]-manifest.json'), 
            name:'[name]_library', //与上面的library保持一致
            context:'__dirname'
        })
    ]
}