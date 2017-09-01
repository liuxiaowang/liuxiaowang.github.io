<?php
$id=$_GET['id'];
include 'db.php';
$sql="delete from list where id='$id'";
$db->query($sql);
if($db->affected_rows==1){
    echo 1;
}else{
    echo 0;
}