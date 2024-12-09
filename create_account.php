<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$contact = $data['contact'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);

$query = $db->prepare("INSERT INTO users (contact, name, password) VALUES (?, ?, ?)");
try {
    $query->execute([$contact, $name, $password]);
    echo json_encode(['message' => 'Account created successfully']);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Error: Contact already exists']);
}
?>
