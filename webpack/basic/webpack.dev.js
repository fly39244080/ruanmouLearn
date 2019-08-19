
const path = require('path');
var buildPath = path.resolve(__dirname,'build');
//插件是用于编译 Webpack项目中的html类型的文件
var htmlWebpackPlugin  = require('html-webpack-plugin'); 
function resolvePath (dir) {
    return path.join(__dirname, '..', dir)
  }

module.exports = { 
    mode:'development', 
    resolve:{ 
        extensions:['.less','.js','jsx'] ,
        alias:{
            '@': resolvePath('src'),
            'js': resolvePath('src/js'),
            'styles': resolvePath('src/styles')

        }
     }, 
    //  entry: path.resolve(__dirname,'src/index.js'),
    // entry:{ 
    //     //入口文件配置 
    //     index:path.resolve(__dirname,'src/js/index.js') ,
    //     main:path.resolve(__dirname,'src/js/main.js') 
    // }, 
    entry: () => new Promise((resolve) => resolve(['./src/js/index.js', './src/js/main.js'])),
    output:{ 
        //出口文件配置 
        path:buildPath, 
        filename:'[name].js' 
    }, 
     //模块，例如解读css,图片如何转换，压缩等 
    module:{
        
        rules:[
               { 
                test: /\.css$/,
                use: [
                        { loader: "style-loader"}, 
                        { loader: "css-loader" }
                  ] 
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                // use:{
                //     loader:'babel-loader'
                // },
                exclude:/node_modules/
            }
        ]
    }, 
    //插件，用于生产模板和各项功能 
    plugins:[
        new htmlWebpackPlugin({
            filename: path.resolve(buildPath, 'test.html'),
            template: path.resolve(__dirname, 'src/index.html')
        })
    ], 
     //配置webpack开发服务 
    // devServer:{} 
    }