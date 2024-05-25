<?
$core_dir = "E:/OSPanel/home/web-technologies-2023-1-1";
$picture_dir = "/pictures";
$mini_picture_dir = "/mini-pictures";
$logs_dir = "logs";
function buid_gallery($core_dir, $picture_dir, $mini_picture_dir){
  if (is_dir($core_dir . $picture_dir)) 
  {
    if ($dh = opendir($core_dir . $picture_dir)) 
    {
        while ($file = readdir($dh)) 
        {
            if($file=='.' || $file=='..') continue;
            $file_name = pathinfo($file, PATHINFO_BASENAME);
            $path = $picture_dir . "/" . $file_name;
            $path_mini = $mini_picture_dir . "/" . $file_name;
            echo "<div class=\"image-container\"><a href=\"$path\" target=\"_blank\"><img src=\"$path_mini\" class=\"image\"></a></div>";
        }
        closedir($dh);
    }
  }
}
?>

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles/style.css">
  <title>Галерея фотографий</title>
</head>
<body>
  <div class="gallery">
    <? buid_gallery($core_dir, $picture_dir, $mini_picture_dir) ?>
  </div>
  <hr>
  <h2>Загрузить новое изображение</h2>
  <form action="scripts/upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="image">
    <input type="submit" value="Загрузить">
  </form>
</body>
</html>


<?

function get_last_file_number($path) 
{
  $dir = opendir($path);
  $count = 0;
  while($file = readdir($dir))
  {
    if($file == '.' || $file == '..' || is_dir($path . $file)) continue;
    $count++;
  }
  return $count;
}

function get_count_lines($file) 
{ 
    if(!file_exists($file)) exit("Файл не найден"); 
    $file_arr = file($file); 
    $lines = count($file_arr); 
     
    return $lines; 
} 
?>

<?php
$timestamp = date('Y-m-d H:i:s');
$last_number =  get_last_file_number($logs_dir);
$count_lines = get_count_lines("log.txt");

if ($count_lines < 10){
  file_put_contents("log.txt", $timestamp . PHP_EOL, FILE_APPEND);
}
else {
  copy("log.txt", $logs_dir."/log".($last_number+1).".txt");
  unlink("log.txt");
  file_put_contents("log.txt", $timestamp . PHP_EOL, FILE_APPEND);
}
?>