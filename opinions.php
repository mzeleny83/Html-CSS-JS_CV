<?php
header('Content-Type: application/json');

$opinionsFile = 'opinions.json';

// Zpracování POST požadavku pro přidání nového názoru
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $opinion = json_decode(file_get_contents('php://input'), true);

    if ($opinion && isset($opinion['text'])) {
        $opinions = json_decode(file_get_contents($opinionsFile), true) ?? [];
        $opinions[] = $opinion['text'];
        file_put_contents($opinionsFile, json_encode($opinions));
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
    exit;
}

// Zpracování GET požadavku pro načtení všech názorů
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $opinions = json_decode(file_get_contents($opinionsFile), true) ?? [];
    echo json_encode($opinions);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Invalid request']);
?>
