<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$file = 'counter.txt';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($file)) {
        file_put_contents($file, '0');
    }
    $counter = intval(file_get_contents($file));
    echo json_encode(['counter' => $counter]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!file_exists($file)) {
        file_put_contents($file, '0');
    }
    $counter = intval(file_get_contents($file));
    $counter++;
    file_put_contents($file, $counter);
    echo json_encode(['counter' => $counter]);
}
?>
