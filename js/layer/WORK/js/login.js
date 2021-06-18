require.config({
    paths:{
        'jquery':'jquery-1.10.1.min',
    },
})
require(['jquery'],function($){
  
    $('.tip').text('');
    $('.btn').click(function(){
       
        $.ajax({
            type:'post',
            url:'/secondMoudle/loginIn',
          
           
            dataType: "text",
            data:{
                username:$('.login').val(),
                password:$('.password').val()
            },
            success:function(text){
                
                var str = text;
                $('.tip').text(str);
                if(text == '登录成功'){
                    $('.tip').css('color','green')
                    
                    location.assign('index.html')
                }else{
                    $('.tip').css('color','red')
                }
                
            },
            error:function(msg){
                debugger
                console.log(msg);
                
            }
        })
    })
})