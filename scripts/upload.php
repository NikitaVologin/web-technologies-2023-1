<?php
// Проверка типа файла
$getMime = explode('/', $_FILES['image']['type']);
$mime = strtolower(end($getMime));
$types = array('jpg', 'png', 'bmp', 'jpeg');
if (!in_array($mime, $types)) {
  die('Неверный тип файла');
}

// Проверка размера файла
if ($_FILES['image']['size'] > 2097152) {
  die('Файл слишком большой');
}

// Сохранение изображения
$name = mt_rand(0, 10000) . ".jpeg";
move_uploaded_file($_FILES['image']['tmp_name'], '../pictures/'.$name);

$source_image = imagecreatefromjpeg('../pictures/'.$name);

// Генерация миниатюры
$thumb_image = imagecreatetruecolor(200, 200);
imagecopyresampled($thumb_image, $source_image, 0, 0, 0, 0, 200, 200, imagesx($source_image), imagesy($source_image));
imagejpeg($thumb_image, '../mini-pictures/'.$name);

// Перезагрузка страницы
header('Location: ../index.php');
exit();
