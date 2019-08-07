const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};

const pin = {
    bind: function (el, binding, vnode) {
        el.style.position = 'fixed'  
        var s = binding.arg;
        el.style[s] = binding.value + 'px'
    }
};
const demo ={
    bind: function (el, binding, vnode) {
        var s = JSON.stringify
        el.innerHTML =
        'name: '       + s(binding.name) + '<br>' +
        'value: '      + s(binding.value) + '<br>' +
        'expression: ' + s(binding.expression) + '<br>' +
        'argument: '   + s(binding.arg) + '<br>' +
        'modifiers: '  + s(binding.modifiers) + '<br>' +
        'vnode keys: ' + Object.keys(vnode).join(', ')
    }
}

const loading = {
    bind: (el, binding) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = 'loading...'
        const round = document.createElement('div')
        round.className = 'loading-now';
        tempDiv.appendChild(round)
        el.loadingElement = tempDiv
        
        if (binding.value) {
            el.appendChild(tempDiv)
        }
    },
    update: (el, binding) => {
        if (binding.value) {
        if (el.loadingElement.parentNode === null) {
            el.appendChild(el.loadingElement)
        }
        } else {
        if (el === el.loadingElement.parentNode) {
            el.removeChild(el.loadingElement)
        }
        }
    },
    unbind: (el) => {
        if (el.loadingElement.parentNode === el) {
        el.removeChild(el.loadingElement)
        }
        el.loadingElement = null
    }
}

export  default {
    clickoutside,pin,loading,demo
 }

