<?php
header('content-type:text/html;charset="utf-8"');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header('Access-Control-Allow-Headers:x-requested-with,content-type')

//定义返回格式
$responseData = array('code'=>0,'massage'=>'');

$username = $_POST['username'];
$password = $_POST['password'];

//对表单获取到的数据判断是否有值
if(!$username){
    $responseData['code'] = 1;
    $responseData['massage'] = '用户名不能为空';

    echo json_encode($responseData);
    exit;
};

if(!$password){
    $responseData['code'] = 2;
    $responseData['massage'] = '密码不能为空';

    echo json_encode($responseData);
    exit;
};

//1、链接数据库
$link = mysql_connect('127.0.0.1','root','123456');
//2、判断数据库是否链接成功
if(!$link){
    $responseData['code'] = 3;
    $responseData['massage'] = '服务器忙';

    echo json_encode($responseData);
    exit;
};
//3、设置访问字符集
mysql_set_charset('utf8');

//4、选择数据库
mysql_select_db('yyyy');

//5、准备sql语句进行登陆  username 且 password要md5加密
$str = md5($password);

$sql = "SELECT * FROM users WHERE username='{$username}' AND password='{$str}'";

//6、发送sql语句
$res = mysql_query($sql);

//取出一行数据
$row = mysql_fetch_assoc($res);

if(!$row){
    $responseData["code"] = 4;
    $responseData["massage"] = "用户名或密码错误";

    echo json_encode($responseData);
    exit;
}

$responseData["massage"] = "登陆成功";

echo json_encode($responseData);

 //8、关闭数据库
 mysqli_close($link);












?>