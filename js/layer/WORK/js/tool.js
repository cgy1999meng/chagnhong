function addEvent(node, evenType, funcName){
    if(node.addEventListener){
        node.addEventListener(evenType, funcName, false);
    }else{
        node.attachEvent("on" + evenType, funcName);
    }
}

function removeEvent(node, eventType, funcName){
    if(node.removeEventListener){
        node.removeEventListener(eventType, funcName);
    }else{
        node.detachEvent("on" + eventType, funcName);
    }
}

function limitDrag(node){
    node.onmousedown = function(ev){
         var e = ev || window.event;
         //记录鼠标和被拖拽物体相对位置
         var offsetX = e.clientX - node.offsetLeft;
         var offsetY = e.clientY - node.offsetTop;

        //被拖拽物体保持相对距离和鼠标移动
         document.onmousemove = function(ev){
             var e = ev || window.event;
             var l = e.clientX - offsetX;
             var t = e.clientY - offsetY;

            //限制出界
            if(l <= 0){
                l = 0;
            }
            var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
            if(l >= windowWidth - node.offsetWidth){
                l = windowWidth - node.offsetWidth;
            }

            if(t <= 0){
                t = 0;
            }
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if(t >= windowHeight - node.offsetHeight){
                t = windowHeight - node.offsetHeight;
            }

            node.style.left = l + 'px';
            node.style.top = t + 'px';
         }
     }
     //取消拖拽
     document.onmouseup = function(){
        document.onmousemove = null;
     }
 }
function drag(node){
    node.onmousedown = function(ev){
         var e = ev || window.event;
         //记录鼠标和被拖拽物体相对位置
         var offsetX = e.clientX - node.offsetLeft;
         var offsetY = e.clientY - node.offsetTop;

        //被拖拽物体保持相对距离和鼠标移动
         document.onmousemove = function(ev){
             var e = ev || window.event;
             node.style.left = e.clientX - offsetX + 'px';
             node.style.top = e.clientY - offsetY + 'px';
         }
     }
     //取消拖拽
     document.onmouseup = function(){
        document.onmousemove = null;
     }
 }
function removeSpaceNode(parentNode){
    var nodes = parentNode.childNodes;
    for(var i = 0; i < nodes.length; i++){
        //当前遍历到的节点是文本节点，且文本是纯空白字符组成的
        if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
            parentNode.removeChild(nodes[i]);
        }
    }
}

//获取当前有效样式浏览器兼容的写法
function getStyle(node, cssStr){
    return node.currentStyle ? node.currentStyle[cssStr] : getComputedStyle(node)[cssStr];
}
function randomColor(){
    var str = "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ",1)";
    return str;
}

function showTime(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var week = d.getDay();
    week = chineseFromNum(week);

    var hour = doubleNum(d.getHours());
    var min = doubleNum(d.getMinutes());
    var sec = doubleNum(d.getSeconds());

    return year + "年" + month + "月" + day + "日 星期" + week + " " + hour + ":" + min + ":" + sec;
}

function doubleNum(n){
    if(n < 10){
        return "0" + n;
    }else{
        return n;
    }
}

//把星期从数字转成中文
function chineseFromNum(num){
    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    return arr[num];
}

// 封装一个可以随机任意范围整数的函数
function randomNum(min, max){
	var tmp = max - min + 1;
	return parseInt(Math.random() * tmp) + min
}
function bubbleSort(arr){
    for(var i = 0; i < arr.length - 1; i++){
        for(var j = 0; j < arr.length - (i + 1); j++){
            if(arr[j] > arr[j + 1]){
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}
function changeSort(arr){
    //选出的擂台
   for(var i = 0; i < arr.length - 1; i++){
       for(var j = i + 1; j < arr.length; j++){
           if(arr[i] > arr[j]){
               var tmp = arr[i];
               arr[i] = arr[j];
               arr[j] = tmp;
           }
       }
   }
}

function norepeat(arr){
    for(var i = 0; i < arr.length - 1; i++){
        for(var j = i + 1; j < arr.length; j++){
            //判断是否有相等的元素
            if(arr[i] === arr[j]){
                //将后面这个数删除掉
                arr.splice(j, 1);
                j--;
            }
        }
    }
}


/* 
    倒着遍历元素
*/

function norepeatDown(arr){
    for(var i = arr.length - 1; i > 0; i--){
        for(var j = i - 1; j >= 0; j--){
            if(arr[i] === arr[j]){
                arr.splice(j, 1);
            }
        }
    }
}

function testCode(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var tmp = parseInt(Math.random() * 123);
		if(tmp >= 0 && tmp <= 9){
			arr.push(tmp);
		}else if(tmp >= 65 && tmp <= 90 || tmp >= 97 && tmp <= 122){
			arr.push(String.fromCharCode(tmp));
		}else{
			//随机到别的不在范围内的数
			i--;
		}
	}
	return arr.join("");
}



function testCodeNum(n){
	//n生成n位的验证码
	var arr = [];
	for(var i = 0; i < n; i++){
		var tmp = parseInt(Math.random() * 10);
		arr.push(tmp);
	}
	return arr.join("");
}
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