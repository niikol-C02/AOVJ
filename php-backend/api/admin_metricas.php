<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: api/admin_metricas.php
 * Retorna las métricas en tiempo real 100% calculadas con consultas SQL de agregación
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../auth/check_admin.php';

requireAdminSession();

header('Content-Type: application/json; charset=utf-8');

$pdo = getDbConnection();

try {
    // 1. Total de usuarios registrados (estudiantes)
    $stmtTotal = $pdo->query("SELECT COUNT(*) FROM usuarios WHERE rol = 'user'");
    $totalUsuarios = (int)$stmtTotal->fetchColumn();

    // 2. Tests Completados
    $stmtComp = $pdo->query("SELECT COUNT(*) FROM usuario_test_progreso WHERE estado = 'completado'");
    $testsCompletados = (int)$stmtComp->fetchColumn();

    // 3. Tests en Curso / En Progreso
    $stmtProg = $pdo->query("SELECT COUNT(*) FROM usuario_test_progreso WHERE estado = 'en_progreso'");
    $testsEnCurso = (int)$stmtProg->fetchColumn();

    // 4. Tests No Iniciados
    $stmtNoIni = $pdo->query("SELECT COUNT(*) FROM usuario_test_progreso WHERE estado = 'no_iniciado'");
    $testsNoIniciados = (int)$stmtNoIni->fetchColumn();

    // 5. Usuarios Registrados Hoy
    $stmtHoy = $pdo->query("SELECT COUNT(*) FROM usuarios WHERE DATE(created_at) = CURDATE() AND rol = 'user'");
    $usuariosHoy = (int)$stmtHoy->fetchColumn();

    // 6. Promedio global de avance
    $stmtAvg = $pdo->query("SELECT ROUND(COALESCE(AVG(porcentaje_avance), 0), 1) FROM usuario_test_progreso");
    $promedioAvance = (float)$stmtAvg->fetchColumn();

    // 7. Perfiles RIASEC dominantes más frecuentes en resultados
    $stmtPerfiles = $pdo->query("
        SELECT perfil_holland, COUNT(*) as cantidad 
        FROM usuario_resultados 
        GROUP BY perfil_holland 
        ORDER BY cantidad DESC 
        LIMIT 5
    ");
    $perfilesFrecuentes = $stmtPerfiles->fetchAll();

    // 8. Tasa de finalización (%)
    $totalIniciados = $testsCompletados + $testsEnCurso;
    $tasaFinalizacion = $totalIniciados > 0 ? round(($testsCompletados / $totalIniciados) * 100, 1) : 0;

    echo json_encode([
        'success' => true,
        'metricas' => [
            'total_usuarios' => $totalUsuarios,
            'tests_completados' => $testsCompletados,
            'tests_en_curso' => $testsEnCurso,
            'tests_no_iniciados' => $testsNoIniciados,
            'usuarios_hoy' => $usuariosHoy,
            'promedio_avance' => $promedioAvance,
            'tasa_finalizacion' => $tasaFinalizacion,
            'perfiles_frecuentes' => $perfilesFrecuentes,
            'timestamp' => date('Y-m-d H:i:s')
        ]
    ]);
} catch (Exception $e) {
    error_log('[VocAcción Admin Metricas Error] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al calcular métricas en MySQL.']);
}
