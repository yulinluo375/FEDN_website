<!DOCTYPE html>
<html>
    <head>
        <title>转化图片</title>
    </head>
    <body>
       <?php
$pic = 'http://127.0.0.1:5500/More/pixel_luxun1.html';
$arr = getimagesize($pic);
$pic = "data:{$arr['mime']};base64,".base64_encode(file_get_contents($pic));
?>

    <img src="<?php echo $pic ?>" />
    </body>
</html>


