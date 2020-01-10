//倒计时
function countDownLoan(option,callback) {
    let defaultOpt={
        btnDom:'',
        time:60,
        textCounting:'秒后重新发送',
        isAfterText:'重新发送'
    };
    let options = Object.assign({},defaultOpt,option),
        downtimer;
    let countBtn= options.btnDom;

    let countDownStart=function() {
        let isInputButton = countBtn.tagName.toUpperCase()=='INPUT';
        if(isInputButton) {
            countBtn.value = options.time+ options.textCounting;    
        } else {
            countBtn.innerText =options.time + options.textCounting;   
         }
        countBtn.setAttribute('disabled','disabled');
        countBtn.classList.add('count-downing');

        if(options.time==0) {
            //结束倒计时
            clearInterval(downtimer);
            callback && callback();
            if(isInputButton) {
                countBtn.value = options.isAfterText;    
            } else {
                countBtn.innerText = options.isAfterText;   
            }
            countBtn.removeAttribute('disabled');
            countBtn.classList.remove('count-downing');
        } else {
            options.time = options.time -1;
        }

    }
    if(options.time>0) {
        countDownStart();//立即调用一次，解决延迟加载的问题
        downtimer=setInterval(function () {
            countDownStart();
        },1000);
    }
}

// 像scroll，resize，keyup等事件频繁触发会引发页面的抖动甚至卡顿,设计模式里的虚拟代理 
function debounce(fn,delay){
    delay = delay || 200;
    var timer=null;
   
    return function(){
        var arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(this,arg);
        },delay);
    }
}


var isClassList = 'classList' in HTMLElement.prototype;
//为什么要在属性的get上定义， 而不是直接在HTMLElement.prototype的原型上去定义呢， 
// 是为了对方法进行保护
if(!isClassList){
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get:function(){
            var _self = this;
            return {
                add:function(cls){  
                    if(!this.contains(cls)){
                        _self.className += " " + cls; 
                    }
                },
                contains:function(cls){
                    var index = _self.className.indexOf(cls);
                    return index!=-1 ? true :false;
                },
                remove:function(cls){
                    if(this.contains(cls)){
                        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)'); 
                        _self.className = _self.className.replace(reg, ' '); 
                      }
                },
                toggle:function(cls){
                    if(this.contains(cls)){
                        this.remove(cls); 
                    }else{ 
                        this.add(cls); 
                    } 
                }
            }
        }

    })
}

