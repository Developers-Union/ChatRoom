<?php
if (isset($_GET["msg"])&&isset($_GET["name"])&&isset($_GET["t"])){
    $msg = $_GET["msg"];
    $name = $_GET["name"];
    $t = $_GET["t"];
    $writeData = $msg . '|' . $name . "|" . $t . "\n";
    $chatData = "chatData.txt";
    file_put_contents($chatData, $writeData, FILE_APPEND);
    echo "az";
}else{
    echo "gun";
}
?>