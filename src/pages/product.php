<?php
require("../scripts/settings.php");
$id = $_GET['id'];

$connection = new PDO("pgsql:host={$host};port={$port};dbname={$dbname};", $username, $password);

$result = $connection->query("SELECT * FROM products WHERE id=" . $id);

$product = $result->fetch(PDO::FETCH_ASSOC);

$path =  change_path_to_image($product["imageAddress"]);

echo "<link rel='stylesheet' href='../assets/styles/style.css'>";
echo "<div class='product-card'>";
echo "<img src='" . $path . "' alt='" . $product['name'] . "'>";
echo "<div class='product-card-body'>";
echo "<h3>" . $product['name'] . " $" . $product['price'] . "</h3>";
echo "<p>" . $product['description'] . "</p>";
echo "</div>";
echo "</div>";  

echo "<div class='reviews'>";
echo "<h3>Отзывы</h3>";
echo "<ul>";
    $result = $connection->query("SELECT * FROM reviews WHERE \"productId\"=" . $id);
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        echo "<li>" . $row['author'] . ": " . $row['content'] . "</li>";
    }
echo "</ul>";
echo "</div>";

echo "<h2>Добавить новый отзыв</h2>";
echo "  <form action='../scripts/add_review.php?id={$id}' method='post' enctype='multipart/form-data'>";
echo "    <p>Имя: <input type='text' name='author' /> </p>";
echo "    <p>Отзыв: <textarea  name='content'> </textarea></p>";
echo "    <input type='submit' value='Добавить' /> </p>" ;
echo "  </form>";


function change_path_to_image($path) {
    $new_path = ".." . substr($path, 5,  strlen($path)-5);
    return $new_path;
        //./src/assets/mini-images/orange.jpeg
}
?>

