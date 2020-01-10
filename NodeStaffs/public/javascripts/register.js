//获取手机验证码成功，，并开始倒计时
var getCapture = document.getElementById('getCapture');
var formRegister = document.getElementById('formRegister');
var regPhone = formRegister.phone;

//输入手机号，实时验证手机号是否有效
formRegister.phone.oninput = debounce(checkMobile,500);
function checkMobile(){
    if(!/(^1[3|5|7|8|9][0-9]{9}$)/.test(regPhone.value)){   
        getCapture.setAttribute('disabled','disabled');
        getCapture.classList.remove('count-downing');
        return;
    }
    getCapture.classList.add('count-downing');
    getCapture.removeAttribute('disabled');
}

getCapture.onclick = function(){
    countDownLoan({
        btnDom: getCapture,
        isAfterText: '获取验证码',
        textCounting: 's'
    },function() {
        //倒计时结束后刷新验证码
    });
}

//点击注册按钮，调取后端接口注册
document.getElementById('btnRegister').onclick =  function(){
    ajax.post("/users/reg",{
        phone:formRegister.phone.value,
        username:formRegister.username.value,
        password:formRegister.password.value
    }).then((res)=>{
        if(res.code==1){
            createMessTipWin.tipMsg('恭喜您，注册成功，赶紧去登录吧！',function(){
                location.href="/login";
            });
        }
 
    });
   
}
