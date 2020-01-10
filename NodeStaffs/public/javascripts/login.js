
  
    var formLogin =document.getElementById('formLogin');
    document.getElementById('btnLogin').onclick = async function(){

        ajax.post("/users/login",{
            username:formLogin.username.value,
            password:formLogin.password.value
        }).then((res)=>{
            
            if(res && res.code==1){
                localStorage.setItem('token',res.token);
                createMessTipWin.tipMsg('登陆成功！',function(){
                    location.href="/staffs";
                });
            }
     
        });     
    }
    
        //滑块验证码
	window.addEventListener('load',function(){
        
		//code是后台传入的验证字符串
		var code = "jsaidaisd656",
			codeFn = new moveCode(code);
		
		//获取当前的code值
		//console.log(codeFn.getCode());

		//改变code值
		//code = '46asd546as5';
		//codeFn.setCode(code);
		
		//重置为初始状态
        //codeFn.resetCode();
     
	});
