Javascript����ʵ��ͼƬ������


ǰ��
ҳ��̫��ͼƬ����ô���㻨20����ȥ�Ż�һ��ҳ�������

����������ΪͼƬ��src��ֵʱ��DOM�ڵ���Ⱦ���ʱ�ͻ�����ȥ����srcָ�����Դ����ʹ��ͼƬ�����û��Ŀ��ӷ�Χ����ô�����ͼƬ̫�࣬����ҳ����ٶȻ�ͻ������


ԭ��
����Դ·����ֵ��img��ǩ��data-xx�����У�������src����
��ȡimg�ڵ��������������ľ��룬���С�ڻ������������ڵĿ��Ӹ߶ȣ���ô�ͽ�data-xx��ֵ��ֵ��src��ȥ
�õ���Web API
DOM.getBoundingClientRect()

����
html�������£�

//  img-warpper * 5�� ÿ��gif���Ӷ���һ��
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

css �������£�
body {
  text-align: center;
 }

img {
  width: 100%;
  max-width: 300px;
  height: 200px;
  margin-bottom: 100px; // Ϊ�˷��㿴Ч������ͼƬ�����ܵĳſ�
 }

javascript �������£�

// ͼƬ��������
class LazyLoad {
  constructor(el) {
    this.imglist = Array.from(document.querySelectorAll(el)); // ��ʹ�������ص�ͼƬ����
    this.init(); // ��ʼ��
  }
  // �ж��Ƿ��ͼƬ�Ƿ���Լ���
  canILoad() {
    let imglist = this.imglist;
    for (let i = imglist.length; i--;) {
      // ��д���൱��if true
      this.getBound(imglist[i]) && this.loadImage(imglist[i], i);
    }
  }
  // ��ȡͼƬ�봰�ڵ���Ϣ
  getBound(el) {
    let bound = el.getBoundingClientRect();
    let clientHeight = window.innerHeight;
    // ͼƬ���붥���ľ��� <= ��������ӻ��ĸ߶ȣ��Ӷ�������Ƿ���Ҫ����
    return bound.top <= clientHeight - 100; // -100��Ϊ�˿���Ч������Ҳ����ȥ��
  }
  // ����ͼƬ
  loadImage(el, index) {
    // ��ȡ֮ǰ���úõ�data-originalֵ
    let src = el.getAttribute('data-original');
    // ��ֵ��src���Ӷ�������Դ
    el.src = src;
    // �����ظ��жϣ��Ѿ�ȷ�����ص�ͼƬӦ����imglist�Ƴ�
    this.imglist.splice(index, 1);
  }
  // �������������ʱ�򣬼����ж�
  bindEvent() {
    window.addEventListener('scroll', () => {
      this.imglist.length && this.canILoad();
    });
  }
  // ��ʼ��
  init() {
    this.canILoad();
    this.bindEvent();
  }
 }
// ʵ�������󣬲���������Ҫʹ�������ص�ͼƬ����
const lazy = new LazyLoad('.lazyload')

�첽���ص�ͼƬ��ôʹ��
1. �����������첽��ȡͼƬ����
2. ��̬����ڵ�
3. ��ȡ��Щ����ӵĽڵ�
   3.1 ������ӵĽڵ���һЩ��ǣ���������������
4.  lazy.imglist.push(Array.from(document.querySelectorAll(����Щ�µĽڵ㡯)));






