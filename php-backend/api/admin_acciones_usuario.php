<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: api/admin_acciones_usuario.php
 * Acciones administrativas (CRUD): cambiar estado (activo/suspendido), cambiar rol y eliminar usuarios
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../auth/check_admin.php';

requireAdminSession();

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido. Solo se admite POST.']);
    exit;
}

$inputRaw = file_get_contents('php://input');
$data = json_decode($inputRaw, true) ?: $_POST;

$accion = trim((string)($data['accion'] ?? ''));
$targetUserId = isset($data['usuario_id']) ? (int)$data['usuario_id'] : 0;
$currentAdminId = (int)$_SESSION['user_id'];

if ($targetUserId <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'ID de usuario inválido.']);
    exit;
}

$pdo = getDbConnection();

try {
    // Verificar existencia del usuario objetivo
    $stmtCheck = $pdo->prepare('SELECT id, email, rol, estado FROM usuarios WHERE id = :id LIMIT 1');
    $stmtCheck->execute(['id' => $targetUserId]);
    $targetUser = $stmtCheck->fetch();

    if (!$targetUser) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'El usuario no existe en la base de datos.']);
        exit;
    }

    // Proteger contra auto-eliminación o auto-suspensión del administrador en sesión
    if ($targetUserId === $currentAdminId && in_array($accion, ['eliminar', 'cambiar_estado'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No puedes suspender o eliminar tu propia cuenta de administrador en sesión activa.']);
        exit;
    }

    switch ($accion) {
        case 'cambiar_estado':
            $nuevoEstado = ($targetUser['estado'] === 'activo') ? 'suspendido' : 'activo';
            $stmtUpd = $pdo->prepare('UPDATE usuarios SET estado = :estado, updated_at = NOW() WHERE id = :id');
            $stmtUpd->execute(['estado' => $nuevoEstado, 'id' => $targetUserId]);

            echo json_encode([
                'success' => true,
                'message' => "Estado de la cuenta actualizado a: {$nuevoEstado}.",
                'nuevo_estado' => $nuevoEstado
            ]);
            break;

        case 'cambiar_rol':
            $nuevoRol = ($targetUser['rol'] === 'admin') ? 'user' : 'admin';
            $stmtUpd = $pdo->prepare('UPDATE usuarios SET rol = :rol, updated_at = NOW() WHERE id = :id');
            $stmtUpd->execute(['rol' => $nuevoRol, 'id' => $targetUserId]);

            echo json_encode([
                'success' => true,
                'message' => "Rol actualizado a: " . ($nuevoRol === 'admin' ? 'Administrador' : 'Estudiante') . ".",
                'nuevo_rol' => $nuevoRol
            ]);
            break;

        case 'eliminar':
            // Por integridad referencial con ON DELETE CASCADE, esto limpiará progresos, respuestas y resultados asociados
            $stmtDel = $pdo->prepare('DELETE FROM usuarios WHERE id = :id');
            $stmtDel->execute(['id' => $targetUserId]);

            echo json_encode([
                'success' => true,
                'message' => 'Usuario y todo su historial de test vocacional eliminados exitosamente de MySQL.'
            ]);
            break;

        default:
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Acción no reconocida. Opciones: cambiar_estado, cambiar_rol, eliminar.']);
            break;
    }
} catch (Exception $e) {
    error_log('[VocAcción Admin Accion Error] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al procesar la acción en MySQL.']);
}
