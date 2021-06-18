define(['jquery'], function($) {

    function bannerShow(){

        $('.lgoodmenue').mouseenter(function(){
            $('.rgoodmenue').css('display','block')
        }).mouseleave(
            function(){
                $('.rgoodmenue').css('display','none')
            }
            
        );
        $('.lgoodmenue .lgoodmenueul li').mouseenter(function(){
            var id = this.id;
            var _this = this;
            $.ajax({
                type:'get',
                url:'http://localhost:3000/firstMoudle/bannerTab',
                datatype:'json',
                success:function(data){
                    // console.log(data);
                    $('.rgoodmenue ul li').remove();
                    for(var key in data){
                        if(key == id){
                            var arr = data[key];//[{type:[]},{type:[1]}]
                            for(var i =0;i<arr.length;i++){
                                var node =
                                    `<li>
                                        <a href="#">
                                            <img src=${arr[i].url} alt="">
                                            <span>${arr[i].name}</span>
                                        </a>
                                    </li>
                                    <li></li>`;
                                $('.rgoodmenue ul').append($(node)); 
                                if(arr[i].type.length != 0){
                                    var arr2 = arr[i].type;
                                    for(var j= 0;j<arr2.length;j++){
                                        var node2 =`<span>${arr2[j]}</span>`;
                                        $('.rgoodmenue ul li:odd').eq(i).append($(node2));
                                    }
                               }else{
                                var node3 =`<span></span>`;
                                $('.rgoodmenue ul li:odd').eq(i).append($(node3))
                               }
                            }
                        }
                    }
                },
                error:function(msg){
                    console.log(msg);
                }
                
            })
        })
    }
  
    return {
        bannerShow,
    }
    
});