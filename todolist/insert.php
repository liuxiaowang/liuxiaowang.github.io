<?php
$text=$_GET["val"];
//$time=$_GET["date"];
$isdone=$_GET["isDone"];
$isstar=$_GET["isStar"];
$isdel=$_GET["isDel"];
include "db.php";

$sql="insert into list(text,isDone,isStar,isDel)value('$text','$isdone','$isstar','$isdel')";
$db->query($sql);
if($db->affected_rows==1){
    echo 1;
}else{
    echo 0;
}
