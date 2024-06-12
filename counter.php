<?php
// Načtení stávající hodnoty počítadla
$currentCounter = intval(file_get_contents("counter.txt"));

// Inkrementace počítadla o 1
$newCounter = $currentCounter + 1;

// Zápis nové hodnoty počítadla zpět do souboru
file_put_contents("counter.txt", $newCounter);

// Vrácení nové hodnoty počítadla ve formátu JSON
echo json_encode(["counter" => $newCounter]);
?>


<?php
// Nastavení hlaviček pro povolení křížového zdroje (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Kontrola požadavku OPTIONS pro podporu křížového zdroje (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Funkce pro načtení a zpracování hodnoty počítadla
function getCounterValue() {
    // Načtení hodnoty počítadla ze souboru (pokud existuje)
    $counterValue = intval(file_get_contents("counter.txt"));
    return $counterValue;
}

// Funkce pro uložení hodnoty počítadla
function saveCounterValue($value) {
    // Uložení hodnoty počítadla do souboru
    file_put_contents("counter.txt", $value);
}

// Získání metody požadavku
$method = $_SERVER['REQUEST_METHOD'];

// Pokud je požadavek typu POST, zpracujeme hlasování a aktualizujeme počítadlo
if ($method === 'POST') {
    // Načtení aktuální hodnoty počítadla
    $counterValue = getCounterValue();
    
    // Inkrementace hodnoty počítadla
    $counterValue++;
    
    // Uložení nové hodnoty počítadla
    saveCounterValue($counterValue);
    
    // Vrácení odpovědi s novou hodnotou počítadla
    echo json_encode(["counter" => $counterValue]);
} else {
    // Pokud není požadavek typu POST, vrátíme aktuální hodnotu počítadla
    $counterValue = getCounterValue();
    echo json_encode(["counter" => $counterValue]);
}
?>
