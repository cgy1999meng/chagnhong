/*<div id="tab">
        <div class="head">
            <h3 class="active">喜剧</h3>
            <h3>剧情</h3>
            <h3>动作</h3>
            <h3>青春偶像</h3>
        </div>
        <div class="content">
            <div class="show">
            </div>
          
        </div>
    </div>*///tab切换页面结构要这这样，然后最外层要用id为tab命名,head的结构也不能换。
$.fn.extend({
    tab:function(){
         $('#tab .head h3').click(function(){
            $('#tab .head h3').removeClass('active').eq($(this).index()).addClass('active');
            $('#tab .content div').removeClass('show').eq($(this).index()).addClass('show');
         })
         return this;

    }
})

//直接JQ选中要拖拽的元素执行这个方法即可。
$.fn.extend({
    drag:function(){
        $(this).mousedown(function(ev){
            var x = ev.clientX - $(this).offset().left;
            var y = ev.clientY - $(this).offset().top;
            var _this = this;
            $(document).mousemove(function(ev){
                $(_this).css({
                    left:ev.clientX - x,
                    top: ev.clientY - y
                })
            })
        })
        $(document).mouseup(function(){
            $(document).off('mousemove');
        })
        return this;
    }
})
//toTop，传{height：200}表示希望置顶的这个块在滚动条多高的时候显示，不传则进入页面直接显示该需要置顶的块
$.fn.extend({
    toTop:function({gao=0}={}){
        this.gao = gao;
        var _this = this
        document.onscroll = function(){
            if((document.documentElement.scrollTop || document.body.scrollTop) >= _this.gao){
            $(_this).css('display','block')
        }
        }
        $(this).click(function(){
            clearInterval(timer);
            var timer;
            timer = setInterval(function(){
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                scrollTop -= 30;
                if(scrollTo <= 0){
                    clearInterval(timer);
                }
                document.documentElement.scrollTop = scrollTop;
                document.body.scrollTop = scrollTop
            },10)
        })
        return this;
    }
})