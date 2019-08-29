import 'styles/index.less';
console.log(config);

import _ from 'underscore';
// import _ from 'underscore';

// console.log(commFun);
// commFun.ajaxFun
// import $ from 'jquery';
debugger

$('#topMenu').on('click',function(ev){
    require.ensure([], function(require){
        require('./a.js');
    });
    var tag = $(ev.target).attr('tag');
    if(!tag) {
        return;
    }
    var tagCon = {
        1:'bank',
        2:'copy',
        3:'echarts'
    };
    location.hash='#/'+tagCon[tag];
});

window.addEventListener('hashchange',function(){
    var hash = window.location.hash;
    var hashK = hash.split('#/')[1];
    $('#mainContent').load(hashK+'.html');
    
},false);
