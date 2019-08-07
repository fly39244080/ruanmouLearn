let vMyDirective = {},
    expressArr = [];

 //方法一:
//  解决方案1：可以追加一个元素来显示旋转器，然后隐藏它的其他子元素。    
vMyDirective.install = function install (_Vue) {
  _Vue.directive('loading', {
    inserted: function (el, binding) {
        let spinner = document.createElement('span');
        spinner.className='loading-now';
        spinner.innerHTML = 'Loading...';

        Array.from(el.children).forEach((item)=>{
            item.style.display='none';
        })
        el.appendChild(spinner);

    },
    update: function (el, binding, vnode) {
        
        
         if(!binding.value){
            Array.from(el.children).forEach((item)=>{
                item.style.display = 'block';
            })
            if(!binding.value) {
                el.querySelector('.loading-now') && el.querySelector('.loading-now').remove();
            }
         }
        
    },
    unbind: (el) => {
        console.log('ooo');
    }
  })
}

// 解决方案2：强制更新(&强制使用新的vnode.key重新挂载)loading === false，
// 但这可能不是一个好方法，因为有针对修改vode。

// vMyDirective.install = function install (_Vue) {
//     _Vue.directive('loading', {
//       bind: function (el, binding, vnode) {
//         if(binding.value) {
//           el.innerHTML = '<span class="loading-now">loading...</span>'
//         }
//       },
//       update: function (el, binding, vnode) {    
//         if(!binding.value){
//             vnode.key += '1'
//             vnode.context.$forceUpdate()
//          }
//       }
//     })
//   }

  
export default vMyDirective;