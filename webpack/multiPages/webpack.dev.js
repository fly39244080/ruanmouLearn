
var webpack = require('webpack');
var path = require('path');
const fs = require('fs')
var glob=require('glob');
var AssetsPlugin = require('assets-webpack-plugin');

const extractTextPlugin = require('extract-text-webpack-plugin'); //必须是最新的beta版本才支持webpack4
const CopyWebpackPlugin = require('copy-webpack-plugin');
// var CleanWebpackPlugin = require('clean-webpack-plugin');  //清空文件夹里的文件

// 引入 happypack
const HappyPack = require('happypack');

// 创建 happypack 共享进程池，其中包含 6 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 6 });

//js压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//插件是用于编译 Webpack项目中的html类型的文件
var htmlWebpackPlugin  = require('html-webpack-plugin');

//开发环境打包路径
var buildPath = path.resolve(__dirname,'build');
//src文件夹的路径
var srcPath = path.resolve(__dirname,"src");
//pages文件夹的路径
var htmlPagesPath = path.resolve(__dirname,"pages");

var pluginsAll=[];   //插件
var webpackdevServer={}; 

console.log(process.env.scene);
var isProduction = (process.env.scene=='prod');
//true 线上环境
if(isProduction){
    buildPath = path.resolve(__dirname,"build");
    outFilename = '[name].[chunkhash]';
    pluginsAll.push(new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
            drop_console: true,
            drop_debugger: true
            }
        }
    }));

    // //打包之前先删除打包文件里的文件方便重新打包
	// pluginsAll.push(new CleanWebpackPlugin(['build'], {
	// 	root: buildPath,
	// 	verbose: true,
	// 	dry: false,
	// 	watch:true
	// }));

}else {
    webpackdevServer = {
        contentBase:buildPath,
        host:'localhost',
        port:'3008'
    }
}
pluginsAll.push(new CopyWebpackPlugin([
   {
        from: path.resolve(__dirname, './static'),
        to: buildPath+'/static',
        ignore: ['.*']
        }
    ]));
pluginsAll.push(new extractTextPlugin('styles/[name].css'));

pluginsAll.push(new webpack.DefinePlugin({
    'NICE_FEATURE': JSON.stringify(true),
    'EXPERIMENTAL': JSON.stringify(false),
}));  

//生成json文件的列表索引插件
pluginsAll.push(new AssetsPlugin({
	filename: 'assets-resources.json',
	fullPath: false,
	includeManifest: 'manifest',
	prettyPrint: true,
	update: true,
	path: buildPath,
	metadata: {version: 123}
}));
//添加DllReferencePlugin插件
pluginsAll.push(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./vendor-manifest.json')
  }));

pluginsAll.push(new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
}));

pluginsAll.push(new HappyPack({
    /*
     * 必须配置
     */
    // id 标识符，要和 rules 中指定的 id 对应起来
    id: 'styles',
    // 需要使用的 loader，用法和 rules 中 Loader 配置一样
    // 可以直接是字符串，也可以是对象形式
    loaders: ['style-loader', 
        { loader: 'css-loader' },
        { loader: 'less-loader' }
    ],
    // 使用共享进程池中的进程处理任务
    threadPool: happyThreadPool
}));


//入口文件的配置
var newEntries={}; 

var files = glob.sync(path.join(srcPath, 'js/*.js'));
files.forEach(function(file){
    var substr = file.match(/src\/js\/(\S*)\.js/)[1];
	newEntries[substr] = file;
});

htmlPages();
function htmlPages() {
    var pages = fs.readdirSync(htmlPagesPath);
    console.log(pages);
    var pages = glob.sync(path.join(htmlPagesPath, '**/*.html'));
    if (isProduction) {
        var minifyConfig = {
            removeComments: true,
            collapseWhitespace: false,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        };
    }
    pages.forEach(function (page) {
        var pagestr = page.match(/pages\/(\S*)\.html/);
        var name = pagestr[1];
        var template = path.resolve(htmlPagesPath, name + '.html'),
            chunks = [name];
            console.log(chunks)
        
        var plug = new htmlWebpackPlugin({
            filename: path.resolve(buildPath, 'pages/'+name + '.html'),
            title: '树鱼虚拟充值生态服务平台',
            template: template,
            inject: true,
            chunks: chunks,
            hash: true,
            favicon: path.resolve(__dirname, './fav.ico'),
            minify: minifyConfig
        });
        pluginsAll.push(plug);
    });
}

module.exports = {
    //入口文件配置
    entry:newEntries,
    //出口文件配置
    output:{
        //打包文件地址
        path:buildPath,
        //打包的文件名
        filename:'js/[name].js',
        chunkFilename:'chucks/[name].[chunkhash].js',
        publicPath:'/'
    },

    // //模块，比如解读CSS
    module:{
        rules:[
            { 
                test: /\.css$/,
                // use:['style-loader','css-loader'],
                use: [
                    { loader: "style-loader"}, 
                    { loader: "css-loader" }
                  ] 
            },
            //没用happypack 的情况
            // { 
            //     test: /\.less$/,
            //     use: extractTextPlugin.extract({
            //         use:[
            //             { loader: "css-loader" },
            //             { loader: "less-loader" }
            //           ],
            //         fallback:"style-loader" 
            //     })   
            // },
            {
                 test: /\.less$/,
                 // 使用 id 指定创建的 HappyPack 插件
                 use: ['happypack/loader?id=styles'],
                 include: path.resolve(__dirname, 'src')
            },
            //图片配置
            {
                test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        name: "images/[name].[hash:8].[ext]",
                        // outputPath: "images",
                        limit:5000, //是把小于500B的文件打成Base64的格式，写入JS
                        publicPath: "../"
                    }
                }]
            }
        ]
    },
    resolve:{
        extensions: [ '.js', '.jsx'],
        alias:{
            src:srcPath,
            js:path.resolve(srcPath, 'js'),
            styles:path.resolve(srcPath, 'styles'),
            images:path.resolve(srcPath, 'images')
        }
    },
    plugins:pluginsAll,
    // //配置webpage服务
    devServer:webpackdevServer
}