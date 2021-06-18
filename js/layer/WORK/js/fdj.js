define(['jquery'], function($) {
    //传放大镜的id进入。
    function fdj(node){
        $(node).children('.small').mouseenter(function(){
            $(this).children('.marsk').css('display','block');
            $(this).siblings('.max').css('display','block');
            var _this = this;
            $(this).mousemove(function(ev){
                var x = ev.pageX -$(_this).offset().left - ($(_this).children('.marsk').width())/2;
                var y = ev.pageY - $(_this).offset().top - ($(_this).children('.marsk').height())/2;
                if(x<=0){
                    x=0;
                };
                if(x>=$('.small').width()-$(_this).children('.marsk').width()){
                    x = $('.small').width()-$(_this).children('.marsk').width()
                };
                if(y<=0){
                    y=0;
                }
                if(y>=$('.small').height()-$(_this).children('.marsk').height()){
                    y=$('.small').height()-$(_this).children('.marsk').height();
                }
                $(_this).children('.marsk').css({
                    'left':x,
                    'top':y
                })
                var bx =$('.max img').width()/$('.small img').width();
                var by =$('.max img').height()/$('.small img').height();
                
                $('.max img').css({
                    'left':-bx*x,
                    'top':-by*y
                })
            })

        }).mouseleave(function(){
            $(this).children('.marsk').css('display','none');
            $(this).siblings('.max').css('display','none');
        })
    }

    return {
        fdj
    }
    
});