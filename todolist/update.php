<?php
$id=$_GET['id'];
$attr=$_GET['attr'];
$val=$_GET['val'];
include 'db.php';
$sql="update list set $attr='$val' where id='$id'";
$db->query($sql);
if($db->affected_rows==1){
    echo 1;
}else {
    echo 0;
}