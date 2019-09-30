var wrap = document.getElementsByClassName('wrapper')[0];
var moveBox = document.getElementsByClassName('move')[0];
var imgShow = document.getElementsByClassName('imgShow')[0];
var bigImg = document.getElementsByClassName('bigImg')[0];
var con = document.getElementsByClassName('content')[0];

var mul = 2;
var moveWidth;
function init() {
    createView();
    bindEvent();
}
init();

// 创建移动方块元素
function createView() {
    moveWidth = 500 / mul;
    moveBox.style.width = moveWidth + 'px';
    moveBox.style.height = moveWidth + 'px';
};

function bindEvent() {
    showImg(0);
    var oLi = document.getElementsByTagName('li');
    var len = oLi.length;
    // 点击li更换展示图片
    for (var i = 0; i < len; i++) {
        (function (i) {
            oLi[i].onclick = function () {
                showImg(i);
            }
        })(i);
    };
    con.onmousemove = function (e) {
        move(e);
    };
    con.onmouseleave = function (e) {
        bigImg.style.display = 'none';
        moveBox.style.display = 'none';
    };
}

// 根据点击获取得索引  展示相应图片
function showImg(index) {
    var img = document.getElementsByClassName('listImg');
    var oImg = new Image();
    var src = img[index].getAttribute('src');
    oImg.setAttribute('src', src);
    oImg.onload = function () {
        imgShow.innerHTML = '<img src ="' + src + '"></img>';
        bigImg.style.backgroundImage = 'url(' + src + ')';
    }
}

// 移动鼠标  更改显示位置函数
function move(e) {
    var X = e.clientX - wrap.offsetLeft - moveWidth / 2;
    var Y = e.clientY - wrap.offsetTop - moveWidth / 2;
    var maxLeft = con.offsetWidth - moveWidth;
    var maxTop = con.offsetHeight - moveWidth;

    // 判断边界临界值
    X = X <= 0 ? 0 : X;
    Y = Y <= 0 ? 0 : Y;
    X = X >= maxLeft ? maxLeft : X;
    Y = Y >= maxTop ? maxTop : Y;
    // 放大镜位置改变
    moveBox.style.display = 'block';
    moveBox.style.left = X + 'px';
    moveBox.style.top = Y + 'px';

    // 右侧显示图片图片位置改变
    var size = 100 * mul + '%';
    bigImg.style.display = 'block';
    bigImg.style.backgroundSize = size + ' ' + size;
    bigImg.style.backgroundPositionX = -(X * mul) + 'px';
    bigImg.style.backgroundPositionY = -(Y * mul) + 'px';
}