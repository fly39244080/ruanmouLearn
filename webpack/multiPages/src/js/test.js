
import 'styles/test.less';
var $testDom = $('#testDom');

$testDom.on('click',function(){
    console.log('poo');
    $('.content').toggle();

    require.ensure([], function(require){
        require('./a.js');
    });

})

