require.config({
    baseUrl:'js',
    paths:{
        'jquery':'jquery-1.10.1.min',
        'jquery-cookie':"jquery.cookie",
        'headTab':'headTab',
        'bannerTab':'bannerTab',
        'bodyShow':'bodyShow',
        'shopingShow':'shopingShow',
        'fdj':'fdj'
    },
    shim: {
        //设置依赖关系
        "jquery-cookie": ["jquery"],
    }
})
require(['jquery','headTab','bannerTab','shopingShow','bodyShow'],function($,headTab,bannerTab,shopingShow,bodyShow){
    shopingShow.showShoping();
    headTab.show();
    $('.navMenue').click(function(){
        $('.logo .lgoodmenue').toggle();
        bannerTab.bannerShow();
    });
    $('#returnTop').click(function(){
        bodyShow.toTop(0);
    });
    document.addEventListener('scroll',function(){ bodyShow.noHide({node:'#returnTop',gao:100})}
    ,false);


     //滚动条到达下面body的高度的时候，动态渲染body中的图片数据
        $('.bodynav ul li').eq(0).click(function(){
            $(document).scroll(function(){
                var shopingbodyHeight = bodyShow.catchHeight('.bodynavcontent');
                if($(this).scrollTop() >= shopingbodyHeight){
                       $.ajax({
                           type:'get',
                           url:'http://localhost:3000/firstMoudle/shopingbody',
                           datatype:'json',
                           success:function(data){
          
                              for(var i = 0;i<data.length;i++){
                                  var node = `<img src=${data[i]} alt="">`
                                  $('.bodynavcontent').append($(node));
                              }
                              
                           },
                           error:function(msg){
                               console.log(msg);
                           }
                       })
                       document.documentElement.onscroll = null;
                }
            })
            $(this).children().css({
                'border-bottom':'2px solid red'
            })
            $(this).siblings().children().css({
                'border-bottom':'0px'
            }
            )
        })
     //点击下面参数切换的时候，让content内容为空
     $('.bodynav ul li').not($('.bodynav ul li:nth-child(1)')).click(function(){
         $(document).off('scroll');
        // document.documentElement.onscroll = null;
        $(this).siblings().children().css({
            'border-bottom':'0px'
         })
         $(this).children().css({
             'border-bottom':'2px solid red'
         })
         $('.bodynavcontent').empty();
     })

})