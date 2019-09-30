$(window).on('load',function(){    //页面DOM结构,图片，内容，属性。。。加载完成后执行
    fun();
});
function fun(){
    //列数
    var _w = $(window).width();   //页面的宽度
    var imgW = $(".box").outerWidth();  //图片的宽度
    var col = parseInt(_w/imgW) ;   //列数
    //数组 存放高度
    var heightArr = [];       
    //遍历图片
    $(".box").each(function(index,item){
        //获取单个图片高度
        var boxH = $(item).outerHeight();
        if(index < col){    //判断是否是第一排
            heightArr[index] = boxH;
            console.log(heightArr);
        }else {
            //最小高度
            var minH = Math.min.apply(Math.min,heightArr);
            //最小高度的索引
            //$.inArray()  用于数组中查找指定值  返回索引值   反之返回-1
            var minHeightIndex = $.inArray(minH,heightArr);
            $(item).css({
                position: 'absolute',
                left: minHeightIndex * imgW +'px',
                top: minH +'px'
            });
            //高度追加
            heightArr[minHeightIndex] += boxH;
        }  
    })
}
