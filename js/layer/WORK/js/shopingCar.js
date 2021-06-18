require.config({
    baseUrl:'js',
    paths:{
        'jquery':'jquery-1.10.1.min',
        'jquery-cookie':"jquery.cookie",
    },
    shim: {
        //设置依赖关系
        "jquery-cookie": ["jquery"],
    }
})
require(['jquery', 'jquery-cookie'],function($){

    var arr = JSON.parse($.cookie('goods'))//获取cookie值

    if(arr == null){
        //如果cookie没有值则不用ajax去渲染cookie中的商品
        $('<div>您的购物车还没有商品</div>').appendTo('#inner').addClass('nogoods');
        $('.goodCarfoot').remove();
        setTimeout(function(){
            location.assign('index.html')
        },3000)
    }else{
        //否则渲染cookie中的商品数据
        $.ajax({
            type:'get',
            url:'http://localhost:3000/firstMoudle/shoping',
            datatype:'json',
            success:function(data){
                
                //把需要的商品信息添加进newArr这个新数组
                var newArr = [];
                for(var i =0;i<arr.length;i++){
                    for(var key in data){
                        if(key == arr[i].id){
                            data[key].num = arr[i].num;
                            data[key].id = arr[i].id;
                            newArr.push(data[key]);
                        }
                    }
                }
                //通过新数组去动态渲染数据,渲染之前先判断是否有cookie
               
                for(var i = 0;i<newArr.length;i++){
                    var node = 
                        `<div class="content clear" id='${newArr[i].id}'>
                            <input type="checkbox">
                            <img src= ${newArr[i].url[0]} alt="">
                            <div class="name">
                                <a href="#">${newArr[i].title}</a>
                            </div>
                            <ul class="detail">
                                <li class="lprise">${newArr[i].price}</li>
                                <li>
                                    <button class="jian">-</button>
                                    <span>${newArr[i].num}</span>
                                    <button class="jian">+</button>
                                </li>
                                <li class="total">
                                    ￥：${newArr[i].price.slice(1,newArr[i].price.length)*newArr[i].num}
                                </li>
                                <li class='delect'>
                                    <a href="#">删除</a>
                                </li>
                            </ul>
                        </div>`
                    $('#inner').append($(node));
                }
    
                //点击加减按钮增加数量并计算total（小计）中的值
                $('#inner').on('click','.detail .jia,.jian',function(ev){
                    if(!($(this).parent().parent().siblings('input').prop('checked'))){
                        $(this).parent().parent().siblings('input').prop('checked',true)
                    }
                    for(var i= 0;i<arr.length;i++){
                        if($(this).parent().parent().parent().attr('id') == arr[i].id){
                            var needobj = arr[i];
                            var needindex = i;
                            break;
                        }
                    }
                    var number = $(this).siblings('span').text();
                    if(ev.target.innerText == '+'){
                        number++;
                        $(this).siblings('span').text(`${number}`)
                        var txt = $(this).parent().prev().text()
                        var pricenum = txt.slice(1,txt.length) 
                        var total = number*pricenum
                        $(this).parent().siblings('.total').html(`￥:${total}`)
                        needobj.num = number;
                        $.cookie('goods',JSON.stringify(arr),{expires:7})
                    }
    
                    if(ev.target.innerText == '-'){
                        number--;
                        if(number <= 0){//点击的这个商品没有数量了，要移除节点
                            arr.splice(needindex,1);//删除cookie
                            $(this).parent().parent().parent().remove()//移除这个节点
                         
                            
                            if(arr.length == 0){
                                $.cookie('goods',null);
                                $('<div>您的购物车还没有商品</div>').appendTo('#inner').addClass('nogoods');
                                $('.goodCarfoot').remove();
                                setTimeout(function(){
                                    location.assign('index.html')
                                },3000)
                            }else{
                                $.cookie('goods',JSON.stringify(arr),{expires:7})
                            }
                        }else{
                            $(this).siblings('span').text(`${number}`)
                            var txt = $(this).parent().prev().text()
                            var pricenum = txt.slice(1,txt.length) 
                            var total = number*pricenum
                            $(this).parent().siblings('.total').html(`￥:${total}`)
                            needobj.num = number;
                            $.cookie('goods',JSON.stringify(arr),{expires:7})
                        }
                    }
                    sum();
                    
                })
                //点击删除按钮删除商品信息
                $('#inner').on('click','.detail .delect',function(){
                    
                    var id = $(this).parent().parent().attr('id');
                    var arr =  JSON.parse($.cookie('goods'));
                    for(var i = 0;i<arr.length;i++){
                        if(arr[i].id == id){
                            arr.splice(i,1);
                            if(arr == 0){
                                $.cookie('goods',null)
                                $('<div>您的购物车还没有商品</div>').appendTo('#inner').addClass('nogoods');
                                $('.goodCarfoot').remove();
                                setTimeout(function(){
                                    location.assign('index.html')
                                },3000)
                            }else{
                                $.cookie('goods',JSON.stringify(arr),{expires:7});
                            }
                            break;
                        }
                    }  
                    $(this).parent().parent().remove();
                   sum();
                });
                //点击清除购物车，删除cookie跟页面结构
                $('.goodCarfoot .Lfoot span').eq(2).click(function(){

                    $.cookie('goods',null);
                    $('#inner').html('');
                    $('<div>您的购物车还没有商品</div>').appendTo('#inner').addClass('nogoods');
                    $('.goodCarfoot').remove();
                    setTimeout(function(){
                        location.assign('index.html')
                    },3000)
                })
                //点击勾选按钮，则全部商品都勾选
                $('.Lfoot input').click(function(){
                    
                    if($(this).prop('checked')){
                        console.log($('#inner div input'));
                        $('#inner div input').prop('checked',true)
                    }else{
                        $('#inner div input').prop('checked',false)
                    }
                    sum();
                    
                })

                //点击删除选中商品，删除该选中的cookie，并移除元素
                $('.goodCarfoot .Lfoot span').eq(1).click(function(){
                    //遍历被选中元素，找出id,取出cookie，删除cookie
                    $('#inner div input:checked').each(function(index,node){
                        var id = $(node).parent().attr('id');
                        var cookiearr =JSON.parse($.cookie('goods'))
                        for(var i = 0;i<cookiearr.length;i++){
                            if(cookiearr[i].id == id){
                                cookiearr.splice(i,1);
                            }
                        }
                        if(cookiearr.length == 0){
                            $.cookie('goods',null);
                            $('#inner').html('');
                            $('<div>您的购物车还没有商品</div>').appendTo('#inner').addClass('nogoods');
                            $('.goodCarfoot').remove();
                        }else{
                            $.cookie('goods',JSON.stringify(cookiearr),
                            {expires:7})
                            $(node).parent().remove();
                        }
                    })
                })
                

                //总价的值的函数
                function sum(){
                    //判断商品列表中是否有商品被选中
                    if( $('#inner div input:checked')){//有商品被选中
                        var total = 0 ;
                        $('#inner div input:checked').each(function(index,node){//遍历复选框被选中的元素，取出他们的小计值，累计到总数上
                            var numstr =  $(node).siblings('.detail').children('.total').html();
                            var numstr1 = $.trim(numstr)
                            var num = Number(numstr1.slice(2,numstr1.length)) 
                            total += num;
                        })
                        $('.all')[0].innerText = total;//total值放去总价的位置
                    }else{//没有元素被选中，总价位置的值为0
                        $('.all').text(`0`);
                    }
                }
                
                

                //一个个商品点击的时候，如果全部点完了，下面的全选框也勾上
                $('#inner').on('click','div input',function(){
                    var arr = [];
                    $('#inner div input').each(function(index,dom){
                        if($(dom).prop('checked')){
                            arr.push('a');
                        }else{
                            arr.push('b')
                        }
                        if(arr.indexOf('b') == -1){
                            $('.Lfoot input').prop('checked',true)
                        }else{
                            $('.Lfoot input').prop('checked',false)
                        }
                    })
                    // $('.all').empty()
                    sum();//点击那个复选框，执行sum()
                })
                
              

    
                
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    
   
   
    
})