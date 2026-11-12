<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: api/admin_usuarios.php
 * Consulta la lista de usuarios con su avance del test en tiempo real, filtros dinámicos y búsqueda
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../auth/check_admin.php';

requireAdminSession();

header('Content-Type: application/json; charset=utf-8');

$pdo = getDbConnection();

$search = trim((string)($_GET['search'] ?? ''));
$estadoTest = trim((string)($_GET['estado_test'] ?? 'todos'));
$rol = trim((string)($_GET['rol'] ?? 'todos'));

try {
    $sql = "
        SELECT 
            u.id,
            u.nombre,
            u.email,
            u.rol,
            u.estado as estado_cuenta,
            u.edad,
            u.ciudad,
            u.nivel_educativo,
            u.created_at,
            COALESCE(p.estado, 'no_iniciado') as estado_test,
            COALESCE(p.porcentaje_avance, 0.00) as porcentaje_avance,
            COALESCE(p.etapa_actual, 1) as etapa_actual,
            COALESCE(p.preguntas_respondidas, 0) as preguntas_respondidas,
            COALESCE(p.preguntas_totales, 12) as preguntas_totales,
            p.started_at,
            p.completed_at,
            r.perfil_holland
        FROM usuarios u
        LEFT JOIN usuario_test_progreso p ON u.id = p.usuario_id
        LEFT JOIN usuario_resultados r ON p.id = r.test_progreso_id
        WHERE 1=1
    ";

    $params = [];

    // Filtro por término de búsqueda (nombre o email o ciudad)
    if (!empty($search)) {
        $sql .= " AND (LOWER(u.nombre) LIKE :search OR LOWER(u.email) LIKE :search OR LOWER(u.ciudad) LIKE :search)";
        $params['search'] = '%' . strtolower($search) . '%';
    }

    // Filtro por estado del test
    if ($estadoTest !== 'todos') {
        if ($estadoTest === 'no_iniciado') {
            $sql .= " AND (p.estado IS NULL OR p.estado = 'no_iniciado')";
        } else {
            $sql .= " AND p.estado = :estado_test";
            $params['estado_test'] = $estadoTest;
        }
    }

    // Filtro por rol
    if ($rol !== 'todos') {
        $sql .= " AND u.rol = :rol";
        $params['rol'] = $rol;
    }

    $sql .= " ORDER BY u.created_at DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $usuarios = $stmt->fetchAll();

    // Formatear datos para el frontend
    $formatted = array_map(function ($u) {
        return [
            'id' => (int)$u['id'],
            'nombre' => $u['nombre'],
            'email' => $u['email'],
            'rol' => $u['rol'],
            'estado_cuenta' => $u['estado_cuenta'],
            'edad' => $u['edad'] ? (int)$u['edad'] : null,
            'ciudad' => $u['ciudad'] ?: 'No especificada',
            'nivel_educativo' => $u['nivel_educativo'] ?: 'Secundaria',
            'created_at' => $u['created_at'],
            'test' => [
                'estado' => $u['estado_test'],
                'porcentaje_avance' => (float)$u['porcentaje_avance'],
                'etapa_actual' => (int)$u['etapa_actual'],
                'preguntas_respondidas' => (int)$u['preguntas_respondidas'],
                'preguntas_totales' => (int)$u['preguntas_totales'],
                'perfil_holland' => $u['perfil_holland'],
                'started_at' => $u['started_at'],
                'completed_at' => $u['completed_at']
            ]
        ];
    }, $usuarios);

    echo json_encode([
        'success' => true,
        'total' => count($formatted),
        'usuarios' => $formatted
    ]);
} catch (Exception $e) {
    error_log('[VocAcción Admin Usuarios Error] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al consultar usuarios en MySQL.']);
}
