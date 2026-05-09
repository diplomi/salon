<?php
// Твой токен
$token = "8283177410:AAG601WeyQCSFlfgvyxAf_mgrLyk1lw2MD0";

// Твой chat_id
$chat_id = "5513557932";

// Получение данных из формы
$name = $_POST['name'];
$phone = $_POST['phone'];
$messageText = $_POST['message'];

// Формирование сообщения
$txt = "
📩 *Новая заявка с сайта-визитки*\n
👤 Имя: $name
📞 Телефон: $phone
💬 Сообщение: $messageText
";

// Отправка в Telegram
$url = "https://api.telegram.org/bot$token/sendMessage";

$params = [
    'chat_id' => $chat_id,
    'text' => $txt,
    'parse_mode' => 'Markdown'
];

$options = [
    "http" => [
        "method"  => "POST",
        "header"  => "Content-Type:application/x-www-form-urlencoded\r\n",
        "content" => http_build_query($params)
    ]
];

$context = stream_context_create($options);
file_get_contents($url, false, $context);

// Редирект после отправки
header("Location: thankyou.html");
?>
