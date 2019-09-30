Javascript代码实现图片懒加载


前言
页面太多图片？那么请你花20分钟去优化一下页面的性能

讲道理，当你为图片的src赋值时，DOM节点渲染完毕时就会主动去请求src指向的资源，即使该图片不在用户的可视范围。那么，如果图片太多，加载页面的速度会就会变慢。


原理
将资源路径赋值到img标签的data-xx属性中，而不是src属性
获取img节点距离浏览器顶部的距离，如果小于或等于浏览器窗口的可视高度，那么就将data-xx的值赋值到src里去
用到的Web API
DOM.getBoundingClientRect()

代码
html代码如下：

//  img-warpper * 5， 每张gif链接都不一样
<div class="img-warpper">
  <img class="lazyload" data-original="https://media3.giphy.com/media/k5GuJn7VslbpGQqHUB/200w.webp">
</div>
<div class="img-warpper">
  <img class="lazyload" data-original="https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp">
</div>
<div class="img-warpper">
  <img class="lazyload" data-original="https://media2.giphy.com/media/3h1rwFW1PpLxD9xLUR/200w.webp">
</div>
<div class="img-warpper">
  <img class="lazyload" data-original="https://media0.giphy.com/media/igHgY3xzYxmRcxwZBs/200w.webp">
</div>
<div class="img-warpper">
  <img class="lazyload" data-original="https://media0.giphy.com/media/69v5dFsLtzdpaFZz2N/200w.webp">
</div>

css 代码如下：
body {
  text-align: center;
 }

img {
  width: 100%;
  max-width: 300px;
  height: 200px;
  margin-bottom: 100px; // 为了方便看效果，将图片尽可能的撑开
 }

javascript 代码如下：

// 图片懒加载类
class LazyLoad {
  constructor(el) {
    this.imglist = Array.from(document.querySelectorAll(el)); // 需使用懒加载的图片集合
    this.init(); // 初始化
  }
  // 判断是否该图片是否可以加载
  canILoad() {
    let imglist = this.imglist;
    for (let i = imglist.length; i--;) {
      // 缩写，相当于if true
      this.getBound(imglist[i]) && this.loadImage(imglist[i], i);
    }
  }
  // 获取图片与窗口的信息
  getBound(el) {
    let bound = el.getBoundingClientRect();
    let clientHeight = window.innerHeight;
    // 图片距离顶部的距离 <= 浏览器可视化的高度，从而推算出是否需要加载
    return bound.top <= clientHeight - 100; // -100是为了看到效果，您也可以去掉
  }
  // 加载图片
  loadImage(el, index) {
    // 获取之前设置好的data-original值
    let src = el.getAttribute('data-original');
    // 赋值到src，从而请求资源
    el.src = src;
    // 避免重复判断，已经确定加载的图片应当从imglist移除
    this.imglist.splice(index, 1);
  }
  // 当浏览器滚动的时候，继续判断
  bindEvent() {
    window.addEventListener('scroll', () => {
      this.imglist.length && this.canILoad();
    });
  }
  // 初始化
  init() {
    this.canILoad();
    this.bindEvent();
  }
 }
// 实例化对象，参数则是需要使用懒加载的图片类名
const lazy = new LazyLoad('.lazyload')

异步加载的图片怎么使用
1. 基本操作，异步获取图片链接
2. 动态插入节点
3. 获取这些新添加的节点
   3.1 给新添加的节点做一些标记，如类名或者属性
4.  lazy.imglist.push(Array.from(document.querySelectorAll(‘这些新的节点’)));






