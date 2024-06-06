<?php
require("./src/scripts/settings.php");

$connection = new PDO("pgsql:host={$host};port={$port};dbname={$dbname};", $username, $password);

$result = $connection->query("SELECT * FROM products");

echo "<link rel='stylesheet' href='./src/assets/styles/style.css'>";
echo "<div class='products'>";
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    echo "<div class='product-card'>";
    echo "<img src='" . $row['imageAddress'] . "' alt='" . $row['name'] . "'>";
    echo "<div class='product-card-body'>";
    echo "<a class='text' href='./src/pages/product.php?id=" . $row['id'] . "' class='product-card-more'>" . $row['name'] . " $" . $row['price'] ."</a>";
    echo "</div>";
    echo "</div>";
}
echo "</div>";
?>