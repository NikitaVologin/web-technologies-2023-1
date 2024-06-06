<?php
require("../scripts/settings.php");
$id = $_GET['id'];

$name = "не определено";
$content = "не определен";

if($_POST["author"] == "" || $_POST["content"] == "" ) {
    throw new Exception("");
}
$name = $_POST["author"];
$content = $_POST["content"];

$connection = new PDO("pgsql:host={$host};port={$port};dbname={$dbname};", $username, $password);
$result = $connection->query("INSERT INTO  reviews(\"productId\", author, content) VALUES($id, '$name', '$content');");

header("Location: ../pages/product.php?id={$id}");
?>