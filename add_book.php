<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$isbn = $data['isbn'];
$title = $data['title'];
$author = $data['author'];

$query = $db->prepare("INSERT INTO books (isbn, title, author) VALUES (?, ?, ?)");
try {
    $query->execute([$isbn, $title, $author]);
    echo json_encode(['message' => 'Book added successfully']);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Error: Book already exists']);
}
?>
