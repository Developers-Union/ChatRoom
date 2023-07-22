<?php
$name="";
header("Content-Type: application/json");
if (isset($_GET["id"])){
    $id = $_GET["id"];
}else{
    $name=substr(md5(time()),26);
    echo json_encode(array("name"=>$name));
    exit(0);
}
$id=intval($id);
if($id >= 1){
    $chatData = "chatData.txt";
    $msg=getLine($chatData,$id);
}

function getLine($file, $ope , $length = 4096)
{
    $ret = array(); // 初始化返回
    $i = 1; // 行数

    $handle = @fopen($file, "r");
    if ($handle) {
        while (!feof($handle)) {
            $buffer = fgets($handle, $length);
            if ($i>=$ope){
                array_push($ret,str_getcsv($buffer,"|"));
            }
            $i++;
        }
        fclose($handle);
    }
    return $ret;
}
array_pop($msg);
echo json_encode($msg);
?>