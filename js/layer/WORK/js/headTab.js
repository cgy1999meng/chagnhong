define(['jquery'], function($) {

    function show(){
        $('.nav').mouseenter(function(){
            $('#head .outer').stop(true,true).slideDown(1000)
        }).mouseleave(function(){
            $('#head .outer').stop(true,true).slideUp(1000)
            
        })

        $('.nav a').not('.first').mouseenter(function(){
            $(this).css('color','red')
            var _this = this;
            $.ajax({
                type:'get',
                url:'http://localhost:3000/firstMoudle/headmsg',
                datatype:'json',
                success:function(data){
                    $('.hotgoods dl dd').remove();
                    for(var key in data){
                        if(key == _this.id){
                            var arr = data[key];
                            for(var i = 0 ;i<arr.length;i++ ){
                                var node = `
                                    <dd>
                                        <div>
                                            <img src="${arr[i].url}" alt="">
                                        </div>
                                        <p>${arr[i].p}</p>
                                        <span>￥：${arr[i].prise}</span>
                                    </dd>
                                `
                                $('.hotgoods dl').append($(node));
                            }
                        }
                    }
                    $
                },
                error:function(msg){
                    console.log(msg);
                    
                }
            })
        }).mouseleave(function(){
            $(this).css('color','#333333')
        })
    }
  
    return {
        show,
    }
    
});