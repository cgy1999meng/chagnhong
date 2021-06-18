define(['jquery','fdj','jquery-cookie'], function($,fdj){
    //先获取sesstionStorage中的商品ID
    var id = sessionStorage.getItem('good');

    //动态渲染shoping界面content的数据
    function showShoping(){
        $.ajax({
            type:'get',
            url:'http://localhost:3000/firstMoudle/shoping',
            datatype:'json',
            success:function(data){
                for(var key in data){
                    if(key == id){
                        var needObj = data[key];
                        var node1 =
                    ` <p>
                        <a>${needObj.type}</a>
                    </p>`
                        $('#toHear .toHearcontent').append($(node1));
                        var urlArr = needObj.url;
                        $('#fdj .small img').attr('src',`${urlArr[0]}`).parent();
                        $('#fdj .max img').attr('src',`${urlArr[0]}`);

                        for(var i=0;i< urlArr.length;i++){
                            var node2 =
                              ` <li>
                                 <img src="${urlArr[i]}" alt="">
                             </li>`
                             $('#photoWall .wallInner').append($(node2));
                        }
                        var node3 = 
                    ` <li class="information">
                        <p>
                            ${needObj.title}
                            <button>加入对比</button>
                        </p>
                        <p>${needObj.text}</p>
                        <span>全域物联 智慧生活</span>
                    </li>
                    <li class="price">
                        <p>${needObj.price}</p>
                    </li>
                    <li class="location">
                        <span>配送地址：</span>
                        <div class="detaillocation">
                            <span>北京市</span>
                            <span>市辖区</span>
                            <span>东八路</span>
                            <span></span>
                        </div>
                        <p>服务信息： 由长虹官方发货，并提供售后服务。</p>
                    </li>
                    <li class="goodstotal ">
                        <p >商品数量：</p>
                        <div class="nums clear">
                            <button class="btn1">-</button>
                            <span class="Num">1</span>
                            <button class="btn2">+</button>
                        </div>
                        <div id="goodscar">加入购物车</div>
                    </li>`

                        $('#detail ul').append($(node3));

                    }
                }
                
                //放大镜效果
                fdj.fdj('#fdj');
                $('#photoWall .wallInner li').eq(0).addClass('active')
                //鼠标点击下方小图片，换上面图片的url，小图片加active的类
                $('#photoWall .wallInner').on('click','li img',function(){
                    // console.log(this);
                    var newUrl = $(this).attr('src');
                     $('#fdj .small img').attr('src',`${newUrl}`);
                     $('#fdj .max img').attr('src',`${newUrl}`);

                     $(this).parent().addClass('active').siblings().removeClass('active');
                    
                })


                //点击左右按钮下面小图切换，用中间变量term判断是否滚动条还移动
                var width = $('#photoWall .wallInner li').eq(1).outerWidth(true)
                var index = 0 //起始图片下标
                    var term;
                    $('#photoWall .rbtn').on('click',function(){
                        term = true;
                        index++;
                        if(index >= $('#photoWall .wallInner li').length){
                            index = $('#photoWall .wallInner li').length-1
                            term = false;
                        }
                        if(term){
                            $('#photoWall .inner').scrollLeft(`${index*width}`)
                        }
                    })
                    $('#photoWall .lbtn').on('click',function(){
                        term = false;
                        index--;
                        if(index <= 0){
                            index = 0;
                            term = false;
                        }
                        if(!term){
                            $('#photoWall .inner').scrollLeft(`${index*width}`)
                        }
                        
                    })
                    //点击加减按钮，对数量进行加减
                    var number = 1;
                    $('#detail ul').on('click','.goodstotal .nums .btn1,.btn2',function(ev){
                        
                        if(ev.target.innerText == '+'){
                            number++;
                            $('#detail ul .goodstotal .Num').html(`${number}`)
                        }else{
                            number--;
                            if(number == 0){
                                number = 1;
                            }
                            $('#detail ul .goodstotal .Num').html(`${number}`)
                        }   
                    })
                    //点击加入购物车按钮，把该商品id与数量存进cookie，并跳转至购物车页
                    $('#detail ul').on('click','#goodscar',function(){
                        //判断是否有cookie
                        var number1 =  $('#detail ul .goodstotal .Num').html()
                        var first =  $.cookie('goods') == null? true:false;
                        
                         if(first){//直接存取cookie
                            var arr = [{id:id,num:number1}]
                            $.cookie('goods',JSON.stringify(arr),{
                                expires:7
                            })
                         }else{//先判断是否相同
                            var same = false;
                            var arr1 = JSON.parse($.cookie('goods'));
                            for(var i =0;i<arr1.length;i++){
                                if(arr1[i].id == id){
                                    arr1[i].num = number1;
                                    $.cookie('goods',JSON.stringify(arr1),{
                                        expires:7
                                    });
                                    same = true;
                                    break
                                }
                            }
                            if(!same){
                                arr1.push({id:id,num:number1});
                                $.cookie('goods',JSON.stringify(arr1),{
                                    expires:7
                                })
                            }
                         }
                         location.assign('shopingCar.html')
                    })
                    //点击右侧购物车，跳转到购物车页面
                    $('#connectOut ul li').eq(0).click(function(){
                        location.assign('shopingCar.html')
                    })
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
   

    return {
        showShoping,
    }
    
    
});