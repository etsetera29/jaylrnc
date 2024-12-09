<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$contact = $data['contact'];
$password = $data['password'];

$query = $db->prepare("SELECT * FROM users WHERE contact = ?");
$query->execute([$contact]);
$user = $query->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    session_start();
    $_SESSION['user'] = [
        'contact' => $user['contact'],
        'name' => $user['name'],
        'is_admin' => $user['is_admin']
    ];
    if ($user['is_admin']) {
        echo json_encode(['is_admin' => true]);
    } else {
        echo json_encode(['is_user' => true]);
    }
} else {
    echo json_encode(['is_user' => false, 'is_admin' => false]);
}
?>
