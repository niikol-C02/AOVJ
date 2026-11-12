<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: auth/login.php
 * Autenticación segura de usuarios y administradores con password_verify y sesiones PHP
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/conexion.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido. Solo se admite POST.']);
    exit;
}

$inputRaw = file_get_contents('php://input');
$data = json_decode($inputRaw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$email = trim(strtolower((string)($data['email'] ?? '')));
$password = (string)($data['password'] ?? '');

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Por favor ingresa tu correo y contraseña.']);
    exit;
}

$pdo = getDbConnection();

try {
    $stmt = $pdo->prepare('
        SELECT id, nombre, email, password_hash, rol, estado, edad, ciudad, nivel_educativo 
        FROM usuarios 
        WHERE email = :email 
        LIMIT 1
    ');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error' => 'Usuario o contraseña incorrectos. Verifica tus credenciales o regístrate si aún no tienes cuenta.'
        ]);
        exit;
    }

    // Verificar si la cuenta ha sido suspendida por el administrador
    if ($user['estado'] === 'suspendido') {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'error' => 'Tu cuenta ha sido temporalmente suspendida por la administración de VocAcción.'
        ]);
        exit;
    }

    // Regenerar ID de sesión para prevenir Session Fixation
    session_regenerate_id(true);

    $_SESSION['user_id'] = (int)$user['id'];
    $_SESSION['user_name'] = $user['nombre'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_role'] = $user['rol'];

    echo json_encode([
        'success' => true,
        'message' => 'Inicio de sesión correcto.',
        'user' => [
            'id' => (int)$user['id'],
            'nombre' => $user['nombre'],
            'email' => $user['email'],
            'rol' => $user['rol'],
            'edad' => $user['edad'],
            'ciudad' => $user['ciudad'],
            'nivel_educativo' => $user['nivel_educativo']
        ],
        'redirect' => ($user['rol'] === 'admin') ? 'admin/dashboard.php' : 'index.html'
    ]);
} catch (Exception $e) {
    error_log('[VocAcción Login Error] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error en el servidor al autenticar.']);
}
