var createMessTipWin = {
    init(param){
        var initParam = {
            title:'友情提示',   //标题
            tips:"没有任何提示信息！",   //主体内容
            btnOk:'确定',     //确定按钮文字
            btnNo:'取消', //取消按钮文字
            area:['250','210'],   //自定义弹框大小
            closeOnClickModal: true, // 是否可以通过点击modal关闭
            dir:'RT',
            hasShade:true,  //是否需要遮罩层
            isShowBtnNo: true,    //是否需要显示取消按钮
            defineCls:'',  //自定义样式
            funcOk:function () {  // 点击确定执行的方法
            },
            funcNo:function () {   // 点击确定执行的方法
            }
        }
    //获取被点击按钮的尺寸以及距离左边上边的距离
    this.paramEnd = Object.assign({},initParam,param);
    this.body = document.getElementsByTagName("BODY")[0];
    
    //鎖屏DIV
    if(this.paramEnd.hasShade) {
        this.bgObj = document.createElement("DIV");
        this.bgObj.style.cssText = "width:100%;height:100%;position:fixed;z-index: 990;top: 0px;left: 0px;background: #000000;filter: alpha(Opacity=30); -moz-opacity:0.30;opacity:0.30;";
        this.body.appendChild(this.bgObj);
    }
    this.drawHTMLES6();
    this.eventFun();
   
  },
//   drawHTML:function(){
//       //main
//     this.tipWinObj = document.createElement("DIV");
//     this.tipWinObj.className="tip-window-layer";
//     if(this.paramEnd.defineCls){
//         this.tipWinObj.classList.add(this.paramEnd.defineCls);
//     }
//     this.tipWinObj.style.cssText = ';width:' + this.paramEnd.area[0] + 'px;height:' + this.paramEnd.area[1] + 'px;';

//     //top区域
//     var topDiv = document.createElement("DIV");
//     topDiv.className = 'tip-header-section';

//     var titDiv = document.createElement("DIV");
//     titDiv.className = 'tip-title';
//     titDiv.innerHTML = this.paramEnd.title;

//     var cross = document.createElement("DIV");
//     cross.className= 'tip-icon-close';
//     cross.innerHTML = 'X';

//     var contentDiv = document.createElement("DIV");
//     contentDiv.className = 'tip-main-content';
//     contentDiv.innerHTML = this.paramEnd.tips;

//     //bottom区域
//     var bottomDiv = document.createElement("DIV");
//     bottomDiv.className = 'tip-bottom-section';

//     var okBtn = document.createElement("BUTTON");
//     okBtn.className = 'btnOk';
//     okBtn.innerHTML = this.paramEnd.btnOk;

//     var noBtn = document.createElement("BUTTON");
//     noBtn.className = 'btnNo';
//     noBtn.innerHTML = this.paramEnd.btnNo;

//     topDiv.appendChild(titDiv);
//     topDiv.appendChild(cross);
//     this.tipWinObj.appendChild(topDiv);
//     this.tipWinObj.appendChild(contentDiv);

//     this.paramEnd.isShowBtnNo && bottomDiv.appendChild(noBtn);
//     bottomDiv.appendChild(okBtn);
//     this.tipWinObj.appendChild(bottomDiv);


//     //获取当前页面的第一个body节点对象,
//     this.body.appendChild(this.tipWinObj); 
//   },

  drawHTMLES6:function(){
    //main
    this.tipWinObj = document.createElement("DIV");
    this.tipWinObj.className="tip-window-layer";
    this.tipWinObj.style.cssText = ';width:' + this.paramEnd.area[0] + 'px;height:' + this.paramEnd.area[1] + 'px;';

    var tipWinInner = `
                    <div class="tip-header-section">
                        <div class="tip-title">${this.paramEnd.title}</div> 
                        <div class="tip-icon-close">X</div>
                    </div>
                    <div class="tip-main-content">${this.paramEnd.tips}</div>
                    <div class="tip-bottom-section">
                        ${this.paramEnd.isShowBtnNo ? '<button type="button" class="btnOk">'+this.paramEnd.btnOk+'</button>':''}    
                        <button type="button" class="btnNo">${this.paramEnd.btnNo}</button>
                    </div>
                `;
    this.tipWinObj.innerHTML = tipWinInner;
    //获取当前页面的第一个body节点对象,
    this.body.appendChild(this.tipWinObj); 
},

  eventFun(){
    this.tipWinObj.addEventListener('click',function(ev){
        var target = ev.target,
            clsName = target.className;
        switch(clsName){ 
            case 'btnOk':
                    this.showLoading();
                    this.paramEnd.funcOk(function(res){ 
                        this.removeLoading();
                        this.tipMsg('接口成功');
                        this.body.removeChild(this.tipWinObj);
                        this.paramEnd.hasShade && this.body.removeChild(this.bgObj);
                    }.bind(this));
                break;
            case 'tip-icon-close':
            case 'btnNo':
                    this.body.removeChild(this.tipWinObj);
                    this.paramEnd.hasShade && this.body.removeChild(this.bgObj);
                break;
        }
    }.bind(this));
    if(this.paramEnd.hasShade && this.paramEnd.closeOnClickModal){
        this.bgObj.onclick = function(){
            this.body.removeChild(this.tipWinObj);
            this.body.removeChild(this.bgObj);
        }.bind(this)
    }
    this.dragTitle();
  },
  //提示框
  tipMsg(msg,cb) {
        var div = document.createElement('div');
        div.className = 'layer-msg-tip';
        document.body.appendChild(div);
        div.textContent = msg;
        setTimeout(function () {
            document.body.removeChild(div);
            this.tipWinObj && this.body.removeChild(this.tipWinObj);
            this.tipWinObj &&   this.body.removeChild(this.bgObj);
            cb && cb();
        }.bind(this), 2000);
    },
   
    showLoading(){
        this.loading = document.createElement('div');
        this.loading.innerHTML='loading...';
        this.loading.className = 'loading-msg-tip';
        document.body.appendChild(this.loading);
    },
    removeLoading(){
        this.loading && document.body.removeChild(this.loading);
    },
    //拖动标题可移动
    dragTitle(){
        var headerTop = this.tipWinObj.querySelector('.tip-header-section');
        var moveFlag = false;
        var dis={};
        //鼠标拖拽事件 
        headerTop.onmousedown = function(e){
            moveFlag=true; 
            headerTop.style.cursor='move';
            // 计算出鼠标落下点与边界的距离
            dis.x = e.clientX - this.tipWinObj.offsetLeft;
            dis.y = e.clientY - this.tipWinObj.offsetTop;
        }.bind(this);
        headerTop.onmousemove = function(e){
            if (!moveFlag) {
                return;
            };
             // 根据拖拽距离设置当前拖拽元素的位置
            this.tipWinObj.style.left = (e.clientX - dis.x) + 'px';
            this.tipWinObj.style.top = (e.clientY - dis.y) + 'px';
        }.bind(this);
        headerTop.onmouseup = function(e){
            moveFlag=false; 
            headerTop.removeAttribute('style');
        }

    }

}
