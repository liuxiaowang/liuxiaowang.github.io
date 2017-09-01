<?php
include "db.php";

$sql="select * from list order by id";
$result=$db->query($sql);
$r=$result->fetch_all(MYSQLI_ASSOC);
echo json_encode($r);