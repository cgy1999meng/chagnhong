define(['jquery'], function($){

    
    function  catchHeight (elClass){
        var root = document.body
        var height = 0
        var el = $(elClass)[0]
        do{
            height += el.offsetTop
            el = el.offsetParent
        }while(el == root){
            return height
        }
    }
    function noHide({node,gao,maxheight=9999}){
        var gao = gao;
        var none = document.querySelector(node)
        
        if((document.documentElement.scrollTop || document.body.scrollTop) >= gao){
            none.style.display = 'block'
        } else if((document.documentElement.scrollTop || document.body.scrollTop) >= maxheight){
            node.style.display = 'none'
        }
        else{
            none.style.display = 'none'
        }
    }


    
    


    
    var timer;
    var flagScroll = true
    function toTop(height){
        clearInterval(timer);
        timer = setInterval(function(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            
            if(scrollTop > height){
                scrollTop -= 10;
            }else{
                scrollTop += 10;
            }
            if(Math.abs(scrollTop-height) <= 10){
                flagScroll = true;
                clearInterval(timer);
            }
            document.documentElement.scrollTop = scrollTop;
            document.body.scrollTop = scrollTop
            
        },1)
    }

    

    //动态渲染body里面的全部数据
    function showbody(){
        $.ajax({
            type:'get',
            url:'http://localhost:3000/firstMoudle/bodymsg',
            datatype:'json',
            success:function(data){
                // console.log(data);
                var areas = document.querySelectorAll('#body .container div');
                for(var m = 0;m<areas.length;m++){
                    for(var key in data){
                        if(key == areas[m].id){
                            var node1 = 
                            `<div class="type clear">
                                <div class="typeLeft">
                                    <span></span>
                                    <h2>${data[key].top.title}</h2>
                                    <a href="#">查看更多&nbsp;&nbsp;></a>
                                </div>
                                <ul class="typeRight">
                                </ul>
                            </div>
                            <div class="goodShow clear">
                                <div class="bigimg">
                                    <img src="${data[key].bigurl}" alt="">
                                </div>
                                <ul class="goodList">
                                    
                                </ul>
                            </div>`
                            $(`#${key}`).append(node1);
                            var arr = data[key].goodList
                            var arr1 = data[key].top.typeRight
                            for(var i = 0;i<arr.length;i++){
                                var node3 = 
                                ` <li id='${arr[i].id}'>
                                    <div class="smallimg">
                                        <a href="#">
                                            <img src="${arr[i].url}" alt="">
                                        </a>
                                    </div>
                                    <a href="#">${arr[i].title}</a>
                                    <p>${arr[i].text}</p>
                                    <p class="prise">${arr[i].price}</p>
                                </li>`
                                $(`#${key} .goodList`).append($(node3));
                           }
                           for(var j = 0;j<arr1.length;j++){
                                var node2 = `<li>${arr1[j]}</li>`
                                $(`#${key} .typeRight`).append($(node2));
                            }
                        }
                    }
                }
                //给body下面的div（原页面有的）添加点击事件，点击到商品时候跳转到shopong页面，并存下记录在SessStorage
                $('#body .area').on('click','.goodList li',function(){
                    var id = this.id;
                    sessionStorage.setItem('good',id);
                    location.assign('shoping.html')
                })
        
                //滚动条滑到某个区域那个区域的按钮变红
                $(document).scroll(function(){
                    if(!flagScroll){
                        return
                    }
                    
                    var height1 =  catchHeight('#TV');
                    var height2 =  catchHeight('#broadcast');
                    var height3 =  catchHeight('#Airconditioner');
                    var height4 =  catchHeight('#refrigerator');
                    var height5 =  catchHeight('#Lifehome');

                    if($(document).scrollTop() > height2-60 && $(document).scrollTop() < height1){
                        $('#innerChange ul li').eq(0).css('backgroundColor','red').siblings().css('backgroundColor','#eeeeee')
                    };
                    if($(document).scrollTop() > height1-100 && $(document).scrollTop() < height3){
                        $('#innerChange ul li').eq(1).css('backgroundColor','red').siblings().css('backgroundColor','#eeeeee')
                    };
                    if($(document).scrollTop() > (height3-20) && $(document).scrollTop() < height4 ){
                        $('#innerChange ul li').eq(2).css('backgroundColor','red').siblings().css('backgroundColor','#eeeeee')
                    }
                    if($(document).scrollTop() > (height4-20) && $(document).scrollTop() < height5 ){
                        $('#innerChange ul li').eq(3).css('backgroundColor','red').siblings().css('backgroundColor','#eeeeee')
                    }
                    if($(document).scrollTop() > (height5-20) && $(document).scrollTop() < (height5 + 100)){
                        $('#innerChange ul li').eq(4).css('backgroundColor','red').siblings().css('backgroundColor','#eeeeee')
                    }
                    
                })
                //点击某个按钮滚动条去到对应位置
                $('#innerChange ul').click(function(ev){
                    flagScroll = false;
                    var text = ev.target.innerText
                    clearInterval(timer)
                    var height;
                    if(text == '电视'){
                        height = catchHeight('#TV');
                        toTop(height);
                    }
                    if(text == '热门'){
                        height = catchHeight('#broadcast');
                         toTop(height-60);
                    }
                    if(text == '空调'){
                        height = catchHeight('#Airconditioner');
                        toTop(height);
                    }
                    if(text == '冰洗'){
                        height = catchHeight('#refrigerator');
                        toTop(height);
                    }
                    if(text == '生活'){
                        height = catchHeight('#Lifehome');
                        toTop(height);
                    }
                })
              
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    

    return {
        showbody,
        toTop,
        noHide,
        catchHeight,

    }
    
});