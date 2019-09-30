var divCards = document.getElementById("cards");
var cardSize = 170; //卡片的宽高
var maxLeft = divCards.clientWidth - cardSize; //最大的left值
var maxTop = divCards.clientHeight - cardSize; //最大的top值
var nextZIndex = 1; //下一张卡片的z-index值
/**
 * 创建一个愿望
 * @param {string} content 愿望的内容
 */
function createWish(content) {
    var div = document.createElement("div");
    div.className = "item"; //添加类样式
    //模板字符串中可以使用${}，内部书写js表达式，表达式的值会替换掉该位置
    div.innerHTML = `<div class="words">
                        ${content}
                    </div>
                    <span class="close">
                        X
                    </span>`;
    //1. 背景颜色随机
    div.style.background = `rgb(${getRandom(150, 256)},${getRandom(150, 256)},${getRandom(150, 256)})`;
    //2. 位置随机
    div.style.left = getRandom(0, maxLeft) + "px";
    div.style.top = getRandom(0, maxTop) + "px";
    //3. 设置z-index
    div.style.zIndex = nextZIndex;
    nextZIndex++; //下一张卡片的值更高
    //4. 关闭功能
    //4.1 找到span元素
    var span = div.getElementsByClassName("close")[0]
    //4.2 注册onclick事件
    span.onclick = function () {
        //实现关闭功能
        //干掉div
        div.remove();
    }
    span.onmousedown = function (e) {
        //阻止事件冒泡
        e.stopPropagation();
    }

    //5. 拖动功能
    div.onmousedown = function (e) {
        var left = parseFloat(div.style.left), //记录按下去的时候，元素的横坐标
            x = e.pageX,
            top = parseFloat(div.style.top),
            y = e.pageY; //记录按下去的时候，鼠标的纵坐标

        //重新设置z-index
        div.style.zIndex = nextZIndex;
        nextZIndex++;

        window.onmousemove = function (e) {
            var disX = e.pageX - x; //得到目前鼠标距离按下去的时候，横向上跑了多远
            var disY = e.pageY - y; //得到目前鼠标距离按下去的时候，纵向上跑了多远
            var newLeft = left + disX; //鼠标跑了多远，元素就跑多远
            //约束范围
            if (newLeft < 0) {
                newLeft = 0;
            }
            else if (newLeft > maxLeft) {
                newLeft = maxLeft;
            }

            var newTop = top + disY;
            //约束范围
            if (newTop < 0) {
                newTop = 0;
            }
            else if (newTop > maxTop) {
                newTop = maxTop;
            }
            div.style.left = newLeft + "px";
            div.style.top = newTop + "px";
        }

        window.onmouseup = function () {
            window.onmousemove = null; //鼠标抬起后，是否移动了鼠标已经不重要了
        }
    }

    //6. 取消文本被选中的行为
    div.onselectstart = function (e) {
        //阻止默认行为：选中文字
        //方式1：返回false
        // return false;
        //方式2：
        e.preventDefault();
    }

    divCards.appendChild(div);
}


/**
 * 得到一个指定范围内的随机整数
 * @param {number} min 最小值
 * @param {number} max 最大值（取不到最大值）
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//注册文本框中的键盘按下事件

var txt = document.getElementById("txtWish");
txt.onkeydown = function (e) {
    //e.key表示键盘按键名称
    if (e.key === "Enter" && txt.value) {
        //按的是回车键
        //文本框有内容
        createWish(txt.value);
        //清空文本框
        txt.value = "";
    }

}

//该程序很容易扩展，比如，要创建一些初始愿望

function init() {
    var wishes = ["世界和平1", "世界和平2", "世界和平3"];
    for (var i = 0; i < wishes.length; i++) {
        createWish(wishes[i]);
    }
}

init();