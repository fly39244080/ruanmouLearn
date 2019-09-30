function imgLayout(){
    var mainImgFrame = document.getElementById('mainImgFrame');
    var imgNum = 3; //一行显示几张图片
    //页面的宽度
    var _pageWid = mainImgFrame.clientWidth-5;
    //盒子的宽度
    _boxWid = Math.floor(_pageWid/imgNum);
    var allBoxes = Array.from(mainImgFrame.children);
    //数组 存放高度
    var heightArr = []; 
    allBoxes.forEach((item,index)=>{
         //获取单个图片高度
         var img = new Image();
         img.onload = function(event){
            // object.getBoundingClientRect()
            //  const {width,height} = event.target;
            //     var radio = height/width;
            //     var boxH = parseInt(radio * _boxWid); 
            var boxH ;   
             if(index<imgNum) {
                 //判断是否是第一排
                item.style.width=_boxWid+'px';

                // object.getClientRects();和object.getBoundingClientRect();

                 boxH = item.getBoundingClientRect().height;
                item.style.cssText = `width:${_boxWid}px;height:${boxH}`
                heightArr[index] = boxH;
                console.log(heightArr);
             } else {
                  //最小高度      
                var minH = Math.min.apply(Math.min,heightArr);
                var minHeightIndex = heightArr.indexOf(minH);
                item.style.cssText = `;position:absolute;width:${_boxWid}px;
                left:${minHeightIndex * _boxWid}px;top:${minH}px`
                 boxH = item.getBoundingClientRect().height;
                //高度追加
                 heightArr[minHeightIndex] += boxH;
                 
             }
         }
             img.src=item.querySelector('img').src;
    });
}
window.onload = function(){
    imgLayout();
}

window.onresize = function(){
    imgLayout();
}