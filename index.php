<?php
    $title = "Лаб. 16";
    $time = "Текущее время: " . date("H:m");

    function get_date($data) 
    {
        $answer = "";
        $time_parts = explode(" ", $data);
        $hour = (int)$time_parts[0];
        $minutes = (int)$time_parts[1];
        $answer .= $time_parts[0];
        if($hour % 10 == 1 and $hour != 11 ) {
            $answer .= " час";
        }
        else if ($hour % 10 > 1 and $hour % 10 < 5 and ($hour < 11 or $hour > 14)) {
            $answer .= " часа";
        }
        else {
            $answer .= " часов";
        }
        $answer .= " " . $time_parts[1];

        if($minutes % 10 == 1 and $minutes != 11) {
            $answer .= " минута";
        }
        else if ($minutes % 10 > 1 and $minutes % 10 < 5 and ($minutes < 11 or $minutes > 14)) {
            $answer .= " минуты";
        }
        else {
            $answer .= " минут";
        }

        return $answer;
    }
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title><? echo $title ?></title>
</head>
<body>
  <main>
  <? $answer = get_date(date("H m"))  ?>
  <? echo "<h1>$time</h1>" ?>
  <? echo "<h1>$answer</h1>" ?>
  </main>
</body>
</html>