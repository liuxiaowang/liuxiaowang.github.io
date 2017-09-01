<?php
$db=new mysqli("localhost","root","","db");
$db->query("set names utf8");
if($db->connect_errno){
    echo "连接失败".$db->connect_errno;
    exit();
}