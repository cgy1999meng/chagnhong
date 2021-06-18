require.config({
    baseUrl:'js',
    paths:{
        'lunbo':'lunbo',
        'jquery':'jquery-1.10.1.min',
        'jquery-cookie':"jquery.cookie",
        'headTab':'headTab',
        'bannerTab':'bannerTab',
        'bodyShow':'bodyShow',
    },
    shim: {
        //设置依赖关系
        "jquery-cookie": ["jquery"],
    }
})
require(['lunbo','headTab','bannerTab','bodyShow','jquery'],function(lunbo,headTab,bannerTab,bodyShow,$){
     lunbo.autoMove('#banner');//轮播数据添加与轮播效果
     headTab.show();//导航Tab数据切换
     bannerTab.bannerShow();//轮播图左侧Tab
     bodyShow.showbody();//body数据渲染
     //点击返回顶部返回滚动条划至0
    $('#returnTop').click(function(){
        bodyShow.toTop(0);
    });
    //左侧按钮与右侧按钮在滚动条400时候显示
    document.addEventListener('scroll',function(){ bodyShow.noHide({node:'#returnTop',gao:400});
    bodyShow.noHide({node:'#innerChange',gao:400})} ,false);
    //点击右方购物车，跳转到购物车页面
    $('#connectOut ul li').eq(0).click(function(){
        location.assign('shopingCar.html')
    })
     
})