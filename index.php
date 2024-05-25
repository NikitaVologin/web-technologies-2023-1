<?
//1. С помощью цикла do…while написать функцию для вывода чисел от 0 до 10

function printNumbers() {
    $i = 0;
    do {
      if ($i % 2 == 0) {
        echo nl2br("$i – чётное число.\n");
      } else {
        echo nl2br("$i – нечётное число.\n");
      }
      $i++;
    } while ($i <= 10);
}
printNumbers();
?>

<?
//2. Объявить массив, в котором в качестве ключей будут использоваться названия областей,
// а в качестве значений – массивы с названиями городов из соответствующей области.

$regions = array(
    "Московская область" => array("Москва", "Зеленоград", "Клин"),
    "Ленинградская область" => array("Санкт-Петербург", "Всеволожск", "Павловск", "Кронштадт"),
    "Рязанская область" => array("Рязань", "Касимов", "Скопин", "Сасово")
  );
  
  foreach ($regions as $region => $cities) {
    echo nl2br("$region:\n");
    foreach ($cities as $city) {
      echo nl2br(".....$city\n");
    }
  }
?>

<?
//3. Объявить массив, индексами которого являются буквы русского языка, 
//а значениями – соответствующие латинские буквосочетания 
//Написать функцию транслитерации строк.

$cyrillicToLatin = array(
    'а' => 'a',
    'б' => 'b',
    'в' => 'v',
    'г' => 'g',
    'д' => 'd',
    'е' => 'e',
    'ё' => 'yo',
    'ж' => 'zh',
    'з' => 'z',
    'и' => 'i',
    'й' => 'y',
    'к' => 'k',
    'л' => 'l',
    'м' => 'm',
    'н' => 'n',
    'о' => 'o',
    'п' => 'p',
    'р' => 'r',
    'с' => 's',
    'т' => 't',
    'у' => 'u',
    'ф' => 'f',
    'х' => 'h',
    'ц' => 'c',
    'ч' => 'ch',
    'ш' => 'sh',
    'щ' => 'shch',
    'ъ' => '`b',
    'ы' => 'y',
    'ь' => '``b',
    'э' => 'e',
    'ю' => 'yu',
    'я' => 'ya'
  );

  function transliterate($text, $cyrillicToLatin) {
    $transliteratedText = '';
    for ($i = 0; $i < strlen($text); $i++) {
      $char = mb_substr($text, $i, 1);
      if (isset($cyrillicToLatin[$char])) {
        $transliteratedText .= $cyrillicToLatin[$char];
      } else {
        $transliteratedText .= $char;
      }
    }
    return $transliteratedText;
  }
  
  $originalText = 'привет, мир!';
  $transliteratedText = transliterate($originalText, $cyrillicToLatin);
  
  echo nl2br("Оригинальный текст: $originalText\n");
  echo nl2br("Транслитерированный текст: $transliteratedText\n");
?>

<?
//4. В имеющемся шаблоне сайта заменить статичное меню (ul - li) на генерируемое через PHP.
//Необходимо представить пункты меню как элементы массива и вывести их циклом. 
//Подумать, как можно реализовать меню с вложенными подменю? Попробовать его реализовать.

$menuItems = array(
    'Главная',
    'О нас',
    'Услуги',
    'Портфолио',
    'Контакты',
    'Подменю 1' => array(
      'Пункт 1',
      'Пункт 2',
      'Пункт 3' 
    )
  );
  
  echo '<ul>';
  foreach ($menuItems as $menuItem => $subMenuItems) {
    echo '<li>';
    if (is_array($subMenuItems)) {
      echo '<a href="#">' . $menuItem . '</a>';
      echo '<ul>';
      foreach ($subMenuItems as $subMenuItem) {
        echo '<li><a href="#">' . $subMenuItem . '</a></li>';
      }
      echo '</ul>';
    } else {
      echo '<a href="#">' . $menuItem . '</a>';
    }
    echo '</li>';
  }
  echo '</ul>';
?>

<? 
//6. *Повторить 2 задание, но вывести на экран только города, начинающиеся с буквы “К”.

  $kCities = array();
  foreach ($regions as $region => $cities) {
    foreach ($cities as $city) {
      if (mb_substr($city, 0, 1) == 'К') {
        $kCities[] = $city;
      }
    }
  }
  echo implode(", ", $kCities);
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