<?php
/**
 * VocAcción - Plataforma de Orientación Vocacional
 * Archivo: api/admin_detalle_usuario.php
 * Consulta exhaustiva de un estudiante: datos personales, avance, cada respuesta dada y resultado vocacional final
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../auth/check_admin.php';

requireAdminSession();

header('Content-Type: application/json; charset=utf-8');

$usuarioId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($usuarioId <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'ID de usuario inválido.']);
    exit;
}

$pdo = getDbConnection();

try {
    // 1. Datos básicos del usuario
    $stmtUser = $pdo->prepare('
        SELECT id, nombre, email, rol, estado, edad, ciudad, nivel_educativo, created_at, updated_at
        FROM usuarios 
        WHERE id = :id 
        LIMIT 1
    ');
    $stmtUser->execute(['id' => $usuarioId]);
    $usuario = $stmtUser->fetch();

    if (!$usuario) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Usuario no encontrado en la base de datos.']);
        exit;
    }

    // 2. Progreso del test
    $stmtProg = $pdo->prepare('
        SELECT id, estado, porcentaje_avance, etapa_actual, preguntas_totales, preguntas_respondidas, started_at, completed_at, updated_at
        FROM usuario_test_progreso
        WHERE usuario_id = :uid
        LIMIT 1
    ');
    $stmtProg->execute(['uid' => $usuarioId]);
    $progreso = $stmtProg->fetch();

    $testProgresoId = $progreso ? (int)$progreso['id'] : 0;

    // 3. Resultado vocacional final (si existe)
    $resultado = null;
    if ($testProgresoId > 0) {
        $stmtRes = $pdo->prepare('
            SELECT perfil_holland, puntaje_r, puntaje_i, puntaje_a, puntaje_s, puntaje_e, puntaje_c, carreras_sugeridas, fecha_resultado
            FROM usuario_resultados
            WHERE test_progreso_id = :tpid
            LIMIT 1
        ');
        $stmtRes->execute(['tpid' => $testProgresoId]);
        $rowRes = $stmtRes->fetch();

        if ($rowRes) {
            $resultado = [
                'perfil_holland' => $rowRes['perfil_holland'],
                'puntajes' => [
                    'R' => (float)$rowRes['puntaje_r'],
                    'I' => (float)$rowRes['puntaje_i'],
                    'A' => (float)$rowRes['puntaje_a'],
                    'S' => (float)$rowRes['puntaje_s'],
                    'E' => (float)$rowRes['puntaje_e'],
                    'C' => (float)$rowRes['puntaje_c']
                ],
                'carreras_sugeridas' => json_decode($rowRes['carreras_sugeridas'] ?: '[]', true),
                'fecha_resultado' => $rowRes['fecha_resultado']
            ];
        }
    }

    // 4. Detalle de TODAS las preguntas y qué respondió el estudiante
    $stmtRespuestas = $pdo->prepare('
        SELECT 
            p.id as pregunta_id,
            p.codigo_riasec,
            p.texto_pregunta,
            p.orden,
            e.numero_etapa,
            e.titulo as etapa_titulo,
            ur.valor_respuesta,
            ur.respondido_en
        FROM preguntas p
        INNER JOIN etapas_test e ON p.etapa_id = e.id
        LEFT JOIN usuario_respuestas ur ON p.id = ur.pregunta_id AND ur.usuario_id = :uid
        ORDER BY e.numero_etapa ASC, p.orden ASC
    ');
    $stmtRespuestas->execute(['uid' => $usuarioId]);
    $respuestasRows = $stmtRespuestas->fetchAll();

    $interpretacionEscala = [
        1 => '1 - Totalmente en desacuerdo / Nada afín',
        2 => '2 - En desacuerdo / Poco afín',
        3 => '3 - Neutral / Moderado',
        4 => '4 - De acuerdo / Muy afín',
        5 => '5 - Totalmente de acuerdo / Extremadamente afín'
    ];

    $detallePreguntas = array_map(function ($row) use ($interpretacionEscala) {
        $val = $row['valor_respuesta'] ? (int)$row['valor_respuesta'] : null;
        return [
            'pregunta_id' => (int)$row['pregunta_id'],
            'numero_etapa' => (int)$row['numero_etapa'],
            'etapa_titulo' => $row['etapa_titulo'],
            'codigo_riasec' => $row['codigo_riasec'],
            'texto_pregunta' => $row['texto_pregunta'],
            'respondida' => $val !== null,
            'valor_respuesta' => $val,
            'etiqueta_respuesta' => $val ? ($interpretacionEscala[$val] ?? "Valor {$val}") : 'Sin responder',
            'respondido_en' => $row['respondido_en']
        ];
    }, $respuestasRows);

    echo json_encode([
        'success' => true,
        'usuario' => [
            'id' => (int)$usuario['id'],
            'nombre' => $usuario['nombre'],
            'email' => $usuario['email'],
            'rol' => $usuario['rol'],
            'estado' => $usuario['estado'],
            'edad' => $usuario['edad'] ? (int)$usuario['edad'] : null,
            'ciudad' => $usuario['ciudad'] ?: 'No especificada',
            'nivel_educativo' => $usuario['nivel_educativo'] ?: 'Secundaria',
            'created_at' => $usuario['created_at'],
            'updated_at' => $usuario['updated_at']
        ],
        'progreso' => $progreso ? [
            'estado' => $progreso['estado'],
            'porcentaje_avance' => (float)$progreso['porcentaje_avance'],
            'etapa_actual' => (int)$progreso['etapa_actual'],
            'preguntas_totales' => (int)$progreso['preguntas_totales'],
            'preguntas_respondidas' => (int)$progreso['preguntas_respondidas'],
            'started_at' => $progreso['started_at'],
            'completed_at' => $progreso['completed_at']
        ] : null,
        'resultado_final' => $resultado,
        'preguntas_respuestas' => $detallePreguntas
    ]);
} catch (Exception $e) {
    error_log('[VocAcción Detalle Usuario Error] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al obtener detalle del estudiante en MySQL.']);
}
