
    // 获取相关元素
    var ul = document.querySelector('.photos');//图片容器
    var imgS = ul.children;//所有图片集合
    var ol = document.querySelector('.nums');//小圆点容器
    // 图片的宽度
    var width = imgS[0].offsetWidth;

    // 需要一个变量记录当前显示的图片的索引
    var key = 0; 
    // 需要一个变量记录当前小圆点的索引
    var square = 0;

    // 1 根据li的数量生产小圆点，并插入ol里面
    for(var i=0;i<imgS.length;i++){
        // 生产小圆点
        var newLi = document.createElement('li');
        newLi.num = i;
        // 插入ol里面
        ol.appendChild(newLi)
    }
    var pointS = ol.children;//小圆点集合

    // 2 页面打开的时候，默认第一个小圆点高亮
    light(0)

    // 3 克隆一个和第一个li同样的li到ul的末尾
    var newImg = imgS[0].cloneNode(true);
    ul.appendChild(newImg);

    // 4 点击小圆点，切换到对应的图片li,小圆点高亮
    for(var i=0;i<pointS.length;i++){
        pointS[i].onmouseenter= function(){
            // 切换到对应的图片li
            move(ul,'left',-this.num*width)
            // 小圆点高亮
            light(this.num)
            // 更新小圆点和li的索引
            square = key = this.num;
        }
    }
    // 7 可以自动轮播
    var timer = setInterval(autoplay,3000);
    var all = document.getElementById('banner');
    // 8 鼠标移出all，开始轮播
    all.onmouseleave = function(){
        clearInterval(timer);
        timer = setInterval(autoplay,3000);
    }
    // 9 鼠标移入all，停止轮播
    all.onmouseenter = function(){
        clearInterval(timer);
    }
    function autoplay(){
        key++;
        square++;
        // 小圆点边界检测
        if(square>pointS.length-1){
            square = 0;
        }
        // li的索引边界检测
        // 现在由于加了一个li，imgS.length就是6,我要的最大索引是5
        if(key>imgS.length-1){
            key = 1;
            ul.style.left = 0;
        }
        move(ul,'left',-key*width)
        // 小圆点高亮
        light(square)
    }

    // 点亮小圆点
    function light(num){
        // 干掉所有人
        for(var i=0;i<pointS.length;i++){
            pointS[i].className = ""
        }
        // 留下我一个
        pointS[num].className = "current"

    }

    // move函数可以实现把执行的dom节点的attr属性缓动到具体的target值
function move(dom,attr,target,fn){
    // dom:表示运动的元素节点
    // attr:表示要缓动的属性
    // target:表示该属性要到达的目标值，如果属性是透明度，target要*100
    // fn:是一个可选参数，必须是函数，这个函数会在定时器清除以后调用
    // 如何实参是一个函数，那么我们叫这个函数是move函数的回调函数
    
    // function fn(){
    //     console.log(attr+"运动完成了");
    // }
    // 要用定时器，先清定时器
    clearInterval(dom.timer);
    // 定义定时器
    dom.timer = setInterval(function(){
          // 1 获取元素当前位置
          if(attr=='opacity'){
                // opacity:0.1;
                var current = getStyle(dom,attr)*100;
          }else{
                // width:200px; z-index:10
                var current = parseInt(getStyle(dom,attr))
          }
          // 2 计算速度
          var speed = (target - current)/10;
          speed = speed>0?Math.ceil(speed):Math.floor(speed);
          // 3 计算下一个位置
          var next = current + speed
          // 4 定位元素
          if(attr=="zIndex"){
                // 无需缓动
                dom.style.zIndex = target;
          }else if(attr=="opacity"){
                // 标准浏览器
                dom.style.opacity = next/100;
                // IE低版本
                dom.style.filter = "alpha(opacity="+next+")";
          }else{
                dom.style[attr] = next+"px";
          }
          // 清除定时器
          if(next==target){
                clearInterval(dom.timer);
                if(fn){
                fn()
                }
          }
    },20)
    }

    // 封装一个方法，用于获取指定元素的指定属性
    function getStyle(dom,attr){
        if(window.getComputedStyle){
            return window.getComputedStyle(dom,null)[attr]
        }else{
            return dom.currentStyle[attr]
        }
    }