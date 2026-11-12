<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: auth/registro.php
 * Procesa el registro seguro en MySQL e inicializa el progreso del test vocacional
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

// Obtener payload (JSON o Form Data)
$inputRaw = file_get_contents('php://input');
$data = json_decode($inputRaw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// 1. Sanitización y captura de campos
$nombre = trim((string)($data['nombre'] ?? ''));
$email = trim(strtolower((string)($data['email'] ?? '')));
$password = (string)($data['password'] ?? '');
$edad = isset($data['edad']) && is_numeric($data['edad']) ? (int)$data['edad'] : null;
$ciudad = trim((string)($data['ciudad'] ?? ''));
$nivelEducativo = trim((string)($data['nivel_educativo'] ?? 'Secundaria / Bachillerato'));

// 2. Validaciones estrictas
if (empty($nombre)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Por favor ingresa tu nombre completo.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'El formato del correo electrónico ingresado no es válido.']);
    exit;
}

// Requisitos de seguridad en contraseña (mínimo 6 caracteres)
if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'La contraseña debe contener al menos 6 caracteres.']);
    exit;
}

$pdo = getDbConnection();

try {
    // 3. Verificar si el correo ya existe
    $stmtCheck = $pdo->prepare('SELECT id FROM usuarios WHERE email = :email LIMIT 1');
    $stmtCheck->execute(['email' => $email]);
    if ($stmtCheck->fetch()) {
        http_response_code(409); // Conflict
        echo json_encode([
            'success' => false,
            'error' => 'Ya existe una cuenta registrada con este correo electrónico. Por favor inicia sesión.'
        ]);
        exit;
    }

    // 4. Iniciar transacción para garantizar consistencia entre usuario y progreso inicial
    $pdo->beginTransaction();

    // Hashear contraseña con BCRYPT
    $passwordHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    // Insertar en la tabla usuarios
    $stmtUser = $pdo->prepare('
        INSERT INTO usuarios (nombre, email, password_hash, rol, estado, edad, ciudad, nivel_educativo, created_at)
        VALUES (:nombre, :email, :password_hash, :rol, :estado, :edad, :ciudad, :nivel_educativo, NOW())
    ');

    // Asignar rol de usuario (o admin si es el correo maestro configurado)
    $rol = ($email === 'admin@vocaccion.edu' || $email === 'nicoleilincastaneda@gmail.com') ? 'admin' : 'user';

    $stmtUser->execute([
        'nombre' => $nombre,
        'email' => $email,
        'password_hash' => $passwordHash,
        'rol' => $rol,
        'estado' => 'activo',
        'edad' => $edad,
        'ciudad' => $ciudad ?: 'No especificada',
        'nivel_educativo' => $nivelEducativo
    ]);

    $usuarioId = (int)$pdo->lastInsertId();

    // Contar total de preguntas existentes para el test
    $stmtCount = $pdo->query('SELECT COUNT(*) as total FROM preguntas');
    $totalPreguntas = (int)($stmtCount->fetchColumn() ?: 12);

    // Inicializar fila de tracking en usuario_test_progreso
    $stmtProgreso = $pdo->prepare('
        INSERT INTO usuario_test_progreso (usuario_id, estado, porcentaje_avance, etapa_actual, preguntas_totales, preguntas_respondidas, started_at)
        VALUES (:usuario_id, :estado, 0.00, 1, :preguntas_totales, 0, NULL)
    ');

    $stmtProgreso->execute([
        'usuario_id' => $usuarioId,
        'estado' => 'no_iniciado',
        'preguntas_totales' => $totalPreguntas
    ]);

    $pdo->commit();

    // 5. Iniciar sesión automáticamente
    session_regenerate_id(true);
    $_SESSION['user_id'] = $usuarioId;
    $_SESSION['user_name'] = $nombre;
    $_SESSION['user_email'] = $email;
    $_SESSION['user_role'] = $rol;

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Cuenta creada exitosamente en la base de datos.',
        'user' => [
            'id' => $usuarioId,
            'nombre' => $nombre,
            'email' => $email,
            'rol' => $rol,
            'edad' => $edad,
            'ciudad' => $ciudad,
            'nivel_educativo' => $nivelEducativo
        ]
    ]);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('[VocAcción Register Error] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno al procesar el registro en la base de datos.'
    ]);
}
