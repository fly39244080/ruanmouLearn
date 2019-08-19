var path = require('path');

var basePath = path.join(__dirname, 'resources'),
    staticPath = path.join(basePath, 'static'),
    publicPath=path.join(staticPath, 'public'),
    webPath=path.join(staticPath, 'web');

var publicPathJS=path.join(publicPath, 'js');
var outputPath=path.join(basePath, 'develop');  //打包文件路径
var dllplugins=path.join(staticPath, 'public/js/dllplugins');

var publicStyle=path.join(publicPath, 'styles'),
    webJs=path.join(webPath, 'js'),
    webJsModule=path.join(webPath, 'js/module'),
    webStyle=path.join(webPath, 'styles'),
    webImages=path.join(webPath, 'images'),



var allPath = {
    basePath:basePath,
    staticPath:staticPath,
    publicPath:publicPath,

    webPath:webPath,
    publicPathJS:publicPathJS,
    outputPath:outputPath,
    dllplugins:dllplugins,
    publicStyle:publicStyle,

    webJs:webJs,
    webJsModule:webJsModule,
    webStyle:webStyle,
    webImages:webImages,
};

module.exports = allPath;



