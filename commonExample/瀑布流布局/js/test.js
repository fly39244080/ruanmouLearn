function imgLayout(){

    var mainImgFrame = document.getElementById('mainImgFrame');

    var imgNum =5; //一行显示几张图片
    //页面宽度
    var _pageWid = mainImgFrame.clientWidth;
    //盒子宽度
    var _boxWid = Math.floor(_pageWid/imgNum);

    var allBoxes = Array.from(mainImgFrame.children);

    //存放高度
    var heightArr = [];

    allBoxes.forEach((item,index)=>{
        //获取单个图片的高度
        var img= new Image();
        img.onload = function(){
            //第一排
            // boxH = item.getBoundingClientRect().height;
            if(index<imgNum){
                item.style.width = _boxWid+'px';
                boxH = item.getBoundingClientRect().height;
                item.style.cssText = `width:${_boxWid}px;height:${boxH}`;
                heightArr[index] = boxH;
            } else {
                var minH = Math.min.apply(Math.min,heightArr);
                var minHeightIndex = heightArr.indexOf(minH);
                item.style.cssText = `position:absolute;width:${_boxWid}px;
                top:${minH}px;left:${minHeightIndex * _boxWid}px`;
                boxH = item.getBoundingClientRect().height;
                //高度追加
                heightArr[minHeightIndex] +=boxH;
            }
        }
        img.src= item.querySelector('img').src;
        
    })

}

window.onresize = function(){
    imgLayout();
}
window.onload = function (){
    imgLayout();
}