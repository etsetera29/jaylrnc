<?php
include 'config.php';
session_start();

$type = $_GET['type'];
$contact = $_SESSION['user']['contact'];

if ($type == 'borrowed') {
    $query = $db->prepare("SELECT * FROM books WHERE is_available = 0");
} elseif ($type == 'available') {
    $query = $db->prepare("SELECT * FROM books WHERE is_available = 1");
} elseif ($type == 'my') {
    $query = $db->prepare("SELECT * FROM books WHERE borrowed_by = ?");
    $query->execute([$contact]);
} else {
    echo json_encode([]);
    exit;
}

$query->execute();
$books = $query->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($books);
?>
