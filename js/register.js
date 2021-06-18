var btn = document.querySelector('.btn');
btn.addEventListener('click',submit);
function submit(){
    var username = document.querySelector('.login').value;
    if(username === ''){
        layer.msg('用户名必填')
        return false;
    }
    var reg = /^[a-zA-Z][a-zA-Z0-9]{2,7}$/;
    if(!reg.test(username)){
        layer.msg('用户名：字母开头，字母、数字组成，3~8位')
        return false;
    }
    var password = document.querySelector('.password').value;
    if(password === ''){
        layer.msg('密码必填');
        return false;
    }
    var reg = /^[a-zA-Z0-9]{6,12}$/;
    if(!reg.test(password)){
        layer.msg('密码：数字、字母，6~12位');
        return false;
    }
    var repassword = document.querySelector('.repassword').value;
    if(repassword !== password){
        layer.msg('两次密码不一致');
        return false
    }
    var index = layer.load(1,{
        shade:[0.5,'#666']
    })
    btn.disabled = true;
    pAjax({
        url:'./register.php',
        data:{
            username,
            password
        },
        type:'post'
    }).then(res=>{
        layer.close(index);
        var {meta:{status,msg}} = res ;
        var msgIndex = layer.msg(msg);
        if(status === 0){
            setTimeout(()=>{
                layer.close(msgIndex);
                location.href = 'login.html'
            },2000)
        }else{
            btn.disabled = false;
            return false;
        }
    })
}



