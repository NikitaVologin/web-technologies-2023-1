<?
$a = 1;
$b = 2;

if($a >= 0 and $b >= 0) {
    echo "Разность a и b: " . ($a - $b);
}
else if($a < 0 and $b < 0) {
    echo "Произведение a и b: " . ($a * $b); 
}
else {
    echo "Сумма a и b: " . ($a + $b);
}

$a = rand(0, 15);
echo "\n";

switch ($a) {
    case 0:
        echo nl2br("\n0");
    case 1:
        echo nl2br("\n1");
    case 2:
        echo nl2br("\n2");
    case 3:
        echo nl2br("\n3");
    case 4:
        echo nl2br("\n4");
    case 5:
        echo nl2br("\n5");
    case 6:
        echo nl2br("\n6");
    case 7:
        echo nl2br("\n7");
    case 8:
        echo nl2br("\n8");
    case 9:
        echo nl2br("\n9");
    case 10:
        echo nl2br("\n10");
    case 11:
        echo nl2br("\n11");
    case 12:
        echo nl2br("\n12");
    case 13:
        echo nl2br("\n13");
    case 14:
        echo nl2br("\n14");
    case 15:
        echo nl2br("\n15");
}
?>

<?
function plus($a, $b){
    return $a + $b;
}

function minus($a, $b){
    return $a - $b;
}

function multiply($a, $b){
    return $a * $b;
}

function divide($a, $b){
    if($b == 0) {
        throw new Error("Division by zero");
    }
    return $a / $b;
}
?>

<?
function mathOperation($arg1, $arg2, $operation) {
    switch($operation){
        case "plus":
            return plus($arg1, $arg2);
        case "minus":
            return minus($arg1, $arg2);
        case "multiply":
            return multiply($arg1, $arg2);
        case "divide":
            return divide($arg1, $arg2);
        default:
            throw new Error("An unknown operation type");
    }
}

echo nl2br("\nСложение 10 и 10: " . mathOperation(10, 10, "plus"));
echo nl2br("\nВычитание 10 и 10: " . mathOperation(10, 10, "minus"));
echo nl2br("\nУмножение 10 и 10: " . mathOperation(10, 10, "multiply"));
echo nl2br("\nДеление 10 и 10: " . mathOperation(10, 10, "divide"));
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>