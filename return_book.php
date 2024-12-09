<?php
include 'config.php';
session_start();

$data = json_decode(file_get_contents('php://input'), true);
$isbn = $data['isbn'];

$query = $db->prepare("UPDATE books SET is_available = 1, borrowed_by = NULL, borrow_date = NULL, deadline = NULL WHERE isbn = ?");
$query->execute([$isbn]);

echo json_encode(['message' => 'Book returned successfully']);
?>
