/*
 * @Author: your name
 * @Date: 2021-05-27 10:37:47
 * @LastEditTime: 2021-05-27 10:54:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WWWd:\1-qfeng\3-lastforth\day03ajax\23-AJAX\02-代码\Ajax\ajax.js
 */
/**
 * @description: ajax 函数 
 * @param {}  options 
 *  {url,type,data,async,dataType,function(){}}
 * @return {*}
 */
function ajax(options){
  // 判断url
  if(!options.url){
    // url必须传入
    // 手动抛出错误
    throw new Error("url必须传入");
  }
  // 定义一默认值
  const defInfo = {
    data:{},
    type:'get',
    async:true,
    dataType:'string',
    success:function(res){}
  }

  // 通过循环将传入的option替换到defIno中的值
  for(var key in options){
    defInfo[key] = options[key];
  }
  // 将data对象转换
  var str = '';
  if(defInfo.data){
    // 将defInfo.data循环遍历 拼接到str
    for(var key in defInfo.data){
      str += `${key}=${defInfo.data[key]}&`;      
    }
    str = str.slice(0,-1);
  }

  // 创建ajax对象
  let xhr = new XMLHttpRequest();
  // 此处只考虑 post 和get请求
  if(options.type.toUpperCase() === "GET"){
    options.url += "?"+str;
    xhr.open("get",options.url,options.async);
    xhr.send();
  }else{
    xhr.open("post",options.url,options.async);
    // 设置请求头
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(str);
  }

  // 接收响应
  xhr.onreadystatechange = function(){
    // 判断http和ajax状态码
    if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
      // 判断dataType
      var res = xhr.responseText;
      if(options.dataType.toUpperCase() === "JSON"){
        res = JSON.parse(res);
      }
      // 调用成功函数，将结果传回
      options.success(res);
    }
  }



}