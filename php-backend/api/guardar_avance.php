<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: api/guardar_avance.php
 * Registra cada respuesta y actualiza el avance (%) del test vocacional en tiempo real
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/conexion.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Sesión no iniciada. Debes autenticarte para responder el test.']);
    exit;
}

$usuarioId = (int)$_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido. Solo se admite POST.']);
    exit;
}

$inputRaw = file_get_contents('php://input');
$data = json_decode($inputRaw, true) ?: $_POST;

$preguntaId = isset($data['pregunta_id']) ? (int)$data['pregunta_id'] : 0;
$valorRespuesta = isset($data['valor_respuesta']) ? (int)$data['valor_respuesta'] : 0;
$etapaActual = isset($data['etapa_actual']) ? (int)$data['etapa_actual'] : 1;

if ($preguntaId <= 0 || $valorRespuesta < 1 || $valorRespuesta > 5) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Datos inválidos. La pregunta debe existir y la respuesta debe estar entre 1 y 5.'
    ]);
    exit;
}

$pdo = getDbConnection();

try {
    $pdo->beginTransaction();

    // 1. Obtener o crear fila de progreso para el usuario
    $stmtProg = $pdo->prepare('SELECT id, preguntas_totales, started_at FROM usuario_test_progreso WHERE usuario_id = :uid LIMIT 1');
    $stmtProg->execute(['uid' => $usuarioId]);
    $progreso = $stmtProg->fetch();

    if (!$progreso) {
        $stmtCount = $pdo->query('SELECT COUNT(*) FROM preguntas');
        $totalPreguntas = (int)($stmtCount->fetchColumn() ?: 12);

        $stmtInsProg = $pdo->prepare('
            INSERT INTO usuario_test_progreso (usuario_id, estado, porcentaje_avance, etapa_actual, preguntas_totales, preguntas_respondidas, started_at)
            VALUES (:uid, "en_progreso", 0.00, :etapa, :tot, 0, NOW())
        ');
        $stmtInsProg->execute([
            'uid' => $usuarioId,
            'etapa' => $etapaActual,
            'tot' => $totalPreguntas
        ]);
        $testProgresoId = (int)$pdo->lastInsertId();
        $preguntasTotales = $totalPreguntas;
    } else {
        $testProgresoId = (int)$progreso['id'];
        $preguntasTotales = (int)$progreso['preguntas_totales'];
    }

    // 2. Guardar o actualizar la respuesta individual (Upsert con ON DUPLICATE KEY UPDATE)
    $stmtResp = $pdo->prepare('
        INSERT INTO usuario_respuestas (usuario_id, test_progreso_id, pregunta_id, valor_respuesta, respondido_en)
        VALUES (:uid, :tpid, :pid, :val, NOW())
        ON DUPLICATE KEY UPDATE 
            valor_respuesta = VALUES(valor_respuesta),
            respondido_en = NOW()
    ');
    $stmtResp->execute([
        'uid' => $usuarioId,
        'tpid' => $testProgresoId,
        'pid' => $preguntaId,
        'val' => $valorRespuesta
    ]);

    // 3. Recalcular el total de preguntas respondidas
    $stmtCountResp = $pdo->prepare('SELECT COUNT(*) FROM usuario_respuestas WHERE test_progreso_id = :tpid');
    $stmtCountResp->execute(['tpid' => $testProgresoId]);
    $respondidas = (int)$stmtCountResp->fetchColumn();

    $porcentajeAvance = $preguntasTotales > 0 ? round(($respondidas / $preguntasTotales) * 100, 2) : 0.00;
    if ($porcentajeAvance > 100.00) $porcentajeAvance = 100.00;

    $nuevoEstado = ($respondidas >= $preguntasTotales && $preguntasTotales > 0) ? 'completado' : 'en_progreso';

    // 4. Actualizar tabla usuario_test_progreso
    $stmtUpdProg = $pdo->prepare('
        UPDATE usuario_test_progreso
        SET 
            estado = :estado,
            porcentaje_avance = :avance,
            etapa_actual = :etapa,
            preguntas_respondidas = :resp,
            started_at = COALESCE(started_at, NOW()),
            updated_at = NOW()
        WHERE id = :tpid
    ');
    $stmtUpdProg->execute([
        'estado' => $nuevoEstado,
        'avance' => $porcentajeAvance,
        'etapa' => $etapaActual,
        'resp' => $respondidas,
        'tpid' => $testProgresoId
    ]);

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'message' => 'Respuesta registrada y avance actualizado en la base de datos.',
        'data' => [
            'pregunta_id' => $preguntaId,
            'valor_respuesta' => $valorRespuesta,
            'preguntas_totales' => $preguntasTotales,
            'preguntas_respondidas' => $respondidas,
            'porcentaje_avance' => $porcentajeAvance,
            'estado' => $nuevoEstado,
            'etapa_actual' => $etapaActual
        ]
    ]);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('[VocAcción Guardar Avance Error] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al guardar respuesta en la base de datos.']);
}
