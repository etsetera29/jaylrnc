<?php
include 'config.php';
session_start();

$data = json_decode(file_get_contents('php://input'), true);
$isbn = $data['isbn'];
$contact = $_SESSION['user']['contact'];

$borrow_date = date('Y-m-d');
$deadline = date('Y-m-d', strtotime('+7 days'));

$query = $db->prepare("UPDATE books SET is_available = 0, borrowed_by = ?, borrow_date = ?, deadline = ? WHERE isbn = ?");
$query->execute([$contact, $borrow_date, $deadline, $isbn]);

echo json_encode(['message' => 'Book borrowed successfully']);
?>
